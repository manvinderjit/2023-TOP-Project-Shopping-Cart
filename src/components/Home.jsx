import { Container } from 'react-bootstrap';
import ProductCard from './ProductCard';
import ProductCarousel from './ProductCarousel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import store from '../../src/app/store.js';
import { calculateTotalAmount } from '../features/cart/cartSlice';

store.dispatch(calculateTotalAmount());

const Home = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [categoryList, setCategoryList] = useState([]);    
    const [productList, setProductList] = useState([]);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        async function fetchCarouselData() {
            const response = await fetch(
                `http://localhost:5000/api/promos/carousel`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
                .then((raw) => raw.json())
                .then((data) => data)
                .catch((error) => console.log(error));
            setCarouselData(response.carouselPromos);
        }
        fetchCarouselData();
    }, []);

    useEffect(() => {
        async function fetchProductsData() {
            const response = await fetch(`http://localhost:5000/api/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((raw) => raw.json())
                .then((data) => data)
                .catch((error) => console.log(error));
            setCategoryList(response.categoryList);
            setProductList(response.productList);
        }
        fetchProductsData();
    }, []);

    return (
        <>
            <Container className="p-0">
                <Container className="p-0">
                    <ProductCarousel carouselData={carouselData} />
                </Container>
                <Container className="my-4 d-flex justify-content-evenly align-content-start flex-wrap">
                    {productList.map((product) => (
                        <ProductCard
                            key={product._id}
                            productDetails={product}
                        ></ProductCard>
                    ))}
                </Container>
                <Container>Items in cart: {cart.totalCartQuantity}</Container>
            </Container>
        </>
    );
};

export default Home;
