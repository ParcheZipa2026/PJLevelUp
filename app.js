// ==========================================================
// Premios Juventud Level Up 2026 — Página de votación
// ==========================================================

const CONFIG = {
  // Pega aquí la URL de tu Web App de Apps Script (ver README para el paso a paso)
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxHeJ3FPjWNRSbR6z0JLrrbl4tZ2AfU930wuETKU5PCqykhPPSwk0q1pG8BeOjQuVr0/exec",
  // Fecha y hora límite de votación (hora de Colombia)
  DEADLINE: new Date("2026-09-20T23:59:59-05:00")
};

const els = {
  catNav: document.getElementById("catNav"),
  sections: document.getElementById("sections"),
  overlay: document.getElementById("overlay"),
  overlayContent: document.getElementById("overlayContent"),
  toast: document.getElementById("toast"),
  countdownChip: document.getElementById("countdownChip"),
  countdownBig: document.getElementById("countdownBig")
};

// ---------- Utilidades ----------
function votedKey(catId){ return `voto_lvlup2026_${catId}`; }
function hasVoted(catId){ return !!localStorage.getItem(votedKey(catId)); }
function getVotedFor(catId){ return localStorage.getItem(votedKey(catId)); }
function markVoted(catId, postId){
  try{ localStorage.setItem(votedKey(catId), postId); }catch(e){ /* localStorage no disponible */ }
}

function showToast(msg, isError){
  els.toast.innerHTML = `<span class="ic">${isError ? "⚠️" : "⚡"}</span><span>${msg}</span>`;
  els.toast.classList.toggle("error", !!isError);
  els.toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> els.toast.classList.remove("show"), 3800);
}

