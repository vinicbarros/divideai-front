import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import Container from "../common/ContainerWrap";
import { UserAuth } from "../contexts/UserContext";
import welcomeImage from "../assets/images/welcome_image.svg";
import Button from "../style/Button";
import GoogleConnect from "../style/GoogleConnect";

export default function LandingPage() {
  const { oAuthSignIn } = UserAuth();

  const navigate = useNavigate();

  const handleSignInByOauth = async () => {
    await oAuthSignIn();
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <WelcomeImage
          src={welcomeImage}
          alt="welcome"
        />
        <Title>Crie sua conta na Divide Aí </Title>
        <Subtitle>
          Divide Aí é uma poderosa ferramenta para te salvar de problemas com
          despesas compartilhadas!
        </Subtitle>
        <Button
          cor="#0369c9"
          fcor="#ffffff"
          border="none"
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Entrar
        </Button>
        <Button
          cor="#ffffff"
          fcor="#0369c9"
          border="2px solid #0369c9"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Cadastre-se
        </Button>
        <hr data-content="OU" />
        <GoogleConnect onClick={handleSignInByOauth}>
          Entre com Google <div /> <FcGoogle />
        </GoogleConnect>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.section`
  color: #2a2a2a;
  width: 100%;

  hr {
    line-height: 1em;
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    height: 1.5em;
    opacity: 0.5;
    &:before {
      content: "";
      background: linear-gradient(to right, transparent, #818078, transparent);
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
    }
    &:after {
      content: attr(data-content);
      position: relative;
      display: inline-block;
      color: black;

      padding: 0 0.5em;
      line-height: 1.5em;

      color: #818078;
      font-weight: 400;
      background-color: #fcfcfa;
    }

    margin-top: 15px;
  }
`;

const WelcomeImage = styled.img`
  width: 350px;
  margin-bottom: 14px;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  width: 200px;
  margin-inline: auto;
  line-height: 30px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  text-align: center;
  line-height: 18px;
  color: #838383;
  font-weight: 600;
  margin-bottom: 10px;
`;
