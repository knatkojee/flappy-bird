"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const vite_1 = require("vite");
const port = process.env.PORT || 3002;
const clientPath = path_1.default.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';
async function createServer() {
    const app = (0, express_1.default)();
    if (isDev) {
        const vite = await (0, vite_1.createServer)({
            server: { middlewareMode: true },
            root: clientPath,
            appType: 'custom',
            ssr: {
                noExternal: [],
                external: ['react', 'react-dom', 'express', 'dotenv']
            }
        });
        app.use(vite.middlewares);
        app.get('*', async (req, res) => {
            try {
                const template = await promises_1.default.readFile(path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
                const transformed = await vite.transformIndexHtml(req.url, template);
                const { render } = await vite.ssrLoadModule(path_1.default.join(clientPath, 'src/entry-server.tsx'));
                const appHtml = await render(req.url);
                const html = transformed.replace('<!--ssr-outlet-->', appHtml);
                res.send(html);
            }
            catch (e) {
                console.error(e);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    else {
        app.use(express_1.default.static(path_1.default.join(clientPath, 'dist/client'), { index: false }));
        const template = await promises_1.default.readFile(path_1.default.join(clientPath, 'dist/client/index.html'), 'utf-8');
        const { render } = require(path_1.default.join(clientPath, 'dist/server/entry-server.js'));
        app.get('*', async (req, res) => {
            try {
                const appHtml = await render(req.url);
                const html = template.replace('<!--ssr-outlet-->', appHtml);
                res.send(html);
            }
            catch (e) {
                console.error(e);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    app.listen(port, () => {
        console.log(`✅ SSR server on port ${port}, mode: ${isDev ? 'dev' : 'prod'}`);
    });
}
createServer();
