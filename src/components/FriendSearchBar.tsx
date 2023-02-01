/* eslint-disable consistent-return */
import styled from "styled-components";
import { BsSearch, BsPersonCircle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { searchFriendList } from "../services/searchService";
import { SearchType } from "../types/searchTypes";
import { UsersBill } from "../types/billTypes";

export function FriendSearchBar({
  usersBill,
  setUsersBill,
}: {
  usersBill: UsersBill[];
  setUsersBill: React.Dispatch<React.SetStateAction<UsersBill[]>>;
}) {
  const [wordEntered, setWordEntered] = useState("");
  const [search, setSearch] = useState<SearchType[]>([] as SearchType[]);

  const getDataSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    if (searchWord.length < 3) return setSearch([]);
    try {
      const resultSearch = await searchFriendList(searchWord);
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

  const shareWith = (id: number, name: string) => {
    setUsersBill([...usersBill, { userId: id, value: 0, name }]);
  };

  return (
    <ContainerSearch>
      <SearchInputs length={search.length}>
        <DebounceInput
          type="text"
          placeholder="Ex: example@example.com"
          minLength={5}
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
                shareWith(user.id, user.name);
                close();
              }}
            >
              <BsPersonCircle
                size={25}
                style={{ color: "#828282" }}
              />
              <p>{user.name}</p>
            </PersonWrap>
          ))}
        </DataResult>
      )}
    </ContainerSearch>
  );
}

const ContainerSearch = styled.div`
  font-family: "Poppins";
  position: relative;
  margin-top: 10px;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

interface ISearchInput {
  length: number;
}

const SearchInputs = styled.div<ISearchInput>`
  border-radius: ${(props) =>
    props.length === 0 ? "10px" : "10px 10px 0px 0px"};
  border: 1px solid #828282;
  height: 57px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
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
`;
