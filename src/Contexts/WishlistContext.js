import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const wishlistContext = createContext();

export default function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(null);

    async function deleteFromWishlist(id) {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    toast.success('Product deleted from wishlist successfully')
                    getWishlist();
                }
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
            })
    }

    async function getWishlist() {
        await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response.data)
                    setWishlist(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error)
                toast.error(error.response?.data.message)
            })
    }

    async function addProductToWishlist(product) {
            
        
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                "productId": product
            },

            {
                headers: {
                    'token': localStorage.getItem('token'),
                }
            })
        return data;
       
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getWishlist();
        }
    }, [])
    

    return (
        <wishlistContext.Provider value={{wishlist,getWishlist,deleteFromWishlist,addProductToWishlist }}>
            {children}
        </wishlistContext.Provider>
    );
}