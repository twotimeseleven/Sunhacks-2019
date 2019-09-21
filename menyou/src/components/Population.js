import React, { Component } from 'react'
import { Button, Form} from 'semantic-ui-react'
import Results from "../models/Results.js"


export default class Population extends Component {
    constructor(props){
      super(props)
    }


    selectWeather(e) {
      console.log(e.target.value)
      Results.updateJob("population", e.target.value)
      this.props.goForward()
    }

    render() {
      return (
        <div style={{textAlign: "center"}}>
          Would you rather live in a big or small city?
          <div>
            <Button
            value={1}
            onClick={this.selectWeather.bind(this)}>Big</Button>
            <Button
            value={0}
            onClick={this.selectWeather.bind(this)}>Small</Button>
            <Button
            value={2}
            onClick={this.selectWeather.bind(this)}>No Preference</Button>
          </div>
        </div>
      )

    }

}
