import * as esbuild from "esbuild-wasm";
import { unpkgResolvePlugin } from "./plugins/unpkg-resolve-plugin";
import { unpkgLoadPlugin } from "./plugins/unpkg-load-plugin";

let service: esbuild.Service;

const startService = async () => {
  try {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.57/esbuild.wasm",
    });
  } catch (err) {
    console.error(err);
  }
};

const bundle = async (codeToBeBundled: string) => {
  if (!service) {
    await startService();
  }
  try {
    const bundled = await service.build({
      entryPoints: ["index.tsx"],
      bundle: true,
      write: false,
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
      plugins: [unpkgResolvePlugin, unpkgLoadPlugin(codeToBeBundled)],
    });

    return { code: bundled.outputFiles[0].text, bundleStatus: "" };
  } catch (error: any) {
    return {
      code: "",
      bundleStatus: error.message,
    };
  }
};

export default bundle;
