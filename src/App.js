import React from "react";
import Layout from "./Layout";
import ModalContainer from "./Components/ModalContainer";
import Wrapper from "./Components/Wrapper";
import Table from "./Components/Table";

const App = () => {
  return (
    <Layout>
      <Wrapper>
        <Table />
        <ModalContainer />
      </Wrapper>
    </Layout>
  );
};

export default App;
