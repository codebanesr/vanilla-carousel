import { Component } from "react";
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
}



export default Slider;