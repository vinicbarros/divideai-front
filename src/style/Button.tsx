import styled from "styled-components";

const Button = styled.button<IButtonProps>`
  width: 100%;
  border-radius: 40px;
  background-color: ${(props) => props.cor};
  color: ${(props) => props.fcor};
  height: 55px;
  border: ${(props) => props.border};
  margin-top: 15px;
  font-size: 18px;
  font-family: "Inter";
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    background-color: ${(props) => props.dcor};
  }
`;

interface IButtonProps {
  cor?: string;
  fcor?: string;
  dcor?: string;
  border?: string;
}

export default Button;
