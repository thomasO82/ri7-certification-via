export function installViewportLayout(){
 const dialog=document.getElementById('dialog'),body=document.getElementById('dialog-body');let queued=false,page=0,title='',groups=[],nav=null;
 const observer=new MutationObserver(schedule);
 function watch(){observer.observe(body,{childList:true,subtree:true,characterData:true});}
 function show(){observer.disconnect();const all=groups.flat();for(const element of all)element.classList.toggle('viewport-page-hidden',!groups[page]?.includes(element));if(nav){nav.hidden=groups.length<=1;nav.querySelector('span').textContent=`${page+1} / ${Math.max(1,groups.length)}`;nav.querySelector('[data-prev]').disabled=page===0;nav.querySelector('[data-next]').disabled=page>=groups.length-1;}watch();}
 function layout(){queued=false;if(!dialog.open)return;observer.disconnect();
  if(dialog.classList.contains('todo-dialog')){if(nav)nav.hidden=true;watch();return;}
  if(dialog.classList.contains('study-dialog')){if(nav)nav.hidden=true;watch();return;}
  if(dialog.classList.contains('notebook-dialog')){if(nav)nav.hidden=true;watch();return;}
  if(dialog.classList.contains('vn-dialog')){if(nav)nav.hidden=true;watch();return;}
  if(dialog.classList.contains('original-game-dialog')){if(nav)nav.hidden=true;watch();return;}
  if(dialog.classList.contains('course-dialog')){if(nav)nav.hidden=true;const stage=body.querySelector('.interactive-lesson');if(stage){stage.style.setProperty('width','100%','important');stage.style.setProperty('height','100%','important');if(dialog.classList.contains('course-zoomed')&&innerWidth<700){stage.style.setProperty('width','960px','important');stage.style.setProperty('height','540px','important');watch();return;}const bounds=stage.getBoundingClientRect(),width=Math.min(bounds.width,bounds.height*16/9);stage.style.setProperty('width',width+'px','important');stage.style.setProperty('height',width*9/16+'px','important');stage.style.justifySelf='center';stage.style.alignSelf='center';}watch();return;}
  for(const element of body.querySelectorAll('.viewport-page-hidden'))element.classList.remove('viewport-page-hidden');
  for(const element of body.querySelectorAll('.viewport-flatten'))element.classList.remove('viewport-flatten');
  if(!nav){nav=document.createElement('nav');nav.className='viewport-pagination';nav.setAttribute('aria-label','Pages de cette fenêtre');nav.innerHTML='<button class="secondary" data-prev>← Précédent</button><span role="status"></span><button class="secondary" data-next>Suivant →</button>';dialog.append(nav);nav.querySelector('[data-prev]').onclick=()=>{page--;show();};nav.querySelector('[data-next]').onclick=()=>{page++;show();};}
  nav.hidden=false;
  const currentTitle=document.getElementById('dialog-title')?.textContent||'';if(title!==currentTitle){title=currentTitle;page=0;}
  const roots=[...body.children],pinned=roots.filter(e=>e.matches('h2,.character-heading,.dialog-actions,#tutorial-coach'));
  const available=Math.max(90,body.clientHeight-pinned.reduce((n,e)=>n+e.getBoundingClientRect().height+8,0)-16);
  const units=[];
  function collect(element){if(element.getBoundingClientRect().height>available&&element.children.length>1&&!element.matches('p,blockquote,button,figure')){element.classList.add('viewport-flatten');for(const child of element.children)collect(child);}else units.push(element);}
  for(const element of roots)if(!pinned.includes(element))collect(element);
  groups=[[]];let used=0;
  for(const element of units){const height=element.getBoundingClientRect().height+12;if(used+height>available&&groups.at(-1).length){groups.push([]);used=0;}groups.at(-1).push(element);used+=height;}
  page=Math.min(page,groups.length-1);show();
 }
 function schedule(){if(queued)return;queued=true;requestAnimationFrame(layout);}
 watch();window.addEventListener('resize',schedule);dialog.addEventListener('close',()=>{page=0;title='';});document.addEventListener('click',schedule);schedule();
}
