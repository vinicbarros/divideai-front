import styled from "styled-components";

export default function PrivateContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
`;
