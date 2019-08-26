# gatsby-theme-authoring
<h1>
Link to error log:
https://github.com/jlengstorf/authoring-gatsby-themes/issues/2#issuecomment-524815219
</h1>

Tutorial:
https://egghead.io/lessons/gatsby-configure-a-gatsby-theme-to-take-options
https://www.gatsbyjs.org/tutorial/building-a-theme/#set-up-sitegatsby-configjs
<br>
<br>

hey all, I'm stuck and getting an error at the same spot, when I run `yarn workspace site develop`: 
- the event directory is not being generated,
- ERROR #85907  GRAPHQL                           

<img width="776" alt="Screen Shot 2019-08-26 at 12 37 48" src="https://user-images.githubusercontent.com/47255988/63685268-3289f280-c7ff-11e9-8a5b-b307b2353d5d.png">

- Also just found another error when I run `yarn workspace gatsby-theme-events develop`
-  ERROR #10126  CONFIG
<img width="924" alt="Screen Shot 2019-08-26 at 14 16 10" src="https://user-images.githubusercontent.com/47255988/63690458-f9f11580-c80c-11e9-83b0-c85bbe59e5a0.png">



I've checked my parentheses in `gatsby-theme-events/gatsby-config.js` and it seems OK
<br>
`gatsby-theme-events/gatsby-config.js`
```
module.exports = ({ contentPath = 'data', basePath = '/' }) => ({
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: contentPath
      }
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Event'
      }
    }
  ]
})
```
<br>
<br>


`site/gatsby.config.js`
```
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-events',
      options: {
        contentPath: 'events',
        basePath: '/events'
      }
    }
  ]
}
```
<br>
<br>

`gatsby-theme-events/src/templates/event.js`
```
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Event from '../components/event'

export const query = graphql`
  query($eventID: String!) {
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

const EventTemplate = ({ data: { event } }) => (
  <Layout>
    <Event {...event} />
  </Layout>
)

export default EventTemplate
```

<br>
<br>

It is my first time trying out Gatsby, any help would be greatly appreciated! Cheers! :)
<br>
My Repo: 
https://github.com/MoodyBones/gatsby-theme-authoring
