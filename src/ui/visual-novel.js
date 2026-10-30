export function dialoguePages(segments,maxLength=210){
 const pages=[];for(const text of segments){let page='';for(const word of String(text).split(/\s+/)){if(page.length+word.length+1>maxLength&&page){pages.push(page);page='';}page+=(page?' ':'')+word;}if(page)pages.push(page);}return pages;
}
export function mountVisualNovel(dialog,segments,options={}){
 const pages=dialoguePages(segments),text=dialog.querySelector('#vn-text'),read=dialog.querySelector('#vn-read'),advance=dialog.querySelector('#vn-advance'),choices=dialog.querySelector('.vn-choices'),prompt=dialog.querySelector('#vn-prompt'),counter=dialog.querySelector('#vn-counter'),skip=dialog.querySelector('#vn-skip');
 let index=Math.max(0,Math.floor(options.startPage||0)),characters=0,timer=null,finished=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function stop(){if(timer!==null){clearInterval(timer);timer=null;}}
 function finish(){stop();finished=true;options.onProgress?.(pages.length);options.onComplete?.();text.textContent='Que souhaitez-vous faire ?';read.textContent='Que souhaitez-vous faire ?';prompt.textContent='Choisissez une réponse';counter.textContent='À vous';choices.hidden=false;skip.hidden=true;advance.disabled=true;dialog.classList.add('vn-choosing');}
 function reveal(){stop();characters=pages[index].length;options.onProgress?.(index+1);text.textContent=pages[index];prompt.textContent=index===pages.length-1?'Cliquer pour répondre ▾':'Cliquer pour continuer ▾';advance.setAttribute('aria-label',index===pages.length-1?'Afficher les choix de réponse':'Phrase suivante');}
 function show(){stop();characters=0;text.textContent='';read.textContent=pages[index];counter.textContent=`${index+1} / ${pages.length}`;prompt.textContent='Cliquer pour afficher le texte';advance.setAttribute('aria-label','Afficher le texte complet');if(reduced)return reveal();timer=setInterval(()=>{characters=Math.min(characters+2,pages[index].length);text.textContent=pages[index].slice(0,characters);if(characters===pages[index].length)reveal();},24);}
 advance.onclick=()=>{if(finished)return;if(characters<pages[index].length)return reveal();if(index<pages.length-1){index++;show();}else finish();};
 skip.onclick=finish;choices.hidden=true;if(index<pages.length)show();else finish();
 return ()=>{stop();advance.onclick=null;skip.onclick=null;};
}
