// Rectangles en pourcentage de l'illustration ; aucun repère n'est dessiné au repos.
export const sceneLayouts={
 reception:{computer:[65,36,15,18],clues:[[38,46,10,12],[52,51,10,10]],puzzles:[
  {place:'La bibliothèque',rect:[34,22,12,21]},
  {place:'La carte murale',rect:[53,13,18,22]},
  {place:'Le meuble à dossiers',rect:[85,28,11,34]},
  {place:'Le globe',rect:[48,34,7,12]},
  {place:'Le tiroir du bureau',rect:[63,63,10,12]},
  {place:'La porte du laboratoire',rect:[77,20,7,43]}
 ]},
 archives:{computer:null,clues:[[40,48,12,12],[65,50,14,13]],puzzles:[
  {place:'La machine en laiton',rect:[81,26,15,24]},
  {place:'Les boîtes d’archives',rect:[3,8,9,31]},
  {place:'Le globe des archives',rect:[54,30,9,16]},
  {place:'Les livres près de la fenêtre',rect:[65,34,9,13]},
  {place:'Le registre au premier plan',rect:[85,73,12,18]},
  {place:'Le pot à crayons',rect:[46,39,6,10]}
 ]},
 observatory:{computer:[44,33,17,23],clues:[[66,53,14,10],[32,53,10,11]],puzzles:[
  {place:'Le tableau des connexions',rect:[57,5,25,28]},
  {place:'L’armoire des serveurs',rect:[90,27,9,48]},
  {place:'La plante de l’observatoire',rect:[79,17,8,27]},
  {place:'La lampe de bureau',rect:[35,28,8,23]},
  {place:'Les étagères',rect:[32,5,12,20]},
  {place:'Le fauteuil',rect:[44,65,19,23]}
 ]}
};
export function positionInScene(element,rect){const [x,y,w,h]=rect;element.style.left=x+'%';element.style.top=y+'%';element.style.width=w+'%';element.style.height=h+'%';element.style.setProperty('--scene-x',x+'%');element.style.setProperty('--scene-y',y+'%');}

for(const layout of Object.values(sceneLayouts)){layout.computer=[23,56,27,32];layout.notebook=[49,79,27,14];layout.puzzles=[{place:'Le tableau d’exercice',rect:[75,57,21,32]}];}

sceneLayouts.reception.guide=[3,77,12.5,15];sceneLayouts.reception.revision=[57.8,66,12,13];
sceneLayouts.archives.guide=[5.2,73.5,8.5,12];sceneLayouts.archives.revision=[57.7,67,11.8,11.5];
sceneLayouts.observatory.guide=[5.8,73,8,11.5];sceneLayouts.observatory.revision=[57,68,12,11];
for(const layout of Object.values(sceneLayouts))layout.notebook=[48.5,77.5,27.8,16];

for(const layout of Object.values(sceneLayouts))layout.revision=[57.8,66,12,13];
