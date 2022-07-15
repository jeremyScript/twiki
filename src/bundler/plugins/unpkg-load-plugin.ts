import { PluginBuild, OnLoadArgs, OnLoadResult } from "esbuild-wasm";
import localforage from "localforage";
import axios from "axios";

const moduleCache = localforage.createInstance({
  name: "moduleCache",
});

const buildResDir = (responseUrl: string) =>
  new URL("./", responseUrl).pathname;

export const unpkgLoadPlugin = (inputCode: string) => ({
  name: "unpkg-load-plugin",
  setup(build: PluginBuild) {
    build.onLoad({ filter: /^index\.tsx$/ }, () => ({
      loader: "tsx",
      contents: inputCode,
    }));

    build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
      const cachedResult = await moduleCache.getItem<OnLoadResult>(args.path);
      if (cachedResult) return cachedResult;
    });

    build.onLoad({ filter: /.css$/ }, async (args: OnLoadArgs) => {
      const { data, request } = await axios.get(args.path);
      const escaped = data
        .replace(/\n/g, "")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');
      const contents = `
        const styleElement = document.createElement('style');
        styleElement.innerText = '${escaped}';
        document.head.appendChild(styleElement);
      `;
      const result: OnLoadResult = {
        loader: "tsx",
        contents,
        resolveDir: buildResDir(request.responseURL),
      };
      await moduleCache.setItem(args.path, result);
      return result;
    });

    build.onLoad({ filter: /.*/ }, async (args: any) => {
      const { data, request } = await axios.get(args.path);
      const result: OnLoadResult = {
        loader: "tsx",
        contents: data,
        resolveDir: buildResDir(request.responseURL),
      };
      await moduleCache.setItem(args.path, result);
      return result;
    });
  },
});
