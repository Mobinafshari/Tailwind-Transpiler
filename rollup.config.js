import resolve from "@rollup/plugin-node-resolve"; 
import commonjs from "@rollup/plugin-commonjs"; 
import babel from "@rollup/plugin-babel"; 
import { terser } from "rollup-plugin-terser"; 
import json from "@rollup/plugin-json";
const packageJson = require("./package.json");

export default {
  input: "index.js", 
  output: {
    file: packageJson.main, 
    format: "cjs", 
    sourcemap: true, 
  },
  plugins: [
    resolve(), 
    commonjs(), 
     json(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**", 
    }),
    terser(), 
  ],
};
