import { PRODUCTS, GAL } from '../data/catalog.js';
import { PH } from '../data/product-images.js';
const IMG={"cat":"/img/cat.jpg","afi":"/img/afi.jpg"};
document.querySelectorAll('[data-img]').forEach((image) => { image.src = IMG[image.dataset.img]; });
const $=s=>document.querySelector(s),money=n=>'$'+n.toLocaleString('es-MX');
const C=['#e8382b','#f6c20f','#1b14a0','#141414','#f3eee2'];

/* ---- datos (edítalos aquí) ---- */

function rnd(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function art(seed,bg){const r=rnd(seed*97+3),pick=()=>C[Math.floor(r()*4)];let b=bg||[C[1],C[4],C[0],C[2]][Math.floor(r()*4)];
 let s=`<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><rect width="100" height="100" fill="${b}"/>`;
 const f=()=>{let c=pick();return c===b?C[4]===b?C[3]:C[4]:c};
 s+=`<circle cx="${30+r()*40}" cy="${30+r()*40}" r="${22+r()*18}" fill="${f()}"/>`;
 s+=`<rect x="${r()*45}" y="${r()*45}" width="${25+r()*30}" height="${25+r()*30}" fill="${f()}" transform="rotate(${Math.floor(r()*4)*15} 50 50)"/>`;
 s+=`<polygon points="${r()*40},100 ${40+r()*30},${30+r()*30} 100,100" fill="${f()}"/>`;
 s+=`<path d="M${r()*30} ${r()*30}H${60+r()*40}" stroke="${C[3]}" stroke-width="3"/><circle cx="${r()*100}" cy="${r()*100}" r="5" fill="${C[3]}"/></svg>`;return s}
const thumb=(o)=>o.f?`<img loading="lazy" src="${PH[o.f]}" alt="${o.n}">`:o.img?`<div style="background:${o.bg};display:grid;place-items:center"><img src="${IMG[o.img]}" alt="" style="mix-blend-mode:multiply;object-fit:contain"></div>`:art(o.s,o.bg);

/* ---- navegación con transición ---- */
const wipe=$('#wipe');let cur='home',busy=false,shopAlertShown=false;
function go(v,to){
 if(busy)return;busy=true;closeCart();
 const swap=()=>{document.querySelectorAll('.view').forEach(e=>e.classList.toggle('on',e.id==='v-'+v));
  document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.go===v));cur=v;
  scrollTo(0,0);if(v==='shop'){renderGrid();if(!shopAlertShown){showShopAlert();shopAlertShown=true}}observe();setTimeout(observe,100);if(to)setTimeout(()=>document.getElementById(to)?.scrollIntoView(),50)};
 if(v===cur){busy=false;if(to)document.getElementById(to)?.scrollIntoView({behavior:'smooth'});return}
 wipe.classList.remove('out');wipe.classList.add('in');
 setTimeout(()=>{swap();wipe.classList.add('out');wipe.classList.remove('in')},780);
 setTimeout(()=>{wipe.classList.remove('out');busy=false},1560);
}
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){e.preventDefault();go(g.dataset.go,g.dataset.to)}});
const menuToggle=$('#menuToggle'),primaryNav=$('#primaryNav');menuToggle.onclick=()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');primaryNav.classList.toggle('open',open)};primaryNav.addEventListener('click',e=>{if(e.target.closest('[data-go]')){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menú');primaryNav.classList.remove('open')}});

