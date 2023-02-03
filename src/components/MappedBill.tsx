import styled from "styled-components";
import { ShortBill } from "../types/billTypes";
import ShortBillComponent from "./ShortBill";
import notFoundImage from "../assets/images/not_found.svg";
import { UserAuth } from "../contexts/UserContext";

export default function MappedBill({ data }: { data: ShortBill[] }) {
  return (
    <Wrapper>
      {data.length > 0 ? (
        data.map((bill) => (
          <ShortBillComponent
            key={bill.bill.id}
            shortBill={bill.bill}
          />
        ))
      ) : (
        <NotFoundBox>
          <h5>Você ainda não tem nenhuma conta, crie uma!</h5>
          <ImageBox
            src={notFoundImage}
            alt="not found"
          />
        </NotFoundBox>
      )}
    </Wrapper>
  );
}

export const Wrapper = styled.section`
  width: 90%;
  margin-top: 10px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  border-radius: 10px;
`;

const NotFoundBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 420px;

  h5 {
    margin-block: 50px;
    text-align: center;
    width: 200px;
    color: #fdd835;
    font-family: "Poppins";
  }
`;

const ImageBox = styled.img`
  width: 250px;
`;
