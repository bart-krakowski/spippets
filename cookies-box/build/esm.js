import build from './build'

export default Object.assign(build, {
  input: 'src/index.js',
  output: Object.assign(build.output, {
    file: 'dist/cookies-box.esm.js',
    format: 'es'
  })
})
