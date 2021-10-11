import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../share/Button';

function ErrorBox() {
  const error = useSelector((state) => state.quiz?.error);

  return (
    <Container>
      <h1 className="message">🙈{error}</h1>
      <Link to="/">
        <Button text="메뉴로 돌아가기" size="large" color="pink" />
      </Link>
    </Container>
  );
}

export default ErrorBox;

const Container = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 50px;
  background: ${({ theme }) => theme.loseGameBg};

  .message {
    margin-bottom: 50px;
    text-align: center;
    font-family: 'Do hyeon';
    font-size: 24px;
    overflow-wrap: break-word;
    color: white;
  }
`;
