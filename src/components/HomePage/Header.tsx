/* eslint-disable react/jsx-no-useless-fragment */
import { AxiosError } from "axios";
import { GoBell } from "react-icons/go";
import { useQuery } from "react-query";
import styled from "styled-components";
import { UserAuth } from "../../contexts/UserContext";
import formattedValue from "../../helpers/formatValue";
import { getInfoResume } from "../../services/billServices";

export default function Header() {
  const resumeBillData = useQuery("resumeBill", getInfoResume, {
    retry: false,
    onError: (err: AxiosError) => err,
  });
  const { userData } = UserAuth();

  if (!resumeBillData.data) return <></>;

  return (
    <TopBox>
      <TopWrapBox>
        <WelcomeText>Bem vindo(a), {userData().user.name}</WelcomeText>
        <GoBell
          size={25}
          style={{ color: "#ffffff" }}
        />
      </TopWrapBox>
      <ResumeTitle>Resumo:</ResumeTitle>
      <InfoBox>
        <TopInfo>
          <h3>Gasto total: {formattedValue(resumeBillData.data.totalPaid)}</h3>
        </TopInfo>
        <BottomInfo>
          <h4>Contas pagas: {resumeBillData.data.paidBills}</h4>
          <h4>Contas pendentes: {resumeBillData.data.pendingBills}</h4>
        </BottomInfo>
      </InfoBox>
    </TopBox>
  );
}

const TopBox = styled.div`
  background-color: #0369c9;
  height: 300px;
  width: 100%;
`;

const TopWrapBox = styled.div`
  width: 90%;
  margin-inline: auto;
  padding-block: 20px;
  display: flex;
  justify-content: space-between;
`;

const WelcomeText = styled.h4`
  font-family: "Inter";
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  width: 150px;
`;

const ResumeTitle = styled.h2`
  width: 90%;
  margin-inline: auto;
  margin-top: 35px;
  margin-bottom: 10px;

  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 120px;
  margin-inline: auto;
  align-items: center;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  color: #2a2a2a;
`;

const TopInfo = styled.div`
  h3 {
    font-weight: 600;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #828282;
    padding-inline: 40px;
    font-size: 20px;
  }
`;

const BottomInfo = styled.div`
  display: flex;
  margin-top: 15px;

  h4 {
    font-size: 15px;
    font-weight: 500;
    max-width: 180px;
  }

  h4:first-child {
    padding-right: 15px;
  }

  h4 + h4 {
    padding-left: 15px;
    border-left: 1px solid #828282;
  }
`;
