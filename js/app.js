const pages=[...document.querySelectorAll('.page')];
const nav=[...document.querySelectorAll('.nav-item')];
const modal=document.getElementById('modal'), modalContent=document.getElementById('modalContent'), toast=document.getElementById('toast');

function showPage(id){
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  nav.forEach(n=>n.classList.toggle('active',n.dataset.page===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
nav.forEach(n=>n.addEventListener('click',()=>showPage(n.dataset.page)));
document.querySelectorAll('[data-page-go]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.pageGo)));

function notify(msg){
  toast.textContent=msg; toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2500);
}
function openModal(title,body){
  modalContent.innerHTML=`<h2>${title}</h2>${body}`;
  modal.classList.add('show');
}
document.getElementById('closeModal').onclick=()=>modal.classList.remove('show');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});

document.querySelectorAll('.details').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const name=btn.dataset.machine;
    const data={
      'Trator 01':['24 km/h','18 km/h','73%','42 km','5h 32min'],
      'Trator 02':['18 km/h','16 km/h','52%','37 km','4h 48min'],
      'Trator 03':['0 km/h','14 km/h','91%','22 km','3h 10min'],
      'Trator 04':['11 km/h','12 km/h','18%','19 km','2h 41min']
    }[name];
    openModal(name,`<p>Monitoramento detalhado da máquina.</p><div class="detail-grid">
      <div><span>Velocidade</span><b>${data[0]}</b></div><div><span>Velocidade média</span><b>${data[1]}</b></div>
      <div><span>Combustível</span><b>${data[2]}</b></div><div><span>Distância</span><b>${data[3]}</b></div>
      <div><span>Tempo de operação</span><b>${data[4]}</b></div><div><span>Status</span><b>${name==='Trator 04'?'⚠️ Atenção':'🟢 Normal'}</b></div>
    </div>`);
  });
});

document.querySelectorAll('.tractor').forEach(t=>t.addEventListener('click',()=>{
  const id=t.querySelector('b').textContent;
  const el=document.querySelector(`.details[data-machine="Trator ${id}"]`);
  if(el) el.click();
}));

document.getElementById('clockBtn').addEventListener('click',()=>{
  const now=new Date();
  const time=now.toLocaleTimeString('pt-BR');
  document.getElementById('clockStatus').textContent=`Ponto registrado às ${time}`;
  document.getElementById('clockBtn').textContent='✓ Ponto registrado';
  notify('Ponto registrado com sucesso!');
});
function updateClock(){
  document.getElementById('clock').textContent=new Date().toLocaleTimeString('pt-BR');
}
setInterval(updateClock,1000); updateClock();

document.getElementById('addMachine').onclick=()=>notify('Formulário de nova máquina — protótipo demonstrativo.');
document.getElementById('addHarvest').onclick=()=>notify('Registro de colheita aberto.');
document.getElementById('refuel').onclick=()=>notify('Registro de abastecimento aberto.');
document.getElementById('addMaintenance').onclick=()=>notify('Nova manutenção aberta.');
document.getElementById('exportReport').onclick=()=>notify('Relatório preparado para exportação.');
document.getElementById('notifications').onclick=()=>openModal('🔔 Alertas recentes',`
  <div class="alerts">
    <div class="alert danger"><b>⛽ Trator 04 com combustível baixo</b><span>18% restante</span></div>
    <div class="alert warning"><b>🔧 Trator 02 em manutenção em breve</b><span>12 horas restantes</span></div>
    <div class="alert info"><b>🌧️ Possibilidade de chuva amanhã</b><span>Planeje a colheita da área 03</span></div>
  </div>`);

// Pequena simulação de velocidade do Trator 01
setInterval(()=>{
  const el=document.getElementById('speed1');
  if(el) el.textContent=(22+Math.floor(Math.random()*6))+' km/h';
},3000);
