import React, { Component } from "react"

import { Container, Image, Button, Header, Icon } from 'semantic-ui-react'

import { Link } from "react-router-dom";

const img1 = require('../imgs/compass2.png')
const img2 = require('../imgs/locale.png')

export default class Landing extends Component {


  render() {

    return (
      <Container style={{margin: 50, textAlign: "center"}}>
         <Image src={img2} size='large' centered />

         <Button animated color="blue" style = {{marginTop: 30}} size="huge" as={Link} to="explore"><Button.Content visible>Find a place to call home</Button.Content>
         <Button.Content hidden><Icon name='arrow right' /></Button.Content></Button>
      </Container>
    )
  }
}
