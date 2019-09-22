import React, { Component, useState, useCallback } from 'react'
import { Grid, Container} from "semantic-ui-react"
import { Button } from 'semantic-ui-react'
const queryString = require('query-string');
const api = require("../api.js")


// http://127.0.0.1:5000/score?lat=33.5722&lon=-112.0891&job=test&salary=70000&weather=80&kids=0&outdoors=1&population=1&num_schools=8&num_parks=2

const DATA = {
 "average_weather": 86.6,
 "city_name": "Phoenix",
 "cost_of_living": 68.64,
 "density": 1212.0,
 "grade": "C",
 "map_lat": "33.5722",
 "map_lng": "-112.0891",
 "population": 4081849,
 "state_id": "AZ",
 "total_school_rank": 40.0,
 "total_score": 59.83100233100234
}

export default class Routes extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }

  test_results(params) {
    params.num_schools = 0
    params.num_parks = 0
    console.log(params)
    api.get_score(params, cb => {
      // If 200, account added Successfully
      if (cb.status === 200) {
        console.log(cb)
      }
      // Need more error handling
      else {

      }
    })
  }

  componentDidMount(){
    const parsed = queryString.parse(this.props.location.search);
    this.test_results(parsed)
    this.setState({data: parsed})
  }

  render() {
    return (
      <Grid stackable>
        <Grid.Column stretched width={12} style={{overflowX: "auto", overflowY: "none"}}>
          my map
        </Grid.Column>
        <Grid.Column width={4}>
          <Container>
            results
          </Container>
        </Grid.Column>

      </Grid>
    )
  }
}
