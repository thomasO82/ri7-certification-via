export async function requestGameFullscreen(){
 const root=document.documentElement;
 if(document.fullscreenElement||!root.requestFullscreen)return;
 try{await Promise.race([root.requestFullscreen(),new Promise(resolve=>setTimeout(resolve,1000))]);}catch{/* L’entrée du jeu reste disponible si le navigateur refuse le plein écran. */}
}
export function installImmersiveMode(){
 const root=document.documentElement;
 async function enter(){await requestGameFullscreen();}
 async function toggle(){if(document.fullscreenElement)try{await document.exitFullscreen();}catch{}else await enter();}
 const button=document.createElement('button');button.id='fullscreen-mode';button.className='tool immersive-toggle';button.innerHTML='<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></svg><span>Plein écran</span>';button.onclick=toggle;document.querySelector('.toolbar nav').append(button);
 const dialogButton=document.createElement('button');dialogButton.className='immersive-toggle';dialogButton.onclick=toggle;document.querySelector('.dialog-top').append(dialogButton);
 function labels(){const text=document.fullscreenElement?'Quitter le plein écran':'Plein écran';button.setAttribute('aria-label',text);button.querySelector('span').textContent=text;dialogButton.textContent=text;}
 document.addEventListener('fullscreenchange',labels);labels();
 const back=document.getElementById('close-dialog');back.textContent='← Retour';back.setAttribute('aria-label','Retour au laboratoire');
}
