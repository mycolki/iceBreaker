import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import styled from 'styled-components';
import theme from '../../styles/theme';
import _ from 'lodash';

import { getDatabase, ref, onValue, update } from 'firebase/database';
import {
  toggleForm,
  toggleAnswer,
  showMessage,
  onError,
} from '../../store/quizSlice';
import { saveOpponentLevel } from '../../store/battleSlice';
import { pounding } from '../../styles/share/animation';
import {
  ROUTE,
  ROOM,
  SECONDS_PER_LEVEL,
  TIME_LIMIT_ANSWER,
} from '../../constants/game';
import { ANSWER, BREAK } from '../../constants/messages';
import { flexCenter } from '../../styles/share/common';
import { emergency } from '../../styles/share/animation';

function Header() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const score = useSelector((state) => state.quiz?.score);
  const isTimeOver = useSelector((state) => state.quiz?.isTimeOver);
  const isImageLoaded = useSelector((state) => state.quiz?.isImageLoaded);
  const name = useSelector((state) => state.battle?.name);
  const opponentLevel = useSelector((state) => state.battle?.opponentLevel);

  const TIME_LIMIT_BREAK = SECONDS_PER_LEVEL[`Lv${level}`];
  const [second, setSecond] = useState(TIME_LIMIT_BREAK);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!roomId && opponentLevel && showWarning) return;

    return onValue(
      ref(getDatabase(), `${ROOM}/${roomId}/breakers/0/level`),
      (snapshot) => {
        console.log(snapshot.val());
        // const opponent = _.find(
        //   snapshot.val(),
        //   (breaker) => breaker.name !== name,
        // );

        // if (opponent.level === 1) return;
        // if (opponent.level === opponentLevel) return;

        // setShowWarning(true);
        // dispatch(saveOpponentLevel());
      },
    );
  });

  useEffect(() => {
    if (name && level) {
      let updated;
      onValue(ref(getDatabase(), `${ROOM}/${roomId}/breakers`), (snapshot) => {
        updated = snapshot.val().map((breaker) => {
          if (breaker.name === name) {
            breaker.level = level;
          }
          return breaker;
        });
      });

      update(ref(getDatabase(), `${ROOM}/${roomId}`), {
        breakers: updated,
      });
    }
  }, [level]);

  useEffect(() => {
    if (name && score) {
      let updated;
      onValue(ref(getDatabase(), `${ROOM}/${roomId}/breakers`), (snapshot) => {
        updated = snapshot.val().map((breaker) => {
          if (breaker.name === name) {
            breaker.score = score;
          }
          return breaker;
        });
      });

      update(ref(getDatabase(), `${ROOM}/${roomId}`), {
        breakers: updated,
      });
    }
  }, [score]);

  useEffect(() => {
    if (!level) return;

    let timer;
    const waitForOneSecond = () => {
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(), 1000);
      });
    };

    const countToZero = async (from) => {
      for (let i = from; i >= 0; i--) {
        setSecond(i);
        await waitForOneSecond();
      }
    };

    (async () => {
      if (!isImageLoaded) return;

      if (isTimeOver) {
        dispatch(toggleForm(false));
        document.querySelector('.second').classList.remove('answer');
        return clearTimeout(timer);
      }

      try {
        dispatch(showMessage(BREAK[`Lv${level}`]));
        await countToZero(TIME_LIMIT_BREAK);

        dispatch(showMessage(ANSWER[`Lv${level}`]));
        dispatch(toggleForm(true));

        document.querySelector('.second').classList.add('answer');
        await waitForOneSecond();
        await countToZero(TIME_LIMIT_ANSWER);

        dispatch(toggleAnswer(true));
      } catch (err) {
        dispatch(onError(err.message));
        history.push(ROUTE.ERROR);
      }
    })();

    return () => clearTimeout(timer);
  }, [dispatch, level, isTimeOver, isImageLoaded, history, TIME_LIMIT_BREAK]);

  return (
    <Container>
      {showWarning && <BattleMessage>상대 브레이커 레벨 2 진입!</BattleMessage>}
      <StateBox>
        <Stage width={100} height={64}>
          <Layer>
            <RegularPolygon
              x={40}
              y={30}
              sides={6}
              radius={24}
              rotation={90}
              fill={theme.pink}
            />
          </Layer>
        </Stage>
        <UserScore>
          <span className="level">Lv.{level}</span>
          <span className="score">{score === 0 ? `00` : score}</span>
        </UserScore>
      </StateBox>
      <Time>
        <span className="clock">⏰</span>
        <span className="second">{second < 10 ? `0${second}` : second}</span>
      </Time>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 9%;
`;

const StateBox = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
`;

const UserScore = styled.div`
  transform: translate(-85px, 0px);
  text-align: center;

  .level {
    display: block;
    font-size: 0.7em;
    color: ${({ theme }) => theme.white};
  }

  .score {
    padding-left: 1px;
    font-size: 1.7em;
    -webkit-text-stroke: 1px ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.deepBlue};
  }
`;

const Time = styled.div`
  width: 25%;

  .clock {
    font-size: 1.5em;
    margin-right: 5px;
  }

  .second {
    position: absolute;
    font-size: 1.7em;
    color: ${({ theme }) => theme.purple};
    animation: ${pounding} 1.1s infinite linear;
  }

  .answer {
    color: ${({ theme }) => theme.red};
  }
`;

const BattleMessage = styled.div`
  ${flexCenter}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: 'Do Hyeon';
  color: ${({ theme }) => theme.deepPink};
  animation: ${emergency} 1s infinite;
`;
