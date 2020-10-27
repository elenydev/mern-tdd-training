import React, { useEffect, useState, lazy, Suspense } from "react";
import Layout from "./Layout";
import Wrapper from "./Components/Wrapper";
import AuthForm from "./Auth/AuthForm/index";
import OpenSocket from "socket.io-client";
import { Route, Redirect, useHistory, withRouter } from "react-router-dom";

const Table = lazy(() => import("./Components/Table/index"));
const ModalContainer = lazy(() => import("./Components/ModalContainer/index"));
 
const App = () => {
  const [user, setUser] = useState(localStorage.getItem("User") || null);
  const [login, setLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const socket = OpenSocket("https://lv-tdd.herokuapp.com/");
    socket.on("user", (data) => {
      if (data.action === "logOut") {
        history.push("/login");
        setUser(null);
      } else if (data.action === "getUser") {
        setLogin(!login);
        setUser({ _id: data.user._id, email: data.user.email });
        if (user) {
          history.push("/");
        }
      }
    });
  }, [history, login, user]);

  return (
    <>
      <Suspense fallback={<div>Loading ...</div>}>
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
      </Suspense>
    </>
  );
};

export default withRouter(App);
