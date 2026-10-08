// Construye automáticamente el buscador lateral a partir de las secciones de la página.
// Si agregas o quitas un <section> con su <h2> en el HTML, la lista se actualiza sola.
const lista = document.getElementById('lista');
const panel = document.getElementById('panel');

document.querySelectorAll('main > .grupo, main > section').forEach((el, i) => {
  if (el.classList.contains('grupo')) {          // títulos de grupo (ej. "Colocaciones")
    const g = document.createElement('div');
    g.className = 'g'; g.textContent = el.textContent;
    lista.appendChild(g); return;
  }
  el.id = 't' + i;                               // id único para poder saltar al subtema
  const a = document.createElement('a');
  a.href = '#t' + i;
  a.textContent = el.querySelector('h2').textContent;
  a.onclick = () => panel.classList.remove('abierto'); // cierra el panel al elegir
  lista.appendChild(a);
});

// Filtra la lista mientras escribes (ignora mayúsculas y acentos)
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
document.getElementById('buscar').oninput = e => {
  const q = norm(e.target.value);
  lista.querySelectorAll('a').forEach(a => a.style.display = norm(a.textContent).includes(q) ? '' : 'none');
};
document.getElementById('abrir').onclick = () => panel.classList.toggle('abierto');
