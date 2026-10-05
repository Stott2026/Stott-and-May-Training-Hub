import React, { useState, useRef, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { B, VALUES, MODS, QUIZ_QS } from "./data.js";
import { DOCS, DOC_CATS, FormCtx } from "./forms.jsx";

/* ── Storage (per-viewer, wrapped so an empty or blocked store never breaks the page) ── */
const RELATED = {
  candidate:["candidate-reg","interview-prep","pipeline","counter-offer","cv-checklist"],
  client:["client-brief","bd-call","client-qbr"],
  job:["job-qual","pipeline","interview-feedback","offer","sow"],
  bd:["leads","bd-call"],
  control:["bd-call","counter-offer"],
  interview:["interview-prep","interview-feedback","candidate-feedback"],
  offer:["offer","counter-offer","compliance"],
  negotiation:["offer","client-brief"],
  sales:["job-qual","leads","bd-call"],
  psychology:["bd-call","counter-offer"],
  time:["activity","pipeline"],
  brand:["activity","leads"],
  onboarding:["compliance","reference-check","offer"],
  phrases:["bd-call","interview-prep"],
};
const PKEY = "sm_training_v2", FKEY = "sm_forms_v1";
const read = (k, d) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

/* ── Capabilities ── */
const useCap = (name) => {
  const [cap, setCap] = useState(null);
  useEffect(() => {
    let live = true;
    try { window.claude?.use?.(name)?.then(c => { if (live) setCap(() => c); }).catch(()=>{}); } catch {}
    return () => { live = false; };
  }, [name]);
  return cap;
};

const Wave = ({ color=B.teal, h=28 }) => (
  <svg width="100%" height={h} viewBox="0 0 700 28" preserveAspectRatio="none" style={{display:"block"}} aria-hidden="true">
    <path d="M0,18 C100,5 200,24 350,14 C500,4 600,22 700,12" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
  </svg>
);

/* ══════════════ Training components (as before) ══════════════ */
function SectionBlock({ section, open, toggle, completed, onToggle }) {
  return (
    <div style={{border:`1px solid ${B.border}`,borderRadius:10,overflow:"hidden",marginBottom:10}}>
      <button onClick={toggle} aria-expanded={open} style={{width:"100%",background:open?"#1e2328":B.inner,border:"none",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div onClick={e=>{e.stopPropagation();onToggle();}} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${completed?B.teal:B.border}`,background:completed?B.teal:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
            {completed && <span style={{color:B.dark,fontSize:10,fontWeight:900}}>✓</span>}
          </div>
          <span style={{fontSize:14,fontWeight:600,color:B.white,fontFamily:"Manrope,sans-serif",textAlign:"left"}}>{section.title}</span>
        </div>
        <span style={{color:B.teal,fontSize:18,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s",flexShrink:0}}>⌄</span>
      </button>
      {open && (
        <div style={{padding:"16px 18px",background:B.inner,borderTop:`1px solid ${B.border}`}}>
          <p style={{fontSize:13,color:B.mid,lineHeight:1.7,marginBottom:16,maxWidth:"68ch"}}>{section.content}</p>
          {section.tactics.length > 0 && (
            <div style={{marginBottom:16}}>
              <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:10}}>KEY TACTICS</div>
              {section.tactics.map((t,i) => (
                <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:B.teal,marginTop:7,flexShrink:0}}/>
                  <span style={{fontSize:13,color:"#b0bac5",lineHeight:1.5}}>{t}</span>
                </div>
              ))}
            </div>
          )}
          {section.phrases.length > 0 && (
            <div style={{marginBottom:16}}>
              <div style={{fontSize:9,letterSpacing:"0.12em",color:B.aqua,fontFamily:"Manrope,sans-serif",marginBottom:10}}>PHRASES TO USE</div>
              {section.phrases.map((p,i) => (
                <div key={i} style={{background:B.dark,border:`1px solid ${B.border}`,borderLeft:`3px solid ${B.aqua}`,borderRadius:"0 6px 6px 0",padding:"10px 14px",marginBottom:8,fontSize:12,color:"#d0dae4",lineHeight:1.6,fontStyle:"italic"}}>{p}</div>
              ))}
            </div>
          )}
          {section.mistakes && section.mistakes.length > 0 && (
            <div style={{marginBottom:16}}>
              <div style={{fontSize:9,letterSpacing:"0.12em",color:"#FF6B6B",fontFamily:"Manrope,sans-serif",marginBottom:10}}>COMMON MISTAKES TO AVOID</div>
              {section.mistakes.map((m,i) => (
                <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#FF6B6B",marginTop:7,flexShrink:0}}/>
                  <span style={{fontSize:13,color:"#b0bac5",lineHeight:1.5}}>{m}</span>
                </div>
              ))}
            </div>
          )}
          {section.scenario && (
            <div style={{background:B.dark,border:`1px solid ${B.border}`,borderRadius:10,overflow:"hidden",marginBottom:16}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${B.border}`,fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",fontWeight:600}}>REAL-WORLD SCENARIO</div>
              <div style={{padding:14}}>
                <div style={{fontSize:13,fontWeight:700,color:B.white,fontFamily:"Manrope,sans-serif",marginBottom:14,lineHeight:1.4}}>{section.scenario.title}</div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:9,letterSpacing:"0.1em",color:"#FF6B6B",fontFamily:"Manrope,sans-serif",marginBottom:6}}>WEAK APPROACH</div>
                  <div style={{background:"rgba(220,60,60,0.08)",border:"1px solid rgba(220,60,60,0.2)",borderRadius:6,padding:"10px 12px",fontSize:12,color:"#d0dae4",lineHeight:1.6}}>{section.scenario.weak}</div>
                </div>
                <div>
                  <div style={{fontSize:9,letterSpacing:"0.1em",color:B.aqua,fontFamily:"Manrope,sans-serif",marginBottom:6}}>STRONG APPROACH</div>
                  <div style={{background:"rgba(0,200,200,0.08)",border:"1px solid rgba(0,200,200,0.2)",borderRadius:6,padding:"10px 12px",fontSize:12,color:"#d0dae4",lineHeight:1.6}}>{section.scenario.strong}</div>
                </div>
              </div>
            </div>
          )}
          <button onClick={onToggle} style={{marginTop:4,background:completed?"rgba(0,200,200,0.08)":"transparent",border:`1px solid ${completed?B.teal:B.border}`,borderRadius:8,padding:"8px 16px",color:completed?B.teal:B.mid,fontSize:12,cursor:"pointer"}}>
            {completed ? "Marked as complete" : "Mark as complete"}
          </button>
        </div>
      )}
    </div>
  );
}

