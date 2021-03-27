import React from "react"
import { graphql } from "gatsby"

export default function Home() {
  return <div>Hello world2!</div>
}

export const g = graphql`
  query MyQuery2 {
    regular
  }
`
