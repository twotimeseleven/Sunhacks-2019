import React, { Component, useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import { Button } from 'semantic-ui-react'
import SimpleTestButton from "./SimpleTestButton.js"
import Job from "./Job.js"
import Weather from "./Weather.js"
import Kids from "./Kids.js"
import Col from "./COL.js"
import Outdoors from "./Outdoors.js"
import Population from "./Population.js"
import Results from "../models/Results.js"


const pages = [
  ({ style, goForward }) => <animated.div style={{ ...style}}><Col goForward={goForward}/></animated.div>,
  ({ style, goForward }) => <animated.div style={{ ...style}}><Weather goForward={goForward}/></animated.div>,
  ({ style, goForward }) => <animated.div style={{ ...style}}><Kids goForward={goForward}/></animated.div>,
  ({ style, goForward }) => <animated.div style={{ ...style}}><Outdoors goForward={goForward}/></animated.div>,
  ({ style, goForward }) => <animated.div style={{ ...style}}><Population goForward={goForward}/></animated.div>,
]
function done() {
  console.log("done")
}

export default function Survey() {
  const [index, set] = useState(0)
  const test = () => {
    set(state => (state + 1))
  }
  const redirect = () => {
    console.log("cant go farther", Results.resultsToParams())
    window.location.href = '/results?'+ Results.resultsToParams()
  };
  const goBackwards = useCallback(() => set(state => (state - 1)), [])
  const goForward = useCallback(() => test(), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  return (
    <div className="simple-trans-main" >
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} goForward={key<=pages.length-2? goForward: redirect} />
      })}
    </div>
  )
}
