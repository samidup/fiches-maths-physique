
document.querySelectorAll('[data-filter]').forEach(function(inp){
  inp.addEventListener('input',function(){
    var q=inp.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    document.querySelectorAll('.card').forEach(function(c){
      var t=c.dataset.search; c.classList.toggle('hidden', q && t.indexOf(q)<0);});
    document.querySelectorAll('.groupe').forEach(function(g){
      g.classList.toggle('hidden', !g.querySelector('.card:not(.hidden)'));});
    document.querySelectorAll('.matiere').forEach(function(m){
      m.classList.toggle('hidden', !m.querySelector('.card:not(.hidden)'));});
  });
});
