import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ModalContainer from "./Components/ModalContainer";
import Wrapper from "./Components/Wrapper";
import Table from "./Components/Table";
import AuthForm from './Auth/AuthForm/index'
import OpenSocket from "socket.io-client";
import {
  Route,
  Redirect,
  useHistory,
  withRouter,
} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("User") || null);
  const [login, setLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const socket = OpenSocket("http://localhost:8080");
    socket.on("user", (data) => {
      if (data.action === "logOut") {
        history.push("/login");
        setUser(null);
      } else if (data.action === "getUser") {
        setLogin(!login);
        setUser(localStorage.getItem("User"));
        history.push("/");
      }
    });
  }, [history, login]);

  return (
    <>
      {user ? <Redirect to='/' /> : <Redirect to='/login' />}
      <Route exact path='/'>
        <Layout>
          <Wrapper>
            <Table />
            <ModalContainer />
          </Wrapper>
        </Layout>
      </Route>
      <Route exact path='/login'>
        <Layout>
          <Wrapper>
            <AuthForm />
          </Wrapper>
        </Layout>
      </Route>
    </>
  );
};

export default withRouter(App);
