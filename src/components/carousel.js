import { Component, cloneElement, Children } from "react";
import CardWrapper from "./card-wrapper";
import List from "./slider-list";
import Track from "./slider-track";
import Wrapper from './slider-wrapper';
import PropTypes from 'prop-types';
import LeftArrow from "./left-arrow";
import RightArrow from "./right-arrow";
import Dot from "./dot";
import DotsWrapper from "./dots-wrapper";
import React from "react";

class Carousel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      initialCard: 0,
      childWidth: 0,
      cardsToShow: 0,
      hideArrows: false,
    };
  }

  componentDidMount() {
    const {
      children,
      cardsToShow: cardsToShowProp,
      autoSlide,
      hideArrowsOnNoSlides,
    } = this.props;
    const numberOfChildren = children ? children.length || 1 : 0;
    const cardsToShow = cardsToShowProp || numberOfChildren;
    const childWidth = 100 / cardsToShow;

    /** @Todo to replace this with setState hooks */
    this.setState(
      {
        childWidth,
        cardsToShow,
        hideArrows: hideArrowsOnNoSlides && numberOfChildren <= cardsToShow,
      },
      () => this.updateResponsiveView()
    );

    typeof window !== "undefined" &&
      window.addEventListener("resize", this.updateResponsiveView);

    if (autoSlide) {
      //    start autoslider
    }
  }


  changeInitialCard = (initialCard) => {
    const { afterSlide, beforeSlide } = this.props;
    if (beforeSlide) {
      beforeSlide();
    }
    this.setState({
      initialCard,
    }, () => {
      if (afterSlide) {
        afterSlide();
      }
    });
  }


  updateResponsiveView = () => {
    const { children, hideArrowsOnNoSlides } = this.props;
    let { responsive } = this.props;
    const numberOfChildren = children ? children.length || 1 : 0;
    if (responsive) {
      responsive = responsive.map(obj => Object.assign({}, obj)).sort((key => (a, b) =>
        (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))('breakPoint')); // eslint-disable-line
      let updatedCardsToShow = this.state.cardsToShow;
      responsive.forEach(({ breakPoint, cardsToShow }) => {
        if (breakPoint <= window.innerWidth) {
          updatedCardsToShow = cardsToShow;
        }
      });
      const updatedInitialCard = (numberOfChildren - updatedCardsToShow) < this.state.initialCard ? (numberOfChildren - updatedCardsToShow) : this.state.initialCard;
      this.setState({
        cardsToShow: updatedCardsToShow,
        childWidth: 100 / updatedCardsToShow,
        initialCard: updatedInitialCard,
        hideArrows: hideArrowsOnNoSlides && numberOfChildren <= updatedCardsToShow,
      });
    }
  }


  renderChildren = (children) => {
    const { childWidth } = this.state;
    const displayCards = [];
    Children.forEach(children, (child, index) => {
      displayCards.push((
        <CardWrapper key={index} width={childWidth} style={{transitionDuration:'1s', transform: index===this.state.initialCard+1? 'scale(1.11)': 'scale(1)'}}>
          {child}
        </CardWrapper>
      ));
    });
    return displayCards;
  }

  handleLeftArrowClick = (evt) => {
    const { children } = this.props;
    const { cardsToShow } = this.state;
    const childrenCount = children ? children.length : 0;
    if (evt && evt.preventDefault) { evt.preventDefault(); }
    let nextInitialCard = this.state.initialCard - 1;
    if (nextInitialCard < 0) {
      nextInitialCard = childrenCount - cardsToShow;
    }
    this.changeInitialCard(nextInitialCard);
  }

  handleRightArrowClick = (evt) => {
    const { children } = this.props;
    const { cardsToShow } = this.state;
    const childrenCount = children ? children.length : 0;
    if (evt && evt.preventDefault) { evt.preventDefault(); }
    let nextInitialCard = this.state.initialCard + 1;
    if (childrenCount - cardsToShow < nextInitialCard) {
      nextInitialCard = 0;
    }
    this.changeInitialCard(nextInitialCard);
  }


  renderLeftArrow = () => {
    const { LeftArrow, infinite } = this.props;
    const { initialCard } = this.state;
    return cloneElement(LeftArrow, {
      onClick: this.handleLeftArrowClick,
      disabled: !infinite && !initialCard,
    });
  }

  renderRightArrow = () => {
    const { RightArrow, children, infinite } = this.props;
    const numberOfChildren = children ? children.length || 1 : 0;
    const { initialCard, cardsToShow } = this.state;
    return cloneElement(RightArrow, {
      onClick: this.handleRightArrowClick,
      disabled: !infinite && (initialCard + cardsToShow === numberOfChildren),
    });
  }


  render() {
    const {
        children, cardsToShow,
        showDots, showArrows,
        pauseOnMouseOver, DotsWrapper,
        ...otherProps
      } = this.props;

      const { initialCard, childWidth } = this.state;

      return <div
      onMouseLeave={() => pauseOnMouseOver && this.autoSlider && this.autoSlider.resume()}
      onMouseEnter={() => pauseOnMouseOver && this.autoSlider && this.autoSlider.pause()}
    >
      <Wrapper {...otherProps}>
        {showArrows && !this.state.hideArrows && this.renderLeftArrow()}
        <Track>
          <List translateX={initialCard * childWidth}>
            {this.renderChildren(children, cardsToShow || children.length)}
          </List>
        </Track>
        {showArrows && !this.state.hideArrows && this.renderRightArrow()}
      </Wrapper>
      {/* <DotsWrapper>
        {showDots && this.renderDots()}
      </DotsWrapper> */}
    </div>
  }

  renderDots = () => {
    const dots = [];
    const { children, Dot } = this.props;
    const numberOfChildren = children ? children.length || 1 : 0;
    
    // calculate click count to reach the end, show those many dots; or push dot component to the array of dots as per ui
    let i;
    for (i = 0; i <= numberOfChildren - this.state.cardsToShow; i += 1) {
      const index = i;
      dots.push(cloneElement(Dot, {
        active: index === this.state.initialCard,
        key: index,
        onClick: () => this.changeInitialCard(index),
      }));
    }
    return dots;
  }

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


export default Carousel;