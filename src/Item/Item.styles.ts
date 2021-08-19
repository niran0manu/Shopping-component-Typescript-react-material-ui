import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%; 
  border-radius: 5px;
  height: 100%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  background-color: whitesmoke;

  button {
    border-radius: 0 0 5px 5px;
    
    background: linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%);
  }

  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
    
  }
`;