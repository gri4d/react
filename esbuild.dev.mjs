import esbuild from "esbuild";

async function main() {
  const esmBuild = await esbuild.context({
    entryPoints: ["./src/index.tsx"],
    bundle: true,
    outfile: "./docs/index.dev.esm.js",
    sourcemap: true,
  });

  await Promise.all([esmBuild.watch()]);

  const esmReactBuild = await esbuild.context({
    entryPoints: ["./dev/esm-react-esbuild.tsx"],
    bundle: true,
    outfile: "./docs/esm-react-esbuild.dev.js",
    minify: true,
    sourcemap: true,
  });

  await esmReactBuild.watch();

  const { hosts, port } = await esmReactBuild.serve({
    servedir: "docs",
    fallback: "./docs/index.html",
  });

  console.log(`Serving app at http://${hosts[0]}:${port}`);
}

main();
