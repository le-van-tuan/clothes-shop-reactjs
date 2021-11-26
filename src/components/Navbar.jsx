import {Badge} from "@material-ui/core";
import {ShoppingCartOutlined} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import {Link} from "react-router-dom";

const Container = styled.div`
  height: 60px;
  display: flex;
  background-color: var(--bgSecondary);
  padding-left: 20px;
  padding-right: 20px;
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
  margin-left: 25px;
  ${mobile({fontSize: "12px", marginLeft: "10px"})}
`;

const Navbar = () => {
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
                <Link to="/register">
                    <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link to="/login">
                    <MenuItem>SIGN IN</MenuItem>
                </Link>
                <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={3} color="primary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Container>
    );
};

export default Navbar;
