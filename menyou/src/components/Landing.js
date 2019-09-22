import React, { Component } from "react"

import { Container, Image, Button, Header, Icon, Grid } from 'semantic-ui-react'

import { Link } from "react-router-dom";

const img1 = require('../imgs/compass2.png')
const img2 = require('../imgs/locale.png')

export default class Landing extends Component {


  render() {

    return (
      <Container>
        <Grid stackable  columns={2}>
          <Grid.Column stretched width={8}>
            <div style={{textAlign:"center"}}>
              <h1 style={{fontSize:"8em", color: "#2185d0", marginBottom: "0px !important"}}> locale. </h1>
            </div>
            <div style = {{margin:"auto", paddingBottom: 20}}>
              <Image src={img1} size='medium' />
            </div>
            <Button animated color="blue"  size="huge" as={Link} to="explore"><Button.Content visible>Find a place to call home</Button.Content>
            <Button.Content hidden><Icon name='arrow right' /></Button.Content></Button>
          </Grid.Column>
          <Grid.Column stretched width={8} style={{paddingTop: 100}}>
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
