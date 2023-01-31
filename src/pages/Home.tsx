import { AxiosError } from "axios";
import { useQuery } from "react-query";
import styled from "styled-components";
import { GoBell } from "react-icons/go";
import LoadingPage from "../components/LoadingPage";
import Navbar from "../components/Navbar";
import PrivateContainer from "../components/PrivateContainer";
import { UserAuth } from "../contexts/UserContext";
import { getShortBills } from "../services/billServices";
import ShortBillComponent from "../components/ShortBill";

export default function Home() {
  const { data, isLoading, error } = useQuery("bill", getShortBills, {
    retry: false,
    onError: (err: AxiosError) => err,
  });

  const { userData } = UserAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <PrivateContainer>
        <TopBox>
          <TopWrapBox>
            <WelcomeText>Bem vindo(a), {userData?.user.name}!</WelcomeText>
            <GoBell style={{ color: "#ffffff" }} />
          </TopWrapBox>
        </TopBox>
        <WrapperTitle>Últimos pagamentos</WrapperTitle>
        <Wrapper>
          {data?.map((bill) => (
            <ShortBillComponent
              key={bill.bill.id}
              shortBill={bill.bill}
            />
          ))}
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
