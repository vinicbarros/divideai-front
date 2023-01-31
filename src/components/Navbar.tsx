import styled from "styled-components";
import { RiHomeLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { HiOutlineUsers, HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <RiHomeLine
          size={30}
          style={{ color: "#828282" }}
        />
        <MdOutlinePayments
          size={30}
          style={{ color: "#828282" }}
        />
        <Plus
          onClick={() => {
            navigate("/new-bill");
          }}
        >
          +
        </Plus>
        <HiOutlineUsers
          size={30}
          style={{ color: "#828282" }}
        />
        <HiOutlineUser
          size={30}
          style={{ color: "#828282" }}
        />
      </Wrapper>
    </Container>
  );
}

const Container = styled.footer`
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Plus = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #406bfb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: #ffffff;
`;
