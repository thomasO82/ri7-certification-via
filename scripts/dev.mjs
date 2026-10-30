import {serve} from './server.mjs';
serve({port:Number(process.env.PORT||5173)});
