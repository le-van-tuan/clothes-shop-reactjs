import styled from "styled-components";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getProductDetail} from "../redux/apiCalls";
import {Button, Divider, InputNumber, Typography} from "antd";
import {BASE_URL} from "../helpers/axiosInstance";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {FavoriteBorderOutlined} from "@material-ui/icons";
import {getReadableSpecifications} from "../helpers/utils";

const {Text} = Typography;

const Container = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 2px;
  margin-top: 0.5px;
  background-color: var(--bgSecondary);
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 12%;
  padding: 20px;

  & > * {
    padding: 15px;
    margin-top: 10px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  }
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ProductImages = styled.div`
  width: 450px;

  & .ImgContainer {
    width: 100%;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 40px;
`;

const QuantityInput = styled.div`
  margin-top: 20px;

  & > div {
    margin-top: 5px;
    display: flex;
    align-items: center;

    & > * {
      margin-right: 10px;
    }
  }
`;

const SpecRow = styled.div`
  display: flex;
  flex-direction: row;
  &:not(:first-child) {
    margin-top: 5px;
  }
`

const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});

    useEffect(() => {
        dispatch(getProductDetail(id)).then((res) => {
            if (res) {
                setProduct(res.data);
            }
        });
    }, []);

    const getDefaultThumbnail = () => {
        if (!product.images) return null;
        const thumbnail = [].concat(product.images).find(img => img.type === "THUMBNAIL");
        return BASE_URL + "products/images/" + thumbnail.url;
    }

    return (
        <Container>
            <Content>
                <ProductWrapper>
                    <ProductImages>
                        <div className={"ImgContainer"}>
                            <img style={{width: "100%"}} alt="example"
                                 src={getDefaultThumbnail()}/>
                        </div>
                    </ProductImages>
                    <ProductInfo>
                        <h2>{product.name}</h2>
                        <Text style={{color: "#ee4d2d", fontSize: 18}} strong>$200</Text>
                        <QuantityInput>
                            <Text type="secondary">Quantity</Text>
                            <div>
                                <InputNumber min={1} defaultValue={1}/>
                                <Button size={"middle"} type="primary" icon={<ShoppingCartOutlined/>}>
                                    Add to Cart
                                </Button>
                                <Button type="primary" danger>Buy Now</Button>
                                <Button type="default" icon={<FavoriteBorderOutlined/>}/>
                            </div>
                        </QuantityInput>
                    </ProductInfo>
                </ProductWrapper>
                <div>
                    <h3>Product Specifications:</h3>
                    <Divider style={{margin: 10}} plain dashed={true}/>
                    {
                        getReadableSpecifications(product['specifications'] || []).map(value => <SpecRow>
                            <div style={{width: 130}}>
                                <Text type="secondary">{value.key}</Text>
                            </div>
                            <div>
                                {value.values}
                            </div>
                        </SpecRow>)
                    }
                </div>
                <div>
                    <h3>Product Description:</h3>
                    <Divider style={{margin: 10}} plain dashed={true}/>
                    <p>{product.description}</p>
                </div>
            </Content>
        </Container>
    );
};

export default ProductDetails;
