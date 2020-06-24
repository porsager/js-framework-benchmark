import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  plugins: [
    resolve(),
    terser()
  ],
  output: {
    file: 'dist/index.js',
    format: 'iife'
  }
}
