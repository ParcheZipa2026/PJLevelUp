// ==========================================================
// Premios Juventud Level Up 2026 — Página de votación
// ==========================================================

const CONFIG = {
  // URL de tu Web App de Apps Script ya desplegada (ver README para el paso a paso)
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxHeJ3FPjWNRSbR6z0JLrrbl4tZ2AfU930wuETKU5PCqykhPPSwk0q1pG8BeOjQuVr0/exec",
  // Fecha y hora límite de votación (hora de Colombia)
  DEADLINE: new Date("2026-09-20T23:59:59-05:00")
};

// Lista de postulados y categorías en memoria: se llenan en init() con lo que
// llegue en vivo del Sheet (categorías incluidas — ya no es una lista fija),
// o con CATEGORIAS_FALLBACK/POSTULADOS_FALLBACK (assets/data.js) si esa
// conexión falla.
let POSTULADOS = [];
let CATEGORIAS = [];

const els = {
  catNav: document.getElementById("catNav"),
  sections: document.getElementById("sections"),
  overlay: document.getElementById("overlay"),
  overlayContent: document.getElementById("overlayContent"),
  toast: document.getElementById("toast"),
  countdownChip: document.getElementById("countdownChip"),
  countdownBig: document.getElementById("countdownBig"),
  finishProgress: document.getElementById("finishProgress"),
  btnFinalizar: document.getElementById("btnFinalizar"),
  floatingFinalizar: document.getElementById("floatingFinalizar")
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
  els.overlayContent.querySelectorAll('[data-action="cerrar"]').forEach(b=> b.onclick = closeOverlay);
}
function closeOverlay(){
  els.overlay.classList.remove("open");
  document.body.style.overflow = "";
}
els.overlay.addEventListener("click", (e)=>{ if(e.target === els.overlay) closeOverlay(); });

// ---------- Comunicación con Apps Script (JSONP, sin CORS) ----------
function jsonp(params, timeoutMs){
  return new Promise((resolve, reject)=>{
    if(!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.indexOf("PEGA_AQUI") === 0){
      reject(new Error("Falta configurar la URL de Apps Script en app.js"));
      return;
    }
    const cbName = "cb_" + Date.now() + "_" + Math.floor(Math.random()*1e6);
    const script = document.createElement("script");
    let done = false;
    window[cbName] = function(resp){
      done = true;
      delete window[cbName];
      script.remove();
      resolve(resp);
    };
    const qp = new URLSearchParams(Object.assign({}, params, { callback: cbName }));
    script.src = `${CONFIG.APPS_SCRIPT_URL}?${qp.toString()}`;
    script.onerror = ()=>{
      if(!done){ delete window[cbName]; script.remove(); reject(new Error("No se pudo conectar con el servidor")); }
    };
    document.body.appendChild(script);
    setTimeout(()=>{
      if(!done){ delete window[cbName]; script.remove(); reject(new Error("Tiempo de espera agotado")); }
    }, timeoutMs || 12000);
  });
}

function enviarVoto(categoria, postuladoId, nombrePostulado){
  return jsonp({ action:"vote", categoria, postulado: postuladoId, nombre: nombrePostulado }).then(resp=>{
    if(!resp || !resp.ok) throw new Error((resp && resp.error) || "Error desconocido");
    return resp;
  });
}

