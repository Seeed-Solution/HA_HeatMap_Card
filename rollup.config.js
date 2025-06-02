import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/heatmap-card.ts',
  output: {
    file: 'dist/heatmap-card.js',
    format: 'es',
    sourcemap: !production
  },
  plugins: [
    resolve({
      preferBuiltins: false,
      browser: true,
      mainFields: ['module', 'main']
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    }),
    production && terser({
      format: {
        comments: false
      }
    })
  ],
  external: [],
  watch: {
    clearScreen: false
  }
}; 