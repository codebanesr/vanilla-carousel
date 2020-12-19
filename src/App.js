import AppContainer from "./components/Container";
import Card from "./components/Card";
import Carousel from "./components/carousel";
import { storeProducts } from "./store/products";
import { useState } from "react";
import {Select} from "react-slct";



const responsive = [
  { breakPoint: 1280, cardsToShow: 3 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 760, cardsToShow: 3 },
];


// function Filter(cat) {
//   // Declare a new state variable, which we'll call "count"
//   const [category, setCategory] = useState('');
//   setCategory(cat);
  
//   if(!cat) {
//     return products;
//   }
//   return products.filter(p => p.category = category);
// }

// convert all functions to arrow function

const App =() => {
  const [select, setSelect] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(storeProducts);

  const search = (search) => {
    console.log(search);
    setFilteredProducts(storeProducts.filter(p=>{
      return p.category.indexOf(search.value) > -1;
    }));
  };
  return (
    <AppContainer>
      <Select placeholder="Please select..." 
          value={select} 
          searchable
          onChange={search}
          options={[
          {
            "value": {
              "id": 1,
              "value": "men clothing"
            },
            "label": "men clothing"
          },
          {
            "value": {
              "id": 2,
              "value": "jewelery"
            },
            "label": "jewelery"
          },
          {
            "value": {
              "id": 3,
              "value": "electronics"
            },
            "label": "electronics"
          }
        ]} />
      <Carousel responsive={responsive} showDots={true} showArrows={true} cardsToShow={3}>
        {
          filteredProducts.map((p, index)=>{
            return <Card
              key={index}
              card={{
                type: "vertical",
                image: p.image,
                title: p.title,
                description: p.description
              }}
            />
          })
        }
      </Carousel>
    </AppContainer>
  );
}

export default App;
