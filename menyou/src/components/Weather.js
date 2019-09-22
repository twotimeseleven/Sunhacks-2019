import React, { Component } from 'react'
import { Button, Form} from 'semantic-ui-react'
import Results from "../models/Results.js"
import { Slider } from 'antd';


const marks = {
  0: '0°',
  65: '65°',
  100: '100°',
};

export default class Weather extends Component {
    constructor(props){
      super(props)
      this.state = {
        weather: 65
      }
    }


    handleChange = (e) => this.setState({ weather: e })

    selectWeather(e) {
      Results.updateJob("weather", this.state.weather)
      this.props.goForward()
    }

    render() {
      return (

        <div style={{textAlign: "center"}}>
          <h1 style={{marginBottom: 60}}>What is your idea of perfect weather??</h1>
            <Slider
            min={0}
            max={100}
            marks={marks}
            step={1}
            onAfterChange={this.handleChange.bind(this)}
            defaultValue={65} />

           <div>

             <Button size="massive" color="blue" value={1} onClick={this.selectWeather.bind(this)} style = {{marginTop: 30, marginLeft: 20, marginBottom: 50}}>Continue</Button>
           </div>
        </div>
      )

    }

}
