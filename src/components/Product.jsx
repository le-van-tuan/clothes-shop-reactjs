import {FavoriteBorderOutlined, ShoppingCartOutlined,} from "@material-ui/icons";
import VisibilityIcon from '@mui/icons-material/Visibility';
import styled from "styled-components";
import {BASE_URL} from "../helpers/axiosInstance";
import {Image} from 'antd';
import {useDispatch} from "react-redux";
import {addItem2Wishlist, addItemToCart} from "../redux/apiCalls";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 200px;
  max-width: 250px;
  border-radius: 3px;
  box-shadow: 0px 0px 1px rgb(0 0 0 / 18%);
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  overflow: hidden;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const CustomImage = styled(Image)`
  z-index: 2;
  object-fit: contain;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({item}) => {

    const dispatch = useDispatch();

    const getThumbnail = (item) => {
        if (!item) return null;
        const thumbnail = [].concat(item.images).find(img => img.type === "THUMBNAIL");
        return BASE_URL + "products/images/" + thumbnail.url;
    }

    const onClickAddItemToCart = () => {
        dispatch(addItemToCart(item));
    }

    const onAddWishlist = () => {
        dispatch(addItem2Wishlist(item));
    }

    return (
        <Container>
            <CustomImage width={"100%"} height={"100%"} src={getThumbnail(item)}/>
            <Info>
                <Icon>
                    <ShoppingCartOutlined onClick={onClickAddItemToCart}/>
                </Icon>
                <Icon>
                    <VisibilityIcon/>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined onClick={onAddWishlist}/>
                </Icon>
            </Info>
        </Container>
    );
};

export default Product;
