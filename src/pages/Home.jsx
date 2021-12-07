import styled from "styled-components";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getNewArrivals} from "../redux/apiCalls";
import Product from "../components/Product";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #F5F5F5;
  margin-top: 0.5px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 150px;
  font-size: 24px;
  position: relative;
  font-family: Quicksand, sans-serif;
  font-weight: 600;
  letter-spacing: 0.15em;
`

const ProductContainer = styled.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex: 1;
`;

const Home = () => {

    const dispatch = useDispatch();
    const [newArrivals, setNewArrivals] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        dispatch(getNewArrivals()).then((res) => {
            setNewArrivals(res.data);
        });
    }, []);

    return (
        <Container>
            <Section>
                <div style={{justifyContent: "center", display: "flex"}}>
                    <p>NEW ARRIVALS</p>
                </div>
                <ProductContainer>
                    {newArrivals.map((item) => <Product item={item} key={item.id}/>)}
                </ProductContainer>
            </Section>
            <Section>
                <div style={{justifyContent: "center", display: "flex"}}>
                    <p>BEST SELLERS</p>
                </div>
                <ProductContainer>
                    {newArrivals.map((item) => <Product item={item} key={item.id}/>)}
                </ProductContainer>
            </Section>
        </Container>
    );
};

export default Home;
