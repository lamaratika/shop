import { normalize, resolve, dirname } from "path/posix";
import pug from "pug";
import { fileURLToPath } from "url";

function getShopPagePath(folder: string): string {
    let path = "";
    try {
        path = normalize(resolve(folder, "../views"));
    } catch (err) {
        console.error("Error resolving and normalizing path");
        throw err;
    }
    try {
        const pagePath = path + "/shop/index.pug";
        return pagePath;
    } catch (err) {
        console.error("Error while getting file");
        throw err;
    }
}
function compilePug(metaUrl: string): string {
    let __dirname = "";
    let fileName = "";
    try {
        __dirname = dirname(metaUrl);
    } catch (err) {
        console.error("Error on file read");

        throw err;
    }

    try {
        fileName = fileURLToPath(metaUrl);
    } catch (err) {
        console.error("Error on fileURLToPath", err);

        throw err;
    }
    const pagePath = getShopPagePath(fileName);
    console.info("fileName", fileName)
    console.info("pagePath", pagePath)

    try {
        const shopPage = pug.compileFile(pagePath, { pretty: true })({
            title: "Shop",
        });

        return shopPage;
    } catch (err) {
        console.error("Error while compiling pug", err);

        throw err;
    }
}

export const shopPage = compilePug(import.meta.url);
