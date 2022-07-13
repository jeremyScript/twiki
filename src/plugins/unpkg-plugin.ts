import * as esbuild from "esbuild-wasm";
import { OnResolveArgs, OnLoadArgs } from "esbuild-wasm";
import axios from "axios";

const pkgUrl = "https://unpkg.com";

export const unpkgPlugin = (inputCode: string) => ({
  name: "unpkg-plugin",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /^index\.tsx$/ }, () => ({
      path: "index.tsx",
      namespace: "a",
    }));

    build.onResolve({ filter: /^\.+\// }, (args: OnResolveArgs) => {
      return {
        path: new URL(args.path, pkgUrl + args.resolveDir + "/").href,
        namespace: "b",
      };
    });

    build.onResolve({ filter: /.*/ }, (args: OnResolveArgs) => ({
      path: pkgUrl + "/" + args.path,
      namespace: "b",
    }));

    build.onLoad({ filter: /^index\.tsx$/ }, async () => ({
      loader: "tsx",
      contents: inputCode,
    }));

    build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
      const { data, request } = await axios.get(args.path);
      return {
        loader: "tsx",
        contents: data,
        resolveDir: new URL("./", request.responseURL).pathname,
      };
    });
  },
});
