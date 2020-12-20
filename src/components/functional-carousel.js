import React, { useEffect, useState } from "react";
import { cloneElement, Children } from "react";
import CardWrapper from "./card-wrapper";
import List from "./slider-list";
import Track from "./slider-track";
import Wrapper from "./slider-wrapper";
import LeftArrow from "./left-arrow";
import RightArrow from "./right-arrow";
import PropTypes from "prop-types";
import Dot from "./dot";
import DotsWrapper from "./dots-wrapper";

export default function Carousel(props) {

  const [initialCard, setInitialCard] = useState(0);
  const [childWidth, setChildWidth] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(0);
  const [hideArrows, setHideArrows] = useState(false);


  useEffect(()=>{
    updateResponsiveView();
  },[hideArrows]);

  useEffect(()=>{
    const {
      children,
      cardsToShow: cardsToShowProp,
      autoSlide,
      hideArrowsOnNoSlides,
    } = props;
    const numberOfChildren = children ? children.length || 1 : 0;
    const cardsToShow = cardsToShowProp || numberOfChildren;
    const childWidth = 100 / cardsToShow;

    setChildWidth(childWidth);
    setCardsToShow(cardsToShow);
    setHideArrows(hideArrowsOnNoSlides && numberOfChildren <= cardsToShow);

    typeof window !== "undefined" &&
      window.addEventListener("resize", updateResponsiveView);
  },[]);


  const updateResponsiveView = () => {
    const { children, hideArrowsOnNoSlides } = props;
    let { responsive } = props;
    const numberOfChildren = children ? children.length || 1 : 0;
    if (responsive) {
      responsive = responsive.map(obj => Object.assign({}, obj)).sort((key => (a, b) =>
        (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))('breakPoint')); // eslint-disable-line
      let updatedCardsToShow = cardsToShow;
      responsive.forEach(({ breakPoint, cardsToShow }) => {
        if (breakPoint <= window.innerWidth) {
          updatedCardsToShow = cardsToShow;
        }
      });
      const updatedInitialCard = (numberOfChildren - updatedCardsToShow) < initialCard ? (numberOfChildren - updatedCardsToShow) : initialCard;


      setCardsToShow(updatedCardsToShow);
      setChildWidth(100 / updatedCardsToShow);
      setInitialCard(updatedInitialCard);
      setHideArrows(hideArrowsOnNoSlides && numberOfChildren <= updatedCardsToShow)

    }
  }

  useEffect(()=>{
    const {afterSlide} = props;
    afterSlide && afterSlide();
  });

  const changeInitialCard = (initialCard) => {
    const {beforeSlide } = props;
    if (beforeSlide) {
      beforeSlide();
    }
    setInitialCard(initialCard);
  }

  const renderChildren = (children) => {
    const displayCards = [];
    Children.forEach(children, (child, index) => {
      displayCards.push((
        <CardWrapper key={index} width={childWidth} style={{transitionDuration:'1s', transform: index===initialCard+1? 'scale(1.11)': 'scale(1)'}}>
          {child}
        </CardWrapper>
      ));
    });
    return displayCards;
  }



  const handleLeftArrowClick = (evt) => {
    const { children } = props;
    const childrenCount = children ? children.length : 0;
    if (evt && evt.preventDefault) { evt.preventDefault(); }
    let nextInitialCard = initialCard - 1;
    if (nextInitialCard < 0) {
      nextInitialCard = childrenCount - cardsToShow;
    }
    changeInitialCard(nextInitialCard);
  }

  const handleRightArrowClick = (evt) => {
    const { children } = props;
    const childrenCount = children ? children.length : 0;
    if (evt && evt.preventDefault) { evt.preventDefault(); }
    let nextInitialCard = initialCard + 1;
    if (childrenCount - cardsToShow < nextInitialCard) {
      nextInitialCard = 0;
    }
    changeInitialCard(nextInitialCard);
  }


  const renderLeftArrow = () => {
    const { LeftArrow, infinite } = props;
    return cloneElement(LeftArrow, {
      onClick: handleLeftArrowClick,
      disabled: !infinite && !initialCard,
    });
  }

  const renderRightArrow = () => {
    const { RightArrow, children, infinite } = props;
    const numberOfChildren = children ? children.length || 1 : 0;
    return cloneElement(RightArrow, {
      onClick: handleRightArrowClick,
      disabled: !infinite && (initialCard + cardsToShow === numberOfChildren),
    });
  }


  const {
    children, 
    numberOfcardsToShow,
    showDots, 
    showArrows,
    pauseOnMouseOver, 
    DotsWrapper,
    ...otherProps
  } = props;

  return (
    <div>
      <Wrapper {...otherProps}>
        {showArrows && !hideArrows && renderLeftArrow()}
        <Track>
          <List translateX={initialCard * childWidth}>
            {renderChildren(children, numberOfcardsToShow || children.length)}
          </List>
        </Track>
        {showArrows && !hideArrows && renderRightArrow()}
      </Wrapper>
    </div>
  )
}


/** @Todo configure this */
Carousel.defaultProps = {
  showDots: true,
  showArrows: true,
  LeftArrow: <LeftArrow />,
  RightArrow: <RightArrow />,
  Dot: <Dot />,
  DotsWrapper: <DotsWrapper />,
  cardsToShow: null,
  afterSlide: null,
  beforeSlide: null,
  infinite: true,
  responsive: null,
  autoSlide: 2000,
  pauseOnMouseOver: true,
  padding: '0px 20px',
  margin: '0px',
  hideArrowsOnNoSlides: true,
};


Carousel.propTypes = {
  LeftArrow: PropTypes.node,
  RightArrow: PropTypes.node,
  Dot: PropTypes.node,
  showArrows: PropTypes.bool,
  showDots: PropTypes.bool,
  children: PropTypes.node.isRequired,
  cardsToShow: PropTypes.number,
  afterSlide: PropTypes.func,
  beforeSlide: PropTypes.func,
  infinite: PropTypes.bool,
  responsive: PropTypes.arrayOf(PropTypes.shape({
    breakPoint: PropTypes.number,
    cardsToShow: PropTypes.number,
  })),
  autoSlide: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  pauseOnMouseOver: PropTypes.bool,
  padding: PropTypes.string,
  margin: PropTypes.string,
  hideArrowsOnNoSlides: PropTypes.bool,
  DotsWrapper: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

