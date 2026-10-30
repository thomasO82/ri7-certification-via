export function mountLessonMedia({video,url,resumeAt=0,preferences,onPosition,onEnded,onCaption,onState,onChange}){
 let generation=0,disposed=false,metadata=false,resuming=false,positionReady=false,lastSaved=-1,playPending=null,seekRequested=false,seekAttempts=0;const listeners=[];
 const emit=(state,message='')=>{if(!disposed)onState?.(state,message);};
 const save=()=>{if(disposed||!metadata||!positionReady||resuming||video.ended||!Number.isFinite(video.currentTime))return;if(video.currentTime!==lastSaved){lastSaved=video.currentTime;onPosition?.(video.currentTime);}};
 const ready=()=>{if(!resuming&&positionReady&&video.readyState>=2)emit('ready');};
 const play=()=>{if(disposed)return Promise.resolve();if(resuming)return Promise.resolve();if(playPending)return playPending;const token=generation;const pending=Promise.resolve().then(()=>{if(disposed||token!==generation)return;return video.play();}).then(()=>{if(!disposed&&token===generation){ready();onChange?.();}}).catch(error=>{if(disposed||token!==generation||error?.name==='AbortError')return;if(error?.name==='NotAllowedError')emit('blocked','Cliquez pour lancer l’accompagnement.');else emit('error','La vidéo n’a pas pu démarrer. Réessayez ; les slides restent disponibles.');onChange?.();}).finally(()=>{if(playPending===pending)playPending=null;});playPending=pending;return pending;};
 const listen=(name,handler)=>{video.addEventListener(name,handler);listeners.push([name,handler]);};
 const seekResume=()=>{if(disposed||!resuming||seekRequested||video.readyState<2)return;seekRequested=true;seekAttempts++;try{video.currentTime=resumeAt;}catch{emit('error','Impossible de reprendre la vidéo. Réessayez.');}};
 listen('loadedmetadata',()=>{metadata=true;if(Number.isFinite(video.duration)&&resumeAt>0&&resumeAt<video.duration){resuming=true;emit('loading','Reprise de la vidéo…');seekResume();}else{positionReady=true;if(preferences.playing)play();ready();}});
 listen('seeked',()=>{if(resuming){if(Math.abs(video.currentTime-resumeAt)>.4){seekRequested=false;if(seekAttempts<2)seekResume();else emit('error','La reprise est indisponible. Réessayez.');return;}resuming=false;positionReady=true;if(preferences.playing)play();}onCaption?.(video.currentTime);ready();});
 for(const event of ['loadeddata','canplay'])listen(event,()=>{seekResume();ready();});listen('playing',()=>{ready();onChange?.();});
 for(const event of ['waiting','stalled'])listen(event,()=>{if(preferences.playing)emit(metadata?'buffering':'loading',metadata?'Mise en mémoire tampon…':'Chargement de la vidéo…');});
 listen('timeupdate',()=>{if(!positionReady||resuming)return;onCaption?.(video.currentTime);if(Math.abs(video.currentTime-lastSaved)>=5)save();});
 listen('pause',()=>{save();onChange?.();});listen('play',()=>onChange?.());listen('ended',()=>{if(!positionReady)return;onEnded?.();onChange?.();});
 listen('error',()=>{emit('error','Accompagnement indisponible. Vous pouvez continuer les slides.');onChange?.();});
 const load=()=>{generation++;metadata=false;positionReady=false;resuming=false;seekRequested=false;seekAttempts=0;emit(preferences.playing?'loading':'paused',preferences.playing?'Chargement de la vidéo…':'Accompagnement en pause.');video.preload=preferences.playing?'auto':'metadata';video.autoplay=false;video.src=url;video.load();if(preferences.playing&&!resumeAt)play();};
 load();
 return {play,pause:()=>video.pause(),retry:()=>{save();if(positionReady)resumeAt=video.currentTime;playPending=null;load();},cleanup:()=>{if(disposed)return;save();disposed=true;for(const [event,handler] of listeners)video.removeEventListener(event,handler);video.pause();}};
}
