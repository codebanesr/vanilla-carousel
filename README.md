# React Carousel
### Paypal assignment

#### Uses Styled Components
you can provide your own implementation of components like the dot component or the arrow component

Here is a lit of all arguments that the slider component takes, not all are functional. Planning to add all of them some day
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

```

Stable commit 
`commit 590c6d01c4c7945495ff866d3f04d6658333caac (HEAD -> trunk, origin/trunk, origin/master, master)`

Used styled components + mix of functional and class based components

### Dependencies:
"styled-components": "^5.2.1"