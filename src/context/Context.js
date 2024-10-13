import { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(99);

const iceCreamProducts = [
  { name: "Delicious Vanilla Swirl", image: "https://i.postimg.cc/yxfh1qtx/chocolate-vanilla-strawberry-ice-cream-isolated-white-807701-3441.jpg" },

  { name: "Rich Chocolate Chunk", image: "https://dodladairy.com/wp-content/uploads/2024/03/icecream-65facbd6d4ff4-1008x1024.webp" },

  { name: "Minty Fresh Delight", image: "https://i.postimg.cc/65gRYhNk/360-F-33293692-yxp4-D1y-GAo-U8-Ld-OPqa-Tn1-On-Ry81-B4-Nwt.jpg" },

  { name: "Strawberry Sundae Supreme", image: "https://i.postimg.cc/vHgxg663/gourmet-summer-dessert-artisanal-craft-260nw-1647372625.jpg" },
  { name: "Caramel Cookie Crumble", image: "https://i.postimg.cc/ZRnKG18V/image.jpg" },
  { name: "Mango Sorbet Surprise", image: "https://www.shutterstock.com/image-photo/ice-cream-scoop-isolated-on-600w-2290825613.jpg" },
  { name: "Rocky Road Royale", image: "https://cdn.pixabay.com/photo/2022/08/31/17/07/ice-cream-7423790_640.jpg" },
  { name: "Peach Passion Gelato", image: "https://i.postimg.cc/FF23xZv2/image.jpg" },
  { name: "Lemon Zest Sorbet", image: "https://cdn.pixabay.com/photo/2024/06/02/17/02/ice-cream-8804689_640.jpg" },
  { name: "Raspberry Ripple", image: "https://i.postimg.cc/mDKz8bvQ/image.jpg" },
  { name: "Vanilla Delight", image: "https://i.postimg.cc/TYM5b3qx/image.jpg" } // New image added
];


const Context = ({ children }) => {
  const products = [...Array(20)].map(() => {
    const randomProduct = iceCreamProducts[Math.floor(Math.random() * iceCreamProducts.length)];
    return {
      id: faker.datatype.uuid(),
      name: randomProduct.name,
      price: faker.commerce.price(),
      image: randomProduct.image, // Use predefined image
      inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
      fastDelivery: faker.datatype.boolean(),
      ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    };
  });

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
