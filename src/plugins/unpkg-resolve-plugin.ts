import { PluginBuild, OnResolveArgs } from "esbuild-wasm";

const pkgUrl = "https://unpkg.com";

export const unpkgResolvePlugin = {
  name: "unpkg-resolve-plugin",
  setup(build: PluginBuild) {
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
  },
};
