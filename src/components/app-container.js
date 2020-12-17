import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 10px;
  
  background-image: linear-gradient(
      45deg,
      rgb(238, 239, 241) 25%,
      transparent 25%
    ),
    linear-gradient(-45deg, rgb(238, 239, 241) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgb(238, 239, 241) 75%),
    linear-gradient(-45deg, transparent 75%, rgb(238, 239, 241) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;

export default AppContainer;

