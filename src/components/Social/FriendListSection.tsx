/* eslint-disable consistent-return */
import { QueryClient, useMutation } from "react-query";
import { BsPersonCircle } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { GrLinkNext } from "react-icons/gr";
import styled from "styled-components";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SocialImage from "../../assets/images/social.svg";
import { FriendList } from "../../types/socialType";
import { deleteFriendRequest } from "../../services/socialService";

export default function FriendListSection({
  queryClient,
  data,
  setSocialSection,
}: {
  queryClient: QueryClient;
  data: FriendList[];
  setSocialSection: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const deleteFriendMutation = useMutation(
    async (friendRequestId: number) => {
      return deleteFriendRequest(friendRequestId);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("friendList");
      },
    }
  );

  const deleteFriend = async (friendRequestId: number) => {
    try {
      Swal.fire({
        title: "",
        text: "Você quer remover essa pessoa da sua lista de amigos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleted = await deleteFriendMutation.mutateAsync(
            friendRequestId
          );
          console.log(deleted);
          Swal.fire(
            "Pronto!",
            "Esta pessoa foi removida da sua lista de amigos.",
            "success"
          );
        }
      });
    } catch (error) {
      toast.error("Tente novamente!");
    }
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>Lista de amigos</HeaderTitle>
        <NextBox
          onClick={() => {
            setSocialSection(false);
          }}
        >
          <h5>Solicitações</h5>
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
              <TfiClose
                size={25}
                style={{ color: "#828282" }}
                onClick={() => {
                  deleteFriend(user.friendRequestId);
                }}
              />
            </PersonWrap>
          ))
        )}
      </ContainerPerson>
    </>
  );
}

export const ContainerPerson = styled.section`
  width: 90%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const PersonWrap = styled.div`
  width: 100%;
  height: 65px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 10px;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  height: 36px;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;

  p {
    color: #4d4d4d;
    font-size: 12px;
  }

  h5 {
    color: #373737;
    font-size: 19px;
  }
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderWrapper = styled.div`
  width: 90%;
  margin-inline: auto;
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(230, 230, 230, 0.66);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const HeaderTitle = styled.h4`
  color: #373737;
  font-size: 18px;
`;

export const NotFoundTitle = styled.h4`
  width: 200px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 100px;
`;

export const NotFoundImage = styled.img`
  width: 280px;
  margin-top: 40px;
`;

export const NextBox = styled.div`
  display: flex;
  align-items: center;

  h5 {
    margin-right: 5px;
    color: #373737;
    font-size: 14px;
  }
`;
