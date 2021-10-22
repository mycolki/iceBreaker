import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import useSound from 'use-sound';

import {
  showMessage,
  showAnswerBoxByInput,
  showResult,
  addScore,
} from '../../store/quizSlice';
import { countEachLetter } from '../../utils/countEachLetter';
import { inspectKorean } from '../../utils/inspectInputType';

import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { VALIDATION_INPUT, VALIDATION_ANSWER } from '../../constants/messages';

import Button from '../share/Button';

function InputBox() {
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const isImgLoaded = useSelector((state) => state.quiz?.isImgLoaded);
  const isAnswerTime = useSelector((state) => state.quiz?.isAnswerTime);
  const isTimeOver = useSelector((state) => state.quiz?.isTimeOver);
  const [play] = useSound('/audio/breakIce.wav');
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isTimeOver) setInput('');
  }, [isTimeOver]);

  const submitInput = (ev) => {
    ev.preventDefault();
    play();

    if (input === answer) {
      setInput('');
      dispatch(addScore());
      dispatch(showAnswerBoxByInput(input));

      return dispatch(showResult(true));
    }

    if (input.length === 0) {
      return dispatch(showMessage(VALIDATION_INPUT.FILL_BLANK));
    }

    if (!inspectKorean(input)) {
      setInput('');
      return dispatch(showMessage(VALIDATION_INPUT.ONLY_KOREAN));
    }

    if (input.length < answer.length) {
      return dispatch(
        showMessage({
          type: VALIDATION_INPUT.TYPE,
          text: `정답은 ${answer.length}자리 입니다.`,
        }),
      );
    }

    const numberOfLetter = countEachLetter(answer);
    let count = 0;

    for (let i = 0; i < answer.length; i++) {
      const str = input[i];

      if (str === answer[i]) {
        count++;
        numberOfLetter[str] -= 1;
        continue;
      }

      if (numberOfLetter[str] > 0) {
        count++;
        numberOfLetter[str] -= 1;
      }
    }

    count === 0
      ? dispatch(showMessage(VALIDATION_ANSWER.ALL_WRONG))
      : dispatch(
          showMessage({
            type: VALIDATION_ANSWER.TYPE,
            text: `정답과 ${count}글자가 일치합니다`,
          }),
        );

    dispatch(showAnswerBoxByInput(input));
    setInput('');
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    const inputValue = value.trim();

    if (answer && inputValue.length > answer.length) {
      setInput(inputValue.slice(0, answer.length));
      return dispatch(
        showMessage({
          type: VALIDATION_INPUT.TYPE,
          text: `정답은 ${answer.length}자리 입니다.`,
        }),
      );
    }

    setInput(inputValue);
  };

  return (
    <Wrapper>
      {isAnswerTime ? (
        <Form
          onSubmit={submitInput}
          isAnswer={answer === input}
          data-testid="form"
        >
          <input
            className="input"
            type="text"
            lang="ko"
            placeholder="Guess What"
            value={input}
            onChange={handleInput}
            autoFocus
          />
          <Button
            text="Break"
            color="lightPurple"
            size="small"
            type="submit"
            disabled={!isImgLoaded}
          />
        </Form>
      ) : null}
    </Wrapper>
  );
}

export default InputBox;

const Wrapper = styled.div`
  ${flexCenterColumn}
  height: 16%;
`;

const Form = styled.form`
  ${flexCenter}
  text-align: center;

  .input {
    width: 140px;
    height: 50px;
    padding: 0;
    margin-right: 10px;
    text-align: center;
    border-radius: 20px;
    background-color: #ffffff80;
    box-shadow: ${({ theme }) => theme.boxShadow};

    ::placeholder {
      font-size: 0.8em;
      color: ${({ theme }) => theme.deepGray60};
    }
  }
`;
