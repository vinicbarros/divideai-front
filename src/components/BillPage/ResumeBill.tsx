import dayjs from "dayjs";
import styled from "styled-components";
import formattedValue from "../../helpers/formatValue";
import { BillType } from "../../types/billTypes";

export default function ResumeBill({ billInfos }: { billInfos: BillType }) {
  return (
    <MiddleContainer>
      <MiddleWrap>
        <Title>Total:</Title>
        <Subtitle>{formattedValue(billInfos.value)}</Subtitle>
      </MiddleWrap>
      <MiddleWrap>
        <Title>Status:</Title>
        <BillSubStatus status={billInfos.billStatus}>
          {billInfos.billStatus === "PAID" ? "Pago" : "Pendente"}
        </BillSubStatus>
      </MiddleWrap>
      <MiddleWrap>
        <Title>Vence em:</Title>
        <Subtitle>{dayjs(billInfos.expireDate).format("DD/MM/YYYY")}</Subtitle>
      </MiddleWrap>
      <MiddleWrap>
        <Title>Chave PIX:</Title>
        <Copy>{billInfos.pixKey}</Copy>
      </MiddleWrap>
    </MiddleContainer>
  );
}

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
  width: 200px;
  font-size: 14px;
  color: #73c27a;
  text-decoration: underline;
`;
