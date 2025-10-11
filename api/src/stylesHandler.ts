import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';

/**
 * Reads the contents of the global CSS file located two directories up from the current dist folder.
 * Assumes the CSS is in a 'styles/globals.css' relative to the project root.
 * 
 * @returns The CSS file contents as a string, or null on error.
 */
export function getGlobalsCss(): string | null {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        
        // Go up two folders to reach the project root (from /dist)
        const projectDir = join(__dirname, '../');
        const globalsCssPath = join(projectDir, 'styles/globals.css');
        
        console.info('Building global styles');
        console.info({ __dirname, projectDir, globalsCssPath });
        
        const file = readFileSync(globalsCssPath, 'utf-8');
        return file;
    } catch (err) {
        console.error('Error on getGlobalsCss', err);
        return null;
    }
}

const globalsFile =getGlobalsCss()


export function stylesHandler(res: any) {
    res.writeHead(200, { "Content-Type": "text/css" });
    return "";
}
