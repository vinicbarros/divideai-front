/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable indent */
import styled from "styled-components";
import { TbPlane, TbMeat } from "react-icons/tb";
import { BsHouseDoor, BsCalendar2Event } from "react-icons/bs";
import { BiDrink } from "react-icons/bi";
import { FaRegNewspaper, FaMoneyBillWave } from "react-icons/fa";
import { AiOutlineQuestion } from "react-icons/ai";

export default function Category({ name }: { name: string }) {
  const renderCategory = (param: string) => {
    switch (param) {
      case "Viagem":
        return (
          <CategoryBox bcolor="#eafff8">
            <TbPlane
              size={20}
              style={{ color: "#5cb396" }}
            />
          </CategoryBox>
        );
      case "Casa":
        return (
          <CategoryBox bcolor="#f0d2f8">
            <BsHouseDoor
              size={20}
              style={{ color: "#81538d" }}
            />
          </CategoryBox>
        );
      case "Evento":
        return (
          <CategoryBox bcolor="#eaebfe">
            <BsCalendar2Event
              size={20}
              style={{ color: "#4d64ea" }}
            />
          </CategoryBox>
        );
      case "Projeto":
        return (
          <CategoryBox bcolor="#fff8be">
            <FaRegNewspaper
              size={20}
              style={{ color: "#e0cf32" }}
            />
          </CategoryBox>
        );
      case "Investimento":
        return (
          <CategoryBox bcolor="#e9f5e9">
            <FaMoneyBillWave
              size={20}
              style={{ color: "#59a756" }}
            />
          </CategoryBox>
        );
      case "Churrasco":
        return (
          <CategoryBox bcolor="#fef7c5">
            <TbMeat
              size={20}
              style={{ color: "#f3893c" }}
            />
          </CategoryBox>
        );
      case "Rolê":
        return (
          <CategoryBox bcolor="#fad1d1">
            <BiDrink
              size={20}
              style={{ color: "#9e3636" }}
            />
          </CategoryBox>
        );
      case "Outro":
        return (
          <CategoryBox bcolor="#d4d8ff">
            <AiOutlineQuestion
              size={20}
              style={{ color: " #444ead" }}
            />
          </CategoryBox>
        );

      default:
        <></>;
    }
  };

  return <div>{renderCategory(name)}</div>;
}

const CategoryBox = styled.div<CategoryType>`
  background-color: ${(props) => props.bcolor};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

type CategoryType = {
  bcolor: string;
};
