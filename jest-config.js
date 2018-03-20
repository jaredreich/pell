module.exports = {
  bail: true,
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: [
    'js'
  ],
  moduleDirectories: [
    'node_modules'
  ]
}
