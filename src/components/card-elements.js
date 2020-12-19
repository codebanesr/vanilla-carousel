import styled, { css } from "styled-components";

export const CardImage = styled.div`
  width: 100%;
  background-color: #eceff5;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.img});
  ${(props) =>
    props.type === "vertical" &&
    css`
      height: 200px;
    `};
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  height:200px;
  max-height: 200px;
`;


export const CardTitle = styled.span`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 19px;
  margin-bottom: 12px;
  font-family: "Fenix";
`;

export const CardDescription = styled.span`
  color: #aaa;
  font-family: "Fenix";
  font-size: 12px;
  letter-spacing: 0;
  line-height: 18px;
`;


export const CardContainer = styled.div`
  width: 93%;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 12px 10px 0 rgba(23, 43, 77, 0.1);
  overflow: hidden;
  margin-bottom: 50px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  border: 0;
  outline: 0;
  cursor: ${(props) => (props.link ? "pointer" : "unset")};
  &:hover {
    box-shadow: 0px 15px 25px -5px rgba(0, 0, 0, 0.3);
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
  }
  &:active {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  padding-top: 40px;
  margin-top: 40px;
`;
