/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import styled from "styled-components";
import { GoBell } from "react-icons/go";
import { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import Navbar from "../components/Navbar";
import PrivateContainer from "../components/PrivateContainer";
import { getShortBills } from "../services/billServices";
import MappedBill from "../components/MappedBill";

export default function Home() {
  const { data, isLoading, error } = useQuery("bills", getShortBills, {
    retry: false,
    onError: (err: AxiosError) => err,
  });
  const [user, setUser] = useState({
    user: {
      id: "",
      name: "",
      email: "",
    },
    token: "",
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData") as string));
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (data === undefined) return <></>;

  return (
    <>
      <PrivateContainer>
        <TopBox>
          <TopWrapBox>
            <WelcomeText>
              {isLoading ? <></> : `Bem vindo(a), ${user.user.name}!`}
            </WelcomeText>
            <GoBell
              size={25}
              style={{ color: "#ffffff" }}
            />
          </TopWrapBox>
        </TopBox>
        <WrapperTitle>Últimos pagamentos</WrapperTitle>
        <MappedBill data={data.slice(0, 4)} />
      </PrivateContainer>
      <Navbar />
    </>
  );
}

export const WrapperTitle = styled.h4`
  width: 90%;
  margin-inline: auto;
  color: #2a2a2a;
  margin-top: 20px;
  font-size: 20px;
`;

const TopBox = styled.div`
  background-color: #0369c9;
  height: 300px;
  width: 100%;
`;

const TopWrapBox = styled.div`
  width: 90%;
  margin-inline: auto;
  padding-block: 20px;
  display: flex;
  justify-content: space-between;
`;

const WelcomeText = styled.h4`
  font-family: "Inter";
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  width: 150px;
`;
