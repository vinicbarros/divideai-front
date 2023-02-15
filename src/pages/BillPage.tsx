/* eslint-disable react/jsx-no-useless-fragment */
import { AxiosError } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/common/LoadingPage";
import Navbar from "../components/common/Navbar";
import PrivateContainer from "../components/Other/PrivateContainer";
import UserBillComponent from "../components/BillPage/UserBillComponent";
import { getBill } from "../services/billServices";
import { Wrapper } from "../components/common/MappedBill";
import { WrapperTitle } from "./Home";
import BillHeader from "../components/BillPage/BillHeader";
import ResumeBill from "../components/BillPage/ResumeBill";

export default function BillPage() {
  const { billId } = useParams();
  const queryClient = useQueryClient();

  const getBillWithId = async () => {
    return getBill(Number(billId));
  };

  const { data, isLoading } = useQuery("bill", getBillWithId, {
    retry: false,
    onError: (err: AxiosError) => err,
  });

  if (isLoading || !data || !billId) {
    return <LoadingPage />;
  }

  return (
    <>
      <PrivateContainer>
        <BillHeader
          billId={Number(billId)}
          billInfos={data}
          queryClient={queryClient}
        />
        <WrapperTitle>Resumo:</WrapperTitle>
        <ResumeBill billInfos={data} />
        <WrapperTitle>Pessoas</WrapperTitle>
        <Wrapper>
          {data.userBill.map((user) => (
            <UserBillComponent
              key={user.users.id}
              userBill={user}
              billId={Number(billId)}
              queryClient={queryClient}
              billName={data.name}
              pixKey={data.pixKey}
            />
          ))}
        </Wrapper>
      </PrivateContainer>
      <Navbar />
    </>
  );
}
