import React from "react"
import { graphql } from "gatsby"

export default function Home() {
  return <div>Hello world!</div>
}

export const g = graphql`
  query MyQuery {
    regular
    ... @defer {
      deferTest
    }
  }
`
