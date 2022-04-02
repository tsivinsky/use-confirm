import esbuild from "esbuild";

const watch = process.env.NODE_ENV === "development";

esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/use-confirm.esm.js",
  format: "esm",
  bundle: true,
  minify: true,
  sourcemap: true,
  watch,
});

esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/use-confirm.cjs",
  format: "cjs",
  bundle: true,
  minify: true,
  sourcemap: true,
  watch,
  platform: "node",
  target: "node17",
});
