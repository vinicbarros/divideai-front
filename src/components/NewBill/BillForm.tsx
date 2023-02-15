/* eslint-disable consistent-return */
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import { postNewBill } from "../../services/billServices";
import { BillData, UsersBill } from "../../types/billTypes";

export default function BillForm({
  children,
  billData,
  usersBill,
}: {
  children: React.ReactElement[];
  billData: BillData;
  usersBill: UsersBill[];
}) {
  const navigate = useNavigate();

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

  return <FormBill onSubmit={submitForm}>{children}</FormBill>;
}

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
