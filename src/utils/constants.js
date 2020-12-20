const responsive = [
  { breakPoint: 1280, cardsToShow: 3 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 760, cardsToShow: 3 },
];

const options = [
  {
    value: {
      id: 4,
      value: '',
    },
    label: "All",
  },
  {
    value: {
      id: 1,
      value: "men clothing",
    },
    label: "men clothing",
  },
  {
    value: {
      id: 2,
      value: "jewelery",
    },
    label: "jewelery",
  },
  {
    value: {
      id: 3,
      value: "electronics",
    },
    label: "electronics",
  },
];

export { responsive, options };
