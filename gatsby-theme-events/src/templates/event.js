import React from "react"
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Event from '../components/event'


// the reason we export a page query is because we need access to graphql
export const query = graphql`
  query ($eventID: String!) {
    event(id: { eq: $eventID }) {
      name
      url
      startDate(formatString: "MMMM D, YYYY")
      endDate(formatString: "MMMM D, YYYY")
      location
      slug
    }
  }
`

const EventTemplate = ({ data: {event} }) => (
  <Layout>
    {/* ...event will give all data as a prop */}
    <Event {...event} />
  </Layout>
)

export default EventTemplate
