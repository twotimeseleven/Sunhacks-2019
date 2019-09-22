import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import Results from "../models/Results.js"


export default class SimpleTestButton extends Component {
    constructor(props){
      super(props)
    }

    changeMe(props) {

      Results.staticMethod()
      this.props.goForward()
    }

    testMe(props) {
      Results.anotherStaticMethod()
    }

    render() {
      return (
        <div>
        <Button onClick={this.changeMe.bind(this)}> ChangeMe </Button>
        <Button onClick={this.testMe.bind(this)}> TestMe </Button>
        </div>
      )

    }

}
