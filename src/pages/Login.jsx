import styled from "styled-components";
import {mobile} from "../responsive";
import {useSnackbar} from 'notistack';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {login} from "../redux/apiCalls";

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  background: url("https://i.pinimg.com/originals/6c/d1/14/6cd1142f5dd232ff8d79e6b26f646b76.jpg");
  background-size: cover;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--bgSecondary);
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
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 10px 10px;
  margin-top: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  color: red;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state) => state.user);
    const {enqueueSnackbar} = useSnackbar();
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const clickLogin = (data) => {
        login(dispatch, data).then(() => {
            if (error) {
                enqueueSnackbar(error.message, {variant: "error"});
            }
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit(clickLogin)();
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input {...register("email", {required: "Email is required!"})}
                           placeholder="Email"
                    />
                    {
                        errors.email && <Error>{errors.email.message}</Error>
                    }
                    <Input
                        {...register("password", {required: "Password is required!"})}
                        placeholder="Password"
                        type="password"
                    />
                    {
                        errors.password && <Error>{errors.password.message}</Error>
                    }
                    <Button onClick={onSubmitForm} disabled={isFetching}>
                        LOGIN
                    </Button>
                    <Link onClick={() => history.replace("/register")}>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
