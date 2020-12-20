import {CardFooter, CardImage, CardTitle, CardDescription, CardContent, CardContainer } from "./card-elements";
import React from "react";

const Card = ({ card }) => (
  <CardContainer {...card} onClick={() => window.open(card.link, "_blank")}>
    {card.image && <CardImage type={card.type} img={card.image} />}
    <CardContent>
      <CardTitle>{card.title}</CardTitle>
      <CardDescription>{card.description}</CardDescription>
      <CardFooter>
        ${card.price} | {card.category}
      </CardFooter>
    </CardContent>
  </CardContainer>
);


export default Card;