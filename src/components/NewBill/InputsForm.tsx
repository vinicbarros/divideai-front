import dayjs from "dayjs";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";
import { BillData, CategoryType } from "../../types/billTypes";

export default function InputsForm({
  billData,
  categories,
  setBillData,
}: {
  billData: BillData;
  categories: CategoryType[];
  setBillData: React.Dispatch<React.SetStateAction<BillData>>;
}) {
  const validateValue = (value: string | undefined): void => {
    const rawValue = value === undefined ? "undefined" : value;

    if (value) {
      const changeVal = rawValue.replace(",", ".");
      setBillData({ ...billData, value: Number(changeVal) * 100 });
    }
  };

  return (
    <>
      <SubTitle>Categoria</SubTitle>
      <SelectCategory
        defaultValue="selected"
        name="Categoria"
        required
        onChange={(event) => {
          setBillData({
            ...billData,
            categoryId: Number(event.target.value),
          });
        }}
      >
        <option
          value="selected"
          disabled
          hidden
        >
          Escolha uma categoria
        </option>
        {categories.map((categoria) => (
          <option
            key={categoria.id}
            value={categoria.id}
          >
            {categoria.name}
          </option>
        ))}
      </SelectCategory>
      <SubTitle>Status da conta</SubTitle>
      <StatusWrap>
        <RadioBox>
          <RadioInput
            type="radio"
            name="billStatus"
            value="PENDING"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBillData({ ...billData, billStatus: e.target.value });
            }}
          />
          <h5>PENDENTE</h5>
        </RadioBox>
        <RadioBox>
          <RadioInput
            type="radio"
            name="billStatus"
            value="PAID"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBillData({ ...billData, billStatus: e.target.value });
            }}
          />
          <h4>PAGA</h4>
        </RadioBox>
      </StatusWrap>
      <SubTitle>Nome da conta</SubTitle>
      <Input
        type="text"
        placeholder="Conta de internet, água..."
        name="name"
        autoComplete="off"
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setBillData({ ...billData, name: e.target.value });
        }}
      />
      <SubTitle>Valor da conta em R$</SubTitle>
      <CurrencyInput
        allowDecimals
        prefix="R$ "
        decimalSeparator=","
        groupSeparator="."
        className="main-payment"
        placeholder="R$ 129,99"
        required
        onValueChange={validateValue}
      />
      <SubTitle>Chave pix</SubTitle>
      <Input
        type="text"
        placeholder="Para as pessoas pagarem a conta"
        name="pixKey"
        autoComplete="off"
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setBillData({ ...billData, pixKey: e.target.value });
        }}
      />
      <SubTitle>Data de vencimento</SubTitle>
      <Input
        type="date"
        placeholder="Data de vencimento"
        name="expireDate"
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setBillData({
            ...billData,
            expireDate: dayjs(e.target.value).toDate(),
          });
        }}
      />
    </>
  );
}

const SubTitle = styled.h2`
  color: #575757;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const SelectCategory = styled.select`
  border: 1px solid #828282;
  background-color: #ffffff;
  width: 100%;
  height: 55px;
  border-radius: 5px;
  padding: 16px;
  color: #585858;
  font-size: 18px;
  margin-bottom: 10px;
`;

const StatusWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  justify-content: left;
  width: 50%;

  h4 {
    margin-left: 10px;
    color: #43a048;
  }

  h5 {
    color: #f44336;
    margin-inline: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #828282;
  outline: none;
  color: #2a2a2a;
  font-family: "Inter";
  font-size: 18px;
  border-radius: 10px;

  & + & {
    margin-top: 14px;
  }

  &::placeholder {
    color: #828282;
  }
`;

const RadioBox = styled.div`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
`;
