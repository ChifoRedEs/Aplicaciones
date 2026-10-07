import {state} from "./state.js";
import {GROUPS} from "../data/exercises.js";
import {getExercises, getExercise} from "./data.js";
import {sessions, saveSession, previousPerformance, startFromPrevious} from "./workouts.js";
import {completedSets, totalSets, sessionVolume, progress, prs, weekly} from "./stats.js";
import {exportBackup, exportCSV, importBackup} from "./backup.js";
import {configureTimer, startTimer, toggleTimer, stopTimer} from "./timer.js";
import {toast, esc, safeUrl} from "./ui.js";
import {renderExerciseManager} from "./exercise-manager.js";

const screen=document.querySelector("#screen");
const title=document.querySelector("#pageTitle");
const subtitle=document.querySelector("#pageSubtitle");
let installPrompt=null;

addEventListener("beforeinstallprompt",e=>{
  e.preventDefault(); installPrompt=e;
  document.querySelector("#installBtn")?.classList.remove("hidden");
});
document.querySelector("#installBtn")?.addEventListener("click",async()=>{
  if(!installPrompt)return;
  await installPrompt.prompt();
  installPrompt=null;
  document.querySelector("#installBtn")?.classList.add("hidden");
});
if("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(()=>{});

document.querySelectorAll(".bottom-nav button").forEach(b=>b.addEventListener("click",()=>route(b.dataset.route)));
document.querySelector("#backBtn")?.addEventListener("click",()=>route(state.previousRoute||"home"));
configureTimer(renderTimer);

async function route(name,p={}){
  state.previousRoute=state.route;
  state.route=name;
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.route===name));
  document.querySelector("#backBtn")?.classList.toggle("hidden",name==="home");
  if(name==="home")await home();
  else if(name==="history")await history();
  else if(name==="stats")await stats();
  else if(name==="settings")await settings();
  else if(name==="exercises")await exercises();
  else if(name==="workout")await workout(p.id);
}

async function home(){
  title.textContent="Rutina Gym"; subtitle.textContent="Nuevo entrenamiento";
  const ex=await getExercises();
  screen.innerHTML=`<h2>Entrenar</h2><div class="grid">${Object.entries(GROUPS).map(([k,g])=>
    `<button class="card btn group-card" data-new="${esc(k)}"><h3>${esc(g.label)}</h3><span class="muted small">${esc(g.sub)}</span></button>`
  ).join("")}</div>
  <div class="card"><div class="row"><h3>Últimos entrenamientos</h3><button class="btn" id="hist">Ver todos</button></div><div id="recent"></div></div>`;

  document.querySelectorAll("[data-new]").forEach(b=>b.addEventListener("click",async()=>{
    const defs=ex.filter(x=>x.group===b.dataset.new).slice(0,8);
    if(!defs.length){toast("No hay ejercicios para este grupo");return;}
    const s=await startFromPrevious(b.dataset.new,`Sesión ${GROUPS[b.dataset.new].label}`,defs.map(x=>x.id));
    await saveSession(s); await route("workout",{id:s.id});
  }));
  document.querySelector("#hist").addEventListener("click",()=>route("history"));
  const ss=(await sessions()).slice(0,3);
  document.querySelector("#recent").innerHTML=ss.length?ss.map(s=>
    `<div class="list-item"><div class="row"><b>${esc(s.name)}</b><span class="small muted">${esc(s.date)}</span></div><span class="small muted">${completedSets(s)} series · ${Math.round(sessionVolume(s))} kg</span></div>`
  ).join(""):"<div class="empty">Todavía no hay entrenamientos.</div>";
}

