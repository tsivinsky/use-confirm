import esbuild from "esbuild";
import { dtsPlugin } from "esbuild-plugin-d.ts";

const watch = process.env.NODE_ENV === "development";

esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/use-confirm.esm.js",
  format: "esm",
  bundle: true,
  minify: true,
  watch,
  plugins: [
    dtsPlugin({
      outDir: "dist",
    }),
  ],
});

esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/use-confirm.cjs",
  format: "cjs",
  bundle: true,
  minify: true,
  watch,
  platform: "node",
  target: "node17",
  plugins: [dtsPlugin({ outDir: "dist" })],
});
