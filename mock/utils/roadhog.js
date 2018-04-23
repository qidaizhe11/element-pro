const assert = require('assert')

const config = require('../mock.js')

function parseKey(key) {
  let method = 'get'
  let path = key

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ')
    method = splited[0].toLowerCase()
    path = splited[1]
  }

  return { method, path }
}

function createMockHandler(method, path, value) {
  return function mockHandler(...args) {
    const res = args[1]
    if (typeof value === 'function') {
      value(...args)
    } else {
      res.json(value)
    }
  }
}

function init(server) {
  Object.keys(config).forEach(key => {
    const keyParsed = parseKey(key)
    assert(!!server[keyParsed.method], `method of ${key} is not valid`)
    assert(
      typeof config[key] === 'function' || typeof config[key] === 'object',
      `mock value of ${key} should be function or object, but got ${typeof config[
        key
      ]}`
    )

    server[keyParsed.method](
      keyParsed.path,
      createMockHandler(keyParsed.method, keyParsed.path, config[key])
    )
  })
}

module.exports = {
  init
}
