import {courseParts,slideById} from '../data/course-data.js';
import {canOpenSlide,initialState,interact} from './engine.js';
import {missions,terms} from '../data/content.js';
const KEY='ri7-laboratoire-v1';
function validBaseProgress(s){
 if(!s||![1,2,3,4].includes(s.version)||!Number.isInteger(s.mission)||s.mission<0||s.mission>=missions.length||!Number.isInteger(s.step)||s.step<0||s.step>(s.version<4?[3,3,3,3,2,3,2,2,4,6][s.mission]:missions[s.mission].puzzles.length))return false;
 const fields=['inventory','collected','evidence','talked','completed','discovered','practiced'];
 if(!fields.every(k=>Array.isArray(s[k])&&s[k].every(v=>typeof v==='string')&&new Set(s[k]).size===s[k].length))return false;
 const mids=missions.map(m=>m.id),oids=missions.flatMap(m=>m.objects.map(o=>o.id)),tids=terms.map(t=>t.id);
 if(!['solved','finished'].every(k=>typeof s[k]==='boolean'))return false;
 if(!['inventory','collected'].every(k=>s[k].every(id=>oids.includes(id)))||!['evidence','talked','completed'].every(k=>s[k].every(id=>mids.includes(id)))||!['discovered','practiced'].every(k=>s[k].every(id=>tids.includes(id))))return false;
 if(s.solved!==(s.step===(s.version<4?[3,3,3,3,2,3,2,2,4,6][s.mission]:missions[s.mission].puzzles.length)))return false;
 if(s.finished&&(!s.solved||s.mission!==9||s.completed.length!==10))return false;
 if(s.mission>0&&!missions.slice(0,s.mission).every(m=>s.completed.includes(m.id)))return false;
 const same=(a,b)=>a.length===b.length&&a.every(id=>b.includes(id));
 const previous=missions.slice(0,s.mission),current=missions[s.mission],accessible=[...previous,current];
 const expectedCompleted=[...previous.map(m=>m.id),...(s.solved?[current.id]:[])];
 if(!same(s.completed,expectedCompleted))return false;
 if(!s.evidence.every(id=>accessible.some(m=>m.id===id)))return false;
 if(!s.talked.every(id=>accessible.some(m=>m.id===id))||!previous.every(m=>s.talked.includes(m.id)))return false;
 if(s.step>0&&!s.talked.includes(current.id))return false;
 const allowedObjects=accessible.flatMap(m=>m.objects.map(o=>o.id));
 if(!s.collected.every(id=>allowedObjects.includes(id)))return false;
 if(!missions.filter(m=>s.evidence.includes(m.id)).every(m=>m.objects.every(o=>s.collected.includes(o.id))))return false;
 const expectedInventory=s.evidence.includes(current.id)?[]:current.objects.map(o=>o.id).filter(id=>s.collected.includes(id));
 if(!s.inventory.every(id=>s.collected.includes(id)))return false;
 if(!same(s.discovered,[...new Set(missions.filter(m=>s.talked.includes(m.id)).flatMap(m=>m.terms))]))return false;
 if(!same(s.practiced,[...new Set(missions.filter(m=>s.completed.includes(m.id)).flatMap(m=>m.terms))]))return false;
 return true;
}
function validMedia(s){
 if(!Array.isArray(s.watched)||new Set(s.watched).size!==s.watched.length||!s.videoPositions||typeof s.videoPositions!=='object'||Array.isArray(s.videoPositions))return false;
 const allowed=id=>{const i=courseParts.findIndex(p=>p.slides.includes(id));return i>=0&&canOpenSlide(s,i,courseParts[i].slides.indexOf(id));};
 return s.watched.every(allowed)&&Object.entries(s.videoPositions).every(([id,t])=>Number.isFinite(t)&&t>=0&&allowed(Number(id)));
}
export function validProgress(s){
 if(!validBaseProgress(s)||s.version!==4||!validMedia(s)||!Array.isArray(s.studied)||new Set(s.studied).size!==s.studied.length||!s.slideSteps||typeof s.slideSteps!=='object'||Array.isArray(s.slideSteps))return false;
 const validStep=([key,n])=>{const id=Number(key),slide=slideById[id],i=courseParts.findIndex(p=>p.slides.includes(id));return !!slide&&Number.isInteger(n)&&n>=0&&n<=slide.steps&&canOpenSlide(s,i,courseParts[i].slides.indexOf(id));};
 return Object.entries(s.slideSteps).every(validStep)&&s.studied.every(id=>Number.isInteger(id)&&!!slideById[id]&&s.slideSteps[id]===slideById[id].steps)&&Object.entries(s.slideSteps).every(([id,n])=>n!==slideById[id].steps||s.studied.includes(Number(id)));
}
function loadStoredProgress(storage){try{const s=JSON.parse((storage??globalThis.localStorage).getItem(KEY));
 if(s?.version===1&&validBaseProgress(s))return {...s,version:4,step:s.solved?1:0,studied:[],slideSteps:{},watched:[],videoPositions:{}};
 if(s?.version===2&&validBaseProgress(s)&&validMedia(s)){const migrated={...s,version:4,step:s.solved?1:0,studied:[...s.watched],slideSteps:Object.fromEntries(s.watched.map(id=>[id,slideById[id].steps]))};return validProgress(migrated)?migrated:initialState();}
 if(s?.version===3&&validBaseProgress(s)){const migrated={...s,version:4,step:s.solved?1:0};return validProgress(migrated)?migrated:initialState();}
 return validProgress(s)?s:initialState();}catch{return initialState();}}
export function saveProgress(s,storage){try{(storage??globalThis.localStorage).setItem(KEY,JSON.stringify(s));return true;}catch{return false;}}

export function loadProgress(storage){return loadStoredProgress(storage);}
