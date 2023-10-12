import axios from "axios";
import { createContext, useState } from "react";

export const cartContext = createContext();

export default function CartProvider({ children }) {


    const [products, setProducts] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numOfItems, setNumOfItems] = useState(0);
    const [emptyError, setEmptyError] = useState(null);
    const [productIDs, setProductIDs] = useState(null);
    const [cartID, setCartID] = useState(null);


    async function getCart() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                })

            setNumOfItems(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setProductIDs(data.data.products.map(product => product._id));
            setCartID(data.data._id);
            console.log(data);
        }
        catch (e) {
            console.log(e);
            if (e.response?.status === 404) {
                setEmptyError(e.response.data.message);
                setProducts([]);
                setNumOfItems(0);
                
            }
        }
    }

    async function addProductToCart(product) {

        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                "productId": product
            },

            {
                headers: {
                    'token': localStorage.getItem('token'),
                }
            })
        getCart();
        setEmptyError(null);
        return data;
    }

    async function removeProductFromCart(product) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${product}`,
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                })
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setNumOfItems(data.numOfCartItems);
            if (data.numOfCartItems === 0) {
                setEmptyError('Your Cart is Empty');
                setCartID(null);
            }
            return data;
        }
        catch (e) {
            console.log(e);
            return e

        }
    }

    async function updateProductQuantity(product, quantity) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${product}`,
                {
                    "count": quantity
                },
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                })
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setNumOfItems(data.numOfCartItems);
            if(data.numOfCartItems === 0)
            {
                setEmptyError('Your Cart is Empty');
                setCartID(null);
            }
            if(quantity === 0)
            {
                removeProductFromCart(product);
            }
            return data;
        }
        catch (e) {
            console.log(e);
    
        }
    }

    async function emptyCart() {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                })
            setProducts([]);
            setTotalPrice(0);
            setNumOfItems(0);
            setEmptyError('Your Cart is Empty');
            setCartID(null);
            return data;
        }
        catch (e) {
            console.log(e);
            return e

        }
    }


    useState(() => {
        if (localStorage.getItem('token')) {
            getCart();
        }
    }, [])

    return (
        <cartContext.Provider value={{ productIDs,emptyCart,updateProductQuantity,removeProductFromCart, emptyError, addProductToCart, products, totalPrice, numOfItems,cartID,getCart}}>
            {children}
        </cartContext.Provider>
    );
}