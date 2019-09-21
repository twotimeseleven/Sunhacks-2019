import React, { Component } from 'react'
import { Button, Form} from 'semantic-ui-react'
import Results from "../models/Results.js"


export default class Outdoors extends Component {
    constructor(props){
      super(props)
    }


    selectWeather(e) {
      console.log(e.target.value)
      Results.updateJob("outdoors", e.target.value)
      this.props.goForward()
    }

    render() {
      return (
        <div style={{textAlign: "center"}}>
          Do you like being outdoors?
          <div>
            <Button
            value={1}
            onClick={this.selectWeather.bind(this)}>Yes</Button>
            <Button
            value={0}
            onClick={this.selectWeather.bind(this)}>No</Button>
          </div>
        </div>
      )

    }

}
