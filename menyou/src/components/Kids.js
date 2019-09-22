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
          <h1 style={{marginBottom: 30}}>Do you have children?</h1>
          <div>
            <Button size="massive" color="blue" value={1} onClick={this.selectKids.bind(this)} style = {{marginTop: 30, marginLeft: 20, marginBottom: 50}}>Yes</Button>

            <Button size="massive" color="blue" value={0} onClick={this.selectKids.bind(this)} style = {{marginTop: 30, marginLeft: 20, marginBottom: 50}}>No</Button>

          </div>
        </div>
      )

    }

}
