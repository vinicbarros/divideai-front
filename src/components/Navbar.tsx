import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { RiHomeLine, RiHomeFill } from "react-icons/ri";
import { MdOutlinePayments, MdPayments } from "react-icons/md";
import { HiOutlineUsers, HiOutlineUser, HiUser, HiUsers } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  return (
    <Container>
      <Wrapper>
        {path === "/" ? (
          <RiHomeFill
            size={30}
            style={{ color: "#0369c9" }}
          />
        ) : (
          <RiHomeLine
            size={30}
            style={{ color: "#828282" }}
            onClick={() => {
              navigate("/");
            }}
          />
        )}
        {path === "/payments" ? (
          <MdPayments
            size={30}
            style={{ color: "#0369c9" }}
          />
        ) : (
          <MdOutlinePayments
            size={30}
            style={{ color: "#828282" }}
            onClick={() => {
              navigate("/payments");
            }}
          />
        )}
        <Plus
          onClick={() => {
            navigate("/new-bill");
          }}
        >
          +
        </Plus>
        {path === "/social" ? (
          <HiUsers
            size={30}
            style={{ color: "#0369c9" }}
          />
        ) : (
          <HiOutlineUsers
            size={30}
            style={{ color: "#828282" }}
            onClick={() => {
              navigate("/social");
            }}
          />
        )}
        {path === "/user" ? (
          <HiUser
            size={30}
            style={{ color: "#0369c9" }}
          />
        ) : (
          <HiOutlineUser
            size={30}
            style={{ color: "#828282" }}
            onClick={() => {
              navigate("/user");
            }}
          />
        )}
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
  background-color: #0369c9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: #ffffff;
`;
