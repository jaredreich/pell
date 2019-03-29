import babel from 'rollup-plugin-babel'

export default {
  input: 'index.js',
  output: {
    file: 'dist/pell.js',
    format: 'umd',
    name: 'pell',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
