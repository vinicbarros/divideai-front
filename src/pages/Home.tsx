/* eslint-disable react/jsx-no-useless-fragment */
import { AxiosError, HttpStatusCode } from "axios";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import Navbar from "../components/Navbar";
import PrivateContainer from "../components/PrivateContainer";
import { getShortBills } from "../services/billServices";
import MappedBill from "../components/MappedBill";
import Header from "../components/HomePage/Header";

export default function Home() {
  const navigate = useNavigate();
  const shortBillData = useQuery("bills", getShortBills, {
    retry: false,
    onError: (err: AxiosError) => err,
  });

  if (shortBillData.error?.response?.status === HttpStatusCode.Unauthorized) {
    localStorage.removeItem("userData");
    navigate("/landing-page");
  }

  if (shortBillData.isLoading) {
    return <LoadingPage />;
  }
  if (!shortBillData.data) return <></>;

  return (
    <>
      <PrivateContainer>
        <Header />
        <WrapperTitle>Últimos pagamentos</WrapperTitle>
        <MappedBill data={shortBillData.data.slice(0, 4)} />
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
