/* eslint-disable indent */
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
import { UserAuth } from "../contexts/UserContext";
import formattedValue from "../helpers/formatValue";
import { getBillsCategories, postNewBill } from "../services/billServices";
import Button from "../style/Button";
import { ICreateBill, UsersBill } from "../types/billTypes";

export default function NewBill() {
  const { data } = useQuery("categories", getBillsCategories, {
    retry: false,
  });

  const { userData } = UserAuth();
  const navigate = useNavigate();

  type BillData = Omit<ICreateBill, "usersBill">;
  const [billData, setBillData] = useState<BillData>({} as BillData);
  const [usersBill, setUsersBill] = useState<UsersBill[]>([
    {
      name: userData().user.name,
      userId: userData().user.id,
      value: 0,
    },
  ] as UsersBill[]);

  const suggestion = billData.value / usersBill.length;

  const updateValueChanged =
    (index: number) =>
    (value: string | undefined): void => {
      const newArr = [...usersBill];
      const rawValue = value === undefined ? "undefined" : value;

      if (value) {
        const changeVal = rawValue.replace(",", ".");
        newArr[index].value = Number(changeVal) * 100;
      }
      setUsersBill(newArr);
    };

  const validateValue = (value: string | undefined): void => {
    const rawValue = value === undefined ? "undefined" : value;

    if (value) {
      const changeVal = rawValue.replace(",", ".");
      setBillData({ ...billData, value: Number(changeVal) * 100 });
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { ...billData, usersBill };

    let sum = 0;
    body.usersBill.forEach((each) => {
      sum += each.value;
    });

    if (sum !== body.value) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Os valores passados não correspondem com o total da conta!",
      });
    }
    try {
      await postNewBill(body);
      toast.success("Conta criada com sucesso!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Crie uma conta</Title>
        <UnderTitle>Pagar fica mais fácil dividindo com amigos!</UnderTitle>
        <FormBill onSubmit={submitForm}>
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
            {data?.map((categoria) => (
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
          <SubTitle>Dividir com </SubTitle>
          <FriendSearchBar
            usersBill={usersBill}
            setUsersBill={setUsersBill}
          />
          <SubTitle>Valores</SubTitle>
          <PeopleBox>
            {usersBill.map((user, index) => (
              <PeopleWrapper key={user.userId}>
                <h4>
                  {user.name}
                  {user.name === userData().user.name ? "(Eu)" : <></>}
                </h4>
                <CurrencyInput
                  allowDecimals
                  prefix="R$ "
                  decimalSeparator=","
                  groupSeparator="."
                  className="user-payment"
                  placeholder={
                    Number.isNaN(suggestion)
                      ? "Insira um valor"
                      : `Ex: ${formattedValue(suggestion)}`
                  }
                  required
                  onValueChange={updateValueChanged(index)}
                />
              </PeopleWrapper>
            ))}
          </PeopleBox>
          <ButtonWrap>
            <Button
              cor="#F44336"
              fcor="#ffffff"
              border="none"
              type="submit"
              width="150px"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancelar
            </Button>
            <Button
              cor="#0369C9"
              fcor="#ffffff"
              border="none"
              type="submit"
              width="150px"
            >
              Salvar
            </Button>
          </ButtonWrap>
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
  margin-bottom: 10px;
`;

const UnderTitle = styled.h5`
  color: #bdbdbd;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const SubTitle = styled.h2`
  color: #575757;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const FormBill = styled.form`
  .main-payment {
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
  }

  .user-payment {
    font-family: "Inter";
    width: 120px;
    height: 30px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: #ffffff;
    border: none;
    padding-inline: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }

  .user-payment::placeholder {
    color: #242424;
    font-weight: 500;
  }
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

const PeopleBox = styled.section`
  margin-bottom: 10px;
`;

const PeopleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e7e7e7;
  height: 60px;
  border-radius: 5px;

  & + & {
    margin-top: 12px;
  }

  h4 {
    margin-left: 10px;
    color: #373737;
    font-weight: bold;
  }

  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
