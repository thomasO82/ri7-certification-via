import {courseParts,slideById} from '../data/course-data.js';
import {missions} from '../data/content.js';
export const initialState=()=>({version:4,studied:[],slideSteps:{},watched:[],videoPositions:{},mission:0,step:0,inventory:[],collected:[],evidence:[],talked:[],completed:[],discovered:[],practiced:[],solved:false,finished:false});
export const courseDone=(s,i)=>!!courseParts[i]&&courseParts[i].slides.every(id=>(s.studied??s.watched??[]).includes(id));
export const canOpenCourse=(s,i)=>Number.isInteger(i)&&i>=0&&i<courseParts.length&&courseParts.slice(0,i).every((p,j)=>courseDone(s,j)&&s.completed.includes(missions[j].id));
export const canOpenSlide=(s,i,j)=>canOpenCourse(s,i)&&Number.isInteger(j)&&j>=0&&j<courseParts[i].slides.length&&courseParts[i].slides.slice(0,j).every(id=>(s.studied??s.watched??[]).includes(id));
const add=(a,...items)=>[...new Set([...a,...items])];
export function getAvailableActions(s){if(s.finished)return ['review'];return ['talk',...(s.talked.includes(missions[s.mission].id)?['answer']:[]),...(s.solved?['next']:[])];}
export function interact(current,action){
 const s=structuredClone(current);const m=missions[s.mission];let message='Consultez le cours et entraînez-vous.';let correct=false;
 if(action.type==='slide-step'||action.type==='video-ended'||action.type==='video-position'){
 const i=courseParts.findIndex(p=>p.slides.includes(action.slideId)),j=i<0?-1:courseParts[i].slides.indexOf(action.slideId);
 if(slideById[action.slideId]&&canOpenSlide(s,i,j)){
  if(action.type==='slide-step'){const previous=s.slideSteps[action.slideId]||0;if(Number.isInteger(action.step)&&action.step>=0&&action.step<=slideById[action.slideId].steps&&action.step<=previous+1){s.slideSteps[action.slideId]=Math.max(previous,action.step);if(action.step===slideById[action.slideId].steps)s.studied=add(s.studied,action.slideId);correct=true;}}
  else if(action.type==='video-ended'){s.watched=add(s.watched,action.slideId);s.videoPositions[action.slideId]=0;correct=true;}
  else if(Number.isFinite(action.time)&&action.time>=0)s.videoPositions[action.slideId]=action.time;
 }
 return {state:s,message:'Progression du cours enregistrée.',correct};
 }
 if(s.finished)return {state:s,message:'Le parcours est terminé. Votre carnet reste disponible.',correct};
 switch(action.type){
 case 'talk':s.talked=add(s.talked,m.id);s.discovered=add(s.discovered,...m.terms);message=m.intro;break;
 case 'original-game-complete':{const p=m.puzzles[s.step];if(!s.solved&&getAvailableActions(s).includes('answer')&&p?.type==='original-game'&&action.game===p.original.game&&Number.isFinite(action.score)&&action.total>0&&action.score===action.total){s.step++;s.solved=true;s.completed=add(s.completed,m.id);s.practiced=add(s.practiced,...m.terms);correct=true;message='Jeu Ri7 réussi : le dossier est résolu.';}break;}
 case 'answer':{
 if(!getAvailableActions(s).includes('answer')||s.solved){message='Parlez à votre guide avant de commencer le jeu Ri7.';break;}
 const p=m.puzzles[s.step];if(p.type==='original-game')break;correct=Array.isArray(action.answer)&&JSON.stringify(action.answer)===JSON.stringify(p.solution);
 if(correct){message=p.explanation;s.step++;if(s.step===m.puzzles.length){s.solved=true;s.completed=add(s.completed,m.id);s.practiced=add(s.practiced,...m.terms);}}
 else message='Cette piste ne correspond pas aux observations. '+p.hint+' Vous pouvez consulter les définitions dans votre carnet et réessayer.';
 break;}
 case 'next':if(s.solved&&courseParts.slice(0,s.mission+1).every((p,i)=>courseDone(s,i))){if(s.mission===missions.length-1)s.finished=true;else{s.mission++;s.step=0;s.solved=false;s.inventory=[];}message=s.finished?'Vous avez terminé les dix parties. Les 39 notions sont dans votre carnet.':'Une nouvelle partie vous attend. Parlez à votre guide pour commencer.';}break;
 }
 return {state:s,message,correct};
}
