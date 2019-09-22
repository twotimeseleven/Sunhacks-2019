import React, { Component } from 'react'
import { Button, Form} from 'semantic-ui-react'
import Results from "../models/Results.js"
import { Slider } from 'antd';

const marks = {
  10000: '$10,000',
  50000: '$50,000',
  150000: '$150,000',
};

export default class COL extends Component {
    constructor(props){
      super(props)
      this.state = {
        salary: 50000
      }
    }

    handleChange = (e) => this.setState({ salary: e })

    selectKids(e) {
      Results.updateJob("salary", this.state.salary)
      this.props.goForward()
    }

    render() {
      return (
        <div style={{textAlign: "center", marginTop: 0}}>
          <h1 style={{marginBottom: 60}}>What is your expected income?</h1>
            <Slider
            min={10000}
            max={150000}
            marks={marks}
            step={10000}
            onAfterChange={this.handleChange.bind(this)}
            defaultValue={50000} />

           <div>
             <Button size="massive" color="blue" value={1} onClick={this.selectKids.bind(this)} style = {{marginTop: 30, marginLeft: 20, marginBottom: 50}}>Continue</Button>
             </div>

        </div>
      )

    }

}
