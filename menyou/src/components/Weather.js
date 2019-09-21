import React, { Component } from 'react'
import { Button, Form} from 'semantic-ui-react'
import Results from "../models/Results.js"


export default class Weather extends Component {
    constructor(props){
      super(props)
    }


    selectWeather(e) {
      console.log(e.target.value)
      Results.updateJob("weather", e.target.value)
      this.props.goForward()
    }

    render() {
      return (
        <div style={{textAlign: "center"}}>
          Would you rather be hot or cold?
          <div>
            <Button
            value={1}
            onClick={this.selectWeather.bind(this)}>Hot</Button>
            <Button
            value={0}
            onClick={this.selectWeather.bind(this)}>Cold</Button>
          </div>
        </div>
      )

    }

}
