import React, { Component, useState, useCallback } from 'react'
import { Grid, Container, Button, Image } from "semantic-ui-react"
import Map from "./Map.js"


export default class ResultMap extends Component {
  constructor(props){
    super(props)
  }

  // we never want this to rerender
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }


  render() {
    console.log(this.props)
    return (
      <Map saveSchools={this.props.saveSchools}/>
    )
  }
}
