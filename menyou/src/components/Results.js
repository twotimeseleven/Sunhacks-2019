import React, { Component, useState, useCallback } from 'react'
import { Grid, Container} from "semantic-ui-react"
import { Button } from 'semantic-ui-react'
const queryString = require('query-string');
const api = require("../api.js")

export default class Routes extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }

  test_results(params) {
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
    console.log(parsed)
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
            my results
          </Container>
        </Grid.Column>

      </Grid>
    )
  }
}
