import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import PrivateContainer from "../components/Other/PrivateContainer";
import { UserAuth } from "../contexts/UserContext";
import BuildImage from "../assets/images/building_image.svg";
import { ImageBox, NotFoundBox } from "../components/common/MappedBill";

export default function UserPage() {
  const { userData } = UserAuth();
  const navigate = useNavigate();

  return (
    <PrivateContainer>
      <Wrapper>
        <TitleBox>
          <Title>Olá, {userData().user.name}!</Title>
          <BiExit
            size={30}
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/landing-page");
            }}
          />
        </TitleBox>
        <NotFoundBox>
          <h5>Esta página ainda está em construção!</h5>
          <ImageBox
            src={BuildImage}
            alt="build"
          />
        </NotFoundBox>
      </Wrapper>
      <Navbar />
    </PrivateContainer>
  );
}

const Wrapper = styled.section`
  width: 90%;
  height: 100px;
  margin-inline: auto;
  padding-block: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #373737;
  font-size: 25px;
  font-weight: bold;
`;
