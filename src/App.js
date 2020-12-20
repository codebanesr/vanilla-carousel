import React from "react";
import AppContainer from "./components/Container";
import Card from "./components/Card";
import { storeProducts } from "./store/products";
import { useEffect, useState } from "react";
import {Select} from "react-slct";
import {options, responsive} from './utils/constants';
// import Carousel from "./components/functional-carousel"; -> to use classless component
import Carousel from "./components/carousel";

const App =() => {
  const [selectedValue, setSelectedValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(storeProducts);

  const search = (search) => {
    setSelectedValue(search);
    setFilteredProducts(storeProducts.filter(p=>{
      return p.category.indexOf(search.value) > -1;
    }));
  };

  useEffect(()=>{ 
    console.log("changed");
  }, [selectedValue]);


  return (
    <AppContainer>
      <div style={{width: '200px', margin: '0 auto'}}>
        <Select placeholder="Select filter" value={selectedValue} searchable onChange={search} options={options} showDots={true} />
      </div>
      <Carousel responsive={responsive} showArrows={true} numberOfcardsToShow={3} showDots={true}>
        {
          filteredProducts.map((p, index)=>{
            return <Card
              key={index}
              card={{
                type: "vertical",
                image: p.image,
                title: p.title,
                description: p.description,
                price:p.price,
                category:p.category
              }}
            />
          })
        }
      </Carousel>
    </AppContainer>
  );
}

export default App;
