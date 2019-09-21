import React, { Component, useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import { Button } from 'semantic-ui-react'
import SimpleTestButton from "./SimpleTestButton.js"


const pages = [
  ({ style, goForward }) => <animated.div style={{ ...style}}><SimpleTestButton goForward={goForward}/></animated.div>,
  ({ style, goForward }) => <animated.div style={{ ...style}}><SimpleTestButton goForward={goForward}/></animated.div>,
  ({ style, goForward }) => <animated.div style={{ ...style}}><SimpleTestButton goForward={goForward}/></animated.div>,
]
function done() {
  console.log("done")
}

export default function Survey() {
  const [index, set] = useState(0)
  const test = () => {
    console.log()
    console.log("HERE")
    set(state => (state + 1))
  }
  const add = () => {console.log("cant go farther")};
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
        return <Page key={key} style={props} goForward={goForward} />
      })}
    </div>
  )
}
