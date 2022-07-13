import {
  PluginBuild,
  OnResolveArgs,
  OnLoadArgs,
  OnLoadResult,
} from "esbuild-wasm";
import localforage from "localforage";
import axios from "axios";

const moduleCache = localforage.createInstance({
  name: "moduleCache",
});

const pkgUrl = "https://unpkg.com";

export const unpkgPlugin = (inputCode: string) => ({
  name: "unpkg-plugin",
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

    build.onLoad({ filter: /^index\.tsx$/ }, async () => ({
      loader: "tsx",
      contents: inputCode,
    }));

    build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
      const cachedResult = await moduleCache.getItem<OnLoadResult>(args.path);
      if (cachedResult) {
        return cachedResult;
      } else {
        const { data, request } = await axios.get(args.path);
        const result: OnLoadResult = {
          loader: "tsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await moduleCache.setItem(args.path, result);
        return result;
      }
    });
  },
});
