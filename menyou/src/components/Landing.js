import React, { Component } from "react"

import { Container, Image, Button } from 'semantic-ui-react'

import { Link } from "react-router-dom";



export default class Landing extends Component {


  render() {

    return (
      <Container style={{margin: 50}}>
        <h1>Welcome to our project. Find the best city for you. Take our test now.</h1>
        <Button size="huge" as={Link} to="explore"> start the process </Button>
      </Container>
    )
  }
}
