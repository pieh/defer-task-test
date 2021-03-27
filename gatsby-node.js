// exports.sourceNodes = ({ actions }) => {
//   actions.createNode({})
// }

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
  type Test {
    deferTest: String
  }
  `)
}

exports.createResolvers = ({ reporter, createResolvers }) => {
  createResolvers({
    Query: {
      regular: {
        type: `String`,
        resolve: () => `wat1`,
      },
      deferTest: {
        type: `String`,
        async resolve() {
          reporter.verbose(`Start executing deferTest (Query)`)
          return new Promise(resolve => {
            setTimeout(() => {
              reporter.verbose(`Resolve deferTest (Query)`)
              resolve(`wat2`)
            }, 5000)
          })
        },
      },
      nestedDeferTest: {
        type: `[Test]`,
        resolve: () => [1, 3, 5, 7],
      },
      placeholder: {
        type: `Test!`,
        resolve: () => `placeholder`,
      },
      placeholderInt: {
        type: `Int!`,
        resolve: () => `placeholder`,
      },
    },
    Test: {
      deferTest: {
        async resolve(source) {
          reporter.verbose(`Start executing deferTest (${source})`)
          return new Promise(resolve => {
            setTimeout(() => {
              reporter.verbose(`Resolve deferTest (${source})`)
              resolve(`wat2 (${source})`)
            }, source * 1000)
          })
        },
      },
    },
  })
}
