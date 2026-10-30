import http from 'node:http';import {readFile} from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
export function createHandler({preview=false}={}){
 const base=preview?path.join(root,'dist'):root;
 return async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let name=decodeURIComponent(url.pathname).replace(/^\/+/, '')||'index.html';if(name.split('/').some(x=>x.startsWith('.'))||name.includes('\\')||name.includes('\0'))throw Error('Forbidden');
 let file;if(preview){file=path.resolve(base,name);if(!file.startsWith(base+path.sep))throw Error('Forbidden');}else if(name==='index.html'||name.startsWith('src/')){file=path.resolve(root,name);if(!file.startsWith(root+path.sep))throw Error('Forbidden');}else{file=path.resolve(root,'public',name);if(!file.startsWith(path.join(root,'public')+path.sep))throw Error('Forbidden');}
 const content=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});if(req.method!=='HEAD')res.end(content);else res.end();}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Fichier introuvable');}};
}
export function serve({preview=false,port=preview?4173:5173}={}){
 const server=http.createServer(createHandler({preview}));
 server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'Ce port est déjà utilisé. Choisissez PORT=un_autre_port.':e.message);process.exitCode=1;});server.listen(port,'127.0.0.1',()=>console.log((preview?'Aperçu':'Développement')+' : http://localhost:'+port));return server;
}
