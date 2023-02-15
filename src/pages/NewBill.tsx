/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
import dayjs from "dayjs";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import Container from "../common/ContainerWrap";
import { FriendSearchBar } from "../components/FriendSearchBar";
import BillForm from "../components/NewBill/BillForm";
import ButtonBottom from "../components/NewBill/ButtonBottom";
import InputsForm from "../components/NewBill/InputsForm";
import ShareWith from "../components/NewBill/ShareWith";
import { UserAuth } from "../contexts/UserContext";
import formattedValue from "../helpers/formatValue";
import { getBillsCategories, postNewBill } from "../services/billServices";
import Button from "../style/Button";
import { BillData, ICreateBill, UsersBill } from "../types/billTypes";

export default function NewBill() {
  const categories = useQuery("categories", getBillsCategories, {
    retry: false,
  }).data;

  const { userData } = UserAuth();

  const [billData, setBillData] = useState<BillData>({} as BillData);
  const [usersBill, setUsersBill] = useState<UsersBill[]>([
    {
      name: userData().user.name,
      userId: userData().user.id,
      value: 0,
    },
  ] as UsersBill[]);

  if (!categories) return <></>;

  return (
    <Container>
      <Wrapper>
        <Title>Crie uma conta</Title>
        <UnderTitle>Pagar fica mais fácil dividindo com amigos!</UnderTitle>
        <BillForm
          billData={billData}
          usersBill={usersBill}
        >
          <InputsForm
            billData={billData}
            setBillData={setBillData}
            categories={categories}
          />
          <SubTitle>Dividir com </SubTitle>
          <FriendSearchBar
            usersBill={usersBill}
            setUsersBill={setUsersBill}
          />
          <SubTitle>Valores</SubTitle>
          <ShareWith
            billData={billData}
            usersBill={usersBill}
            setUsersBill={setUsersBill}
          />
          <ButtonBottom />
        </BillForm>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  padding-block: 20px;
`;

const Title = styled.h1`
  color: #373737;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  color: #575757;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const UnderTitle = styled.h5`
  color: #bdbdbd;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 15px;
`;
