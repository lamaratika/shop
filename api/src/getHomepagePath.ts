import { normalize, resolve, dirname } from "path/posix";
import type pug from "pug";
import { fileURLToPath } from "url";

function getHomepagePath(folder: string): string {
  const viewsPath = normalize(resolve(folder, "../views"));
  const homePagePath = viewsPath + "/home/index.pug";
  return homePagePath;
}
const __dirname = dirname(fileURLToPath(import.meta.url));
const homePagePath = getHomepagePath(__dirname);

export const homePage = pug.compileFile(homePagePath, { pretty: true })({
  title: "Home",
});
