import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

esbuild.build({
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.esm.js",
  format: "esm",
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
});
