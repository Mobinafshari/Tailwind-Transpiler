import resolve from "@rollup/plugin-node-resolve"; 
import commonjs from "@rollup/plugin-commonjs"; 
import babel from "@rollup/plugin-babel"; 
import { terser } from "rollup-plugin-terser"; 

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
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**", 
    }),
    terser(), 
  ],
  external: ["fs-extra", "path"], 
};
