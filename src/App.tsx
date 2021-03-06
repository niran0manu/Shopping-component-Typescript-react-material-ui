import {useState} from 'react';
import {useQuery} from 'react-query';
import './App.styles.ts';
import Item from './Item/Item';
import Cart from './Cart/Cart';
//Material ui components 
import  Drawer  from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import  AddShoppingCart  from '@material-ui/icons/AddShoppingCart';
import  Badge  from '@material-ui/core/Badge';

//styling
import {Wrapper,StyledButton} from './App.styles';

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
};





//fecthing Function 

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();






function App() {
  //states for our Cart
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  
  
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  console.log(data);

  // A function to get all the Items
  const getTotalItems = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.quantity, 0);
  // Adding to cart function 
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.quantity + 1 }
            : item
        );
      }
      // First increment of a Product
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, amount: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  // Maetrial UI Progress bar animation:
  if (isLoading) return <LinearProgress/>


  // Error Notification
  if (error) return <div> Oopsie :( </div>

  return (
    
      <Wrapper>
          <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCart />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item key = {item.id } xs ={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>  
          ))}

        </Grid>
      </Wrapper>
    
  )
  
}

export default App;



