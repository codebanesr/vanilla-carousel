import AppContainer from "./components/Container";
import Card from "./components/Card";
import Carousel from "./components/carousel";
import { storeProducts } from "./store/products";
import { useEffect, useState } from "react";
import {Select} from "react-slct";
import {options, responsive} from './utils/constants';

const App =() => {
  const [selectedValue, setSelectedValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(storeProducts);

  const search = (search) => {
    setSelectedValue(search);
    setFilteredProducts(storeProducts.filter(p=>{
      return p.category.indexOf(search.value) > -1;
    }));
  };

  return (
    <AppContainer>
      <div style={{width: '200px', margin: '0 auto'}}>
        <Select placeholder="Select filter" value={selectedValue} searchable onChange={search} options={options} />
      </div>
      <Carousel responsive={responsive} showArrows={true} cardsToShow={3}>
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
