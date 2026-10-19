(function(){
var d=document,reduit=window.matchMedia('(prefers-reduced-motion: reduce)').matches,IO='IntersectionObserver' in window;
var header=d.querySelector('header.top'),haut=d.querySelector('.haut');
function defile(){var y=window.scrollY;header.classList.toggle('defile',y>8);if(haut)haut.classList.toggle('vu',y>700);}
window.addEventListener('scroll',defile,{passive:true});defile();
if(haut)haut.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduit?'auto':'smooth'});});

/* menu mobile */
var burger=d.querySelector('.burger');
if(burger)burger.addEventListener('click',function(){var o=header.classList.toggle('ouvert');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu');});
d.querySelectorAll('#menu a').forEach(function(a){a.addEventListener('click',function(){header.classList.remove('ouvert');});});

/* menus déroulants Collège / Lycée */
var dds=d.querySelectorAll('.dd');
function fermer(sauf){dds.forEach(function(x){if(x!==sauf){x.classList.remove('open');x.querySelector('.dd-btn').setAttribute('aria-expanded','false');}});}
dds.forEach(function(dd){var b=dd.querySelector('.dd-btn');b.addEventListener('click',function(e){e.stopPropagation();var o=!dd.classList.contains('open');fermer(dd);dd.classList.toggle('open',o);b.setAttribute('aria-expanded',o);});});
d.addEventListener('click',function(e){if(!e.target.closest('.dd'))fermer();});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){fermer();header.classList.remove('ouvert');}});

/* apparition au défilement */
var els=d.querySelectorAll('.reveal');
if(IO&&!reduit){
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target;el.classList.add('vu');io.unobserve(el);
    setTimeout(function(){el.classList.remove('reveal','vu');el.style.removeProperty('--d');},1300);});},{rootMargin:'0px 0px -6% 0px',threshold:.06});
  els.forEach(function(el){io.observe(el);});
}else{els.forEach(function(el){el.classList.remove('reveal');});}

/* chiffres qui défilent */
var cs=d.querySelectorAll('[data-compte]');
if(IO&&!reduit){
  var io2=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target,fin=+el.dataset.compte,t0=null;io2.unobserve(el);
    (function pas(t){if(!t0)t0=t;var p=Math.min((t-t0)/1300,1);el.textContent=Math.round(fin*(1-Math.pow(1-p,3))).toLocaleString('fr-FR');if(p<1)requestAnimationFrame(pas);})(performance.now());});},{threshold:.6});
  cs.forEach(function(c){c.textContent='0';io2.observe(c);});
}

/* Pi : un conseil par clic, et les yeux qui suivent la souris */
d.querySelectorAll('.pi').forEach(function(pi){
  var tips=[];try{tips=JSON.parse(pi.dataset.tips);}catch(e){}
  var p=pi.querySelector('.pi-bulle p'),bot=pi.querySelector('.pi-bot'),i=0;
  bot.addEventListener('click',function(){bot.classList.remove('saute');void bot.getBoundingClientRect();bot.classList.add('saute');
    if(tips.length<2)return;i=(i+1)%tips.length;p.classList.add('change');
    setTimeout(function(){p.textContent=tips[i];p.classList.remove('change');},220);});
});
if(!reduit){
  var pups=d.querySelectorAll('.pi-pupilles'),raf=0,mx=0,my=0;
  if(pups.length)d.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;if(raf)return;raf=requestAnimationFrame(function(){raf=0;
    pups.forEach(function(g){var r=g.closest('svg').getBoundingClientRect();if(!r.width)return;
      var dx=mx-(r.left+r.width*.5),dy=my-(r.top+r.height*.2),n=Math.hypot(dx,dy)||1,k=Math.min(n/160,1)*3.2;
      g.style.transform='translate('+(dx/n*k).toFixed(2)+'px,'+(dy/n*k).toFixed(2)+'px)';});});},{passive:true});
}

/* recherche dans une page de niveau */
var vide=d.querySelector('[data-vide]');
d.querySelectorAll('[data-filter]').forEach(function(inp){
  inp.addEventListener('input',function(){
    var q=inp.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim(),mots=q.split(/\s+/).filter(Boolean),n=0;
    d.querySelectorAll('.card').forEach(function(c){var s=c.dataset.search,ok=mots.every(function(m){return s.indexOf(m)>=0;});c.classList.toggle('hidden',!ok);if(ok)n++;});
    d.querySelectorAll('.groupe').forEach(function(g){var a=!!g.querySelector('.card:not(.hidden)');g.classList.toggle('hidden',!a);g.open=q?a:g.dataset.ouvert==='1';});
    d.querySelectorAll('.matiere').forEach(function(m){m.classList.toggle('hidden',!m.querySelector('.card:not(.hidden)'));});
    if(vide)vide.hidden=n>0;
  });
});

/* onglet de la matière en cours de lecture */
var onglets=d.querySelectorAll('.onglets a');
if(onglets.length&&IO){
  var parId={};onglets.forEach(function(a){parId[a.getAttribute('href').slice(1)]=a;});
  var io3=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var a=parId[en.target.id];if(!a)return;
    onglets.forEach(function(x){x.classList.toggle('on',x===a);});var o=a.parentNode;o.scrollTo({left:a.offsetLeft-o.clientWidth/2+a.clientWidth/2,behavior:'smooth'});});},{rootMargin:'-35% 0px -60% 0px'});
  d.querySelectorAll('.matiere').forEach(function(m){io3.observe(m);});
}
})();
