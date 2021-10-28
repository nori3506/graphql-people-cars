import React from "react";
import "./App.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddPerson from "./components/form/AddContact";
import Title from "./components/layouts/Title";
import Contacts from "./components/lists/Contacts";
import AddCar from "./components/form/AddCar";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <AddPerson />
      <AddCar />
      <Contacts />
    </div>
  </ApolloProvider>
);
export default App;
