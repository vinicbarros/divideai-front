/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { TailSpin } from "react-loader-spinner";
import Container from "../common/ContainerWrap";
import Button from "../style/Button";
import signInImage from "../assets/images/sign_in_image.svg";
import GoogleConnect from "../style/GoogleConnect";
import { UserAuth } from "../contexts/UserContext";
import { postSignIn } from "../services/userServices";

export default function SignIn() {
  const { oAuthSignIn, userData, setLocalStorage } = UserAuth();
  const navigate = useNavigate();
  const mutation = useMutation(() => postSignIn(form));

  const [form, setForm] = useState({
    email: "",
    password: "",
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
    setError("");
    if (disable) return;
    setDisable(true);

    try {
      const loggedUser = await mutation.mutateAsync();
      setLocalStorage({ string: "userData", data: loggedUser });
      toast.success("Logado com  sucesso!");
      setDisable(false);
      navigate("/");
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
            src={signInImage}
            alt="sign in image"
          />
        </WrapImage>
        <Title>Entrar</Title>
        <Form onSubmit={handleFormSignIn}>
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
          {error.length > 0 ? <ErrorText>{error}</ErrorText> : <></>}
          <Button
            cor="#406bfb"
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
              "Entrar"
            )}
          </Button>
        </Form>
        <hr data-content="OU" />
        <GoogleConnect onClick={handleSignInByOauth}>
          Entre com Google <div /> <FcGoogle />
        </GoogleConnect>
        <Link to="/sign-up">
          <SubTitle>Não tem uma conta? Cadastre-se!</SubTitle>
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
  width: 300px;
  margin-bottom: 40px;
  margin-inline: auto;
`;

const Title = styled.h1`
  font-size: 45px;
  font-weight: 700;
  text-align: center;
  width: 200px;
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
  border: 1px solid #406bfb;
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
  color: #406bfb;
  text-decoration: underline;
  font-weight: 600;
`;

const ErrorText = styled.p`
  text-align: center;
  margin-top: 14px;
  color: #f44336;
  font-weight: 500;
`;
