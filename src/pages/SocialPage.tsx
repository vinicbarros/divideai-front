/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";

import { useState } from "react";
import Navbar from "../components/Navbar";
import PrivateContainer from "../components/PrivateContainer";
import { SearchBar } from "../components/SearchBar";
import { getFriendsList } from "../services/socialService";
import FriendListSection from "../components/FriendListSection";
import RequestsSection from "../components/RequestsSection";

export default function SocialPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("friendList", getFriendsList, {
    retry: false,
  });
  const [socialSection, setSocialSection] = useState(true);

  if (!data) return <></>;

  return (
    <>
      <PrivateContainer>
        <Wrapper>
          <Title>Social</Title>
          <Subtitle>
            Procure, adicione, e gerencie sua lista de amigos!
          </Subtitle>
          <ListWrapper>
            <SearchBar friendList={data} />
            {socialSection ? (
              <FriendListSection
                data={data}
                queryClient={queryClient}
                setSocialSection={setSocialSection}
              />
            ) : (
              <RequestsSection
                queryClient={queryClient}
                setSocialSection={setSocialSection}
              />
            )}
          </ListWrapper>
        </Wrapper>
      </PrivateContainer>
      <Navbar />
    </>
  );
}

const Wrapper = styled.section`
  width: 90%;
  height: 100px;
  margin-inline: auto;
  padding-block: 20px;
`;

const Title = styled.h1`
  color: #373737;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.h5`
  color: #bdbdbd;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  border-radius: 10px;
`;
