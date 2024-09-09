import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import resolve from "vite-plugin-resolve";
import fs from "fs";
import path from "path";
// import cspPlugin from "vite-plugin-csp";


const aztecVersion = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json")).toString())["dependencies"]["@aztec/aztec.js"];
const cleanedVersion = aztecVersion.replace(/^\^/, '');

export default defineConfig({
    plugins: [
        // cspPlugin({
        //     policy: [
        //         {    
        //         // "default-src": ['self', 'wasm-unsafe-eval', 'inline-speculation-rules', "https://unpkg.com/@aztec/", "http://localhost:*", "http://127.0.0.1:*"],
        //             'script-src': [
        //                 'self', 
        //                 'wasm-unsafe-eval' as any, 
        //                 'inline-speculation-rules' as any, 
        //                 "http://localhost:*", 
        //                 "http://127.0.0.1:*"
        //             ],
        //         },
        //     ],
        // }),
        process.env.NODE_ENV === "production"
            ? /** @type {any} */ (
                resolve({
                    "@aztec/bb.js": `export * from "https://unpkg.com/@aztec/bb.js@${cleanedVersion}/dest/browser/index.js"`,
                })
            )
            : undefined,
        nodePolyfills(),
    ],
    build: {
        target: "esnext",
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "esnext",
        },
    },
});