import React, { Component } from "react"
import { Grid, Image, Header} from "semantic-ui-react"
import Landing from "./components/Landing.js"
import Survey from "./components/Survey.js"
import Results from "./components/Results.js"
import { Menu } from 'antd';
import { Link } from "react-router-dom";



import { Route, Switch, withRouter, Redirect } from "react-router-dom";


const header_styles = {
  color: "white",
  fontSize: "2em",
  flexGrow: 0,
}

class Routes extends Component {


  render() {

    return (
        <div>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item><Link to="/" /><span> Locale </span></Menu.Item>
            <Menu.Item disabled className="demo">sunhacks 2019</Menu.Item>

          </Menu>

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
                <Results location={this.props.location}/>
              }/>
          </Switch>
        </div>


    )
  }
}
export default withRouter(Routes);