function cargarPostulados(){
  // 20s de margen: si acaban de llegar postulados nuevos, Apps Script tiene
  // que hacerles el permiso público en Drive antes de responder, y eso la
  // primera vez puede tardar unos segundos más de lo normal.
  return jsonp({ action:"list" }, 20000).then(resp=>{
    if(!resp || !resp.ok) throw new Error((resp && resp.error) || "No se pudo cargar la lista en vivo");
    return resp;
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
  const conCandidatos = CATEGORIAS.filter(cat => POSTULADOS.some(p=>p.categoria === cat.id));
  if(conCandidatos.length === 0){
    els.sections.innerHTML = `<p class="loading-msg">Todavía no hay postulados cargados. Vuelve a intentarlo en unos minutos.</p>`;
    return;
  }
  els.sections.innerHTML = conCandidatos.map(cat=>{
    const items = POSTULADOS.filter(p=>p.categoria === cat.id);
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
      <div class="modal-cat">${cat ? cat.emoji + " " + cat.nombre : ""}</div>
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

// ---------- Progreso de votación y cierre ----------
function categoriasConCandidatos(){
  return CATEGORIAS.filter(cat => POSTULADOS.some(p=>p.categoria === cat.id));
}

function updateFinishProgress(){
  const activas = categoriasConCandidatos();
  const votadas = activas.filter(cat => hasVoted(cat.id)).length;
  const faltan = activas.length - votadas;
  const completo = activas.length > 0 && faltan === 0;

  if(els.finishProgress){
    if(votadas === 0){
      els.finishProgress.textContent = `Vota en las ${activas.length} categorías para poder finalizar.`;
    } else if(!completo){
      els.finishProgress.textContent = `Te falta${faltan===1?"":"n"} ${faltan} categoría${faltan===1?"":"s"} por votar.`;
    } else {
      els.finishProgress.textContent = `¡Votaste en las ${activas.length} categorías! Ya puedes finalizar.`;
    }
  }
  if(els.btnFinalizar){
    els.btnFinalizar.disabled = !completo;
    els.btnFinalizar.textContent = completo ? "🏁 Finalizar votación" : `🏁 Vota en todas para finalizar (faltan ${faltan})`;
  }
  if(els.floatingFinalizar){
    els.floatingFinalizar.disabled = !completo;
  }
}

function mostrarCierre(){
  const activas = categoriasConCandidatos();
  const votadas = activas.filter(cat => hasVoted(cat.id)).length;
  openOverlay(`
    <div class="modal cierre-modal">
      <button class="close" data-action="cerrar">✕</button>
      <img class="cierre-img" src="assets/invitacion-ceremonia.jpg" alt="Invitación a la ceremonia de premiación Level Up 2026 — 23 de septiembre, 5:30 p.m., Teatro Bicentenario">
      <div class="modal-body">
        <h2>¡Gracias por votar!</h2>
        <p>Votaste en ${votadas} de ${activas.length} categorías. Los ganadores se conocerán en la ceremonia de premiación.</p>
        <div class="stat-row" style="justify-content:center">
          <div class="stat"><b>23 de septiembre · 5:30 p.m.</b>Fecha y hora</div>
          <div class="stat"><b>Teatro Bicentenario</b>Lugar</div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-action="cerrar" style="flex:1">Seguir viendo postulados</button>
        </div>
      </div>
    </div>`);
}

// ---------- Confirmación de voto ----------
function confirmarVoto(p){
  const cat = CATEGORIAS.find(c=>c.id===p.categoria);
  openOverlay(`
    <div class="confirm-box">
      <div class="bolt">⚡</div>
      <h3>¿Confirmas tu voto?</h3>
      <p>Vas a votar por <b>${p.nombre}</b> en la categoría <b>${cat ? cat.emoji + " " + cat.nombre : ""}</b>.<br>Solo puedes votar una vez por categoría.</p>
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
      updateFinishProgress();
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
  els.overlayContent.querySelectorAll('[data-action="votar"]').forEach(btn=>{
    if(btn.disabled) return;
    btn.onclick = ()=>{
      const p = POSTULADOS.find(x=>x.id===btn.dataset.id);
      confirmarVoto(p);
    };
  });
}

// ---------- Navegación por categoría ----------
function wireCatNav(){
  const chips = els.catNav.querySelectorAll(".cat-chip");
  chips.forEach(chip=>{
    chip.onclick = ()=>{
      const target = document.getElementById(`cat-${chip.dataset.cat}`);
      if(target) target.scrollIntoView({behavior:"smooth", block:"start"});
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
// Filtra y completa cualquier categoría o postulado mal formado que pueda
// llegar desde el Sheet, para que una fila con datos raros no rompa toda la
// página. Las categorías ya no son una lista fija: se arman con lo que
// devuelva Apps Script (acción "list"), así que cualquier categoría nueva
// que aparezca en el formulario se muestra sola, sin tocar este archivo.
function sanearCategorias(lista){
  if(!Array.isArray(lista)) return [];
  return lista
    .filter(c => c && c.id && c.nombre)
    .map(c => Object.assign({ emoji: "🏅" }, c));
}

function sanearPostulados(lista, categorias){
  if(!Array.isArray(lista)) return [];
  const catIds = new Set((categorias || CATEGORIAS).map(c=>c.id));
  return lista
    .filter(p => p && p.id && p.nombre && catIds.has(p.categoria))
    .map(p => Object.assign({
      barrio: "", organizacion: "", resumen: "", historia: "",
      tiempo: "", beneficiarios: "", logro: "", fotoId: "", evidenciaIds: []
    }, p));
}

function mostrarErrorCarga(){
  els.sections.innerHTML = `
    <div class="loading-msg">
      <p>⚠️ No pudimos mostrar los postulados. Intenta recargar la página.</p>
      <button class="btn btn-ghost" id="btnReintentar" style="margin-top:10px">Reintentar</button>
    </div>`;
  const btn = document.getElementById("btnReintentar");
  if(btn) btn.onclick = () => location.reload();
}

async function init(){
  tickCountdown();
  setInterval(tickCountdown, 1000);

  els.sections.innerHTML = `<p class="loading-msg">⚡ Cargando postulados desde el Sheet...</p>`;

  let usandoRespaldo = false;
  try{
    const resp = await cargarPostulados();
    const categoriasLimpias = sanearCategorias(resp.categorias);
    const postuladosLimpios = categoriasLimpias.length ? sanearPostulados(resp.postulados, categoriasLimpias) : [];
    if(categoriasLimpias.length && postuladosLimpios.length){
      CATEGORIAS = categoriasLimpias;
      POSTULADOS = postuladosLimpios;
    } else {
      CATEGORIAS = CATEGORIAS_FALLBACK;
      POSTULADOS = POSTULADOS_FALLBACK;
      usandoRespaldo = true;
    }
  }catch(err){
    console.warn("Mostrando datos de respaldo (no se pudo leer el Sheet en vivo):", err.message);
    CATEGORIAS = CATEGORIAS_FALLBACK;
    POSTULADOS = POSTULADOS_FALLBACK;
    usandoRespaldo = true;
  }

  try{
    renderCatNav();
    renderSections();
    wireCardEvents();
    wireCatNav();
    updateFinishProgress();
    if(els.btnFinalizar) els.btnFinalizar.onclick = mostrarCierre;
    if(els.floatingFinalizar) els.floatingFinalizar.onclick = mostrarCierre;
    if(usandoRespaldo) showToast("Mostrando datos de respaldo: no se pudo conectar en vivo con el Sheet.", true);
  }catch(err){
    console.error("Error al dibujar la página:", err);
    mostrarErrorCarga();
  }
}
document.addEventListener("DOMContentLoaded", init);
