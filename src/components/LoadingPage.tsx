import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import Container from "../common/ContainerWrap";

export default function LoadingPage() {
  return (
    <Container>
      <Wrapper>
        <TailSpin color="#406bfb" />
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
