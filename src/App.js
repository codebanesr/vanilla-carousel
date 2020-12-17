import AppContainer from "./components/Container";
import Card from "./components/Card";
import Carousel from "./components/carousel";



const responsive = [
  { breakPoint: 1280, cardsToShow: 3 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 760, cardsToShow: 3 },
];


function App() {
  return (
    <AppContainer>
      <h1>Carousel 1st trial</h1>
      <Carousel responsive={responsive} showDots={true} showArrows={true} cardsToShow={3}>
        <Card
          card={{
            type: "vertical",
            image: "https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78",
            link: "https://adaptavist.com",
            title: "This is a Card",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut`
          }}
        />
        <Card
          card={{
            type: "vertical",
            image: "https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78",
            link: "https://adaptavist.com",
            title: "This is a Card",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut`
          }}
        />
        <Card
          card={{
            type: "vertical",
            image: "https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78",
            link: "https://adaptavist.com",
            title: "This is a Card",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut`
          }}
        />
        <Card
          card={{
            type: "vertical",
            image: "https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78",
            link: "https://adaptavist.com",
            title: "This is a Card",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut`
          }}
        />
        <Card
          card={{
            type: "vertical",
            image: "https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78",
            link: "https://adaptavist.com",
            title: "This is a Card",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut`
          }}
        />
      </Carousel>
    </AppContainer>
  );
}

export default App;
