import {readFile,writeFile,cp,mkdir,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFile(path.join(root,p),'utf8');
const mime=p=>({'.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2'}[path.extname(p)]||'application/octet-stream');
async function data(p){return 'data:'+mime(p)+';base64,'+(await readFile(path.join(root,'public',p))).toString('base64');}
async function files(dir){let all=[];for(const entry of await readdir(path.join(root,dir),{withFileTypes:true})){const p=dir+'/'+entry.name;if(entry.isDirectory())all.push(...await files(p));else all.push(p);}return all;}
const html=await read('index.html');
await mkdir(path.join(root,'dist'),{recursive:true});
await cp(path.join(root,'public'),path.join(root,'dist'),{recursive:true});
await cp(path.join(root,'src'),path.join(root,'dist/src'),{recursive:true});
await writeFile(path.join(root,'dist/index.html'),html);
let standalone=html;
for(const match of html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)){
 const p=match[1];let css=(await read(p)).replace(/^@import.*$/gm,'');
 for(const url of [...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)]){if(/^(data:|https?:)/.test(url[1]))continue;const resource=path.posix.normalize(path.posix.join(path.posix.dirname(p),url[1]));css=css.replaceAll(url[0],'url("'+await data(resource)+'")');}
 standalone=standalone.replace(match[0],()=>'<style>'+css+'</style>');
}
const visited=new Set();const ordered=[];
async function visit(p){if(visited.has(p))return;visited.add(p);const source=await read(p);for(const imp of source.matchAll(/^import .*?from\s*['"]([^'"]+)['"];?\s*$/gm)){if(!imp[1].startsWith('.'))throw Error('Import non local : '+imp[1]);await visit(path.posix.normalize(path.posix.join(path.posix.dirname(p),imp[1])));}ordered.push(source.replace(/^import .*?;\s*$/gm,'').replace(/\bexport /g,''));}
await visit('src/main.js');let code=ordered.join('\n');
for(const p of await files('public/assets')){const asset=p.slice('public/'.length);if(code.includes(asset))code=code.replaceAll(asset,await data(asset));}
standalone=standalone.replace('<script type="module" src="src/main.js"></script>',()=>'<script>\n(()=>{'+code.replaceAll('</script','<\\/script')+'\n})();\n</script>');
const favicon=await data('favicon.svg');standalone=standalone.replace('href="favicon.svg"',()=> 'href="'+favicon+'"');

const licenses=await Promise.all(['OFL-Poppins.txt','OFL-FiraCode.txt'].map(f=>read('public/assets/fonts/'+f)));
standalone=standalone.replace('</head>',()=>'<script type="text/plain" id="font-licenses">'+licenses.join('\n\n').replaceAll('</script','<\\/script')+'</script></head>');
await writeFile(path.join(root,'dist/Jouer-au-laboratoire.html'),standalone);
console.log('Site web : dist/index.html — Version autonome : dist/Jouer-au-laboratoire.html ('+Math.round(Buffer.byteLength(standalone)/1048576*10)/10+' Mo).');

// Maintenir l’ancien chemin sans dupliquer le jeu ; transférer les sauvegardes locales.
await mkdir(path.join(root,'outputs'),{recursive:true});
const legacyKeys=['ri7-laboratoire-v1','ri7-notebook-v1','ri7-study-v1','ri7-dialogue-progress-v1','ri7-quick-tour-v2','ri7-media-preferences'];
const launcher='<!doctype html><html lang="fr"><meta charset="utf-8"><title>RI7, certification VIA</title><p>Le jeu a été déplacé. <a id="game" href="../dist/Jouer-au-laboratoire.html">Ouvrir le jeu</a></p><script>let target="../dist/Jouer-au-laboratoire.html";try{const saves={};for(const key of '+JSON.stringify(legacyKeys)+'){const value=localStorage.getItem(key);if(value!==null)saves[key]=value;}if(Object.keys(saves).length)target+="#ri7-save="+encodeURIComponent(JSON.stringify(saves));}catch{}document.getElementById("game").href=target;location.replace(target);</script></html>';
await writeFile(path.join(root,'outputs/Jouer-au-laboratoire.html'),launcher);
