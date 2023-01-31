import styled from "styled-components";

export default function Container({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.main`
  display: flex;
  width: 90%;
  height: 100vh;
  margin-inline: auto;
  justify-content: center;
  align-items: center;
`;