/* ---- tienda ---- */
let filter='Todo';
const cats=['Todo',...new Set(PRODUCTS.map(p=>p.c))];
$('#chips').innerHTML=cats.map(c=>`<button class="${c===filter?'on':''}">${c}</button>`).join('');
$('#chips').onclick=e=>{const b=e.target.closest('button');if(!b)return;filter=b.textContent;[...$('#chips').children].forEach(x=>x.classList.toggle('on',x===b));renderGrid()};
$('#priceFilter').onchange=renderGrid;$('#sizeFilter').onchange=renderGrid;$('#productSearch').oninput=renderGrid;
$('#productColumns').onclick=()=>{const two=$('#grid').classList.toggle('two-columns');$('#productColumns').setAttribute('aria-pressed',String(two));$('#productColumns').textContent=two?'Ver 1 columna':'Ver 2 columnas'};
function renderGrid(){const price=$('#priceFilter').value,size=$('#sizeFilter').value,query=$('#productSearch').value.trim().toLocaleLowerCase('es-MX');const shown=PRODUCTS.filter((p,index)=>(filter==='Todo'||p.c===filter)&&(size==='all'||p.size===size)&&(price==='all'||price==='under-1000'&&p.p<1000||price==='1000-1999'&&p.p>=1000&&p.p<2000||price==='2000-2999'&&p.p>=2000&&p.p<3000||price==='3000-plus'&&p.p>=3000)&&(!query||p.n.toLocaleLowerCase('es-MX').includes(query)||String(index+1)===query));$('#grid').innerHTML=shown.map((p,i)=>`<article class="card" style="animation-delay:${i*70}ms"><div class="im">${thumb(p)}</div>${p.photos?.length>1?`<button class="views" data-views="${p.id}">Ver ${p.photos.length} fotos</button>`:""}<div class="tx"><span class="product-number">${String(PRODUCTS.indexOf(p)+1).padStart(2,'0')}</span><h3>${p.n}</h3><p>${p.d}</p><div class="pr"><b>${money(p.p)}</b><button class="add" data-id="${p.id}">Agregar</button></div></div></article>`).join('')}
function showShopAlert(){const alert=$('#shopAlert');alert.classList.add('on');alert.setAttribute('aria-hidden','false');$('#shopAlertClose').focus()}
const announcements=['Técnica mixta','100 % elaborado a mano','Piezas únicas hechas con cariño','Pedidos con un mes de anticipación','Muchas gracias por tu apoyo ❤️'];let announcementIndex=0;setInterval(()=>{const el=$('#shopAnnouncementText');if(!el)return;announcementIndex=(announcementIndex+1)%announcements.length;el.classList.add('changing');setTimeout(()=>{el.textContent=announcements[announcementIndex];el.className=`announcement-color-${announcementIndex}`;el.classList.remove('changing')},250)},3200);
function closeShopAlert(){const alert=$('#shopAlert');alert.classList.remove('on');alert.setAttribute('aria-hidden','true')}
$('#shopAlertClose').onclick=closeShopAlert;$('#shopAlert').onclick=e=>{if(e.target.id==='shopAlert')closeShopAlert()};
$('#grid').onclick=e=>{const view=e.target.closest('[data-views]');if(view){const p=PRODUCTS.find(item=>item.id===+view.dataset.views);list=p.photos.map(key=>[key,p.n,p.c]);show(0);return}const b=e.target.closest('.add');if(b)add(+b.dataset.id)};
let gf='Todo',list=[],li=0;
const gcats=['Todo',...new Set(GAL.map(g=>g[2]))];
$('#gchips').innerHTML=gcats.map(c=>`<button class="${c===gf?'on':''}">${c}</button>`).join('');
$('#gchips').onclick=e=>{const b=e.target.closest('button');if(!b)return;gf=b.textContent;[...$('#gchips').children].forEach(x=>x.classList.toggle('on',x===b));renderGal()};
function renderGal(){list=GAL.filter(g=>gf==='Todo'||g[2]===gf);$('#gal').innerHTML=list.map((g,i)=>`<button data-i="${i}" aria-label="${g[1]}"><img loading="lazy" src="${PH[g[0]]}" alt="${g[1]}"><span>${g[1]}</span></button>`).join('')}
let lightboxFocus=null;
function openLightbox(){if($('#lb').classList.contains('on'))return;lightboxFocus=document.activeElement;$('#lb').classList.add('on');$('#lb').setAttribute('aria-hidden','false');document.body.classList.add('lightbox-open');$('#lclose').focus()}
function show(i){if(!list.length)return;li=(i+list.length)%list.length;const g=list[li],src=PH[g[0]]||g[0];$('#lbc').innerHTML=`<img src="${src}" alt="${g[1]}"><p><b>${g[1]}</b>${g[2]} · ${li+1} de ${list.length}</p>`;openLightbox()}
const recentWorks=[...document.querySelectorAll('#obra [data-recent-index]')].map(el=>{const img=el.querySelector('img'),title=el.querySelector('figcaption strong')?.textContent.trim()||img.alt;return[img.getAttribute('src'),title,'Obra reciente']});
function showRecent(index){list=recentWorks;show(index)}
$('#obra').addEventListener('click',e=>{const item=e.target.closest('[data-recent-index]');if(item)showRecent(+item.dataset.recentIndex)});
$('#obra').addEventListener('keydown',e=>{const item=e.target.closest('[data-recent-index]');if(item&&(e.key==='Enter'||e.key===' ')){e.preventDefault();showRecent(+item.dataset.recentIndex)}});
$('#gal').onclick=e=>{const b=e.target.closest('button');if(b){list=GAL.filter(g=>gf==='Todo'||g[2]===gf);show(+b.dataset.i)}};
const closeLb=()=>{if(!$('#lb').classList.contains('on'))return;$('#lb').classList.remove('on');$('#lb').setAttribute('aria-hidden','true');document.body.classList.remove('lightbox-open');lightboxFocus?.focus?.();lightboxFocus=null};
$('#lb').onclick=e=>{if(e.target.id==='lb')closeLb()};
$('#lclose').onclick=closeLb;$('#lprev').onclick=()=>show(li-1);$('#lnext').onclick=()=>show(li+1);
addEventListener('keydown',e=>{if(!$('#lb').classList.contains('on'))return;if(e.key==='ArrowLeft')show(li-1);if(e.key==='ArrowRight')show(li+1);if(e.key==='Escape')closeLb();if(e.key==='Tab'){const controls=[...$('#lb').querySelectorAll('button')],first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
renderGal();
document.querySelectorAll('[data-ph]').forEach(i=>i.src=PH[i.dataset.ph]);

/* ---- carrito ---- */
const cart={};
function add(id){cart[id]=(cart[id]||0)+1;draw();const b=$('#cartBtn');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump');toast(PRODUCTS.find(p=>p.id===id).n+' agregada al carrito')}
function draw(){const ids=Object.keys(cart).filter(i=>cart[i]>0);let t=0,n=0,msg='Hola Cris, quiero pedir:%0A';
 $('#items').innerHTML=ids.length?ids.map(i=>{const p=PRODUCTS.find(x=>x.id==i),q=cart[i];t+=p.p*q;n+=q;msg+=encodeURIComponent(`${q} x ${p.n} (${money(p.p*q)})\n`);
  return `<div class="it"><div class="th">${thumb(p)}</div><div><b>${p.n}</b><div class="q"><button data-m="${i}" aria-label="Quitar uno">−</button>${q}<button data-p="${i}" aria-label="Agregar uno">+</button></div></div><b>${money(p.p*q)}</b></div>`}).join('')
  :`<div class="empty"><svg class="ic" viewBox="0 0 72 72"><circle cx="36" cy="36" r="34" fill="#f6c20f"/><rect x="22" y="22" width="28" height="28" fill="#e8382b"/></svg><h3 style="font-size:1.8rem">Tu carrito está vacío</h3><p>Agrega una pieza desde la tienda.</p></div>`;
 $('#cnt').textContent=n;$('#tot').textContent=money(t);$('#foot').style.display=ids.length?'':'none';
 $('#buy').href='https://wa.me/525543583381?text='+msg+encodeURIComponent('Total: '+money(t))}
$('#items').onclick=e=>{const m=e.target.dataset.m,p=e.target.dataset.p;if(m)cart[m]--;if(p)cart[p]++;if(m||p)draw()};
const openCart=()=>{$('#cart').classList.add('on');$('#dim').classList.add('on')},closeCart=()=>{$('#cart').classList.remove('on');$('#dim').classList.remove('on')};
$('#cartBtn').onclick=openCart;$('#cx').onclick=closeCart;$('#dim').onclick=closeCart;
addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)}

/* ---- eventos, marquesina, reveal, parallax ---- */
const words=['Catrinas','Papel maché','Porcelana fría','Talavera','Hecho a mano','Ofrenda'];
$('#mq').innerHTML=[...words,...words].map(w=>`<span>${w}</span><span>●</span><span>▲</span>`).join('');
$('#mq').innerHTML+=$('#mq').innerHTML;
function observe(){document.querySelectorAll('.view.on .rv:not(.in)').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight*.88)e.classList.add('in')})}
addEventListener('scroll',observe,{passive:true});addEventListener('resize',observe);
observe();setTimeout(observe,300);
const st=$('#stage');
addEventListener('pointermove',e=>{if(cur!=='home')return;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
 st.querySelectorAll('.sh').forEach(s=>{const d=+s.dataset.d;s.style.transform=`translate(${x*d}px,${y*d}px)`})});
draw();

