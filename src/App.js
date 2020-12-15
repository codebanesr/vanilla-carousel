import Container from "./components/Container";
import Card from "./components/Card";
import Carousel from "./components/carousel";



const responsive = [
  { breakPoint: 1280, cardsToShow: 3 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 760, cardsToShow: 3 },
];


function App() {
  return (
    <Container>
      <h1>Carousel 1st trial</h1>
      <Carousel responsive={responsive} showDots={true} showArrows={true} cardsToShow={3}>
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
        <Card>4</Card>
        <Card>5</Card>
        <Card>6</Card>
      </Carousel>
    </Container>
  );
}

export default App;
