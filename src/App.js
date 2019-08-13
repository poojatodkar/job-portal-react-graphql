import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import JobPositions from './JobPositions/JobPositionList';
import JobPositionDetail from './JobPositions/JobPositionDetail';
import PageNotFound from './PageNotFound/PageNotFound';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path='/' component={JobPositions} />
        <Route path='/job/:id' component={JobPositionDetail} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
