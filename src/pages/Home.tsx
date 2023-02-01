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
import { UserAuth } from "../contexts/UserContext";
import { getShortBills } from "../services/billServices";
import ShortBillComponent from "../components/ShortBill";
import notFoundImage from "../assets/images/not_found.svg";

export default function Home() {
  const { data, isLoading, error } = useQuery("bill", getShortBills, {
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
        <Wrapper>
          {data?.length > 0 ? (
            data?.slice(0, 4).map((bill) => (
              <ShortBillComponent
                key={bill.bill.id}
                shortBill={bill.bill}
              />
            ))
          ) : (
            <NotFoundBox>
              <h5>Você ainda não tem nenhuma conta, crie uma!</h5>
              <ImageBox
                src={notFoundImage}
                alt="not found"
              />
            </NotFoundBox>
          )}
        </Wrapper>
      </PrivateContainer>
      <Navbar />
    </>
  );
}

const Wrapper = styled.section`
  width: 90%;
  margin-top: 10px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  border-radius: 10px;
`;

const WrapperTitle = styled.h4`
  width: 90%;
  margin-inline: auto;
  color: #2a2a2a;
  margin-top: 20px;
  font-size: 20px;
`;

const TopBox = styled.div`
  background-color: #304fff;
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

const NotFoundBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 420px;

  h5 {
    margin-block: 50px;
    text-align: center;
    width: 200px;
    color: #fdd835;
    font-family: "Poppins";
  }
`;

const ImageBox = styled.img`
  width: 250px;
`;
