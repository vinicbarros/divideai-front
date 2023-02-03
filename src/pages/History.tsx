/* eslint-disable react/jsx-no-useless-fragment */
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import styled from "styled-components";
import LoadingPage from "../components/LoadingPage";
import MappedBill from "../components/MappedBill";
import Navbar from "../components/Navbar";
import PrivateContainer from "../components/PrivateContainer";
import { getShortBills } from "../services/billServices";
import { WrapperTitle } from "./Home";

export default function History() {
  const { data, isLoading } = useQuery("bills", getShortBills, {
    retry: false,
    onError: (err: AxiosError) => err,
  });

  if (!data) return <></>;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <PrivateContainer>
        <Wrapper>
          <Title>Histórico</Title>
          <Subtitle>Veja seu histórico e cheque contas!</Subtitle>
        </Wrapper>
        <BillTitle>Suas contas</BillTitle>
        <MappedBill data={data} />
      </PrivateContainer>
      <Navbar />
    </>
  );
}

const Wrapper = styled.section`
  width: 90%;
  height: 100px;
  margin-inline: auto;
  padding-block: 20px;
`;

const BillTitle = styled(WrapperTitle)`
  margin-top: 0px;
`;

const Title = styled.h1`
  color: #373737;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.h5`
  color: #bdbdbd;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
`;
