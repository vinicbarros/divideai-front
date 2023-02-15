import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NotFoundImg from "../assets/images/404_error.svg";
import Button from "../style/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Essa página não existe!</Title>
      <Image
        src={NotFoundImg}
        alt="not found"
      />
      <Button
        cor="#0369c9"
        fcor="#fff"
        width="200px"
        onClick={() => {
          navigate("/");
        }}
      >
        Voltar para home
      </Button>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Image = styled.img`
  width: 300px;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: "#2a2a2a";
  font-size: 18px;
  font-family: "Poppins";
  margin-bottom: 20px;
`;
