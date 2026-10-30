// Compatibilité avec l’ancien fichier HTML : transférer uniquement les sauvegardes du jeu.
export const progressKeys=['ri7-laboratoire-v1','ri7-notebook-v1','ri7-study-v1','ri7-dialogue-progress-v1','ri7-quick-tour-v2','ri7-media-preferences'];
export function parseProgressTransfer(hash){
 if(!hash.startsWith('#ri7-save=')||hash.length>7000000)return null;
 try{const entries=JSON.parse(decodeURIComponent(hash.slice(10)));if(!entries||Array.isArray(entries)||typeof entries!=='object')return null;for(const [key,value] of Object.entries(entries))if(!progressKeys.includes(key)||typeof value!=='string')return null;return entries;}catch{return null;}
}
export function restoreTransferredProgress(){
 try{const entries=parseProgressTransfer(location.hash);if(!entries)return;for(const [key,value] of Object.entries(entries))if(localStorage.getItem(key)===null)localStorage.setItem(key,value);history.replaceState(null,'',location.pathname+location.search);}catch{/* L’ancienne sauvegarde reste disponible au chemin historique. */}
}
