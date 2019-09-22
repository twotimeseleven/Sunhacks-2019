import React, { Component, useState, useCallback } from 'react'
import { Grid, Container, Button, Image } from "semantic-ui-react"
import Map from "./Map.js"
const queryString = require('query-string');
const api = require("../api.js")
const img1 = require('../imgs/sidebar/A.png')
const img2 = require('../imgs/sidebar/B.png')
const img3 = require('../imgs/sidebar/C.png')
const img4 = require('../imgs/sidebar/D.png')
const img5 = require('../imgs/sidebar/F.png')
const hand = require('../imgs/sidebar/hand.png')
const book = require('../imgs/sidebar/open-book.png')
const population= require('../imgs/sidebar/population.png')
const cloud = require('../imgs/sidebar/cloud.png')


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
              <h1 style={{fontSize: 50, marginTop: 20, marginBottom: 0}} centered>CITY, STATE</h1>
              <Image src={img2} size='small' style={{marginTop: 0}} centered/>
              <p style={{fontSize: 25, marginTop: 20, marginBottom: 100}}  centered>CityScore: X / 100</p>
              <Grid.Column width={1} style={{float: "left", marginLeft: 100}}>
               <Image src={cloud} size='tiny' style={{marginTop: 0}} centered/>
               <Image src={hand} size='tiny' style={{marginTop: 25}} centered/>
               <Image src={population} size='tiny' style={{marginTop: 25}} centered/>
               <Image src={book} size='tiny' style={{marginTop: 25}} centered/>
              </Grid.Column>
              <Grid.Column width={3}>
              <p style={{fontSize: 25, marginTop: 125, marginBottom: 50}}  centered>Weather Data</p>
              <p style={{fontSize: 25, marginTop: 80, marginBottom: 50}}  centered>CoL Data</p>
              <p style={{fontSize: 25, marginTop: 70, marginBottom: 50}}  centered>Pop. Data</p>
              <p style={{fontSize: 25, marginTop: 60, marginBottom: 100}}  centered>School Data</p>
              </Grid.Column>
          </Grid.Column>
        </Grid>
      </div>    )
  }
}
