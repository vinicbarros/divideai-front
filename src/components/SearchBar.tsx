/* eslint-disable consistent-return */
import styled from "styled-components";
import { BsSearch, BsPersonCircle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { searchNewFriends } from "../services/searchService";
import { SearchType } from "../types/searchTypes";
import { FriendList } from "../types/socialType";
import { sendFriendRequest } from "../services/socialService";

export function SearchBar({ friendList }: { friendList: FriendList[] }) {
  const [wordEntered, setWordEntered] = useState("");
  const [search, setSearch] = useState<SearchType[]>([] as SearchType[]);
  const friendRequestMutation = useMutation((friendId: number) =>
    sendFriendRequest(friendId)
  );

  const sendRequest = async (friendId: number) => {
    try {
      await friendRequestMutation.mutateAsync(friendId);
      close();
      toast.success("Pedido de amizade enviado!");
    } catch (error: any) {
      if (error.code === "ERR_BAD_REQUEST") {
        return toast.error(
          "Você já enviou um pedido de amizade para esta pessoa."
        );
      }
      toast.error("Tente novamente!");
    }
  };

  const getDataSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    if (searchWord.length < 3) return setSearch([]);
    try {
      const resultSearch = await searchNewFriends(searchWord);
      setSearch(resultSearch);
    } catch (error) {
      console.log(error);
      setSearch([]);
    }
  };

  const close = () => {
    setWordEntered("");
    setSearch([]);
  };

  const isFriend = (user: SearchType) => {
    let amigo = "não";
    friendList.forEach((friend) => {
      if (friend.email === user.email) {
        amigo = "sim";
      } else {
        return amigo;
      }
    });
    return amigo;
  };

  return (
    <ContainerSearch>
      <SearchInputs length={search.length}>
        <DebounceInput
          type="text"
          placeholder="Ex: example@example.com"
          minLength={3}
          value={wordEntered}
          debounceTimeout={350}
          onChange={getDataSearch}
        />
        <SearchIcon>
          {wordEntered.length === 0 ? (
            <BsSearch color="#C6C6C6" />
          ) : (
            <GrClose
              color="#C6C6C6"
              onClick={close}
            />
          )}
        </SearchIcon>
      </SearchInputs>
      {search.length !== 0 && (
        <DataResult>
          {search.map((user) => (
            <PersonWrap
              key={user.id}
              onClick={() => {
                close();
              }}
            >
              <NameWrap>
                <BsPersonCircle
                  size={25}
                  style={{ color: "#828282" }}
                />
                <p>{user.name}</p>
              </NameWrap>
              {isFriend(user) === "sim" ? (
                <h4>amigo</h4>
              ) : (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
                <h5
                  onClick={() => {
                    sendRequest(user.id);
                  }}
                >
                  adicionar
                </h5>
              )}
            </PersonWrap>
          ))}
        </DataResult>
      )}
    </ContainerSearch>
  );
}

const ContainerSearch = styled.div`
  font-family: "Poppins";
  width: 90%;
  margin-inline: auto;
  position: relative;
  margin-top: 20px;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

interface ISearchInput {
  length: number;
}

const SearchInputs = styled.div<ISearchInput>`
  border-radius: ${(props) =>
    props.length === 0 ? "40px" : "10px 10px 0px 0px"};
  height: 57px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    background-color: #f7f7f7;
    padding: 12px 0px 12px 16px;
    width: 513px;
    height: 17px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
  }
  input::placeholder {
    color: #c6c6c6;
    font-size: 16px;
  }
  input:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  width: 50px;
  height: 45px;
  display: grid;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const DataResult = styled.section`
  width: 100%;
  min-height: 72px;
  max-height: 130px;
  background-color: #e7e7e7;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  top: 43px;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
`;

const PersonWrap = styled.div`
  background-color: #ffffff;
  height: 50px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;
  & + & {
    margin-top: 10px;
  }

  p {
    margin-left: 10px;
    color: #828282;
    font-weight: bold;
  }

  h4 {
    color: #828282;
  }

  h5 {
    background-color: #e7e7e7;
    color: #373737;
    padding: 5px;
    border-radius: 3px;
  }
`;

const NameWrap = styled.div`
  display: flex;
  align-items: center;
`;
