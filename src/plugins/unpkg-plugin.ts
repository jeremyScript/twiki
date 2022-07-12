import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPlugin = (inputCode: string) => ({
  name: "unpkg-plugin",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /^index\.tsx$/ }, (args) => ({
      path: args.path,
      namespace: "a",
    }));

    build.onResolve({ filter: /^\.\/*/ }, (args) => {
      const regex = /\.+\/*/;
      const moduleUrl = args.resolveDir + "/" + args.path.replace(regex, "");
      console.log(moduleUrl);
      return {
        path: moduleUrl,
        namespace: "b",
      };
    });

    build.onResolve({ filter: /^[a-z]+[-]*[a-z-]*$/ }, (args) => {
      return {
        path: args.path,
        namespace: "b",
      };
    });

    build.onLoad({ filter: /.*/ }, async (args) => {
      if (args.path === "index.tsx") {
        return {
          contents: inputCode,
          loader: "tsx",
        };
      } else {
        const moduleUrl = new URL(args.path, "https://www.unpkg.com/").href;
        const { data, request } = await axios.get(moduleUrl);
        console.log("request", request);
        return {
          contents: data,
          loader: "tsx",
          resolveDir: args.path,
        };
      }
    });
  },
});
