import Container from "./components/Container";
import Card from "./components/Card";
import Slider from "./components/slider";



const responsive = [
  { breakPoint: 1280, cardsToShow: 3 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 760, cardsToShow: 3 },
];


function App() {
  return (
    <Container>
      <h1>Carousel 1st trial</h1>
      <Slider responsive={responsive} showDots={true}>
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
        <Card>4</Card>
        <Card>5</Card>
        <Card>6</Card>
      </Slider>
    </Container>
  );
}

export default App;