async function workout(id){
  const s=(await sessions()).find(x=>x.id===id);
  if(!s){await route("home");return;}
  state.currentSession=s;
  title.textContent=s.name;
  subtitle.textContent=`${s.date} · ${GROUPS[s.group]?.label||s.group}`;
  screen.innerHTML=`<div class="card"><div class="row"><b>Progreso</b><span id="pt">${completedSets(s)}/${totalSets(s)} series</span></div><div class="progress"><div id="pb" style="width:${progress(s)}%"></div></div></div><div id="elist"></div><button class="btn primary full" id="finish">Guardar entrenamiento</button><div id="rest"></div>`;

  for(const e of s.exercises){
    const p=await previousPerformance(e.id,s.date);
    const def=await getExercise(e.id);
    const card=document.createElement("article");
    card.className="card exercise";
    card.dataset.id=e.id;
    const tutorial=safeUrl(def?.tutorialUrl||"");
    const external=safeUrl(def?.externalUrl||"");
    const image=safeUrl(def?.imagePath||"");
    card.innerHTML=`<div class="row"><div><h3>${esc(e.name)}</h3><div class="tags"><span class="tag">${esc(e.primary)}</span>${e.secondary?`<span class="tag">${esc(e.secondary)}</span>`:""}</div></div><button class="btn" data-rest>Descanso</button></div>
      ${image?`<img class="workout-image" src="${esc(image)}" alt="${esc(e.name)}">`:""}
      ${def?.instructions?`<p class="small exercise-instructions">${esc(def.instructions)}</p>`:""}
      <div class="exercise-actions">${tutorial?`<a class="btn" href="${esc(tutorial)}" target="_blank" rel="noopener noreferrer">▶ Tutorial</a>`:""}${external?`<a class="btn" href="${esc(external)}" target="_blank" rel="noopener noreferrer">↗ Más información</a>`:""}${def?.targetRepsMin||def?.targetRepsMax?`<span class="target small">Objetivo: ${Number(def.targetRepsMin)||8}–${Number(def.targetRepsMax)||12} reps · RIR ${Number(def.targetRIR)||0}</span>`:""}</div>
      <p class="small muted">${p?"Anterior: "+p.exercise.sets.filter(x=>x.completed).map(x=>`${x.weight||0}kg × ${x.reps||0}`).join(" · "):"Sin historial previo"}</p>
      <div class="sets">${e.sets.map((x,i)=>`<div class="set-row" data-set="${esc(x.id)}"><span class="set-num">${i+1}</span><input data-f="weight" type="number" inputmode="decimal" value="${esc(x.weight)}" placeholder="kg"><input data-f="reps" type="number" inputmode="numeric" value="${esc(x.reps)}" placeholder="reps"><input data-f="rir" type="number" inputmode="numeric" value="${esc(x.rir)}" placeholder="RIR"><button class="check ${x.completed?"checked":""}" data-check>${x.completed?"✓":"○"}</button></div>`).join("")}</div>
      <label style="margin-top:10px">Notas<input data-note value="${esc(e.notes)}" placeholder="Notas"></label>`;
    document.querySelector("#elist").append(card);

    card.querySelectorAll(".set-row").forEach(r=>{
      r.querySelectorAll("input").forEach(input=>input.addEventListener("input",()=>{
        const x=e.sets.find(z=>z.id===r.dataset.set); if(!x)return;
        x[input.dataset.f]=input.value; saveSession(s); updateProgress(s);
      }));
      r.querySelector("[data-check]").addEventListener("click",async()=>{
        const x=e.sets.find(z=>z.id===r.dataset.set); if(!x)return;
        x.completed=!x.completed; await saveSession(s); updateProgress(s);
        if(x.completed)startTimer(e.restSeconds||def?.restSeconds||90,e.name);
        r.querySelector("[data-check]").classList.toggle("checked",x.completed);
        r.querySelector("[data-check]").textContent=x.completed?"✓":"○";
      });
    });
    card.querySelector("[data-note]").addEventListener("input",ev=>{e.notes=ev.target.value;saveSession(s)});
    card.querySelector("[data-rest]").addEventListener("click",()=>startTimer(e.restSeconds||def?.restSeconds||90,e.name));
  }
  document.querySelector("#finish").addEventListener("click",async()=>{s.status="completed";await saveSession(s);toast("Entrenamiento guardado");await route("history")});
}

function updateProgress(s){
  const pt=document.querySelector("#pt"),pb=document.querySelector("#pb");
  if(pt)pt.textContent=`${completedSets(s)}/${totalSets(s)} series`;
  if(pb)pb.style.width=`${progress(s)}%`;
}

async function history(){
  title.textContent="Historial"; subtitle.textContent="Entrenamientos";
  const ss=await sessions();
  screen.innerHTML=`<h2>Historial</h2><div class="list">${ss.map(s=>`<div class="list-item"><div class="row"><div><b>${esc(s.name)}</b><div class="small muted">${esc(GROUPS[s.group]?.label||s.group)} · ${esc(s.date)}</div></div><button class="btn" data-open="${esc(s.id)}">Abrir</button></div><span class="small muted">${completedSets(s)} series · ${Math.round(sessionVolume(s))} kg</span></div>`).join("")||`<div class="empty">No hay sesiones.</div>`}</div>`;
  document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>route("workout",{id:b.dataset.open})));
}

