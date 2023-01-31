import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Container from "../common/ContainerWrap";
import { getBillsCategories } from "../services/billServices";

export default function NewBill() {
  const { data, isLoading } = useQuery("categories", getBillsCategories, {
    retry: false,
  });

  const [billData, setBillData] = useState({
    name: "",
    value: 0,
    ownerId: 0,
    categoryId: 0,
    billStatus: "",
    expireDate: "",
    usersBill: [
      {
        userId: 0,
        value: 0,
      },
    ],
  });
  console.log(billData);

  return (
    <Container>
      <Wrapper>
        <Title>Crie uma conta</Title>
        <FormBill>
          <SubTitle>Categoria</SubTitle>
          <SelectCategory
            defaultValue="selected"
            name="Categoria"
          >
            <option
              value="selected"
              disabled
              hidden
            >
              Escolha uma categoria
            </option>
            {data?.map((categoria) => (
              <option key={categoria.id}>{categoria.name}</option>
            ))}
          </SelectCategory>
          <SubTitle>Status do pagamento</SubTitle>
          <StatusWrap>
            <RadioInput
              type="radio"
              name="billStatus"
              value="PENDING"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBillData({ ...billData, billStatus: e.target.value });
              }}
            />
            <RadioInput
              type="radio"
              name="billStatus"
              value="PAID"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBillData({ ...billData, billStatus: e.target.value });
              }}
            />
          </StatusWrap>
          <SubTitle>Nome do pagamento</SubTitle>
          <Input
            type="text"
            placeholder="Conta de internet, água..."
          />
          <SubTitle>Valor do pagamento em R$</SubTitle>
          <Input
            type="number"
            placeholder="120,99"
          />
          <SubTitle>Data de vencimento</SubTitle>
          <Input
            type="date"
            placeholder="Data de vencimento"
          />
        </FormBill>
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
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  color: #717171;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const FormBill = styled.form``;

const SelectCategory = styled.select`
  border: 1px solid #828282;
  background-color: #ffffff;
  width: 100%;
  height: 55px;
  border-radius: 5px;
  padding: 16px;
  color: #828282;
  font-size: 18px;
  margin-bottom: 10px;
`;

const StatusWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;

  input:nth-child(1) {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #828282;
  outline: none;
  color: #2a2a2a;
  font-size: 18px;
  border-radius: 10px;

  & + & {
    margin-top: 14px;
  }
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  & + & {
    margin-top: 20px;
  }
`;
