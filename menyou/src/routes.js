import React, { Component } from "react"
import { Grid, Image, Header} from "semantic-ui-react"
import Landing from "./components/Landing.js"
import Survey from "./components/Survey.js"


import { Route, Switch, withRouter, Redirect } from "react-router-dom";


const header_styles = {
  color: "white",
  fontSize: "2em",
  flexGrow: 0,
}

export default class Routes extends Component {


  render() {

    return (
          <Switch>
            <Route exact path="/" component={ () =>
              <div>
                <Landing/>
              </div>
            }/>
          <Route exact path="/explore" component={ () =>
              <Survey/>
            }/>
          <Route exact path="/results" component={ () =>
            <div>
              results baby
            </div>
          }/>
          </Switch>


    )
  }
}
