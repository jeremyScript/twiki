import { PluginBuild, OnLoadArgs, OnLoadResult } from "esbuild-wasm";
import localforage from "localforage";
import axios from "axios";

const moduleCache = localforage.createInstance({
  name: "moduleCache",
});

export const unpkgLoadPlugin = (inputCode: string) => ({
  name: "unpkg-load-plugin",
  setup(build: PluginBuild) {
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
        const onLoadResult: OnLoadResult = {
          loader: "tsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await moduleCache.setItem(args.path, onLoadResult);
        return onLoadResult;
      }
    });
  },
});
