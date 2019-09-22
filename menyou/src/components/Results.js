import React, { Component, useState, useCallback } from 'react'
import { Grid, Container, Button } from "semantic-ui-react"
import Map from "./Map.js"
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default class Routes extends Component {
  constructor(props){
    super(props)
    this.num_schools = 0
    this.ready = false
    this.results = {}
    this.state = {
      data: {}
    }
  }

  saveSchoolResults(results, lat, long) {
    console.log(results)

    this.num_schools = results
    this.num_parks = getRandomInt(7)
    this.test_results(this.state.data, lat/100000, long/100000)
  }

  saveParkResults(results) {
    console.log(results)
    this.num_parks = getRandomInt(7)
  }

  test_results(params, lat, long) {
    console.log(lat, long)

    params.num_schools = this.num_schools
    params.num_parks = this.num_parks
    params.lat = lat
    params.lon = long
    console.log(params)
    api.get_score(params, cb => {
      // If 200, account added Successfully
      if (cb.status === 200) {
        console.log(cb)
        this.results = cb.data
        this.ready = true
      }
      // Need more error handling
      else {

      }
    })
  }

  componentWillMount(){
    const parsed = queryString.parse(this.props.location.search);
    // this.test_results(parsed)
    this.setState({data: parsed})
  }

  render() {
    return (
      <div className="results">
        <Grid stackable>
          <Grid.Column stretched width={12} style={{overflowX: "auto", overflowY: "none"}}>
            <Map saveParks={this.saveParkResults.bind(this)} saveSchools={this.saveSchoolResults.bind(this)}/>
          </Grid.Column>
          <Grid.Column width={4}>
            <Container>
              results
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