const COACH_BRIEF = "You are an expert recruitment training coach for Stott and May, a specialist technology recruitment firm. You help consultants improve their skills across permanent recruitment, contract recruitment, and SOW engagements. Give practical, specific, actionable advice. Use real phrases and questions they can use. Be direct and confident like a great senior mentor. Keep responses concise and punchy. Use British English.";

function AICoach({ onClose, context, sample }) {
  const [msgs,setMsgs] = useState([{role:"assistant",text:"Hi! I am your Stott and May training coach. Ask me anything about recruitment — BD tactics, handling objections, perm vs contract vs SOW, closing techniques."}]);
  const [inp,setInp] = useState("");
  const [loading,setLoading] = useState(false);
  const bot = useRef(null);
  useEffect(()=>{ bot.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);
  const send = async () => {
    if (!inp.trim() || loading || !sample) return;
    const u = inp.trim(); setInp("");
    const convo = [...msgs.slice(1), {role:"user",text:u}];
    setMsgs(m => [...m, {role:"user",text:u}, {role:"assistant",text:"Thinking…"}]);
    setLoading(true);
    const turns = convo.map((m,i) => ({ role:m.role, content: i===0 ? `${COACH_BRIEF}${context?`\n\nThe consultant is currently studying the "${context}" module.`:""}\n\nConsultant's question: ${m.text}` : m.text }));
    const setLast = t => setMsgs(m => { const c=[...m]; c[c.length-1]={role:"assistant",text:t}; return c; });
    try {
      const r = await sample(turns, { onText: ({text}) => setLast(text), cache:false });
      setLast(r.text + (r.truncated ? "\n\n(Answer cut short — try a narrower question.)" : ""));
    } catch (e) {
      setLast(e?.code==="rate_limited" ? "Too many questions in a short time. Wait a minute and ask again." : e?.code==="not_granted" ? "The coach needs permission to use Claude. Allow it when prompted, then ask again." : (e?.text || "The coach couldn't answer that. Ask again in a moment."));
    }
    setLoading(false);
  };
  return (
    <div className="no-print" style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"flex-end",padding:"1rem"}}>
      <div role="dialog" aria-label="AI training coach" style={{background:B.inner,border:`1px solid ${B.border}`,borderRadius:16,width:"min(440px,100%)",maxHeight:"80vh",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"1rem 1.25rem",borderBottom:`1px solid ${B.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:2}}>AI TRAINING COACH</div>
            <div style={{fontSize:15,fontWeight:700,color:B.white,fontFamily:"Manrope,sans-serif"}}>Ask me anything</div>
          </div>
          <button onClick={onClose} aria-label="Close coach" style={{background:"none",border:"none",color:B.mid,cursor:"pointer",fontSize:20}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"1rem 1.25rem",display:"flex",flexDirection:"column",gap:10}}>
          {msgs.map((m,i) => (
            <div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"88%"}}>
              <div style={{background:m.role==="user"?`linear-gradient(135deg,${B.teal},${B.aqua})`:"#242b32",color:m.role==="user"?B.dark:B.white,borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",padding:"10px 14px",fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{m.text}</div>
            </div>
          ))}
          {!sample && <div style={{fontSize:12,color:B.mid}}>The coach is available when this page is opened in Claude.</div>}
          <div ref={bot}/>
        </div>
        <div style={{padding:"0.75rem 1.25rem",borderTop:`1px solid ${B.border}`,display:"flex",gap:8}}>
          <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about anything recruitment…" aria-label="Your question" style={{flex:1,minWidth:0,background:"#242b32",border:`1px solid ${B.border}`,borderRadius:8,padding:"8px 12px",color:B.white,fontSize:13,outline:"none"}}/>
          <button onClick={send} disabled={loading||!sample} style={{background:`linear-gradient(135deg,${B.teal},${B.aqua})`,border:"none",borderRadius:8,padding:"8px 16px",color:B.dark,fontWeight:700,cursor:"pointer",fontSize:13,opacity:loading||!sample?0.5:1}}>Send</button>
        </div>
      </div>
    </div>
  );
}

function Quiz({ onClose, onScore }) {
  const shuffled = useRef([...QUIZ_QS].sort(()=>Math.random()-0.5).slice(0,10)).current;
  const [idx,setIdx] = useState(0), [sel,setSel] = useState(null), [score,setScore] = useState(0), [done,setDone] = useState(false);
  const q = shuffled[idx];
  const choose = i => { if(sel!==null)return; setSel(i); if(i===q.correct)setScore(s=>s+1); };
  const next = () => { if(idx+1>=shuffled.length){setDone(true);onScore(score);}else{setIdx(i=>i+1);setSel(null);} };
  return (
    <div className="no-print" style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div role="dialog" aria-label="Quiz" style={{background:B.inner,border:`1px solid ${B.border}`,borderRadius:16,width:"100%",maxWidth:560,padding:"1.75rem",maxHeight:"90vh",overflowY:"auto"}}>
        {done ? (
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>{score>=8?"🏆":score>=6?"👍":"📚"}</div>
            <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:8}}>QUIZ COMPLETE</div>
            <div style={{fontSize:28,fontWeight:800,fontFamily:"Manrope,sans-serif",color:B.white,marginBottom:8}}>{score}/{shuffled.length}</div>
            <div style={{fontSize:14,color:B.mid,marginBottom:24}}>{score>=8?"Excellent. You really know your stuff.":score>=6?"Good effort. Review the modules and try again.":"Keep learning. Go back through the training modules."}</div>
            <button onClick={onClose} style={{background:`linear-gradient(135deg,${B.teal},${B.aqua})`,border:"none",borderRadius:8,padding:"12px 24px",color:B.dark,fontWeight:700,fontFamily:"Manrope,sans-serif",cursor:"pointer"}}>Back to Hub</button>
          </div>
        ) : (<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
            <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif"}}>QUESTION {idx+1} OF {shuffled.length}</div>
            <button onClick={onClose} aria-label="Close quiz" style={{background:"none",border:"none",color:B.mid,cursor:"pointer",fontSize:18}}>✕</button>
          </div>
          <div style={{height:3,background:"#2a2f35",borderRadius:3,marginBottom:"1.25rem"}}><div style={{height:3,background:`linear-gradient(90deg,${B.teal},${B.aqua})`,borderRadius:3,width:`${(idx/shuffled.length)*100}%`,transition:"width 0.3s"}}/></div>
          <div style={{fontSize:16,fontWeight:700,fontFamily:"Manrope,sans-serif",color:B.white,marginBottom:"1.25rem",lineHeight:1.4}}>{q.q}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:"1.25rem"}}>
            {q.opts.map((o,i) => {
              let bg="#242b32",border=B.border,color=B.white;
              if(sel!==null){if(i===q.correct){bg="rgba(0,200,200,0.12)";border=B.teal;color=B.teal;}else if(i===sel){bg="rgba(220,60,60,0.1)";border="#dc3c3c";color="#ff6b6b";}}
              return <button key={i} onClick={()=>choose(i)} style={{background:bg,border:`1px solid ${border}`,borderRadius:10,padding:"12px 16px",color,fontSize:13,textAlign:"left",cursor:sel!==null?"default":"pointer"}}>{o}</button>;
            })}
          </div>
          {sel!==null && <div style={{background:"rgba(0,200,200,0.08)",border:"1px solid rgba(0,200,200,0.2)",borderRadius:10,padding:"12px 16px",marginBottom:"1rem",fontSize:12,color:B.teal,lineHeight:1.5}}>{q.exp}</div>}
          {sel!==null && <button onClick={next} style={{width:"100%",background:`linear-gradient(135deg,${B.teal},${B.aqua})`,border:"none",borderRadius:8,padding:12,color:B.dark,fontWeight:700,fontFamily:"Manrope,sans-serif",cursor:"pointer",fontSize:14}}>{idx+1>=shuffled.length?"See results":"Next question"}</button>}
        </>)}
      </div>
    </div>
  );
}

/* ══════════════ Documents ══════════════ */
function exportHtml(doc, values) {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const rows = Object.entries(values).filter(([,v]) => v !== "" && v !== false && v != null)
    .map(([k,v]) => `<tr><th>${esc(k.replace(/^(CHECK|SCORE|METRIC): /,""))}</th><td>${v===true?"✓ Done":esc(v).replace(/\n/g,"<br>")}</td></tr>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(doc.title)}</title><style>body{font-family:Inter,Arial,sans-serif;color:#111314;max-width:780px;margin:32px auto;padding:0 20px}h1{font-family:Manrope,Arial,sans-serif;margin:0 0 4px}.k{color:#00a3a3;font-size:11px;letter-spacing:.1em;font-weight:700}hr{border:0;height:3px;background:linear-gradient(90deg,#00C8C8,#73F7BB);margin:16px 0 20px}table{width:100%;border-collapse:collapse}th,td{text-align:left;vertical-align:top;padding:8px 10px;border-bottom:1px solid #e3e7eb;font-size:13px}th{width:40%;color:#4a5563;font-weight:600}</style></head><body><div class="k">STOTT AND MAY · ${esc(doc.category)}</div><h1>${esc(doc.title)}</h1><div style="color:#7A8798;font-size:13px">Exported ${new Date().toLocaleDateString("en-GB")}</div><hr>${rows?`<table>${rows}</table>`:"<p>No fields completed.</p>"}</body></html>`;
}

function DocumentsTab({ activeDoc, setActiveDoc, forms, setForms, downloads, backTo, onBackTo }) {
  const [cat,setCat] = useState("All");
  const [note,setNote] = useState("");
  const list = cat==="All" ? DOCS : DOCS.filter(d=>d.category===cat);
  const doc = activeDoc ? DOCS.find(d=>d.id===activeDoc) : null;
  const filled = id => Object.values(forms[id]||{}).filter(v=>v!==""&&v!==false).length;

  if (doc) {
    const values = forms[doc.id] || {};
    const ctx = { values, set:(k,v)=>setForms(f=>({...f,[doc.id]:{...(f[doc.id]||{}),[k]:v}})) };
    const flash = t => { setNote(t); setTimeout(()=>setNote(""),3000); };
    const save = async () => {
      try { await downloads.save({ filename:`${doc.title.replace(/[^\w]+/g,"-")}.html`, data: exportHtml(doc, values) }); flash("Saved"); }
      catch (e) { if (e?.code !== "declined") flash("Couldn't save the file. Try Print instead."); }
    };
    const clear = () => { if (confirm(`Clear everything entered in ${doc.title}?`)) setForms(f=>{ const n={...f}; delete n[doc.id]; return n; }); };
    return (
      <div style={{maxWidth:820,margin:"0 auto",padding:"1.5rem"}}>
        <div className="no-print" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:"1.25rem"}}>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {backTo && <button onClick={onBackTo} style={{background:"none",border:"none",color:B.teal,cursor:"pointer",fontSize:13,padding:0}}>← Back to {backTo}</button>}
            <button onClick={()=>setActiveDoc(null)} style={{background:"none",border:"none",color:backTo?B.mid:B.teal,cursor:"pointer",fontSize:13,padding:0}}>{backTo?"All documents":"← All documents"}</button>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            {note && <span role="status" style={{fontSize:12,color:B.aqua}}>{note}</span>}
            <span style={{fontSize:11,color:B.mid}}>Saved in this browser as you type</span>
            <button onClick={clear} className="btn-ghost">Clear form</button>
            <button onClick={()=>{ try { window.print(); } catch { flash("Printing isn't available here."); } }} className="btn-ghost">Print</button>
            {downloads && <button onClick={save} className="btn-solid">Download copy</button>}
          </div>
        </div>
        <div className="print-sheet" style={{background:B.inner,border:`1px solid ${B.border}`,borderRadius:14,padding:"1.75rem clamp(1rem,4vw,2rem)"}}>
          <FormCtx.Provider value={ctx}><doc.Comp/></FormCtx.Provider>
        </div>
      </div>
    );
  }

  return (
    <div style={{maxWidth:980,margin:"0 auto",padding:"2rem 1.5rem"}}>
      <div style={{marginBottom:"1.5rem",background:B.inner,border:`1px solid ${B.border}`,borderRadius:16,overflow:"hidden"}}>
        <div style={{height:3,background:`linear-gradient(90deg,${B.teal},${B.aqua})`}}/>
        <div style={{padding:"1.75rem 2rem"}}>
          <Wave/>
          <div style={{marginTop:12}}>
            <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:8}}>RESOURCES</div>
            <h1 style={{fontSize:30,fontWeight:800,fontFamily:"Manrope,sans-serif",color:B.white,margin:"0 0 8px"}}>Documents & Forms</h1>
            <p style={{fontSize:13,color:B.mid,margin:0,maxWidth:"60ch",lineHeight:1.6}}>{DOCS.length} fillable forms for every stage of the recruitment process. Fill them in on screen, then print or download a copy. What you type is kept in this browser.</p>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:"1.25rem"}} role="tablist" aria-label="Filter by category">
        {DOC_CATS.map(c => {
          const n = c==="All" ? DOCS.length : DOCS.filter(d=>d.category===c).length;
          const on = cat===c;
          return <button key={c} role="tab" aria-selected={on} onClick={()=>setCat(c)} style={{background:on?"rgba(0,200,200,0.12)":B.card,border:`1px solid ${on?B.teal:B.border}`,borderRadius:20,padding:"7px 14px",color:on?B.teal:B.mid,fontSize:12,fontFamily:"Manrope,sans-serif",fontWeight:700,cursor:"pointer"}}>{c==="All"?"All":c==="BD"?"BD":c.charAt(0)+c.slice(1).toLowerCase()} <span style={{opacity:0.6}}>{n}</span></button>;
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
        {list.map(d => {
          const f = filled(d.id);
          return (
            <button key={d.id} onClick={()=>setActiveDoc(d.id)} className="doc-card" style={{textAlign:"left",background:B.card,border:`1px solid ${B.border}`,borderLeft:`3px solid ${d.color}`,borderRadius:12,padding:"1.1rem 1.1rem 1rem",cursor:"pointer",color:"inherit"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:22}} aria-hidden="true">{d.icon}</span>
                <span style={{fontSize:9,letterSpacing:"0.1em",color:d.color,fontFamily:"Manrope,sans-serif",fontWeight:700}}>{d.category}</span>
              </div>
              <div style={{fontSize:14,fontWeight:700,color:B.white,fontFamily:"Manrope,sans-serif",marginBottom:4}}>{d.title}</div>
              <div style={{fontSize:12,color:B.mid,lineHeight:1.45,marginBottom:10}}>{d.desc}</div>
              <div style={{fontSize:11,color:f?B.aqua:"#56606c"}}>{f ? `Draft in progress · ${f} field${f===1?"":"s"} filled` : "Blank"}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════ App ══════════════ */
function App() {
  const [tab,setTab] = useState("training");
  const [activeMod,setActiveMod] = useState(null);
  const [openSec,setOpenSec] = useState(null);
  const [activeDoc,setActiveDoc] = useState(null);
  const [returnMod,setReturnMod] = useState(null);
  const [showCoach,setShowCoach] = useState(false);
  const [showQuiz,setShowQuiz] = useState(false);
  const [search,setSearch] = useState("");
  const [progress,setProgress] = useState(()=>read(PKEY,{completed:{},quizScores:[]}));
  const [forms,setForms] = useState(()=>read(FKEY,{}));
  const sample = useCap("sample");
  const downloads = useCap("downloads");

  useEffect(()=>{ write(PKEY,progress); },[progress]);
  useEffect(()=>{ const t=setTimeout(()=>write(FKEY,forms),300); return ()=>clearTimeout(t); },[forms]);
  useEffect(()=>{ window.scrollTo(0,0); },[tab,activeMod,activeDoc]);

  const toggleComplete = (modId,secIdx) => { const k=`${modId}_${secIdx}`; setProgress(p=>({...p,completed:{...p.completed,[k]:!p.completed[k]}})); };
  const getMP = mod => { const t=mod.sections.length, d=mod.sections.filter((_,i)=>progress.completed[`${mod.id}_${i}`]).length; return {done:d,total:t,pct:Math.round((d/t)*100)}; };
  const totalS = MODS.reduce((a,m)=>a+m.sections.length,0);
  const totalD = MODS.reduce((a,m)=>a+getMP(m).done,0);
  const ovPct = Math.round((totalD/totalS)*100);
  const mod = activeMod!==null ? MODS[activeMod] : null;

  const searchRes = useMemo(() => {
    if (search.trim().length<2) return [];
    const q=search.toLowerCase(), res=[], has=s=>s.toLowerCase().includes(q);
    MODS.forEach((m,mi)=>m.sections.forEach((s,si)=>{
      if(has(s.title)||has(s.content)||s.tactics.some(has)||s.phrases.some(has)||(s.mistakes||[]).some(has)||(s.scenario&&(has(s.scenario.title)||has(s.scenario.strong)))) res.push({mod:m,modIdx:mi,sec:s,secIdx:si});
    }));
    return res;
  },[search]);
  const docRes = useMemo(()=> search.trim().length<2 ? [] : DOCS.filter(d=>(d.title+" "+d.desc).toLowerCase().includes(search.toLowerCase())),[search]);

  const go = t => { setTab(t); setActiveMod(null); setActiveDoc(null); setReturnMod(null); };
  const openForm = (id, fromMod) => { setReturnMod(fromMod ?? null); setTab("documents"); setActiveDoc(id); };
  const backToMod = () => { const m = returnMod; setReturnMod(null); setActiveDoc(null); setTab("training"); setActiveMod(m); setOpenSec(null); };

  return (
    <div style={{minHeight:"100%"}}>
      <nav className="no-print topnav" aria-label="Main">
        <div style={{display:"flex",alignItems:"center",gap:8,marginRight:18}}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><defs><linearGradient id="ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={B.teal}/><stop offset="1" stopColor={B.aqua}/></linearGradient></defs><rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" fill="url(#ng)"/></svg>
          <span style={{fontSize:10,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",fontWeight:700}}>STOTT AND MAY</span>
        </div>
        {[{id:"training",label:"Training Hub",icon:"📚"},{id:"documents",label:"Documents & Forms",icon:"📄"}].map(t=>(
          <button key={t.id} onClick={()=>go(t.id)} aria-current={tab===t.id?"page":undefined} style={{background:"none",border:"none",padding:"14px 12px",cursor:"pointer",fontSize:13,fontFamily:"Manrope,sans-serif",fontWeight:700,color:tab===t.id?B.teal:B.mid,borderBottom:`2px solid ${tab===t.id?B.teal:"transparent"}`,whiteSpace:"nowrap"}}>{t.icon} {t.label}</button>
        ))}
      </nav>

      {tab==="documents" && <DocumentsTab backTo={activeDoc && returnMod!==null ? MODS[returnMod].title : null} onBackTo={backToMod} activeDoc={activeDoc} setActiveDoc={id=>{ if(!id) setReturnMod(null); setActiveDoc(id); }} forms={forms} setForms={setForms} downloads={downloads}/>}

      {tab==="training" && !mod && (
        <div style={{maxWidth:980,margin:"0 auto",padding:"2rem 1.5rem"}}>
          <div style={{marginBottom:"1.5rem",background:B.inner,border:`1px solid ${B.border}`,borderRadius:16,overflow:"hidden"}}>
            <div style={{height:3,background:`linear-gradient(90deg,${B.teal},${B.aqua})`}}/>
            <div style={{padding:"1.75rem 2rem"}}>
              <Wave/>
              <div style={{marginTop:12}}>
                <div style={{fontSize:9,letterSpacing:"0.12em",fontFamily:"Manrope,sans-serif",color:B.teal,marginBottom:8}}>STOTT AND MAY</div>
                <h1 style={{fontSize:34,fontWeight:800,fontFamily:"Manrope,sans-serif",color:B.white,margin:"0 0 8px",lineHeight:1.1}}>Training Hub</h1>
                <p style={{fontSize:13,color:B.mid,margin:"0 0 1.5rem",maxWidth:"62ch",lineHeight:1.6}}>Your complete guide to recruitment excellence — perm, contract and SOW. Each module includes tactics, phrases, common mistakes and real-world scenarios.</p>
                <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                  <div style={{flex:1,minWidth:220,background:B.dark,border:`1px solid ${B.border}`,borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:B.mid}} aria-hidden="true">🔍</span>
                    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tactics, phrases, scenarios, forms…" aria-label="Search" style={{background:"none",border:"none",color:B.white,fontSize:13,outline:"none",flex:1,minWidth:0}}/>
                    {search && <button onClick={()=>setSearch("")} aria-label="Clear search" style={{background:"none",border:"none",color:B.mid,cursor:"pointer",fontSize:14}}>✕</button>}
                  </div>
                  <button onClick={()=>setShowQuiz(true)} style={{background:B.dark,border:`1px solid ${B.border}`,borderRadius:10,padding:"10px 16px",color:B.white,fontSize:13,fontFamily:"Manrope,sans-serif",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>🧠 Quiz</button>
                </div>
              </div>
            </div>
          </div>

          {!search && (<>
            <div style={{marginBottom:"1.5rem",background:B.inner,border:`1px solid ${B.border}`,borderRadius:16,overflow:"hidden"}}>
              <div style={{height:3,background:`linear-gradient(90deg,${B.teal},${B.aqua})`}}/>
              <div style={{padding:"1.75rem 2rem"}}>
                <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:8}}>OUR PHILOSOPHY</div>
                <h2 style={{fontSize:22,fontWeight:800,fontFamily:"Manrope,sans-serif",color:B.white,margin:"0 0 12px"}}>The Stott and May Way</h2>
                <p style={{fontSize:13,color:B.mid,lineHeight:1.7,margin:"0 0 20px",maxWidth:620}}>We exist to make great hires. Not average hires. Not fast hires for the sake of it. Great ones — where the right person lands in the right role, and both sides feel it was worth it. That standard runs through everything we do.</p>
                <Wave h={20}/>
                <div style={{marginTop:16}}>
                  <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:12}}>OUR VALUES</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:10}}>
                    {VALUES.map((v,i) => (
                      <div key={i} style={{background:B.dark,border:`1px solid ${B.border}`,borderRadius:12,padding:"18px 16px",textAlign:"center"}}>
                        <div style={{fontSize:24,marginBottom:8}}>{v.icon}</div>
                        <div style={{fontSize:12,fontWeight:700,color:B.white,fontFamily:"Manrope,sans-serif",marginBottom:8}}>{v.title}</div>
                        <div style={{fontSize:11,color:B.mid,lineHeight:1.6}}>{v.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{marginBottom:"1.5rem",background:B.card,border:`1px solid ${B.border}`,borderRadius:12,padding:"14px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontSize:12,fontFamily:"Manrope,sans-serif",color:B.white,fontWeight:600}}>Overall progress</div>
                <div style={{fontSize:12,color:B.teal}}>{totalD} / {totalS} sections</div>
              </div>
              <div style={{height:6,background:"#2a2f35",borderRadius:6}}><div style={{height:6,background:`linear-gradient(90deg,${B.teal},${B.aqua})`,borderRadius:6,width:`${ovPct}%`,transition:"width 0.4s"}}/></div>
            </div>
          </>)}

          {search.trim().length > 1 ? (
            <div>
              <div style={{fontSize:12,color:B.mid,marginBottom:12}}>{searchRes.length+docRes.length} results for “{search}”</div>
              {searchRes.length+docRes.length===0 && <div style={{color:B.mid,fontSize:14}}>Nothing matches that. Try a shorter word, like “IR35” or “counter”.</div>}
              {docRes.map(d => (
                <button key={d.id} onClick={()=>{setSearch("");openForm(d.id);}} className="res" style={{display:"block",width:"100%",textAlign:"left",background:B.card,border:`1px solid ${B.border}`,borderRadius:10,padding:"14px 18px",marginBottom:8,cursor:"pointer",color:"inherit"}}>
                  <div style={{fontSize:9,letterSpacing:"0.12em",color:B.aqua,fontFamily:"Manrope,sans-serif",marginBottom:4}}>FORM · {d.category}</div>
                  <div style={{fontSize:14,fontWeight:600,color:B.white,fontFamily:"Manrope,sans-serif"}}>{d.icon} {d.title}</div>
                </button>
              ))}
              {searchRes.map((r,i) => (
                <button key={i} onClick={()=>{setActiveMod(r.modIdx);setOpenSec(r.secIdx);setSearch("");}} className="res" style={{display:"block",width:"100%",textAlign:"left",background:B.card,border:`1px solid ${B.border}`,borderRadius:10,padding:"14px 18px",marginBottom:8,cursor:"pointer",color:"inherit"}}>
                  <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:4}}>{r.mod.title}</div>
                  <div style={{fontSize:14,fontWeight:600,color:B.white,fontFamily:"Manrope,sans-serif"}}>{r.sec.title}</div>
                </button>
              ))}
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14}}>
              {MODS.map((m,i) => {
                const {done,total,pct} = getMP(m);
                return (
                  <button key={m.id} onClick={()=>{setActiveMod(i);setOpenSec(null);}} className="mod-card" style={{textAlign:"left",color:"inherit",background:B.card,border:`1px solid ${B.border}`,borderRadius:14,padding:"1.25rem",cursor:"pointer",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:m.gradient}}/>
                    <div style={{fontSize:24,marginBottom:10}}>{m.icon}</div>
                    <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:4}}>{m.eyebrow}</div>
                    <div style={{fontSize:15,fontWeight:700,color:B.white,fontFamily:"Manrope,sans-serif",marginBottom:4}}>{m.title}</div>
                    <div style={{fontSize:12,color:B.mid,lineHeight:1.4,marginBottom:14}}>{m.subtitle}</div>
                    <div style={{height:4,background:"#2a2f35",borderRadius:4,marginBottom:6}}><div style={{height:4,background:m.gradient,borderRadius:4,width:`${pct}%`}}/></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <span style={{fontSize:11,color:B.mid}}>{done}/{total} complete</span>
                      <span style={{fontSize:11,color:B.teal}}>{total} sections</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab==="training" && mod && (
        <div style={{maxWidth:740,margin:"0 auto",padding:"2rem 1.5rem"}}>
          <button onClick={()=>setActiveMod(null)} style={{background:"none",border:"none",color:B.teal,cursor:"pointer",fontSize:13,marginBottom:"1.5rem",padding:0}}>← Back to modules</button>
          <div style={{height:4,background:mod.gradient,borderRadius:4,marginBottom:"1.5rem"}}/>
          <Wave h={24}/>
          <div style={{marginTop:12,marginBottom:"1.5rem"}}>
            <div style={{fontSize:9,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",marginBottom:6}}>{mod.eyebrow}</div>
            <h2 style={{fontSize:26,fontWeight:800,fontFamily:"Manrope,sans-serif",color:B.white,margin:"0 0 6px"}}>{mod.title}</h2>
            <p style={{fontSize:13,color:B.mid,margin:0}}>{mod.subtitle}</p>
          </div>
          {(() => { const {done,total,pct}=getMP(mod); return (
            <div style={{background:B.card,border:`1px solid ${B.border}`,borderRadius:10,padding:"12px 16px",marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:14}}>
              <div style={{flex:1,height:5,background:"#2a2f35",borderRadius:5}}><div style={{height:5,background:mod.gradient,borderRadius:5,width:`${pct}%`,transition:"width 0.4s"}}/></div>
              <div style={{fontSize:12,color:B.teal,whiteSpace:"nowrap"}}>{done}/{total} complete</div>
            </div>
          ); })()}
          {mod.sections.map((s,i) => (
            <SectionBlock key={i} section={s} open={openSec===i} toggle={()=>setOpenSec(openSec===i?null:i)} completed={!!progress.completed[`${mod.id}_${i}`]} onToggle={()=>toggleComplete(mod.id,i)}/>
          ))}
          {RELATED[mod.id] && (
            <div style={{marginTop:"1.75rem"}}>
              <div style={{fontSize:9,letterSpacing:"0.12em",color:B.aqua,fontFamily:"Manrope,sans-serif",marginBottom:10}}>RELATED FORMS</div>
              <p style={{fontSize:12,color:B.mid,margin:"0 0 12px"}}>Put this module into practice on your next call.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:8}}>
                {RELATED[mod.id].map(id => { const d = DOCS.find(x=>x.id===id); if(!d) return null; const f = Object.values(forms[id]||{}).filter(v=>v!==""&&v!==false).length; return (
                  <button key={id} onClick={()=>openForm(id, activeMod)} className="res" style={{textAlign:"left",color:"inherit",background:B.card,border:`1px solid ${B.border}`,borderLeft:`3px solid ${d.color}`,borderRadius:10,padding:"11px 13px",cursor:"pointer",display:"flex",gap:10,alignItems:"center"}}>
                    <span style={{fontSize:18}} aria-hidden="true">{d.icon}</span>
                    <span style={{minWidth:0}}>
                      <span style={{display:"block",fontSize:13,fontWeight:700,color:B.white,fontFamily:"Manrope,sans-serif"}}>{d.title}</span>
                      <span style={{display:"block",fontSize:11,color:f?B.aqua:B.mid,marginTop:2}}>{f?"Draft in progress":d.category.charAt(0)+d.category.slice(1).toLowerCase().replace("Bd","BD")}</span>
                    </span>
                  </button>
                ); })}
              </div>
            </div>
          )}
          <button onClick={()=>setShowCoach(true)} style={{marginTop:"1.5rem",background:`linear-gradient(135deg,${B.teal},${B.aqua})`,border:"none",borderRadius:8,padding:"12px 20px",color:B.dark,fontWeight:700,fontFamily:"Manrope,sans-serif",fontSize:13,cursor:"pointer",width:"100%"}}>💬 Ask the AI Coach about {mod.title}</button>
        </div>
      )}

      {!showQuiz && !showCoach && tab==="training" && (
        <button className="no-print fab" onClick={()=>setShowCoach(true)} style={{position:"fixed",right:"1.25rem",background:`linear-gradient(135deg,${B.teal},${B.aqua})`,border:"none",borderRadius:50,padding:"13px 20px",color:B.dark,fontWeight:700,fontFamily:"Manrope,sans-serif",fontSize:13,cursor:"pointer",zIndex:40,boxShadow:"0 6px 24px rgba(0,200,200,0.25)"}}>💬 AI Coach</button>
      )}
      {showCoach && <AICoach onClose={()=>setShowCoach(false)} context={mod?.title} sample={sample}/>}
      {showQuiz && <Quiz onClose={()=>setShowQuiz(false)} onScore={s=>setProgress(p=>({...p,quizScores:[...(p.quizScores||[]),{score:s,date:new Date().toLocaleDateString("en-GB")}]}))}/>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App/>);