async function stats(){
  title.textContent="Progreso"; subtitle.textContent="Volumen y PRs";
  const ss=await sessions(),p=prs(ss),w=weekly(ss),v=ss.reduce((n,s)=>n+sessionVolume(s),0);
  screen.innerHTML=`<h2>Progreso</h2><div class="kpis"><div class="kpi"><b>${ss.length}</b><span>Sesiones</span></div><div class="kpi"><b>${Math.round(v)}</b><span>kg volumen</span></div><div class="kpi"><b>${p.length}</b><span>PR</span></div><div class="kpi"><b>${ss.length?Math.round(v/ss.length):0}</b><span>kg/sesión</span></div></div><div class="card"><h3>Volumen semanal</h3>${Object.entries(w).slice(-8).map(([d,x])=>`<div class="row small"><span>${esc(d)}</span><b>${Math.round(x)} kg</b></div>`).join("")||`<p class="muted">Sin datos.</p>`}</div><div class="card"><h3>Récords</h3>${p.map(x=>`<div class="list-item"><div class="row"><b>${esc(x.exercise)}</b><b>${x.weight} kg × ${x.reps}</b></div><span class="small muted">${esc(x.date)}</span></div>`).join("")||`<p class="muted">Todavía no hay PRs.</p>`}</div>`;
}

async function settings(){
  title.textContent="Ajustes"; subtitle.textContent="Aplicación y biblioteca";
  screen.innerHTML=`<h2>Ajustes</h2><div class="card"><h3>Biblioteca de ejercicios</h3><p class="small muted">Gestiona la imagen, tutorial, enlace externo, instrucciones, descanso y objetivos de cada ejercicio.</p><button class="btn primary full" id="exerciseManager">Gestionar ejercicios</button></div><div class="card"><h3>Datos</h3><div class="grid grid-2"><button class="btn" id="backup">Copia JSON</button><button class="btn" id="csv">Exportar CSV</button></div><label style="margin-top:10px">Restaurar copia<input id="restore" type="file" accept=".json,application/json"></label></div><div class="card"><h3>Almacenamiento</h3><p class="small muted">Los entrenamientos y las imágenes subidas se guardan localmente en IndexedDB. GitHub Pages aloja el código, no tus datos.</p></div>`;
  document.querySelector("#exerciseManager").addEventListener("click",()=>route("exercises"));
  document.querySelector("#backup").addEventListener("click",()=>exportBackup().then(()=>toast("Copia exportada")));
  document.querySelector("#csv").addEventListener("click",()=>exportCSV().then(()=>toast("CSV exportado")));
  document.querySelector("#restore").addEventListener("change",e=>e.target.files[0]&&importBackup(e.target.files[0]).then(()=>{toast("Copia restaurada");route("home")}).catch(()=>toast("Copia no válida")));
}

async function exercises(){title.textContent="Ejercicios";subtitle.textContent="Biblioteca";await renderExerciseManager(screen,()=>route("settings"));}

function renderTimer(t){
  const el=document.querySelector("#rest"); if(!el)return;
  if(t.remaining<=0){el.innerHTML="";return;}
  const m=Math.floor(t.remaining/60),s=String(t.remaining%60).padStart(2,"0");
  el.innerHTML=`<div class="rest"><div><div class="small muted">${esc(t.exerciseName)}</div><strong>${m}:${s}</strong></div><button class="btn" id="tt">${t.running?"Pausar":"Continuar"}</button><button class="btn" id="tx">Cerrar</button></div>`;
  document.querySelector("#tt").onclick=toggleTimer;
  document.querySelector("#tx").onclick=()=>{stopTimer();renderTimer({remaining:0})};
}

route("home").catch(err=>{
  console.error(err);
  title.textContent="Error de carga"; subtitle.textContent="Revisa los archivos desplegados";
  screen.innerHTML=`<div class="card"><h2>No se pudo cargar la aplicación</h2><p class="muted">${esc(err?.message||String(err))}</p><p class="small muted">Sube el proyecto completo manteniendo las carpetas <b>js</b>, <b>css</b> y <b>data</b>.</p></div>`;
});
