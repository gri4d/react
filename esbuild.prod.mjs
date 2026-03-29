import { rm } from "fs/promises";
import { execSync } from "child_process";
import path from "path";
import esbuild from "esbuild";

const distDir = "dist";
const distPath = path.resolve("dist");

async function main() {
  // 1. remove dist/
  await rm(distPath, { recursive: true, force: true });
  console.log(`1. Removed ./${distDir}/`);

  // 2. run tsc
  console.log("2. Running tsc");
  try {
    const output = execSync(
      "tsc --project tsconfig.prod.json --pretty --listEmittedFiles",
      { stdio: "pipe" }
    );
    console.log(output.toString());
  } catch (err) {
    console.error("tsc error:", err);
    process.exit(1);
  }

  // 3. run esbuilds
  const esmBuild = await esbuild.build({
    entryPoints: ["./src/index.tsx"],
    external: ["react", "react-dom", "@gri4d/griiiid"],
    format: "esm",
    bundle: true,
    outfile: distDir + "/esm/index.js",
    sourcemap: false,
    sourcesContent: false,
    minify: true,
  });
  console.log(`3. Created ./${distDir}/esm/index.js`);
}

main();
