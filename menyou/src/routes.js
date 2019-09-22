import React, { Component } from "react"
import { Grid, Image, Header} from "semantic-ui-react"
import Landing from "./components/Landing.js"
import Survey from "./components/Survey.js"
import Results from "./components/Results.js"
import { Menu } from 'antd';
import { Link } from "react-router-dom";



import { Route, Switch, withRouter, Redirect } from "react-router-dom";
const img1 = require('../src/imgs/compass2.png')

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
            style={{ lineHeight: '54px' }}
          >
            <Image src={img1} style={{ height: 50, width: 50, marginLeft: 20, marginTop: 5, marginBottom: 5}} verticalAlign='top' href="/" centered/>
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
