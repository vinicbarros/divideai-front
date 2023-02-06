/* eslint-disable react/jsx-no-useless-fragment */
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
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

  const getFriendsListName = () => {
    let friendsStr = "";

    data?.userBill.forEach((user, index) => {
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

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!data) return <LoadingPage />;

  return (
    <>
      <PrivateContainer>
        <TopBox>
          <TopWrap>
            <TitleBox>
              <TitleWrap>
                <BillTitle>{data.name}</BillTitle>
                <BillSubtitle>{getFriendsListName()}</BillSubtitle>
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
            </TitleBox>
            <TitleBox>
              <InfoWrap>
                <BillStatus>Status:</BillStatus>
                <BillSubStatus status={data.billStatus}>
                  {data.billStatus === "PAID" ? "PAGO" : "PENDENTE"}
                </BillSubStatus>
              </InfoWrap>
              <Category name={data.category.name} />
            </TitleBox>
          </TopWrap>
          <BottomWrap>
            <TotalBox>
              <TotalTitle>Total:</TotalTitle>
              <TotalValue>{formattedValue(data.value)}</TotalValue>
            </TotalBox>
            <TotalBox>
              <DateTitle>Data de vencimento:</DateTitle>
              <DateSubtitle>
                {dayjs(data.expireDate).format("DD/MM/YYYY")}
              </DateSubtitle>
            </TotalBox>
          </BottomWrap>
        </TopBox>
        <WrapperTitle>Pessoas</WrapperTitle>
        <Wrapper>
          {data.userBill.map((user) => (
            <UserBillComponent
              key={user.users.id}
              userBill={user}
              billId={Number(billId)}
              queryClient={queryClient}
            />
          ))}
        </Wrapper>
      </PrivateContainer>
      <Navbar />
    </>
  );
}

const TopWrap = styled.div`
  width: 90%;
  margin-inline: auto;
  padding-block: 20px;
  display: flex;
  flex-direction: column;
`;

const BottomWrap = styled.div`
  width: 90%;
  margin-inline: auto;
  padding-block: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopBox = styled.div`
  background-color: #0369c9;
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleBox = styled.div`
  &:first-child {
    display: flex;
    justify-content: space-between;
  }

  &:nth-child(2) {
    display: flex;
    justify-content: space-between;
  }

  & + & {
    margin-top: 25px;
  }
`;

const TitleWrap = styled.div``;

const InfoWrap = styled.div``;

const BillTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
`;

const BillStatus = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;

type BillStatusType = {
  status: string;
};

const BillSubStatus = styled.h3<BillStatusType>`
  font-size: 24px;
  margin-top: 5px;
  font-weight: bold;
  color: ${(props) => (props.status === "PAID" ? "#43A048" : "#F44336")};
`;

const BillSubtitle = styled.h4`
  margin-top: 4px;
  letter-spacing: 0.1px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
`;

const TotalBox = styled.div``;

const TotalTitle = styled.h2`
  color: #ffffff;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const TotalValue = styled.h3`
  color: #fb8a00;
  font-size: 28px;
  font-weight: 600;
`;

const DateTitle = styled(TotalTitle)`
  font-size: 16px;
  width: 160px;
  text-align: right;
  margin-right: 0;
`;

const DateSubtitle = styled.h3`
  color: #fb8a00;
  font-size: 20px;
  font-weight: 600;
  text-align: right;
  margin-bottom: 2px;
`;
