import styled from "styled-components";
import {mobile} from "../responsive";
import {useState} from "react";

const Container = styled.div`
  flex: 1;
  background: linear-gradient(rgba(255, 255, 255, 0.5),
  rgba(255, 255, 255, 0.5)),
  url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  ${mobile({width: "75%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 25%;
  margin: 20px 0 0 0;
  padding: 10px;
`;
const Button = styled.button`
  width: 100%;
  border: none;
  padding: 10px 10px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const clickRegister = () => {

    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input autoComplete="off" placeholder="Full name"/>
                    <Input autoComplete="off" placeholder="Email"/>
                    <Input autoComplete="off" placeholder="Password"/>
                    <Input autoComplete="none" placeholder="Confirm password" type={"password"}/>
                    <Button onclick={clickRegister}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
