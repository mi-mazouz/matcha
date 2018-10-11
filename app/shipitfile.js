module.exports = shipit => {
  require('shipit-aws')(shipit)
  const aws = require('./aws/index.json')

  shipit.initConfig({ default: { aws } })
  shipit.run('s3')
}
