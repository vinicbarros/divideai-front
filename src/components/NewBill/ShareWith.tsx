/* eslint-disable indent */
/* eslint-disable react/jsx-no-useless-fragment */
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";
import { UserAuth } from "../../contexts/UserContext";
import formattedValue from "../../helpers/formatValue";
import { BillData, UsersBill } from "../../types/billTypes";

export default function ShareWith({
  usersBill,
  billData,
  setUsersBill,
}: {
  usersBill: UsersBill[];
  billData: BillData;
  setUsersBill: React.Dispatch<React.SetStateAction<UsersBill[]>>;
}) {
  const { userData } = UserAuth();
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

  return (
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
  );
}

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
