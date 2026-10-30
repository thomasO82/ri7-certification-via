import {serve} from './server.mjs';
serve({preview:true,port:Number(process.env.PORT||4173)});
