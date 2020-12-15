import { Component, cloneElement, Children } from "react";
import CardWrapper from "./card-wrapper";
import SliderList from "./slider-list";
import SliderTrack from "./slider-track";
import SliderWrapper from './slider-wrapper';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.updateResponsiveView = this.updateResponsiveView.bind(this);
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

  updateResponsiveView() {
    const { children, hideArrowsOnNoSlides } = this.props;

    //   breakpoints capture
    let { responsive } = this.props;

    const numberOfChildren = children ? children.length || 1 : 0;

    if (responsive) {
      //   apply responsiveness here using the breakpoints
    }
  }

  renderChildren(children) {
    const { childWidth } = this.state;
    const displayCards = [];
    Children.forEach(children, (child, index) => {
      displayCards.push((
        <CardWrapper key={index} width={childWidth}>
          {child}
        </CardWrapper>
      ));
    });
    return displayCards;
  }


  renderLeftArrow() {
    const { LeftArrow, infinite } = this.props;
    const { initialCard } = this.state;
    return cloneElement(LeftArrow, {
      onClick: this.handleLeftArrowClick,
      disabled: !infinite && !initialCard,
    });
  }

  renderRightArrow() {
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
      <SliderWrapper {...otherProps}>
        {showArrows && !this.state.hideArrows && this.renderLeftArrow()}
        <SliderTrack>
          <SliderList translateX={initialCard * childWidth}>
            {this.renderChildren(children, cardsToShow || children.length)}
          </SliderList>
        </SliderTrack>
        {showArrows && !this.state.hideArrows && this.renderRightArrow()}
      </SliderWrapper>
      <DotsWrapper>
        {showDots && this.renderDots()}
      </DotsWrapper>
    </div>
  }

  renderDots() {
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

export default Slider;