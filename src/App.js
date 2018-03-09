import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import About from './containers/About/About';
import Contact from './containers/Contact/Contact';
import Works from './containers/Works/Works';
import Skills from './containers/Skills';
import WholeWork from './components/Work/WholeWork/WholeWork';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.PortfolioWrp}>
        <Layout>
          <Switch>
            <Route path="/works/:title" component={WholeWork} />
            <Route path="/works" component={Works} />
            <Route path="/skills" component={Skills} />
            <Route path="/contact" component={Contact} />
            <Route path="/(about|)/" component={About} />
          </Switch>
        </Layout>
      </div>
    );
  }
}


export default App;
