const _ = require('lodash')

const QueryInterface = require('./query-interface')

class Model {
  constructor(matchalize, name, attributes, options) {
    this.matchalize = matchalize
    this.name = name
    this.attributes = attributes
    this.options = options
    this.queryInterface = new QueryInterface(this.matchalize.config)
  }

  _optionsValidator(attributes, options) {
    _.map(attributes, (value, key) => {
      if (options[key]) {
        if (
          options[key].length > parseInt(value['type']) ||
          typeof options[key] !== typeof value['type']
        ) throw new Error('Validation error')
      }
    })

    return true
  }

  findOne(options) {
    if (!options || !_.isPlainObject(options)) throw new Error('The argument passed to findOne must be an options object')
    if (!options.where || !_.isPlainObject(options.where)) throw new Error('The option where is require and must be an object')

    const errorOptions = !this._optionsValidator(this.attributes, options.where)
    if (errorOptions) throw new Error(errorOptions)
    else {
      return this.queryInterface.select(this.options.tableName, options)
      .then((result) => {
        const user = JSON.parse(JSON.stringify(result))
        
        if (!user.rows[0]) return Promise.resolve(null)
        return Promise.resolve(user.rows[0])
      })
    }
  }
}

module.exports = Model