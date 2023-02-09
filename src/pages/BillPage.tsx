/* eslint-disable react/jsx-no-useless-fragment */
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import LoadingPage from "../components/LoadingPage";
import Navbar from "../components/Navbar";
import PrivateContainer from "../components/PrivateContainer";
import UserBillComponent from "../components/UserBillComponent";
import formattedValue from "../helpers/formatValue";
import { deleteBill, getBill } from "../services/billServices";
import { Wrapper } from "../components/MappedBill";
import { WrapperTitle } from "./Home";
import { UserAuth } from "../contexts/UserContext";
import Category from "../components/Category";

export default function BillPage() {
  const { billId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userData } = UserAuth();
  const [copied, setCopied] = useState(false);

  const getBillWithId = async () => {
    return getBill(Number(billId));
  };

  const { data, isLoading } = useQuery("bill", getBillWithId, {
    retry: false,
    onError: (err: AxiosError) => err,
  });

  const deleteMutation = useMutation(
    async (params: number) => {
      return deleteBill(params);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("bill");
      },
    }
  );

  if (!data) return <LoadingPage />;

  const getFriendsListName = () => {
    let friendsStr = "";

    if (data.userBill.length > 4) {
      return `${data?.userBill[0].users.name}, ${
        data?.userBill[1].users.name
      } e mais ${data.userBill.length - 2}`;
    }

    data.userBill.forEach((user, index) => {
      if (index === data.userBill.length - 1) {
        friendsStr += `${user.users.name}`;
      } else {
        friendsStr += `${user.users.name}, `;
      }
    });

    return friendsStr;
  };

  const deleteBills = async (param: number) => {
    try {
      Swal.fire({
        text: "Vocẽ deseja excluir esta conta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMutation.mutateAsync(param);
          navigate("/");
          Swal.fire("Pronto!", "Você excluiu esta conta.", "success");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.pixKey);
    setCopied(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <PrivateContainer>
        <TopBox>
          <TitleWrap>
            <Category name={data.category.name} />
            <TextWrap>
              <BillTitle>{data.name}</BillTitle>
              <BillSubtitle>{getFriendsListName()}</BillSubtitle>
            </TextWrap>
          </TitleWrap>
          {data.ownerId === userData().user.id ? (
            <FaTrash
              size={24}
              style={{ color: "#ffffff" }}
              onClick={() => {
                deleteBills(Number(billId));
              }}
            />
          ) : (
            <></>
          )}
        </TopBox>

        <WrapperTitle>Resumo:</WrapperTitle>
        <MiddleContainer>
          <MiddleWrap>
            <Title>Total:</Title>
            <Subtitle>{formattedValue(data.value)}</Subtitle>
          </MiddleWrap>
          <MiddleWrap>
            <Title>Status:</Title>
            <BillSubStatus status={data.billStatus}>
              {data.billStatus === "PAID" ? "Pago" : "Pendente"}
            </BillSubStatus>
          </MiddleWrap>
          <MiddleWrap>
            <Title>Vence em:</Title>
            <Subtitle>{dayjs(data.expireDate).format("DD/MM/YYYY")}</Subtitle>
          </MiddleWrap>
          <MiddleWrap>
            <Title>Chave PIX:</Title>
            <Copy onClick={copyToClipboard}>
              {copied ? "Copiado!" : "Copiar"}
            </Copy>
          </MiddleWrap>
        </MiddleContainer>

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

const TopBox = styled.div`
  background-color: #0369c9;
  min-height: 80px;
  width: 100%;
  display: flex;
  padding-inline: 20px;
  padding-block: 10px;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrap = styled.div`
  margin-left: 20px;
`;

const MiddleContainer = styled.section`
  width: 90%;
  margin-inline: auto;
  margin-top: 10px;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 5px;
`;

const MiddleWrap = styled.div`
  display: flex;
  align-items: center;
  padding-block: 10px;

  & + & {
    border-top: 1px solid #838383;
  }
`;

const BillTitle = styled.h1`
  font-size: 24px;
  max-width: 240px;
  font-weight: bold;
  color: #ffffff;
`;

const BillSubtitle = styled.h4`
  margin-top: 4px;
  letter-spacing: 0.1px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
`;

const BillStatus = styled.h2`
  font-size: 16px;
  color: #838383;
  margin-right: 5px;
`;

type BillStatusType = {
  status: string;
};

const BillSubStatus = styled.h3<BillStatusType>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.status === "PAID" ? "#43A048" : "#F44336")};
`;

const Title = styled.h2`
  color: #838383;
  font-size: 16px;
  margin-right: 5px;
`;

const Subtitle = styled.h3`
  color: #2a2a2a;
  font-size: 16px;
  font-weight: 600;
`;

const Copy = styled(Subtitle)`
  color: #73c27a;
  text-decoration: underline;
`;
