import React, { Component } from "react"

import { Container, Image, Button, Header, Icon, Grid } from 'semantic-ui-react'

import { Link } from "react-router-dom";

const img1 = require('../imgs/compass2.png')
const img2 = require('../imgs/locale.png')

export default class Landing extends Component {


  render() {

    return (
      <Container style={{margin: 0, textAlign: "center"}}>
      <Grid stackable>
       <Grid.Column stretched width={8} style={{overflowX: "auto", overflowY: "none", marginLeft: 300, fontSize: 20}}>
         <Image src={img2} size='large' />
        <Image src={img1} size='medium' style = {{marginLeft: 80}}/>
         <Button animated floated="left" color="blue" style = {{marginTop: 30, marginRight: 80, marginBottom: 50}} size="huge" as={Link} to="explore"><Button.Content visible>Find a place to call home</Button.Content>
         <Button.Content hidden><Icon name='arrow right' /></Button.Content></Button>
          </Grid.Column>
        <Grid.Column stretched width={16} style={{overflowX: "auto", overflowY: "none", marginRight: 40, fontSize: 20}}>
            Developed by 4 ASU students in 36 hours, Locale is a geolocation program that helps you discover new parts
            of the world to enjoy. We begin by asking you about your preferences for general locations, and compute a
            dynamic "Habitation" score for users based on a location they search. It can be used for anything: job hunting,
            exploration, or even just to view neat places in your community.
            So come on in, and find a locale that's right for you!
            -Bryce, Tanner, Ryan, & Zach
        </Grid.Column>

      </Grid>
      </Container>
    )
  }
}
