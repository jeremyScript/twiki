import * as esbuild from "esbuild-wasm";
import axios from "axios";

const pkgUrl = "https://unpkg.com";

export const unpkgPlugin = (inputCode: string) => ({
  name: "unpkg-plugin",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /^index\.tsx$/ }, (args) => ({
      path: "index.tsx",
      namespace: "a",
    }));

    build.onResolve({ filter: /^\.+\// }, (args) => {
      return {
        path: new URL(args.path, pkgUrl + args.resolveDir + "/").href,
        namespace: "b",
      };
    });

    build.onResolve({ filter: /.*/ }, (args) => ({
      path: pkgUrl + args.path,
      namespace: "b",
    }));

    build.onLoad({ filter: /^index\.tsx$/ }, async (args) => ({
      loader: "tsx",
      contents: inputCode,
    }));

    build.onLoad({ filter: /.*/ }, async (args) => {
      const { data, request } = await axios.get(args.path);
      return {
        loader: "tsx",
        contents: data,
        resolveDir: new URL("./", request.responseURL).pathname,
      };
    });
  },
});
