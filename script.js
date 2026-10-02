const itinerary=[['21/10','Aankomst Las Vegas','Las Vegas','#oct21'],['22/10','Las Vegas → Valley of Fire','Camper ophalen','#oct22'],['23/10','Valley of Fire','Volledige parkdag','#oct23'],['24/10','Valley of Fire → Zion','Via Snow Canyon','#oct24'],['25/10','Zion','Per fiets','#oct25'],['26/10','Zion → Bryce','Via Kanab','#oct26'],['27/10','Bryce Canyon','Wandelen & viewpoints','#oct27'],['28/10','Bryce → Torrey','Scenic Route 12','#oct28'],['29/10','Torrey → Moab','Fruita & Goblin Valley','#oct29'],['30/10','Arches & Moab','Arches National Park','#oct30'],['31/10','Moab → Monument Valley','Scenic stops','#oct31'],['01/11','Monument Valley → Page','Flexibele stops','#nov01'],['02/11','Page & Lake Powell','Keuzedag','#nov02'],['03/11','Page → Grand Canyon','Reisdag','#nov03'],['04/11','Grand Canyon → Sedona','Reisdag','#nov04'],['05/11','Sedona','Activiteiten','#nov05'],['06/11','Sedona → Lake Mead','Route 66','#nov06'],['07/11','Lake Mead → Las Vegas','Camper inleveren','#nov07'],['08–10/11','Las Vegas','Vrije dagen','#nov08'],['11/11','Vertrek','Terugreis','#nov11']];document.getElementById('timeline').innerHTML=itinerary.map(x=>`<a href="${x[3]}"><span class="d">${x[0]}</span><span><b>${x[1]}</b><small>${x[2]}</small></span><span class="arrow">↗</span></a>`).join('');document.getElementById('menu').onclick=()=>document.getElementById('nav').classList.toggle('open');document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
// Valley of Fire carousel
(()=>{const car=document.querySelector('.vf-carousel');if(!car)return;const track=car.querySelector('.vf-carousel-track'),slides=[...car.querySelectorAll('.vf-slide')],dots=car.querySelector('.vf-carousel-dots');slides.forEach((_,i)=>{const d=document.createElement('i');if(i===0)d.classList.add('active');dots.appendChild(d)});const step=()=>slides[0].getBoundingClientRect().width+16;car.querySelector('.next').onclick=()=>track.scrollBy({left:step(),behavior:'smooth'});car.querySelector('.prev').onclick=()=>track.scrollBy({left:-step(),behavior:'smooth'});const update=()=>{let best=0,dist=Infinity;slides.forEach((s,i)=>{const d=Math.abs(s.getBoundingClientRect().left-track.getBoundingClientRect().left);if(d<dist){dist=d;best=i}});[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===best))};track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});const lb=document.createElement('div');lb.className='vf-lightbox';lb.innerHTML='<button type="button" aria-label="Sluiten">×</button><img alt="Vergrote foto van Valley of Fire">';document.body.appendChild(lb);slides.forEach(s=>s.addEventListener('click',()=>{lb.querySelector('img').src=s.querySelector('img').src;lb.classList.add('open')}));const close=()=>lb.classList.remove('open');lb.querySelector('button').onclick=close;lb.addEventListener('click',e=>{if(e.target===lb)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})})();


// v13: carrousels voor alle overige bestemmingen
(() => {
  const carousels = document.querySelectorAll('.dest-carousel');
  if (!carousels.length) return;
  let lightbox = document.querySelector('.site-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'vf-lightbox site-lightbox';
    lightbox.innerHTML = '<button type="button" aria-label="Sluiten">×</button><img alt="Vergrote reisfoto">';
    document.body.appendChild(lightbox);
    lightbox.querySelector('button').addEventListener('click',()=>lightbox.classList.remove('open'));
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.classList.remove('open')});
  }
  carousels.forEach(c => {
    const track=c.querySelector('.dest-carousel-track');
    const slides=[...c.querySelectorAll('.dest-slide')];
    const dots=c.querySelector('.dest-carousel-dots');
    slides.forEach((s,i)=>{const d=document.createElement('i'); if(i===0)d.classList.add('active'); dots.appendChild(d); s.querySelector('img').addEventListener('click',()=>{lightbox.querySelector('img').src=s.querySelector('img').src; lightbox.classList.add('open')})});
    const update=()=>{let best=0,dist=Infinity;slides.forEach((s,i)=>{const d=Math.abs(s.offsetLeft-track.scrollLeft);if(d<dist){dist=d;best=i}});[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===best))};
    c.querySelector('.prev').addEventListener('click',()=>track.scrollBy({left:-Math.min(track.clientWidth*.8,620),behavior:'smooth'}));
    c.querySelector('.next').addEventListener('click',()=>track.scrollBy({left:Math.min(track.clientWidth*.8,620),behavior:'smooth'}));
    track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
  });
})();
