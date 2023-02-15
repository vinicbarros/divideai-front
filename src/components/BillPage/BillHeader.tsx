/* eslint-disable react/jsx-no-useless-fragment */
import { FaTrash } from "react-icons/fa";
import { QueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { UserAuth } from "../../contexts/UserContext";
import { deleteBill } from "../../services/billServices";
import { BillType } from "../../types/billTypes";
import Category from "../Category";

export default function BillHeader({
  billId,
  billInfos,
  queryClient,
}: {
  billId: number;
  billInfos: BillType;
  queryClient: QueryClient;
}) {
  const navigate = useNavigate();
  const { userData } = UserAuth();

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

  const confirmDeleteBills = async (param: number) => {
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

  const getFriendsListName = () => {
    let friendsStr = "";

    if (billInfos.userBill.length > 4) {
      return `${billInfos.userBill[0].users.name}, ${
        billInfos.userBill[1].users.name
      } e mais ${billInfos.userBill.length - 2}`;
    }

    billInfos.userBill.forEach((user, index) => {
      if (index === billInfos.userBill.length - 1) {
        friendsStr += `${user.users.name}`;
      } else {
        friendsStr += `${user.users.name}, `;
      }
    });

    return friendsStr;
  };

  return (
    <TopBox>
      <TitleWrap>
        <Category name={billInfos.category.name} />
        <TextWrap>
          <BillTitle>{billInfos.name}</BillTitle>
          <BillSubtitle>{getFriendsListName()}</BillSubtitle>
        </TextWrap>
      </TitleWrap>
      {billInfos.ownerId === userData().user.id ? (
        <FaTrash
          size={24}
          style={{ color: "#ffffff" }}
          onClick={() => {
            confirmDeleteBills(billId);
          }}
        />
      ) : (
        <></>
      )}
    </TopBox>
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
