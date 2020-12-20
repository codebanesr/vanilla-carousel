import {CardFooter, CardImage, CardTitle, CardDescription, CardContent, CardContainer } from "./card-elements";

// const Card = styled.h1`
//   background: #00558B;
//   color: #fff;
//   line-height: 100px;
//   text-align: center;
//   font-size: 36px;
//   margin: 10px;
//   padding: 2%;
//   position: relative;
//   box-shadow: 0 1px 2px 0 #00111B;
// `;


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