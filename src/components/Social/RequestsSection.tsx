/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
import { QueryClient, useMutation, useQuery } from "react-query";
import { BsPersonCircle } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AiOutlineCheck } from "react-icons/ai";
import styled from "styled-components";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { GrLinkNext } from "react-icons/gr";
import {
  ContainerPerson,
  HeaderTitle,
  HeaderWrapper,
  IconBox,
  InfoBox,
  NextBox,
  NotFoundImage,
  NotFoundTitle,
  PersonWrap,
} from "./FriendListSection";
import {
  acceptRejectFriend,
  getFriendRequest,
} from "../../services/socialService";
import SocialImage from "../../assets/images/social.svg";

export default function RequestsSection({
  queryClient,
  setSocialSection,
}: {
  queryClient: QueryClient;
  setSocialSection: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, isLoading } = useQuery("friendRequest", getFriendRequest);
  const [load, setLoad] = useState(false);

  const answerRequestMutation = useMutation(
    async ({
      friendRequestId,
      requestStatus,
    }: {
      friendRequestId: number;
      requestStatus: string;
    }) => {
      return acceptRejectFriend({ friendRequestId, requestStatus });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("friendList");
        queryClient.refetchQueries("friendRequest");
      },
    }
  );

  const acceptOrRefuseRequest = async ({
    friendRequestId,
    requestStatus,
  }: {
    friendRequestId: number;
    requestStatus: string;
  }) => {
    setLoad(true);
    try {
      await answerRequestMutation.mutateAsync({
        friendRequestId,
        requestStatus,
      });
      setLoad(false);
    } catch (error) {
      toast.error("Tente novamente!");
      setLoad(false);
    }
  };

  if (!data) return <></>;

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>Solicitações</HeaderTitle>
        <NextBox
          onClick={() => {
            setSocialSection(true);
          }}
        >
          <h5>Amigos</h5>
          <GrLinkNext />
        </NextBox>
      </HeaderWrapper>
      <ContainerPerson>
        {data.length === 0 ? (
          <>
            <NotFoundImage
              src={SocialImage}
              alt="image"
            />
            <NotFoundTitle>
              Sua lista de amigos está vazia, adicione amigos!
            </NotFoundTitle>
          </>
        ) : (
          data.map((user) => (
            <PersonWrap key={user.id}>
              <IconBox>
                <BsPersonCircle
                  size={45}
                  style={{ color: "#828282" }}
                />
                <InfoBox>
                  <h5>{user.name}</h5>
                  <p>{user.email}</p>
                </InfoBox>
              </IconBox>
              <BoxIcon>
                {load ? (
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#828282"
                    ariaLabel="three-dots-loading"
                    visible
                  />
                ) : (
                  <>
                    <TfiClose
                      size={25}
                      style={{ color: "#828282" }}
                      onClick={() => {
                        acceptOrRefuseRequest({
                          friendRequestId: user.friendRequestId,
                          requestStatus: "REJECTED",
                        });
                      }}
                    />
                    <AiOutlineCheck
                      size={25}
                      style={{ color: "#828282" }}
                      onClick={() => {
                        acceptOrRefuseRequest({
                          friendRequestId: user.friendRequestId,
                          requestStatus: "ACCEPTED",
                        });
                      }}
                    />
                  </>
                )}
              </BoxIcon>
            </PersonWrap>
          ))
        )}
      </ContainerPerson>
    </>
  );
}

const BoxIcon = styled(IconBox)`
  width: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
