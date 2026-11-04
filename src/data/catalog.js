import { NEW_PRODUCTS, NEW_GALLERY } from './new-works.js';

export const PRODUCTS=[
 {id:1,n:'Catrina azul de girasoles',c:'Catrinas',p:2400,d:'Papel maché y porcelana fría, pintada a mano.',f:'CatrinaAzul'},
 {id:2,n:'Catrina de sombrero negro',c:'Catrinas',p:2600,d:'Sombrero con flores y vestido de cempasúchil.',f:'CatrinaNegro2'},
 {id:3,n:'Catrina blanca de gala',c:'Catrinas',p:2800,d:'Vestido bordado a mano con detalles florales.',f:'catrina-blanco'},
 {id:4,n:'Catrina Frida',c:'Catrinas',p:2200,d:'Trenzas, flores y rebozo para tu ofrenda.',f:'CatrinaFrida'},
 {id:5,n:'Catrina rosa',c:'Catrinas',p:1900,d:'Esbelta y delicada, con adornos de plumas.',f:'CAtrinaRosa'},
 {id:6,n:'Calaca del loro',c:'Calacas',p:1800,d:'Rebozo de colores y un loro de compañía.',f:'Calaca6'},
 {id:7,n:'Calaca con jarrón',c:'Calacas',p:1500,d:'Moño de flores y vestido verde bordado.',f:'Calaca5'},
 {id:8,n:'Calaca de rebozo',c:'Calacas',p:1500,d:'Trenzas largas y rebozo de rayas.',f:'Claca2'},
 {id:9,n:'Espantapájaros del maizal',c:'Halloween',p:1700,d:'Cabeza de calabaza, cuervo y base con calabazas.',f:'Espantapajaros4'},
 {id:10,n:'Jack en el cementerio',c:'Halloween',p:1600,d:'Esqueleto sobre su reja con calabaza.',f:'Jack2'},
 {id:11,n:'Bruja roja',c:'Halloween',p:400,size:'25 cm',d:'25 cm de alto.',f:'bruja1'},
 {id:12,n:'Cascanueces',c:'Navidad',p:1100,d:'Uniforme con detalles dorados.',f:'Soladdo'},
 {id:13,n:'Grinch navideño',c:'Navidad',p:900,d:'Con su gorro y su regalo.',f:'Grinch'},
 {id:14,n:'Reno de luces',c:'Navidad',p:950,d:'Cornamenta iluminada para tu árbol o repisa.',f:'Reno'},
 {id:15,n:'Diorama tienda de aldea',c:'Dioramas',p:3200,d:'Escena en miniatura con árbol, calabazas y detalles.',f:'Dock-animal2'},
 {id:16,n:'Alebrije multicolor',c:'Figuras',p:650,d:'Papel maché con patrones geométricos.',f:'alebrije'},
 {id:17,n:'Kit del taller de catrinas',c:'Taller',p:600,d:'Materiales de las 4 clases para hacer tu catrina de 53 cm.',img:'cat',bg:'#f6c20f'}
];

export const GAL=[
['ColeccionCatrinas','Colección de catrinas','Catrinas'],['CatrinaAzul','Catrina azul de girasoles','Catrinas'],['catrina-blanco','Catrina blanca de gala','Catrinas'],['CatrinaNegro2','Catrina de sombrero negro','Catrinas'],['CartinaNegro','Catrina de calabazas','Catrinas'],['Catrina2','Catrina de sombrero florido','Catrinas'],['CatrinaFrida','Catrina Frida','Catrinas'],['Catrina','Catrina de flores doradas','Catrinas'],['Catrinaespecial','Catrina especial de flores','Catrinas'],['CAtrinaRosa','Catrina rosa','Catrinas'],['CatrinaLuz','Catrina de luces','Catrinas'],['Frida','Frida de blusa bordada','Catrinas'],['Frida2','Frida de rebozo','Catrinas'],
['Calaca6','Calaca del loro','Calacas'],['calaca3','Calaca de listones azules','Calacas'],['Calaca5','Calaca con jarrón','Calacas'],['Calaca4','Calaca de rebozo naranja','Calacas'],['Calaca','Calaca morada','Calacas'],['CalacaEspecial','Calaca de trenzas','Calacas'],['CalacaEspecial3','Calaca en su altar','Calacas'],['Claca2','Calaca de rebozo','Calacas'],
['Espantapajaros4','Espantapájaros del maizal','Halloween'],['Espantapajaros','Espantapájaros de calabaza','Halloween'],['Espantapajaros3','Espantapájaros de cerca','Halloween'],['Espantapajaros2','Calabazas del espantapájaros','Halloween'],['Jack2','Jack en el cementerio','Halloween'],['Jack1','Jack y su calabaza','Halloween'],['bruja1','Bruja del girasol','Halloween'],['Bruja2','Abuela bruja con manzanas','Halloween'],['Bruja3','Bruja de sombrero naranja','Halloween'],['Bruja4','La Muerte en el cementerio','Halloween'],['novia','Novia cadáver','Halloween'],['reloj','Reloj de la medianoche','Halloween'],
['Navidad','Carrusel navideño','Navidad'],['CharlieBrown2','Navidad de Charlie Brown','Navidad'],['CharlieBrownNavidad','Charlie Brown iluminado','Navidad'],['Grinch','Grinch navideño','Navidad'],['Jack-navidad','Jack navideño','Navidad'],['Reno','Reno de luces','Navidad'],['Soladdo','Cascanueces','Navidad'],
['Dock-animal2','Tienda de aldea en verano','Dioramas'],['Dock-animal-cerezo','Tienda de aldea con cerezo','Dioramas'],['Dock-animal-navidad','Tienda de aldea en invierno','Dioramas'],['Animal-dockOtonio','Tienda de aldea en otoño','Dioramas'],['Animal-Dock2','Tienda de aldea con taller','Dioramas'],['animalDock','Tienda de aldea y coche','Dioramas'],['Dock-animal3','Casa de las hermanas','Dioramas'],['DockPokemon','Centro Pokémon','Dioramas'],['casa-decoracion','Casita diorama','Dioramas'],
['alebrije','Alebrije multicolor','Figuras']
];

PRODUCTS.push(...NEW_PRODUCTS);
GAL.push(...NEW_GALLERY);

// Los precios de la lista corresponden a catrinas; el #17 es la bruja de Halloween.
const catrinaPrices = [1500,1500,1600,1500,1500,1700,1500,1500,1500,1700,1700,1700,1700,1700,600,600,1500,1700,1800];
const catrinas = PRODUCTS.filter((product) => product.c === 'Catrinas');
catrinas.slice(0, catrinaPrices.length).forEach((product, index) => {
  product.p = catrinaPrices[index];
  product.size = index === 14 || index === 15 ? '30 cm' : '57 cm';
});
const witch = PRODUCTS.find((product) => product.n === 'Bruja con rebozo');
if (witch) { witch.c = 'Halloween'; witch.p = 400; witch.size = '25 cm'; }
PRODUCTS.forEach((product) => {
  if (product.c === 'Catrinas' && product.d.includes('Técnica mixta.')) {
    product.d = product.d.split(' Técnica mixta.')[0];
  }
});
const product40 = PRODUCTS.find((product) => product.id === 40);
if (product40) product40.c = 'Halloween';
