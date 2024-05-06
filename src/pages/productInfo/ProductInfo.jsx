import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../firebase/FirebaseConfig';

function ProductInfo() {
    const context = useContext(myContext);
    const { setLoading } = context;

    const [products, setProducts] = useState(null);
    const [rating, setRating] = useState(0); // State to keep track of user's rating
    const [isInWishlist, setIsInWishlist] = useState(false); // State to keep track of whether the product is in the wishlist
    const params = useParams();

    useEffect(() => {
        const getProductData = async () => {
            setLoading(true);
            try {
                const productTemp = await getDoc(doc(fireDB, "products", params.id));
                setProducts(productTemp.data());
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                // Handle error, maybe display a message to the user
                toast.error('Error fetching product');
            }
        }

        if (params.id) {
            getProductData();
        }

    }, [params.id, setLoading]);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart');
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Function to handle user rating
    const handleRating = (value) => {
        setRating(value);
        // You can perform additional actions here, such as sending the rating to the backend
    }

    // Function to handle adding/removing from wishlist
    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);
        // You can perform additional actions here, such as sending the wishlist status to the backend
    }

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {products && 
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/3 w-full lg:h-auto  object-cover object-center rounded"
                            src={products.imageUrl}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                BRAND NAME
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {products.title}
                            </h1>
                            <div className="flex mb-4">
                                {/* Render rating icons and handle user interaction */}
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        fill={index < rating ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500 cursor-pointer"
                                        viewBox="0 0 24 24"
                                        onClick={() => handleRating(index + 1)}
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                                <span className="text-gray-600 ml-3">{rating} Reviews</span>
                            </div>
                            <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                {products.description}
                            </p>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                ₹{products.price}
                                </span>
                                <button  onClick={()=>addCart(products)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Add To Cart
                                </button>
                                {/* Render wishlist icon and handle user interaction */}
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" onClick={toggleWishlist}>
                                    <svg
                                        fill={isInWishlist ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </section>
        </Layout>
    )
}

export default ProductInfo;
