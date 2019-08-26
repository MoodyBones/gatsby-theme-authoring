const fs = require('fs')

// 1. make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'data'

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// 2. define the event type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  `)
}

// 3. define resolvers for any custom fields
// createResolvers is a gatsby built in API hook
exports.createResolvers = ({ createResolvers }, options) => {
  const basePath = options.basePath || '/'

  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      // changes symbols to -
      .replace(/(^-|-$)+/g, '')
    // removes any symbols from beginning & end

    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/')
    // .replace(/\/\/+/g, '/') makes sure you can't break the slug over-slashing /
  }

  createResolvers({
    Event: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  })
}

// 4. query for events and create pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || '/'
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/events.js')
  })

  // graphql query for individiual events
  // await returns a promise
  const result = await graphql(`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('error loading events', reporter.errors)
    return
  }

  const events = result.data.allEvent.nodes

  // loopp through each event
  events.forEach(event => {
    const slug = event.slug

    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/event.js'),
      context: {
        eventID: event.id
      }
    })
  })
}
