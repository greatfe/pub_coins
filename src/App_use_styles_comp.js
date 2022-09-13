import styled from "styled-components";

const Father = styled.div`
`;

//Props
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;
// 상속
const Circle = styled(Box)`
  border-radius: 50px;
`;

const Text = styled.span`
color: white;
`;

const Btn = styled.button`
  color: white;
  background-color: blue;
  border: 0;
  border-radius: 15px;
`;
// html 속성
const Input = styled.input.attrs({required: true, minLength: 10})`
background-color: pink;
`;

function App() {

  return (
    <Father>
      <Box bgColor="teal">
        <Text>Hello</Text>
      </Box>
      <Circle bgColor="tomato" />
      <Btn>Log In</Btn>
      <Btn as="a" href="/">Continue</Btn>
      <br />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
