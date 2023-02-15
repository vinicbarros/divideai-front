import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../style/Button";

export default function ButtonBottom() {
  const navigate = useNavigate();

  return (
    <ButtonWrap>
      <Button
        cor="#F44336"
        fcor="#ffffff"
        border="none"
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
  );
}

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
