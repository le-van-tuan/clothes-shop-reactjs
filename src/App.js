import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {SnackbarProvider} from 'notistack';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import AlertNotification from "./components/AlertNotification";
import {Spin} from "antd";
import {clearError} from "./redux/errorRedux";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        dispatch(clearError());
        setLoading(false);
    }, []);

    if (loading) {
        return <div style={{display: "flex", justifyContent: "center"}}>
            <Spin tip="Loading..."/>
        </div>
    }

    return (
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}
                              autoHideDuration={2000}
                              anchorOrigin={{vertical: "top", horizontal: "right"}}>
                <Container>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path={"/cart"} component={Cart}/>
                        <PrivateRoute exact path="/profile" component={Profile}/>
                        <PrivateRoute exact path="/wishlist" component={Wishlist}/>
                        <Route path="/login">
                            {user ? <Redirect to="/"/> : <Login/>}
                        </Route>
                        <Route path="/register">
                            {user ? <Redirect to="/"/> : <Register/>}
                        </Route>
                    </Switch>
                    <Footer/>
                    <AlertNotification/>
                </Container>
            </SnackbarProvider>
        </BrowserRouter>
    );
}

export default App;
