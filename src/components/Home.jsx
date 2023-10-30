import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import { useEffect, useState } from "react";

const Home = () => {

    const[categoryList, setCategoryList] = useState([]);
    const[productList, setProductList] = useState([]);

    useEffect(() => {
        async function fetchData () {
            const response = await fetch(
                    `http://localhost:5000/api/products`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',                            
                        },                        
                })
                .then( raw => raw.json())
                .then( data => (data) )
                .catch( error => console.log( error ));
                setCategoryList(response.categoryList);
                setProductList(response.productList);
        }
        fetchData();
    }, [])
    
    return (
        <>
            <Container className="p-0">
                <Container className="p-0">
                    <ProductCarousel />
                </Container>
                <Container className="my-4 d-flex justify-content-evenly align-content-start flex-wrap">
                    {productList.map((product) => (
                        
                        <ProductCard key={product._id} productDetails={product}></ProductCard>
                        
                    ))}
                    
                </Container>
            </Container>
        </>
    );
}

export default Home