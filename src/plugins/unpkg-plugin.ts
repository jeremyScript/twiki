import * as esbuild from "esbuild-wasm";

export const unpkgPlugin = (inputCode: string) => ({
  name: "unpkg-plugin",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /^index\.tsx$/ }, (args) => ({
      path: args.path,
      namespace: "a",
    }));

    build.onLoad({ filter: /^index\.tsx$/ }, () => {
      console.log("input", inputCode);
      return {
        contents: inputCode,
        loader: "tsx",
      };
    });
  },
});