function openOverlay(html){
  els.overlayContent.innerHTML = html;
  els.overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeOverlay(){
  els.overlay.classList.remove("open");
  document.body.style.overflow = "";
}
els.overlay.addEventListener("click", (e)=>{ if(e.target === els.overlay) closeOverlay(); });

// ---------- Envío del voto (JSONP, sin CORS) ----------
function enviarVoto(categoria, postuladoId, nombrePostulado){
  return new Promise((resolve, reject)=>{
    if(!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.indexOf("PEGA_AQUI") === 0){
      reject(new Error("Falta configurar la URL de Apps Script en app.js"));
      return;
    }
    const cbName = "votoCallback_" + Date.now();
    const script = document.createElement("script");
    let done = false;
    window[cbName] = function(resp){
      done = true;
      delete window[cbName];
      script.remove();
      resp && resp.ok ? resolve(resp) : reject(new Error((resp && resp.error) || "Error desconocido"));
    };
    const params = new URLSearchParams({
      action: "vote",
      categoria, postulado: postuladoId, nombre: nombrePostulado,
      callback: cbName
    });
    script.src = `${CONFIG.APPS_SCRIPT_URL}?${params.toString()}`;
    script.onerror = ()=>{ if(!done){ delete window[cbName]; script.remove(); reject(new Error("No se pudo conectar con el servidor de votos")); } };
    document.body.appendChild(script);
    setTimeout(()=>{ if(!done){ delete window[cbName]; script.remove(); reject(new Error("Tiempo de espera agotado")); } }, 12000);
  });
}

// ---------- Render de tarjetas ----------
function cardHtml(p){
  const voted = hasVoted(p.categoria);
  const isThisOne = getVotedFor(p.categoria) === p.id;
  return `
  <div class="card" data-id="${p.id}">
    <div class="photo-wrap">
      <img src="${driveImg(p.fotoId, 700)}" alt="Foto de ${p.nombre}" loading="lazy"
           onerror="this.src='${driveImg(p.fotoId, 400)}'">
      <span class="bolt-corner">⚡</span>
    </div>
    <div class="body">
      <h3>${p.nombre}</h3>
      <p class="barrio">${p.organizacion ? p.organizacion + " · " : ""}${p.barrio || ""}</p>
      <p class="resumen">${p.resumen}</p>
      <div class="actions">
        <button class="btn btn-ghost" data-action="ver" data-id="${p.id}">Ver historia</button>
        <button class="btn btn-vote ${isThisOne ? "voted" : ""}" data-action="votar" data-id="${p.id}" ${voted ? "disabled" : ""}>
          ${isThisOne ? "✓ Tu voto" : (voted ? "Ya votaste" : "Votar")}
        </button>
      </div>
    </div>
  </div>`;
}

function renderSections(){
  els.sections.innerHTML = CATEGORIAS.map(cat=>{
    const items = POSTULADOS.filter(p=>p.categoria === cat.id);
    if(items.length === 0) return "";
    return `
    <section class="cat-section" id="cat-${cat.id}">
      <div class="cat-title"><span class="emoji">${cat.emoji}</span><h2>${cat.nombre}</h2></div>
      <p class="cat-sub">${items.length} postulado${items.length>1?"s":""} · elige a tu favorito en esta categoría</p>
      <div class="grid">${items.map(cardHtml).join("")}</div>
    </section>`;
  }).join("");
}

function renderCatNav(){
  els.catNav.innerHTML = CATEGORIAS
    .filter(cat=> POSTULADOS.some(p=>p.categoria===cat.id))
    .map(cat=>`<button class="cat-chip" data-cat="${cat.id}">${cat.emoji} ${cat.nombre}</button>`).join("");
}

// ---------- Modal de detalle ----------
function modalHtml(p){
  const cat = CATEGORIAS.find(c=>c.id===p.categoria);
  const voted = hasVoted(p.categoria);
  const isThisOne = getVotedFor(p.categoria) === p.id;
  const gallery = (p.evidenciaIds||[]).length ? `
    <h4>Evidencia</h4>
    <div class="gallery">${p.evidenciaIds.map(id=>`<img src="${driveImg(id,500)}" alt="Evidencia de ${p.nombre}" loading="lazy">`).join("")}</div>` : "";
  return `
    <button class="close" data-action="cerrar">✕</button>
    <img class="modal-photo" src="${driveImg(p.fotoId, 900)}" alt="Foto de ${p.nombre}">
    <div class="modal-body">
      <div class="modal-cat">${cat.emoji} ${cat.nombre}</div>
      <h2>${p.nombre}</h2>
      <p class="barrio">${p.organizacion ? p.organizacion + " · " : ""}${p.barrio || ""}</p>
      <p>${p.resumen}</p>
      <div class="stat-row">
        <div class="stat"><b>${p.tiempo || "—"}</b>Tiempo en esta labor</div>
        <div class="stat"><b>${p.beneficiarios || "—"}</b>Personas beneficiadas</div>
      </div>
      <h4>Su historia</h4>
      <p>${p.historia}</p>
      <h4>Su mayor logro</h4>
      <p>${p.logro}</p>
      ${gallery}
      <div class="modal-actions">
        <button class="btn btn-vote ${isThisOne ? "voted" : ""}" data-action="votar" data-id="${p.id}" ${voted ? "disabled" : ""} style="flex:1">
          ${isThisOne ? "✓ Ya votaste por él/ella" : (voted ? "Ya votaste en esta categoría" : "⚡ Votar por " + p.nombre.split(" ")[0])}
        </button>
      </div>
    </div>`;
}

// ---------- Confirmación de voto ----------
function confirmarVoto(p){
  const cat = CATEGORIAS.find(c=>c.id===p.categoria);
  openOverlay(`
    <div class="confirm-box">
      <div class="bolt">⚡</div>
      <h3>¿Confirmas tu voto?</h3>
      <p>Vas a votar por <b>${p.nombre}</b> en la categoría <b>${cat.emoji} ${cat.nombre}</b>.<br>Solo puedes votar una vez por categoría.</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-action="cerrar" style="flex:1">Cancelar</button>
        <button class="btn btn-vote" id="btnConfirmarVoto" style="flex:1">Sí, votar</button>
      </div>
    </div>`);
  document.getElementById("btnConfirmarVoto").onclick = async ()=>{
    const btn = document.getElementById("btnConfirmarVoto");
    btn.disabled = true; btn.textContent = "Enviando...";
    try{
      await enviarVoto(cat.id, p.id, p.nombre);
      markVoted(cat.id, p.id);
      closeOverlay();
      renderSections();
      wireCardEvents();
      showToast(`¡Voto registrado por ${p.nombre}!`);
    }catch(err){
      btn.disabled = false; btn.textContent = "Sí, votar";
      showToast(err.message || "No se pudo registrar el voto, intenta de nuevo.", true);
    }
  };
}

// ---------- Delegación de eventos ----------
function wireCardEvents(){
  els.sections.querySelectorAll('[data-action="ver"]').forEach(btn=>{
    btn.onclick = ()=>{
      const p = POSTULADOS.find(x=>x.id===btn.dataset.id);
      openOverlay(`<div class="modal">${modalHtml(p)}</div>`);
      wireModalActions();
    };
  });
  els.sections.querySelectorAll('[data-action="votar"]').forEach(btn=>{
    if(btn.disabled) return;
    btn.onclick = ()=>{
      const p = POSTULADOS.find(x=>x.id===btn.dataset.id);
      confirmarVoto(p);
    };
  });
}
function wireModalActions(){
  els.overlayContent.querySelectorAll('[data-action="cerrar"]').forEach(b=> b.onclick = closeOverlay);
  els.overlayContent.querySelectorAll('[data-action="votar"]').forEach(btn=>{
    if(btn.disabled) return;
    btn.onclick = ()=>{
      const p = POSTULADOS.find(x=>x.id===btn.dataset.id);
      confirmarVoto(p);
    };
  });
}

// El overlay reemplaza su propio innerHTML (por ejemplo tarjeta -> confirmación),
// así que siempre hay que re-enganchar los botones de "cerrar" al abrir cualquier overlay.
const _openOverlay = openOverlay;
openOverlay = function(html){
  _openOverlay(html);
  document.querySelectorAll('[data-action="cerrar"]').forEach(b=> b.onclick = closeOverlay);
};

// ---------- Navegación por categoría ----------
function wireCatNav(){
  const chips = els.catNav.querySelectorAll(".cat-chip");
  chips.forEach(chip=>{
    chip.onclick = ()=>{
      document.getElementById(`cat-${chip.dataset.cat}`).scrollIntoView({behavior:"smooth", block:"start"});
    };
  });
  const sections = [...document.querySelectorAll(".cat-section")];
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id.replace("cat-", "");
        chips.forEach(c=> c.classList.toggle("active", c.dataset.cat === id));
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });
  sections.forEach(s=> obs.observe(s));
}

// ---------- Cuenta regresiva ----------
function tickCountdown(){
  const now = new Date();
  const diff = CONFIG.DEADLINE - now;
  if(diff <= 0){
    els.countdownChip.innerHTML = `<b>Votación cerrada</b>`;
    els.countdownBig.innerHTML = `<div class="unit"><span class="num">⚡</span><span class="lbl">Votación cerrada</span></div>`;
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  els.countdownChip.innerHTML = `Cierra en <b>${d}d ${h}h ${m}m</b>`;
  els.countdownBig.innerHTML = `
    <div class="unit"><span class="num">${d}</span><span class="lbl">Días</span></div>
    <div class="unit"><span class="num">${h}</span><span class="lbl">Horas</span></div>
    <div class="unit"><span class="num">${m}</span><span class="lbl">Min</span></div>
    <div class="unit"><span class="num">${s}</span><span class="lbl">Seg</span></div>`;
}

// ---------- Init ----------
function init(){
  renderCatNav();
  renderSections();
  wireCardEvents();
  wireCatNav();
  tickCountdown();
  setInterval(tickCountdown, 1000);
}
document.addEventListener("DOMContentLoaded", init);
