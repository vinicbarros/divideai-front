/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import styled from "styled-components";
import { BsCheckSquareFill, BsCheckSquare, BsWhatsapp } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { QueryClient, useMutation } from "react-query";
import Swal from "sweetalert2";
import { UserBillType } from "../types/userTypes";
import { postPaidBill } from "../services/billServices";
import { UserAuth } from "../contexts/UserContext";
import formattedValue from "../helpers/formatValue";

export default function UserBillComponent({
  userBill,
  billId,
  queryClient,
  billName,
  pixKey,
}: {
  userBill: UserBillType;
  billId: number;
  queryClient: QueryClient;
  billName: string;
  pixKey: string;
}) {
  const { userData } = UserAuth();
  const checkPaidMutation = useMutation(
    async () => {
      return postPaidBill(billId);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("bill");
      },
    }
  );

  const whatsappMessage = encodeURIComponent(`Olá, ${userBill.users.name}! 
  Parece que você ainda não pagou a conta ${billName} no valor de:
  ${formattedValue(userBill.value)}. 
  Por favor, pague o quanto antes!
  Chave PIX: ${pixKey}
  
  - Equipe Divide Aí.`);

  async function checkPaid() {
    try {
      Swal.fire({
        title: "Confirme o pagamento",
        text: "Vocẽ não vai poder reverter o pagamento!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await checkPaidMutation.mutateAsync();
          Swal.fire("Pago!", "Você pagou essa conta.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <StatusBox>
        <StatusTitle>{userBill.users.name}</StatusTitle>
        <StatusSubTitle status={userBill.paymentStatus}>
          {userBill.paymentStatus === "PAID"
            ? `Pagou ${formattedValue(userBill.value)}`
            : `Não pagou ${formattedValue(userBill.value)}`}
        </StatusSubTitle>
        {userBill.paymentStatus === "PAID" ? (
          ""
        ) : (
          <WhatsappLink
            href={`whatsapp://send?text=${whatsappMessage}`}
            data-action="share/whatsapp/share"
          >
            Compartilhar <BsWhatsapp />
          </WhatsappLink>
        )}
      </StatusBox>
      <StatusBox>
        {userBill.users.name === userData().user.name ? (
          userBill.paymentStatus === "PAID" ? (
            <BsCheckSquareFill
              size={30}
              style={{ color: "#43A048" }}
            />
          ) : (
            <IconBox
              onClick={() => {
                checkPaid();
              }}
            >
              <BsCheckSquare
                size={30}
                style={{ color: "#999999" }}
              />
            </IconBox>
          )
        ) : userBill.paymentStatus === "PAID" ? (
          <AiOutlineCheck
            size={30}
            style={{ color: "#43A048" }}
          />
        ) : (
          <AiOutlineCheck
            size={30}
            style={{ color: "#999999" }}
          />
        )}
      </StatusBox>
    </Container>
  );
}

const Container = styled.div`
  background-color: #ffffff;
  min-height: 90px;
  padding: 10px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: "Inter";
  letter-spacing: 0.01cm;

  border-radius: 10px;

  & + & {
    -webkit-box-shadow: -1px -21px 2px -19px rgba(230, 230, 230, 0.66);
    -moz-box-shadow: -1px -21px 2px -19px rgba(230, 230, 230, 0.66);
    box-shadow: -1px -21px 2px -19px rgba(230, 230, 230, 0.66);
  }
`;

const StatusBox = styled.div``;

const StatusTitle = styled.h5`
  color: #4b4848;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 5px;
`;

type StatusSubTitleType = {
  status: string;
};

const StatusSubTitle = styled.p<StatusSubTitleType>`
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 10px;
  color: ${(props) => (props.status === "PAID" ? "#43A048" : "#d33")};
`;

const IconBox = styled.div``;

const WhatsappLink = styled.a`
  font-size: 12px;
  color: #204121;
  display: flex;
  align-items: center;

  svg {
    margin-left: 4px;
  }
`;
