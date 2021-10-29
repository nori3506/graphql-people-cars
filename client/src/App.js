import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "./components/layouts/Title";
import Top from "./components/pages/Top";
import Person from "./components/pages/Person";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <BrowserRouter>
        <Route exact path="/" component={Top} />
        <Route exact path="/:id" component={Person} />
      </BrowserRouter>
    </div>
  </ApolloProvider>
);
export default App;
