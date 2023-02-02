/* eslint-disable no-underscore-dangle */
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import formattedValue from "../helpers/formatValue";
import { IShortBillMapped } from "../types/billTypes";

export default function ShortBillComponent({
  shortBill,
}: {
  shortBill: IShortBillMapped;
}) {
  const navigate = useNavigate();
  return (
    <ShortBillWrapper
      onClick={() => {
        navigate(`/bill/${shortBill.id}`);
      }}
    >
      <WrapInfoBox>
        <BillTitle>{shortBill.name}</BillTitle>
        <DividedBy>
          Dividido por {shortBill._count.userBill}{" "}
          {shortBill._count.userBill < 2 ? "Pessoa" : "Pessoas"}
        </DividedBy>
      </WrapInfoBox>
      <WrapInfoBox>
        <BillValue>{formattedValue(shortBill.value)}</BillValue>
        <BillDate>{dayjs(shortBill.createdAt).format("DD/MM/YYYY")}</BillDate>
      </WrapInfoBox>
    </ShortBillWrapper>
  );
}

const ShortBillWrapper = styled.main`
  background-color: #ffffff;
  height: 80px;
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

const WrapInfoBox = styled.div`
  justify-content: space-between;
`;

const BillTitle = styled.h2`
  color: #4b4848;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 5px;
`;

const DividedBy = styled.p`
  color: #838383;
  font-weight: 400;
  font-size: 10px;
`;

const BillValue = styled.h3`
  text-align: right;
  color: #fb8a00;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const BillDate = styled.h4`
  color: #838383;
  font-size: 14px;
  text-align: right;
`;
