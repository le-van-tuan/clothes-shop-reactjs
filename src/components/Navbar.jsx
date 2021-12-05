import {Badge} from "@material-ui/core";
import {FavoriteBorder, LocalMall} from "@material-ui/icons";
import React, {useEffect} from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Dropdown, Menu} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {logOut} from "../redux/userRedux";
import {useSnackbar} from "notistack";
import {getProfile} from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  display: flex;
  background-color: var(--bgSecondary);
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 2px 2px -2px gray;
  ${mobile({height: "50px"})}
`;
styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding: "10px 0px"})}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display: "none"})}
`;
styled.input`
  border: none;
  ${mobile({width: "50px"})}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  margin-bottom: 0px;
  ${mobile({fontSize: "24px"})}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({flex: 2, justifyContent: "center"})}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  align-items: center;
  display: ${props => props.hidden ? "none" : "flex"};
  ${mobile({fontSize: "12px", marginLeft: "10px"})}
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
`;

const Navbar = () => {
    const {currentUser} = useSelector((state) => state.user);
    const {profile} = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        dispatch(getProfile());
    }, []);

    const onClickLogOut = (e) => {
        e.preventDefault();
        dispatch(logOut());
        enqueueSnackbar("You has been logged out.", {variant: "success"});
        history.replace("/");
    }

    const menu = (
        <Menu>
            <Menu.Item icon={<UserOutlined/>}>
                <StyledLink to={"/profile"}>
                    Profile
                </StyledLink>
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined/>}>
                <span onClick={onClickLogOut}>
                    Logout
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Container>
            <Left>
                <Link to="/">
                    <Logo>YAMEE</Logo>
                </Link>
            </Left>
            <Center>
            </Center>
            <Right>
                <MenuItem hidden={!currentUser} title={"Profile"} key={"1"}>
                        <span
                            style={{
                                marginRight: 5,
                                fontSize: 14,
                                fontWeight: "500"
                            }}>Welcome, {profile && profile.name || "Yamee"}</span>
                    <Dropdown trigger={['click', 'hover']} overlay={menu} placement="bottomCenter">
                        <Avatar size={30} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Dropdown>
                </MenuItem>
                <StyledLink to="/register">
                    <MenuItem key={"2"} hidden={currentUser != null}>REGISTER</MenuItem>
                </StyledLink>
                <StyledLink to="/login">
                    <MenuItem key={"3"} hidden={currentUser != null}>SIGN IN</MenuItem>
                </StyledLink>
                <StyledLink to="/wishlist">
                    <MenuItem key={"4"} hidden={!currentUser} title={"Wishlist"}>
                        <FavoriteBorder/>
                    </MenuItem>
                </StyledLink>
                <StyledLink to="/cart">
                    <MenuItem key={"5"} title={"Cart"}>
                        <Badge badgeContent={3} color="error">
                            <LocalMall/>
                        </Badge>
                    </MenuItem>
                </StyledLink>
            </Right>
        </Container>
    );
};

export default Navbar;
