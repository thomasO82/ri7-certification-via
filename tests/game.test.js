import {courseParts,slideById} from '../src/data/course-data.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { terms, missions } from '../src/data/content.js';
import { initialState, interact, getAvailableActions } from '../src/core/engine.js';
import { loadProgress, saveProgress,validProgress } from '../src/core/storage.js';

test('39 notions documentées et introduites dans les dix missions',()=>{
 assert.equal(terms.length,39); assert.equal(new Set(terms.map(t=>t.id)).size,39); assert.equal(missions.length,10);
 for(const t of terms){assert.ok(t.definition.length>40,t.name);assert.ok(t.example.length>15,t.name);assert.ok(missions.some(m=>m.terms.includes(t.id)),t.name);}
 assert.deepEqual([...new Set(missions.map(m=>m.helper))].sort(),['Brendan','Thomas','William']);
});
function collectEvidence(s,m){s=interact(s,{type:'talk'}).state;for(const o of m.objects)s=interact(s,{type:'collect',id:o.id}).state;return interact(s,{type:'combine',ids:m.objects.map(o=>o.id)}).state;}
test('dix dossiers : jeux originaux Ri7, preuves, cours et sauvegardes',()=>{let s=initialState();const kinds=new Set;for(const [index,m]of missions.entries()){assert.equal(m.puzzles.length,1);const p=m.puzzles[0];assert.equal(p.type,'original-game');kinds.add(p.original.game);s=collectEvidence(s,m);assert.equal(interact(s,{type:'answer',answer:[]}).state.solved,false);assert.equal(interact(s,{type:'original-game-complete',game:p.original.game,score:7,total:8}).state.solved,false);s=interact(s,{type:'original-game-complete',game:p.original.game,score:8,total:8}).state;assert.equal(s.solved,true);for(const slideId of courseParts[index].slides)for(let step=1;step<=slideById[slideId].steps;step++)s=interact(s,{type:'slide-step',slideId,step}).state;s=interact(s,{type:'next'}).state;assert.equal(validProgress(s),true);}assert.equal(s.finished,true);assert.equal(kinds.size,5);assert.equal(s.discovered.length,39);});
test('une sauvegarde avec un objet disparu ou une étape sans preuve est rejetée',()=>{
 for(const change of [{collected:['inconnu']},{step:1},{evidence:['m1']},{inventory:['letters']}]){
 const s={...initialState(),...change};assert.equal(validProgress(s),false,JSON.stringify(change));
 assert.deepEqual(loadProgress({getItem(){return JSON.stringify(s)}}),initialState());
 }
});
test('une erreur explique sans bloquer, une bonne réponse exige les preuves',()=>{
 let s=initialState(),m=missions[0];let r=interact(s,{type:'answer',answer:m.puzzles[0].solution});assert.equal(r.state.step,0);
 s=collectEvidence(s,m);r=interact(s,{type:'answer',answer:['incorrect']});assert.equal(r.state.step,0);assert.ok(r.message.length>20);assert.ok(getAvailableActions(r.state).includes('answer'));
});
test('collecte et combinaison sont retirées ; le jeu demande seulement le guide',()=>{const s=initialState();assert.deepEqual(interact(s,{type:'collect',id:'letters'}).state,s);assert.deepEqual(interact(s,{type:'combine',ids:['letters','lens']}).state,s);assert.equal(getAvailableActions(s).includes('combine'),false);const talked=interact(s,{type:'talk'}).state;assert.equal(getAvailableActions(talked).includes('answer'),true);assert.deepEqual(talked.evidence,[]);});
test('sauvegarde et reprise après une réponse, corruption et stockage indisponible',()=>{
 const memory={value:null,getItem(){return this.value},setItem(k,v){this.value=v}};
 let s=collectEvidence(initialState(),missions[0]);s=interact(s,{type:'answer',answer:missions[0].puzzles[0].solution}).state;
 assert.equal(saveProgress(s,memory),true);assert.deepEqual(loadProgress(memory),s);
 for(const bad of ['{','null','{"version":1,"mission":100}','{"version":1,"mission":0,"step":-8}']){memory.value=bad;assert.deepEqual(loadProgress(memory),initialState());}
 assert.equal(saveProgress(s,{setItem(){throw Error('quota')}}),false);
 assert.deepEqual(loadProgress({getItem(){throw Error('denied')}}),initialState());
});
