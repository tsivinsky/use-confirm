import fs from "fs";
import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

esbuild.build({
  entryPoints: ["./src/index.ts"],
  outfile: pkg.main,
  format: "cjs",
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
});

esbuild.build({
  entryPoints: ["./src/index.ts"],
  outfile: pkg.module,
  format: "esm",
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
});
