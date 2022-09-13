import styled, {keyframes} from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
//  width: 100vh;
  justify-content: center;
  align-items: center;
`;

const rotateAnimation1 = keyframes`
  from {
    transform:rotate(0deg);
    border-radius: 0px;
  }
  to {
    transform:rotate(360deg);
    border-radius: 100px;
  }
`;
const rotateAnimation2 = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform:rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform:rotate(0deg);
    border-radius: 0px;
  }
`;
const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  animation:${rotateAnimation2} 1s linear infinite;
  ${Emoji} {
    &:hover{
      font-size: 48px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {

  return (
    <Wrapper>
      <Box>
        <Emoji as="p">😀</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
