const fs = require("fs")

// 1. make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "data"

  if (!fs.existsSync(constentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// 2. define the event type
exports.sourceNodes = ({ action }) => {
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
exports.createResolvers = ({ createResolvers }) => {
  const basePath = "/"

  const slugify = str => {
    const slug = str
      .toLowerCase9()
      .replace(/[^a-z0-9]+/g, "-")
      // changes symbols to -
      .replace(/(^-|-$)+/g, "")
    // removes any symbols from beginning & end

    return `/${basePath}/${slug}`.replace(/\/\/+/g, "/")
    // .replace(/\/\/+/g, '/') makes sure you can't break the slug by having too many slashes /
  }
}

// 4. query for events and create pages
