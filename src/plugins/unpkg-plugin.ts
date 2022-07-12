import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPlugin = (inputCode: string) => ({
  name: "unpkg-plugin",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /^index\.tsx$/ }, (args) => ({
      path: args.path,
      namespace: "a",
    }));

    build.onLoad({ filter: /^index\.tsx$/ }, () => {
      return {
        contents: inputCode,
        loader: "tsx",
      };
    });

    build.onResolve({ filter: /^[a-z]+[-]*[a-z-]*$/ }, (args) => {
      return {
        path: args.path,
        namespace: "b",
      };
    });

    build.onLoad({ filter: /^[a-z]+[-]*[a-z-]*$/ }, async (args) => {
      const pkgUrl = "https://www.unpkg.com/" + args.path;
      const { data } = await axios.get(pkgUrl);

      return {
        contents: data,
        loader: "tsx",
      };
    });
  },
});
