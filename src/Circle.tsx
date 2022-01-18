import { useState } from "react";
import styled from "styled-components";
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
`;
interface CricleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}
function Cricle({ bgColor, borderColor, text = "default text" }: CricleProps) {
  const [value, setValue] = useState<number | string>(1);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Cricle;
