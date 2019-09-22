import React, { Component } from 'react'
import { Button, Form} from 'semantic-ui-react'
import Results from "../models/Results.js"


export default class Kids extends Component {
    constructor(props){
      super(props)
    }


    selectKids(e) {
      console.log(e.target.value)
      Results.updateJob("kids", e.target.value)
      this.props.goForward()
    }

    render() {
      return (
        <div style={{textAlign: "center"}}>
          <h1>Do you have children?</h1>
          <div>
            <Button
            value={1}
            size="massive"
            onClick={this.selectKids.bind(this)}>Yes</Button>
            <Button
            size="massive"
            value={0}
            onClick={this.selectKids.bind(this)}>No</Button>
          </div>
        </div>
      )

    }

}
