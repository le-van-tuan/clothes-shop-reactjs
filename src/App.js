import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {SnackbarProvider} from 'notistack';
import {useSelector} from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;


function App() {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}
                              autoHideDuration={2000}
                              anchorOrigin={{vertical: "top", horizontal: "right"}}>
                <Container>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>
                    </Switch>
                    <Footer/>
                </Container>
            </SnackbarProvider>
        </BrowserRouter>
    );
}

export default App;
