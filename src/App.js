import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import About from './containers/About/About';
import Works from './containers/Works/Works';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.PortfolioWrp}>
        <Layout>
          <Switch>
            <Route path="/works" component={Works} />
            <Route path="/skills" />
            <Route path="/(about|)/" component={About} />
          </Switch>
        </Layout>
      </div>
    );
  }
}


export default App;