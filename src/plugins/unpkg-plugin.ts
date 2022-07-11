import * as esbuild from "esbuild-wasm";

export const unpkgPlugin = {
  name: "unpkg-plugin",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: / / }, (args) => ({}));

    build.onLoad({ filter: / / }, () => ({}));
  },
};
