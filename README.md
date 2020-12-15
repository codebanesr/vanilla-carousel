# React Carousel
### Paypal assignment

#### Uses Styled Components
you can provide your own implementation of components like the dot component or the arrow component

Here is a lit of all arguments that the slider component takes
```ts
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
    autoSlide: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ]),
    pauseOnMouseOver: PropTypes.bool,
    padding: PropTypes.string,
    margin: PropTypes.string,
    hideArrowsOnNoSlides: PropTypes.bool,
    DotsWrapper