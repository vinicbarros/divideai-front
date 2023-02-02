/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TailSpin } from "react-loader-spinner";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import signUpImage from "../assets/images/sign_up_image.svg";
import Container from "../common/ContainerWrap";
import { UserAuth } from "../contexts/UserContext";
import { postSignUp } from "../services/userServices";
import Button from "../style/Button";
import GoogleConnect from "../style/GoogleConnect";

export default function SignUp() {
  const { oAuthSignIn, userData, setLocalStorage } = UserAuth();
  const navigate = useNavigate();
  const mutation = useMutation(() =>
    postSignUp({ name: form.name, email: form.email, password: form.password })
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");

  const handleSignInByOauth = async () => {
    await oAuthSignIn();
    toast.success("Logado com  sucesso!");
    navigate("/");
  };

  const handleFormSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disable) return;
    if (form.password !== form.confirmPassword) {
      // eslint-disable-next-line consistent-return
      return setError("As senhas precisam ser iguais!");
    }
    setError("");
    setDisable(true);

    try {
      const loggedUser = await mutation.mutateAsync();
      toast.success("Cadastrado com  sucesso!");
      setLocalStorage({ string: "userData", data: loggedUser });
      setDisable(false);
      navigate("/sign-in");
    } catch (err) {
      setError("Email ou senha inválidos!");
      setDisable(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <WrapImage>
          <SignInImage
            src={signUpImage}
            alt="sign up image"
          />
        </WrapImage>
        <Title>Cadastro</Title>
        <Form onSubmit={handleFormSignIn}>
          <Input
            type="text"
            placeholder="Nome"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
          <Input
            type="text"
            placeholder="Email"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Senha"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Confirme sua senha"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, confirmPassword: e.target.value });
            }}
          />
          {error.length > 0 ? <ErrorText>{error}</ErrorText> : <></>}
          <Button
            cor="#0369C9"
            border="none"
            fcor="#ffffff"
            dcor="#0f1e52"
            type="submit"
            disabled={disable}
          >
            {disable ? (
              <TailSpin
                width="35px"
                color="#ffffff"
              />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </Form>
        <hr data-content="OU" />
        <GoogleConnect onClick={handleSignInByOauth}>
          Entre com Google <div /> <FcGoogle />
        </GoogleConnect>
        <Link to="/sign-in">
          <SubTitle>Já possui uma conta? Entre!</SubTitle>
        </Link>
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

const WrapImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignInImage = styled.img`
  width: 200px;
  margin-bottom: 40px;
  margin-inline: auto;
`;

const Title = styled.h1`
  font-size: 45px;
  font-weight: 700;
  text-align: center;
  width: 100%;
  margin-inline: auto;
  line-height: 30px;
  margin-bottom: 38px;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #0369c9;
  outline: none;
  color: #2a2a2a;
  font-size: 18px;
  border-radius: 10px;

  & + & {
    margin-top: 14px;
  }
`;

const SubTitle = styled.h4`
  text-align: center;
  margin-top: 15px;
  color: #0369c9;
  text-decoration: underline;
  font-weight: 600;
`;

const ErrorText = styled.p`
  text-align: center;
  margin-top: 14px;
  color: #f44336;
  font-weight: 500;
`;
