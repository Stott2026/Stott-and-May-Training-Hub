import React, { createContext, useContext } from "react";
import { B } from "./data.js";

/* ── Form state context: every field reads/writes by its label ── */
export const FormCtx = createContext({ values:{}, set:()=>{} });
const useF = (key) => { const c = useContext(FormCtx); return [c.values[key] ?? "", v => c.set(key, v)]; };

const inputBase = {
  width:"100%", boxSizing:"border-box", background:"var(--field)", border:`1px solid ${B.border}`,
  borderRadius:6, padding:"9px 11px", color:"var(--ink)", fontSize:13, fontFamily:"Inter,sans-serif",
  outline:"none", resize:"vertical", lineHeight:1.5,
};
const labelStyle = { display:"block", fontSize:10, letterSpacing:"0.08em", color:"var(--label)", fontFamily:"Manrope,sans-serif", fontWeight:700, marginBottom:6 };

export const DocHeader = ({ title, subtitle, category }) => (
  <div className="doc-header" style={{marginBottom:22,paddingBottom:16,borderBottom:`2px solid ${B.teal}`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
      <div>
        <div style={{fontSize:10,letterSpacing:"0.12em",color:B.teal,fontFamily:"Manrope,sans-serif",fontWeight:700,marginBottom:6}}>STOTT AND MAY · {category}</div>
        <h2 style={{fontSize:24,fontWeight:800,fontFamily:"Manrope,sans-serif",color:"var(--ink)",margin:"0 0 6px"}}>{title}</h2>
        <p style={{fontSize:13,color:B.mid,fontFamily:"Inter,sans-serif",margin:0,lineHeight:1.5}}>{subtitle}</p>
      </div>
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={B.teal}/><stop offset="1" stopColor={B.aqua}/></linearGradient></defs><rect x="6" y="6" width="18" height="18" transform="rotate(45 15 15)" fill="url(#dg)"/></svg>
    </div>
  </div>
);

export const Row = ({ children }) => <div className="f-row" style={{display:"flex",gap:12,flexWrap:"wrap"}}>{children}</div>;

export const Field = ({ label, placeholder="", rows=1, width="100%", hint }) => {
  const [v,setV] = useF(label);
  const w = width==="100%" ? "100%" : `calc(${width} - 8px)`;
  return (
    <div style={{flex:`1 1 ${width==="100%"?"100%":"220px"}`,maxWidth:w==="100%"?"100%":undefined,minWidth:0,marginBottom:14}}>
      <label style={labelStyle}>{label}</label>
      {hint && <div style={{fontSize:11,color:B.mid,fontFamily:"Inter,sans-serif",marginBottom:6,fontStyle:"italic"}}>{hint}</div>}
      {rows>1
        ? <textarea rows={rows} value={v} onChange={e=>setV(e.target.value)} placeholder={placeholder} style={inputBase}/>
        : <input value={v} onChange={e=>setV(e.target.value)} placeholder={placeholder} style={inputBase}/>}
    </div>
  );
};

export const SectionTitle = ({ title }) => (
  <div style={{margin:"22px 0 12px",display:"flex",alignItems:"center",gap:10}}>
    <div style={{width:4,height:16,background:`linear-gradient(180deg,${B.teal},${B.aqua})`,borderRadius:2}}/>
    <div style={{fontSize:12,letterSpacing:"0.1em",color:B.teal,fontFamily:"Manrope,sans-serif",fontWeight:800}}>{title}</div>
  </div>
);

export const RadioRow = ({ label, options }) => {
  const [v,setV] = useF(label);
  return (
    <div style={{marginBottom:14}}>
      <div style={labelStyle}>{label}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}} role="radiogroup" aria-label={label}>
        {options.map(o => {
          const on = v===o;
          return <button type="button" key={o} role="radio" aria-checked={on} onClick={()=>setV(on?"":o)} className={on?"opt on":"opt"}
            style={{background:on?"rgba(0,200,200,0.14)":"var(--field)",border:`1px solid ${on?B.teal:B.border}`,borderRadius:20,padding:"6px 12px",color:on?B.teal:"var(--ink-2)",fontSize:12,fontFamily:"Inter,sans-serif",cursor:"pointer"}}>
            <span style={{marginRight:6}}>{on?"●":"○"}</span>{o}</button>;
        })}
      </div>
    </div>
  );
};

export const ScoreRow = ({ label, max=10 }) => {
  const [v,setV] = useF("SCORE: "+label);
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap",marginBottom:10,padding:"8px 0",borderBottom:`1px dashed ${B.border}`}}>
      <span style={{fontSize:13,color:"var(--ink-2)",fontFamily:"Inter,sans-serif",flex:"1 1 220px"}}>{label}</span>
      <div style={{display:"flex",gap:4,flexWrap:"wrap"}} role="radiogroup" aria-label={label}>
        {Array.from({length:max},(_,i)=>i+1).map(n=>{
          const on = String(v)===String(n);
          return <button type="button" key={n} role="radio" aria-checked={on} onClick={()=>setV(on?"":String(n))}
            style={{width:28,height:28,borderRadius:6,border:`1px solid ${on?B.teal:B.border}`,background:on?B.teal:"var(--field)",color:on?B.dark:B.mid,fontSize:11,fontWeight:700,fontFamily:"Manrope,sans-serif",cursor:"pointer"}}>{n}</button>;
        })}
      </div>
    </div>
  );
};

export const CheckList = ({ items }) => {
  const c = useContext(FormCtx);
  return (
    <div style={{marginBottom:14}}>
      {items.map(it => {
        const k = "CHECK: "+it; const on = !!c.values[k];
        return (
          <label key={it} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"7px 0",cursor:"pointer"}}>
            <input type="checkbox" checked={on} onChange={()=>c.set(k,!on)} style={{marginTop:3,accentColor:B.teal,width:15,height:15,flexShrink:0}}/>
            <span style={{fontSize:13,color:on?"var(--ink)":"var(--ink-2)",fontFamily:"Inter,sans-serif",lineHeight:1.5}}>{it}</span>
          </label>
        );
      })}
    </div>
  );
};

/* A simple grid of inputs: columns × rows, each cell stored separately */
export const Table = ({ id, columns, rows=5, rowLabels }) => {
  const c = useContext(FormCtx);
  const cell = { ...inputBase, padding:"7px 9px", fontSize:12 };
  return (
    <div style={{overflowX:"auto",marginBottom:14}}>
      <table style={{width:"100%",borderCollapse:"separate",borderSpacing:6,minWidth:columns.length*120}}>
        <thead><tr>{rowLabels && <th/>}{columns.map(col=><th key={col} style={{...labelStyle,textAlign:"left",marginBottom:0}}>{col}</th>)}</tr></thead>
        <tbody>
          {Array.from({length:rowLabels?rowLabels.length:rows},(_,r)=>(
            <tr key={r}>
              {rowLabels && <td style={{fontSize:12,color:"var(--ink-2)",fontFamily:"Manrope,sans-serif",fontWeight:700,whiteSpace:"nowrap",paddingRight:6}}>{rowLabels[r]}</td>}
              {columns.map(col=>{
                const k = `${id} · ${rowLabels?rowLabels[r]:"Row "+(r+1)} · ${col}`;
                return <td key={col}><input aria-label={k} value={c.values[k]??""} onChange={e=>c.set(k,e.target.value)} style={cell}/></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Metrics = ({ items }) => {
  const c = useContext(FormCtx);
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:14}}>
      {items.map(([label,prefix])=>{
        const k = "METRIC: "+label;
        return (
          <div key={label} style={{background:"var(--field)",border:`1px solid ${B.border}`,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:2}}>
              {prefix && <span style={{fontSize:13,color:B.teal,fontFamily:"Manrope,sans-serif",fontWeight:700}}>{prefix}</span>}
              <input aria-label={label} value={c.values[k]??""} onChange={e=>c.set(k,e.target.value)} placeholder="0" style={{background:"none",border:"none",color:B.teal,fontSize:20,fontFamily:"Manrope,sans-serif",fontWeight:800,textAlign:"center",width:"80px",outline:"none"}}/>
            </div>
            <div style={{fontSize:10,color:B.mid,fontFamily:"Inter,sans-serif",marginTop:4}}>{label}</div>
          </div>
        );
      })}
    </div>
  );
};

/* ══════════════ CANDIDATE ══════════════ */

const CandidateRegistration = () => (<div>
  <DocHeader title="Candidate Registration Form" subtitle="Complete during or straight after the first candidate call" category="CANDIDATE"/>
  <Row><Field label="FULL NAME" placeholder="Candidate name" width="50%"/><Field label="CURRENT JOB TITLE" placeholder="Current role" width="50%"/></Row>
  <Row><Field label="CURRENT EMPLOYER" placeholder="Company" width="50%"/><Field label="LOCATION" placeholder="City / region, willingness to relocate" width="50%"/></Row>
  <Row><Field label="PHONE" placeholder="Best number" width="33%"/><Field label="EMAIL" placeholder="Personal email" width="33%"/><Field label="LINKEDIN" placeholder="Profile URL" width="33%"/></Row>
  <Row><Field label="DATE OF CALL" placeholder="dd/mm/yyyy" width="50%"/><Field label="REGISTERED BY" placeholder="Consultant name" width="50%"/></Row>
  <RadioRow label="ENGAGEMENT TYPE SOUGHT" options={["Permanent","Contract","SOW / project","Open to all"]}/>
  <SectionTitle title="EXPERIENCE & SKILLS"/>
  <Field label="CORE SKILLS / TECH STACK" placeholder="Primary skills, languages, platforms, certifications" rows={3}/>
  <Field label="CAREER SUMMARY" placeholder="Key roles, tenure and achievements — the story in their own words" rows={3}/>
  <Field label="STAND-OUT ACHIEVEMENTS" placeholder="Specific, measurable wins you can use when you pitch them" rows={2}/>
  <SectionTitle title="MOTIVATION"/>
  <Field label="WHY ARE THEY LOOKING? (PUSH FACTORS)" placeholder="What are they moving away from? Listen for the real answer beneath the first one." rows={3}/>
  <Field label="WHAT ARE THEY MOVING TOWARDS? (PULL FACTORS)" placeholder="Role, environment, growth, manager, mission" rows={2}/>
  <ScoreRow label="Commitment to move (1–10) — explore the number"/>
  <Field label="WHAT WOULD MAKE IT A 10?" placeholder="The gap between their score and a 10 tells you what to solve" rows={2}/>
  <SectionTitle title="COMMERCIALS & AVAILABILITY"/>
  <Row><Field label="CURRENT SALARY / RATE" placeholder="Base, bonus, benefits or day rate" width="50%"/><Field label="EXPECTED SALARY / RATE" placeholder="Target and walk-away" width="50%"/></Row>
  <Row><Field label="NOTICE PERIOD / AVAILABILITY" placeholder="e.g. 1 month, available immediately, contract ends 30/11" width="50%"/><Field label="WORKING PREFERENCE" placeholder="Remote, hybrid (days), on-site" width="50%"/></Row>
  <RadioRow label="IR35 PREFERENCE (CONTRACT)" options={["Outside only","Inside acceptable","Either at the right rate","N/A"]}/>
  <Field label="OTHER PROCESSES RUNNING" placeholder="Companies, stages, expected timelines" rows={2}/>
  <Field label="RIGHT TO WORK" placeholder="Confirmed verbally — visa type or restrictions if any"/>
  <SectionTitle title="RISK & NEXT STEPS"/>
  <Field label="COUNTER-OFFER RISK" placeholder="What would they do if their employer countered? Have this conversation now." rows={2}/>
  <Field label="ROLES TO PUT FORWARD / AGREED NEXT STEP" placeholder="Specific roles discussed and what happens next, by when" rows={2}/>
  <CheckList items={["GDPR consent obtained and privacy notice shared","CV received and reviewed","Candidate record created in the CRM"]}/>
</div>);

const InterviewPrep = () => (<div>
  <DocHeader title="Interview Prep Sheet" subtitle="Complete before every prep call — send the candidate the key points afterwards" category="CANDIDATE"/>
  <Row><Field label="CANDIDATE NAME" placeholder="Full name" width="50%"/><Field label="ROLE" placeholder="Job title" width="50%"/></Row>
  <Row><Field label="CLIENT / COMPANY" placeholder="Hiring company" width="50%"/><Field label="INTERVIEW DATE & TIME" placeholder="dd/mm/yyyy, hh:mm" width="50%"/></Row>
  <RadioRow label="FORMAT" options={["Video","In person","Phone","Technical test","Presentation / case study"]}/>
  <RadioRow label="STAGE" options={["1st","2nd","Final","Other"]}/>
  <SectionTitle title="THE INTERVIEWER"/>
  <Row><Field label="INTERVIEWER NAME(S) & TITLE(S)" placeholder="Who they are meeting" width="50%"/><Field label="LINKEDIN RESEARCH" placeholder="Background, tenure, recent posts or topics" width="50%"/></Row>
  <Field label="WHAT THIS INTERVIEWER CARES ABOUT MOST" placeholder="Three things — make sure each comes up naturally" rows={3}/>
  <SectionTitle title="THE COMPANY"/>
  <Field label="RECENT NEWS, FUNDING OR PRIORITIES" placeholder="What should the candidate be able to talk about?" rows={2}/>
  <Field label="CULTURE & VALUES TO DEMONSTRATE" placeholder="How the client describes itself and what they respond to" rows={2}/>
  <Field label="WHY THIS COMPANY — CANDIDATE'S ANSWER" placeholder="A clear, genuine answer to why them, not just why the role" rows={2}/>
  <SectionTitle title="PREPARATION"/>
  <Field label="LIKELY QUESTIONS" placeholder="Technical, competency and motivation questions to expect" rows={3}/>
  <Field label="HARDEST LIKELY QUESTION & AGREED ANSWER" placeholder="Run a mock answer on the call" rows={3}/>
  <Field label="EXAMPLES TO USE (STAR)" placeholder="Two or three stories mapped to what the client wants" rows={3}/>
  <Field label="3 SMART QUESTIONS TO ASK" placeholder="Questions that show they have done their homework" rows={3}/>
  <Field label="AGREED SALARY POSITION" placeholder="Exactly what they will say if salary comes up" rows={2}/>
  <Field label="LOGISTICS" placeholder="Address or link, who to ask for, dress code, what to bring" rows={2}/>
  <CheckList items={["20-minute prep call completed — not just a message","Interviewer research shared","Salary position agreed and practised","Summary of key points sent to the candidate","Debrief call booked within 2 hours of the interview ending"]}/>
</div>);

const PipelineTracker = () => (<div>
  <DocHeader title="Candidate Pipeline Tracker" subtitle="Every active candidate across your live roles — review every Monday" category="CANDIDATE"/>
  <Row><Field label="CONSULTANT" placeholder="Your name" width="50%"/><Field label="WEEK COMMENCING" placeholder="dd/mm/yyyy" width="50%"/></Row>
  <SectionTitle title="ACTIVE CANDIDATES"/>
  <Table id="Pipeline" columns={["Candidate","Role / client","Stage","Last contact","Next action & date","RAG"]} rows={10}/>
  <SectionTitle title="WEEKLY REVIEW"/>
  <Field label="PROCESSES STALLED 2+ WEEKS" placeholder="Which ones, and what is the honest reason?" rows={3}/>
  <Field label="CANDIDATES AT RISK" placeholder="Counter-offer risk, competing processes, gone quiet" rows={2}/>
  <Field label="30 / 60 / 90 DAY VIEW" placeholder="What closes this month, next month and the month after?" rows={3}/>
  <Field label="TOP 3 ACTIONS THIS WEEK" placeholder="The three moves that will progress the pipeline most" rows={3}/>
</div>);

const CounterOfferGuide = () => (<div>
  <DocHeader title="Counter-Offer Conversation Guide" subtitle="Have this conversation at screening — not at offer stage" category="CANDIDATE"/>
  <Row><Field label="CANDIDATE NAME" placeholder="Full name" width="50%"/><Field label="DATE OF CONVERSATION" placeholder="dd/mm/yyyy" width="50%"/></Row>
  <RadioRow label="WHEN IS THIS BEING HAD?" options={["Initial screening","Before resignation","Counter-offer received"]}/>
  <SectionTitle title="THEIR REASONS FOR MOVING"/>
  <Field label="THE REAL REASONS THEY WANT TO LEAVE — IN THEIR WORDS" placeholder="Write down exactly what they say. You will read it back to them later." rows={3}/>
  <Field label="WOULD MORE MONEY FIX THOSE REASONS?" placeholder="Ask directly — most of the time the answer is no" rows={2}/>
  <SectionTitle title="THE SCENARIO"/>
  <Field label="&quot;IF YOUR EMPLOYER MADE A COUNTER-OFFER, WHAT WOULD YOU DO?&quot;" placeholder="Their response" rows={2}/>
  <Field label="&quot;IF THEY COULD HAVE PAID YOU MORE, WHY DIDN'T THEY BEFORE YOU RESIGNED?&quot;" placeholder="Their response" rows={2}/>
  <Field label="WHAT WOULD MAKE THEM STAY?" placeholder="Money, title, manager, project — know this before they resign" rows={2}/>
  <ScoreRow label="Counter-offer risk (1 low – 10 high)"/>
  <SectionTitle title="IF A COUNTER-OFFER ARRIVES"/>
  <Row><Field label="COUNTER-OFFER DETAILS" placeholder="Salary, title, promises made" width="50%"/><Field label="DATE RECEIVED" placeholder="dd/mm/yyyy" width="50%"/></Row>
  <Field label="WHICH OF THEIR ORIGINAL REASONS DOES IT ACTUALLY ADDRESS?" placeholder="Read their own words back to them. Ask questions — do not tell them what to do." rows={3}/>
  <RadioRow label="OUTCOME" options={["Declined counter — proceeding","Considering — follow up within 24 hours","Accepted counter","Not applicable"]}/>
  <Field label="NEXT STEP & TIMING" placeholder="What happens next, and when will you speak again?" rows={2}/>
  <CheckList items={["Counter-offer discussed before the process started","Candidate's reasons for moving captured in their own words","Client made aware of any counter-offer risk","Follow-up call booked within 24 hours of resignation"]}/>
</div>);

const CandidateFeedbackForm = () => (<div>
  <DocHeader title="Candidate Feedback Form" subtitle="Structure client feedback before delivering it to the candidate — every time, after every stage" category="CANDIDATE"/>
  <Row><Field label="CANDIDATE NAME" placeholder="Full name" width="50%"/><Field label="ROLE APPLIED FOR" placeholder="Job title" width="50%"/></Row>
  <Row><Field label="CLIENT / COMPANY" placeholder="Hiring company" width="50%"/><Field label="INTERVIEW STAGE" placeholder="e.g. 1st interview, 2nd interview, final" width="50%"/></Row>
  <Row><Field label="INTERVIEW DATE" placeholder="dd/mm/yyyy" width="50%"/><Field label="FEEDBACK RECEIVED FROM" placeholder="Interviewer name and title" width="50%"/></Row>
  <RadioRow label="OUTCOME" options={["Progressing to next stage","On hold / decision pending","Unsuccessful — process ends","Offer to be made"]}/>
  <SectionTitle title="SKILLS & EXPERIENCE FEEDBACK"/>
  <ScoreRow label="Technical skills / role-specific experience"/>
  <ScoreRow label="Depth and relevance of background"/>
  <ScoreRow label="Examples given — quality and specificity"/>
  <Field label="STRENGTHS HIGHLIGHTED BY THE CLIENT" placeholder="What did the interviewer specifically praise or respond positively to?" rows={3}/>
  <Field label="GAPS OR CONCERNS — SKILLS & EXPERIENCE" placeholder="Where did the client feel the candidate fell short technically or experientially?" rows={3}/>
  <SectionTitle title="CULTURE & FIT FEEDBACK"/>
  <ScoreRow label="Culture and values alignment"/>
  <ScoreRow label="Communication style and presence"/>
  <ScoreRow label="Enthusiasm and genuine interest in the role"/>
  <Field label="FIT OBSERVATIONS" placeholder="How did the interviewer feel about the candidate as a person — energy, style, team fit?" rows={3}/>
  <SectionTitle title="SPECIFIC FEEDBACK TO DELIVER"/>
  <Field label="WHAT TO TELL THE CANDIDATE — VERBATIM (OR CLOSE TO IT)" placeholder="Write out exactly what you'll say. Don't summarise — script it. The candidate deserves specific, useful feedback, not 'they went with someone with more experience'." rows={4}/>
  <Field label="WHAT NOT TO SAY / SENSITIVE AREAS" placeholder="Anything the client said that should be handled carefully or reframed before delivery" rows={2}/>
  <SectionTitle title="DELIVERING THE FEEDBACK"/>
  <RadioRow label="HOW WILL YOU DELIVER THIS FEEDBACK?" options={["Phone call (preferred)","Video call","Email","WhatsApp"]}/>
  <CheckList items={["Called the candidate same day where possible — not the next morning","Started with what went well before moving to the gap","Kept it specific — no vague platitudes like 'strong competition'","Reframed the feedback constructively where possible","Asked how the candidate is feeling before diving in","Checked whether they want to stay in process if there's a next stage","Discussed what they can do differently in their next interview","Ended on a positive — kept the relationship intact"]}/>
  <Field label="CANDIDATE REACTION" placeholder="How did the candidate take the feedback? Any concerns, upset, or useful intel from their response?" rows={3}/>
  <Field label="NEXT STEPS AGREED" placeholder="What happens now — are they staying in your process, taking a break, or have they given you any useful intel?" rows={2}/>
</div>);

const CVSubmissionChecklist = () => (<div>
  <DocHeader title="CV Review & Submission Checklist" subtitle="Complete before sending any CV to a client. If it doesn't pass this gate, it doesn't go." category="CANDIDATE"/>
  <Row><Field label="CANDIDATE NAME" placeholder="Full name" width="50%"/><Field label="ROLE BEING SUBMITTED FOR" placeholder="Job title and client" width="50%"/></Row>
  <Row><Field label="CLIENT / COMPANY" placeholder="Hiring company" width="50%"/><Field label="DATE OF SUBMISSION" placeholder="dd/mm/yyyy" width="50%"/></Row>
  <SectionTitle title="CV QUALITY GATE"/>
  <CheckList items={["CV is up to date — current role, dates, and responsibilities reflect their actual situation","No unexplained employment gaps — or gaps have been clarified with the candidate and can be explained","Formatting is clean and professional — no tables that break when converted, consistent fonts, readable layout","Contact details are present and correct","No spelling errors or obvious grammatical mistakes visible on a quick read","Dates are consistent and chronological — no overlapping roles or missing years","Most recent role is described in sufficient detail for the client to assess fit","Key skills relevant to THIS role are visible and prominent","CV length is appropriate — 2 pages for most, 3 max for very senior candidates"]}/>
  <SectionTitle title="TAILORING CHECK"/>
  <CheckList items={["The CV speaks directly to the brief — I have mentally mapped it against the must-haves","I have confirmed with the candidate that the experience described is accurate and they can talk to it in detail","I have flagged any gaps or concerns to the candidate before submitting","The candidate knows which role this is being submitted for and has given explicit consent","I have not submitted this candidate to the same client before (or if I have, the client is aware)"]}/>
  <SectionTitle title="COVERING NOTE / SUBMISSION EMAIL"/>
  <Field label="HEADLINE SUMMARY (2–3 SENTENCES)" placeholder="Why is this person right for this role? Not a CV summary — a specific reason they fit this brief. What's the hook?" rows={3}/>
  <Field label="STAND-OUT POINTS TO HIGHLIGHT" placeholder="2–3 specific things about this candidate that the CV doesn't fully convey — personality, achievements, cultural fit, context" rows={3}/>
  <Field label="ANYTHING THE CLIENT NEEDS TO KNOW" placeholder="Notice period, salary expectation, other processes running, any context that's important before they read the CV" rows={2}/>
  <SectionTitle title="COMPLIANCE"/>
  <CheckList items={["Candidate has been informed they are being submitted to this specific client","Candidate has confirmed their CV is accurate and up to date","Right to work in the UK / EU has been confirmed verbally","Candidate is aware of the role, company, and salary range","GDPR consent — candidate is aware their CV will be shared with a third party","No conflicting submissions to the same client in the last 6 months"]}/>
  <RadioRow label="SUBMISSION CONFIDENCE LEVEL" options={["High — strong fit, well-prepared","Medium — good fit, minor gaps","Low — stretch, but worth submitting","Do not submit — needs more work"]}/>
  <Field label="NOTES" placeholder="Anything else the client should know, or anything to flag internally before submission" rows={2}/>
</div>);

const ReferenceCheckTemplate = () => (<div>
  <DocHeader title="Reference Check Template" subtitle="Take structured references before every permanent placement — ideally two per candidate" category="CANDIDATE"/>
  <Row><Field label="CANDIDATE NAME" placeholder="Name of candidate being referenced" width="50%"/><Field label="ROLE THEY ARE BEING PLACED INTO" placeholder="Job title and client" width="50%"/></Row>
  <Row><Field label="REFEREE NAME" placeholder="Full name" width="50%"/><Field label="REFEREE JOB TITLE" placeholder="Their current role" width="50%"/></Row>
  <Row><Field label="COMPANY (AT TIME OF WORKING TOGETHER)" placeholder="Where they worked together" width="50%"/><Field label="REFEREE RELATIONSHIP" placeholder="e.g. Direct manager, skip-level, peer, client" width="50%"/></Row>
  <Row><Field label="DATES WORKED TOGETHER" placeholder="From — To" width="50%"/><Field label="HOW LONG DID THEY MANAGE / WORK WITH THEM?" placeholder="e.g. 18 months directly" width="50%"/></Row>
  <Row><Field label="DATE OF REFERENCE CALL" placeholder="dd/mm/yyyy" width="50%"/><Field label="REFERENCE TAKEN BY" placeholder="Consultant name" width="50%"/></Row>
  <SectionTitle title="OPENING & CONTEXT"/>
  <Field label="OPENING QUESTION — RESPONSE" hint="“Thanks for taking the time to speak with me. Can you start by describing [candidate]'s role and what they were responsible for when you worked together?”" placeholder="Their description of the candidate's role and responsibilities" rows={3}/>
  <SectionTitle title="PERFORMANCE & CAPABILITY"/>
  <ScoreRow label="Overall performance in role"/>
  <Field label="GREATEST STRENGTHS" hint="“What were [candidate]'s greatest strengths — where did they really stand out?”" placeholder="Referee's response" rows={3}/>
  <Field label="AREAS TO DEVELOP" hint="“What were the areas where [candidate] had room to develop or grow?”" placeholder="Listen carefully here. Vague answers often mean they're being diplomatic." rows={3}/>
  <Field label="SPECIFIC EXAMPLE OF STRONG PERFORMANCE" hint="“Can you give me a specific example of a project or situation where [candidate] performed particularly well?”" placeholder="Specificity is a good sign. Generalities can be a flag." rows={3}/>
  <SectionTitle title="WORK STYLE & CULTURE FIT"/>
  <ScoreRow label="Team fit and working relationships"/>
  <ScoreRow label="Communication and stakeholder management"/>
  <Field label="WORKING STYLE" hint="“How would you describe [candidate]'s working style — how did they fit into the team?”" placeholder="Referee's response" rows={3}/>
  <Field label="HANDLING PRESSURE" hint="“How did [candidate] handle pressure, tight deadlines, or difficult situations?”" placeholder="Referee's response" rows={2}/>
  <Field label="RELATIONSHIPS WITH OTHERS" hint="“How did they get on with their colleagues, peers, and stakeholders?”" placeholder="Referee's response" rows={2}/>
  <SectionTitle title="RELIABILITY & CONDUCT"/>
  <RadioRow label="ATTENDANCE & RELIABILITY" options={["Excellent","Good","Satisfactory","Concerns"]}/>
  <RadioRow label="ANY CONDUCT OR DISCIPLINARY ISSUES?" options={["None","Minor — resolved","Yes — details below"]}/>
  <Field label="IF YES — PLEASE DETAIL" placeholder="What happened and how was it resolved?" rows={2}/>
  <SectionTitle title="THE KEY QUESTION"/>
  <RadioRow label="“WOULD YOU REHIRE [CANDIDATE] IF THE OPPORTUNITY AROSE?”" options={["Yes — without hesitation","Yes — with reservations","Probably not","No"]}/>
  <Field label="IF WITH RESERVATIONS OR NO — WHY?" placeholder="This is the most important question on the form. If they hesitate or qualify their answer, explore it." rows={3}/>
  <SectionTitle title="SUITABILITY FOR THIS ROLE"/>
  <Field label="BRIEF DESCRIPTION OF THE ROLE YOU ARE PLACING THEM INTO" placeholder="Give the referee a brief overview of the new role — without naming the client. Ask if they think it's a good fit." rows={2}/>
  <Field label="DOES THIS ROLE PLAY TO THEIR STRENGTHS?" hint="“Based on what I've described, do you think this type of role plays to [candidate]'s strengths?”" placeholder="Referee's response" rows={3}/>
  <SectionTitle title="REFERENCE SUMMARY"/>
  <RadioRow label="OVERALL REFERENCE QUALITY" options={["Strong positive","Positive with caveats","Neutral / inconclusive","Concerning"]}/>
  <Field label="KEY THEMES FROM THIS REFERENCE" placeholder="Summarise the 3–4 most important things you heard — strengths, concerns, and overall picture" rows={3}/>
  <Field label="ANYTHING TO FLAG TO THE CLIENT OR CANDIDATE?" placeholder="Anything the client should know, or anything to explore further with the candidate before placement?" rows={2}/>
  <CheckList items={["Reference obtained verbally — not just by email","Referee confirmed they managed or worked directly with the candidate","No material concerns raised that haven't been addressed","Reference summary shared internally before placement proceeds"]}/>
</div>);

/* ══════════════ CLIENT ══════════════ */

const ClientBrief = () => (<div>
  <DocHeader title="Client Meeting & Brief Sheet" subtitle="New client meetings and job briefs — perm, contract and SOW. Always take the brief on a live call." category="CLIENT"/>
  <Row><Field label="CLIENT / COMPANY" placeholder="Company name" width="50%"/><Field label="HIRING MANAGER" placeholder="Name and title" width="50%"/></Row>
  <Row><Field label="OTHER DECISION-MAKERS" placeholder="Who else signs off?" width="50%"/><Field label="DATE OF BRIEF" placeholder="dd/mm/yyyy" width="50%"/></Row>
  <RadioRow label="ENGAGEMENT TYPE" options={["Permanent","Contract","SOW","Not yet decided"]}/>
  <SectionTitle title="THE ROLE"/>
  <Row><Field label="JOB TITLE" placeholder="Title as advertised" width="50%"/><Field label="NUMBER OF HIRES" placeholder="e.g. 1, 3" width="50%"/></Row>
  <Field label="WHY IS THIS ROLE OPEN?" placeholder="New headcount, backfill, project — and what triggered it now?" rows={2}/>
  <Field label="WHAT DOES SUCCESS LOOK LIKE IN 12 MONTHS?" placeholder="How will they measure whether this hire worked?" rows={2}/>
  <Field label="MUST-HAVES" placeholder="Non-negotiable skills and experience — push back if everything is essential" rows={3}/>
  <Field label="NICE-TO-HAVES" placeholder="Where there is flex" rows={2}/>
  <Field label="WHAT DID PREVIOUS HIRES WHO FAILED HAVE IN COMMON?" placeholder="Tells you more than any spec" rows={2}/>
  <SectionTitle title="TEAM & CULTURE"/>
  <Field label="TEAM STRUCTURE & DYNAMIC" placeholder="Size, reporting line, personalities that thrive" rows={2}/>
  <Field label="MANAGER'S STYLE" placeholder="How do they lead, and who works best with them?" rows={2}/>
  <Row><Field label="WORKING PATTERN" placeholder="Remote, hybrid (days), on-site" width="50%"/><Field label="LOCATION" placeholder="Office location" width="50%"/></Row>
  <SectionTitle title="COMMERCIALS"/>
  <Row><Field label="SALARY RANGE / DAY RATE" placeholder="Range and real flex" width="50%"/><Field label="BONUS, EQUITY & BENEFITS" placeholder="Other levers if salary is tight" width="50%"/></Row>
  <RadioRow label="IR35 STATUS (CONTRACT)" options={["Inside","Outside","SDS pending","N/A"]}/>
  <Row><Field label="START DATE" placeholder="A real date — ASAP is not a date" width="50%"/><Field label="DURATION (CONTRACT / SOW)" placeholder="e.g. 6 months rolling" width="50%"/></Row>
  <Field label="SOW DELIVERABLES & SUCCESS CRITERIA" placeholder="For SOW only — what outcome are they buying?" rows={2}/>
  <SectionTitle title="PROCESS"/>
  <Field label="INTERVIEW STAGES & WHO IS INVOLVED" placeholder="Number of stages, format, interviewers" rows={2}/>
  <Row><Field label="FEEDBACK TURNAROUND AGREED" placeholder="e.g. within 48 hours" width="50%"/><Field label="SHORTLIST DATE" placeholder="When you will submit" width="50%"/></Row>
  <Field label="OTHER AGENCIES / INTERNAL CANDIDATES" placeholder="Who else is working on this?" rows={1}/>
  <Field label="AGREED DEFINITION OF A STRONG SHORTLIST" placeholder="What would make them say yes, that's the one?" rows={2}/>
  <Field label="NEXT STEPS" placeholder="Who does what, by when" rows={2}/>
</div>);

const BDCallPrep = () => (<div>
  <DocHeader title="BD Call Prep Sheet" subtitle="Prepare for every business development call — aim for 70% listening, 30% talking" category="CLIENT"/>
  <Row><Field label="COMPANY" placeholder="Prospect company" width="50%"/><Field label="CONTACT NAME & TITLE" placeholder="Who you are speaking to" width="50%"/></Row>
  <Row><Field label="CALL DATE & TIME" placeholder="dd/mm/yyyy, hh:mm" width="50%"/><Field label="HOW THE CALL CAME ABOUT" placeholder="Referral, inbound, cold, event" width="50%"/></Row>
  <SectionTitle title="RESEARCH"/>
  <Field label="COMPANY SNAPSHOT" placeholder="Sector, stage, headcount, funding, recent news" rows={2}/>
  <Field label="CONTACT BACKGROUND" placeholder="Their career, recent LinkedIn activity, mutual connections" rows={2}/>
  <Field label="HIRING SIGNALS" placeholder="Live job ads, team growth, new leadership, product launches" rows={2}/>
  <SectionTitle title="YOUR PLAN"/>
  <Field label="OPENING & AGENDA" placeholder="e.g. 'I only need 10 minutes — here is what I was hoping to cover'" rows={2}/>
  <Field label="3 INSIGHT POINTS TO SHARE" placeholder="Specific to their market — salary shifts, talent availability, competitor moves" rows={3}/>
  <Field label="DISCOVERY QUESTIONS" placeholder="What is your biggest hiring challenge? What's been hardest to find? What has your experience with recruiters been?" rows={4}/>
  <Field label="LIKELY OBJECTIONS & RESPONSES" placeholder="PSL, fees, 'we hire direct' — have a considered answer ready" rows={3}/>
  <Field label="RELEVANT PROOF POINTS" placeholder="Similar placements, clients, results you can reference" rows={2}/>
  <SectionTitle title="AFTER THE CALL"/>
  <RadioRow label="QUALIFICATION" options={["Live opportunity","Warm pipeline","Not a fit right now"]}/>
  <Field label="WHAT YOU LEARNED" placeholder="Pain points, headcount plans, decision-makers" rows={3}/>
  <Field label="AGREED NEXT STEP" placeholder="Specific action and date — 'I'll send some information' is not a next step" rows={2}/>
  <CheckList items={["Follow-up sent within the hour","Notes logged in the CRM","Next touchpoint in the diary"]}/>
</div>);

const ClientQBRTemplate = () => (<div>
  <DocHeader title="Client Quarterly Business Review" subtitle="Use with key accounts every quarter — review, add value, and plan forward together" category="CLIENT"/>
  <Row><Field label="CLIENT / COMPANY" placeholder="Account name" width="50%"/><Field label="KEY CONTACT(S)" placeholder="Names and titles attending" width="50%"/></Row>
  <Row><Field label="QBR DATE" placeholder="dd/mm/yyyy" width="33%"/><Field label="PERIOD REVIEWED" placeholder="e.g. Q3 (Jul–Sep)" width="33%"/><Field label="NEXT QBR DATE" placeholder="dd/mm/yyyy" width="33%"/></Row>
  <SectionTitle title="ACCOUNT PERFORMANCE — THIS QUARTER"/>
  <Metrics items={[["Roles worked"],["CVs submitted"],["Interviews arranged"],["Placements made"],["Perm placements"],["Contract starts"],["SOW engagements"],["Revenue generated","£"]]}/>
  <Field label="ROLES PLACED THIS QUARTER" placeholder="List the roles placed, candidates placed, and a one-line outcome for each" rows={4}/>
  <Field label="ROLES NOT FILLED — AND WHY" placeholder="What didn't close? Brief or process issues, market challenges, budget changes?" rows={2}/>
  <SectionTitle title="CANDIDATE & PROCESS QUALITY"/>
  <ScoreRow label="Quality of CVs submitted"/>
  <ScoreRow label="Speed of delivery against agreed SLAs"/>
  <ScoreRow label="Communication and responsiveness"/>
  <ScoreRow label="Overall satisfaction with Stott and May this quarter"/>
  <Field label="WHAT HAS WORKED WELL?" placeholder="What has the client valued most this quarter? Ask them directly." rows={3}/>
  <Field label="WHAT COULD WE DO BETTER?" placeholder="What feedback has the client given, or what have you noticed that could improve?" rows={3}/>
  <SectionTitle title="MARKET INTELLIGENCE TO SHARE"/>
  <Field label="SALARY BENCHMARKING UPDATE" placeholder="What has moved in the market? Any roles where their bands are now behind? Share data, not opinion." rows={3}/>
  <Field label="TALENT AVAILABILITY UPDATE" placeholder="What are you seeing in terms of candidate supply for their key hiring areas? Is the market tightening or loosening?" rows={2}/>
  <Field label="COMPETITOR INTELLIGENCE" placeholder="What are you seeing from their competitors in terms of hiring activity, salaries, or talent strategy?" rows={2}/>
  <Field label="SECTOR / MARKET TRENDS" placeholder="Anything relevant happening in their sector that will impact their hiring plans?" rows={2}/>
  <SectionTitle title="FORWARD PLAN — NEXT QUARTER"/>
  <Field label="KNOWN ROLES / HEADCOUNT PIPELINE" placeholder="What roles are they planning to hire in the next quarter? Get as much visibility as possible." rows={3}/>
  <Field label="STRATEGIC INITIATIVES THAT WILL DRIVE HIRING" placeholder="New products, market expansion, funding deployment, transformation programmes — what's driving their talent needs?" rows={2}/>
  <Field label="ENGAGEMENT TYPE OPPORTUNITIES" placeholder="Are there contract or SOW needs alongside perm? Are there project-based requirements we haven't discussed?" rows={2}/>
  <Field label="ACCOUNT DEVELOPMENT ACTIONS" placeholder="Who else in the business should we be meeting? New hiring managers, other teams, leadership introductions?" rows={2}/>
  <SectionTitle title="AGREED ACTIONS"/>
  <Table id="QBR actions" columns={["Action","Owner","Due date"]} rows={5}/>
  <RadioRow label="RELATIONSHIP HEALTH" options={["Strategic partner","Trusted supplier","Transactional","At risk","New / building"]}/>
  <Field label="OVERALL QBR NOTES" placeholder="Any other observations, commitments made, or context from the meeting" rows={3}/>
</div>);

/* ══════════════ JOB ══════════════ */

const JobQualification = () => (<div>
  <DocHeader title="Job Qualification Checklist" subtitle="Complete before committing resource to any role — if it doesn't qualify, don't work it" category="JOB"/>
  <Row><Field label="ROLE" placeholder="Job title" width="50%"/><Field label="CLIENT" placeholder="Company" width="50%"/></Row>
  <Row><Field label="DATE RECEIVED" placeholder="dd/mm/yyyy" width="50%"/><Field label="CONSULTANT" placeholder="Your name" width="50%"/></Row>
  <RadioRow label="ENGAGEMENT TYPE" options={["Permanent","Contract","SOW"]}/>
  <SectionTitle title="MEDDPICC QUALIFICATION"/>
  <Field label="METRICS" placeholder="How will they measure a successful hire in 12 months?" rows={2}/>
  <Field label="ECONOMIC BUYER" placeholder="Who actually approves the hire and the budget?" rows={1}/>
  <Field label="DECISION CRITERIA" placeholder="What are they judging candidates — and agencies — on?" rows={2}/>
  <Field label="DECISION PROCESS" placeholder="Stages, people involved, timeline to offer" rows={2}/>
  <Field label="PAPER PROCESS" placeholder="Contracting, onboarding, approvals — especially for contract and SOW" rows={1}/>
  <Field label="IDENTIFIED PAIN" placeholder="What does it cost the business if this role stays open?" rows={2}/>
  <Field label="CHAMPION" placeholder="Who internally is fighting for this hire — and for you?" rows={1}/>
  <Field label="COMPETITION" placeholder="Other agencies, direct sourcing, internal candidates" rows={1}/>
  <SectionTitle title="READINESS CHECKS"/>
  <CheckList items={["Budget is approved — not 'pending sign-off'","Salary or rate is realistic for this market","Brief taken on a live call, not from a spec","Interview process and feedback turnaround agreed","Terms of business signed or agreed for this role","IR35 status confirmed (contract)","Client is willing to prioritise your candidates"]}/>
  <SectionTitle title="SCORING"/>
  <ScoreRow label="Urgency"/>
  <ScoreRow label="Client commitment and access"/>
  <ScoreRow label="Fillability in the current market"/>
  <ScoreRow label="Commercial value"/>
  <RadioRow label="DECISION" options={["Green — work it now","Amber — work with conditions","Red — do not work yet"]}/>
  <Field label="CONDITIONS / WHAT WOULD MOVE IT TO GREEN" placeholder="e.g. exclusivity for 2 weeks, salary moves to £X, faster feedback" rows={2}/>
</div>);

const OfferTracker = () => (<div>
  <DocHeader title="Offer Management Tracker" subtitle="Track every offer from verbal through to signed contract and start — no surprises" category="JOB"/>
  <Row><Field label="CANDIDATE" placeholder="Full name" width="50%"/><Field label="ROLE & CLIENT" placeholder="Job title, company" width="50%"/></Row>
  <RadioRow label="ENGAGEMENT TYPE" options={["Permanent","Contract","SOW"]}/>
  <SectionTitle title="BEFORE THE OFFER"/>
  <Row><Field label="CANDIDATE TARGET" placeholder="Salary / rate they want" width="50%"/><Field label="CANDIDATE WALK-AWAY" placeholder="Minimum they would accept" width="50%"/></Row>
  <Row><Field label="CLIENT BUDGET" placeholder="Their ceiling" width="50%"/><Field label="OTHER LEVERS AVAILABLE" placeholder="Bonus, equity, review date, remote days, title" width="50%"/></Row>
  <CheckList items={["Verbal offer check completed before anything formal","Counter-offer conversation had with the candidate","Competing processes known and understood","Client agreed that the offer goes through you, not direct"]}/>
  <SectionTitle title="THE OFFER"/>
  <Table id="Offer" columns={["Base / rate","Bonus","Equity","Benefits","Start date"]} rowLabels={["Initial offer","Revised offer","Final agreed"]}/>
  <Field label="NEGOTIATION NOTES" placeholder="What was asked for, what was traded, what was agreed" rows={3}/>
  <SectionTitle title="MILESTONES"/>
  <Table id="Milestones" columns={["Date","Notes"]} rowLabels={["Verbal offer made","Verbal acceptance","Written offer / contract sent","Contract signed","Resignation handed in","Counter-offer handled","References complete","Compliance cleared","Start date confirmed","Day one check-in"]}/>
  <SectionTitle title="RISK"/>
  <ScoreRow label="Risk of falling over (1 low – 10 high)"/>
  <Field label="RISKS & MITIGATIONS" placeholder="Counter-offer, competing offer, notice period, relocation, cold feet" rows={3}/>
  <Row><Field label="FEE / MARGIN" placeholder="Fee % and value, or margin per day" width="50%"/><Field label="INVOICE DATE" placeholder="dd/mm/yyyy" width="50%"/></Row>
</div>);

const InterviewFeedbackForm = () => (<div>
  <DocHeader title="Interview Feedback Form" subtitle="Capture structured client feedback after every interview stage — call the client within 2 hours" category="JOB"/>
  <Row><Field label="CANDIDATE NAME" placeholder="Full name" width="50%"/><Field label="ROLE" placeholder="Job title" width="50%"/></Row>
  <Row><Field label="CLIENT / COMPANY" placeholder="Hiring company" width="50%"/><Field label="INTERVIEW STAGE" placeholder="e.g. 1st interview, technical, final" width="50%"/></Row>
  <Row><Field label="INTERVIEW DATE" placeholder="dd/mm/yyyy" width="33%"/><Field label="FEEDBACK CALL DATE" placeholder="dd/mm/yyyy" width="33%"/><Field label="FEEDBACK FROM" placeholder="Interviewer name & title" width="33%"/></Row>
  <SectionTitle title="OVERALL DECISION"/>
  <RadioRow label="OUTCOME" options={["Progress to next stage","Final stage / offer pending","Unsuccessful","Decision pending — when?"]}/>
  <Field label="IF PROGRESSING — WHAT IS THE NEXT STAGE?" placeholder="Format, timeline, who will be involved?" rows={2}/>
  <Field label="IF UNSUCCESSFUL — PRIMARY REASON IN ONE SENTENCE" placeholder="e.g. 'Strong technically but not as commercially driven as they need at this stage'" rows={1}/>
  <SectionTitle title="SKILLS & TECHNICAL FIT"/>
  <ScoreRow label="Technical skills / role-specific competency"/>
  <ScoreRow label="Depth and relevance of experience"/>
  <ScoreRow label="Quality of examples given (STAR structure)"/>
  <Field label="SPECIFIC SKILLS FEEDBACK" placeholder="What did the interviewer say about technical skills, experience, or qualifications — positive and negative?" rows={3}/>
  <SectionTitle title="CULTURE & SOFT SKILLS"/>
  <ScoreRow label="Cultural fit and values alignment"/>
  <ScoreRow label="Communication, presence and clarity"/>
  <ScoreRow label="Enthusiasm and genuine interest in the role / company"/>
  <ScoreRow label="Ability to think on their feet / handle difficult questions"/>
  <Field label="CULTURE & SOFT SKILLS FEEDBACK" placeholder="How did the interviewer describe the candidate's presence, communication style, and personality?" rows={3}/>
  <SectionTitle title="SPECIFIC FEEDBACK CAPTURED"/>
  <Field label="WHAT THE CLIENT LIKED (DIRECT QUOTES WHERE POSSIBLE)" placeholder="The more specific the better — these are gold for briefing the candidate before the next stage" rows={3}/>
  <Field label="CONCERNS OR RESERVATIONS" placeholder="What held them back from a stronger score? Any specific moments in the interview that gave them pause?" rows={3}/>
  <Field label="QUESTIONS THE CANDIDATE ANSWERED WELL" placeholder="Which questions landed best? This helps you coach them for next time." rows={2}/>
  <Field label="QUESTIONS THE CANDIDATE STRUGGLED WITH" placeholder="Where did they stumble? Helps with coaching for stage 2." rows={2}/>
  <SectionTitle title="COMPETITOR INTEL"/>
  <Field label="HOW DOES THIS CANDIDATE COMPARE TO OTHERS THEY'VE SEEN?" placeholder="Are they front of the pack, middle, or behind? How many other candidates are at this stage?" rows={2}/>
  <Field label="WHAT WOULD MAKE THIS CANDIDATE THE STRONGEST IN THE PROCESS?" placeholder="What would elevate them — what does the standout candidate look like?" rows={2}/>
  <SectionTitle title="ACTIONS"/>
  <Field label="FEEDBACK TO DELIVER TO CANDIDATE" placeholder="What will you tell the candidate? Write it out before you call them." rows={3}/>
  <Field label="COACHING FOR NEXT STAGE (IF PROGRESSING)" placeholder="Based on this feedback, what does the candidate need to do differently or emphasise more in stage 2?" rows={3}/>
  <Field label="NEXT STEP & TIMELINE" placeholder="What happens next and by when? When is the next stage scheduled or expected?" rows={2}/>
</div>);

/* ══════════════ COMMERCIAL ══════════════ */

const SOWScopeChecklist = () => (<div>
  <DocHeader title="SOW Scope Checklist" subtitle="Complete before proposing or agreeing any SOW engagement — the client is buying an outcome, not time" category="COMMERCIAL"/>
  <Row><Field label="CLIENT" placeholder="Company" width="50%"/><Field label="PROJECT / ENGAGEMENT NAME" placeholder="Working title" width="50%"/></Row>
  <Row><Field label="CLIENT SPONSOR" placeholder="Name and title" width="50%"/><Field label="DATE" placeholder="dd/mm/yyyy" width="50%"/></Row>
  <SectionTitle title="THE PROBLEM & OUTCOME"/>
  <Field label="BUSINESS PROBLEM BEING SOLVED" placeholder="In the client's words" rows={2}/>
  <Field label="DELIVERABLES" placeholder="Specific, tangible outputs — not activities" rows={3}/>
  <Field label="SUCCESS / ACCEPTANCE CRITERIA" placeholder="How will each deliverable be signed off?" rows={3}/>
  <Field label="OUT OF SCOPE" placeholder="What is explicitly not included — protects against scope creep" rows={2}/>
  <SectionTitle title="MILESTONES"/>
  <Table id="SOW milestones" columns={["Milestone","Deliverable","Target date","Payment %"]} rows={5}/>
  <SectionTitle title="GOVERNANCE"/>
  <Field label="REPORTING & CADENCE" placeholder="Status reports, steering meetings, who attends" rows={2}/>
  <Field label="CHANGE CONTROL PROCESS" placeholder="How changes to scope are requested, priced and approved" rows={2}/>
  <Field label="ESCALATION ROUTE" placeholder="Who escalates to whom when issues arise" rows={1}/>
  <SectionTitle title="COMMERCIALS & RISK"/>
  <RadioRow label="PRICING MODEL" options={["Fixed price","Milestone-based","Capped time and materials"]}/>
  <Row><Field label="TOTAL VALUE" placeholder="£" width="50%"/><Field label="MARGIN" placeholder="% or £" width="50%"/></Row>
  <Field label="KEY RISKS & MITIGATIONS" placeholder="Dependencies, client inputs, resource availability" rows={3}/>
  <CheckList items={["IP ownership agreed","Confidentiality terms agreed","Substitution rights in place","Supplier controls how, when and where the work is done","Liability and insurance cover confirmed","Client dependencies and inputs documented","IR35 position reviewed — genuine SOW, not disguised contract","SOW signed by both parties before work starts"]}/>
</div>);

const ComplianceChecklist = () => (<div>
  <DocHeader title="Pre-Placement Compliance Checklist" subtitle="Complete in full before any candidate starts — perm, contract or SOW. No exceptions." category="COMMERCIAL"/>
  <Row><Field label="CANDIDATE NAME" placeholder="Full name" width="50%"/><Field label="ROLE / ENGAGEMENT" placeholder="Job title and client" width="50%"/></Row>
  <Row><Field label="CLIENT / COMPANY" placeholder="Hiring company" width="50%"/><Field label="PROPOSED START DATE" placeholder="dd/mm/yyyy" width="50%"/></Row>
  <RadioRow label="ENGAGEMENT TYPE" options={["Permanent","Fixed-Term Contract","Contract (PAYE)","Contract (Umbrella)","Contract (Ltd Co / PSC)","SOW"]}/>
  <SectionTitle title="RIGHT TO WORK"/>
  <CheckList items={["Right to work in the UK confirmed","Document type verified (passport / biometric / share code)","Document expiry date checked — not expired","Copy of document obtained and stored securely","For share codes: verified via gov.uk employer checking service","For non-UK nationals: visa type and work restrictions confirmed","Expiry date diarised for re-check if applicable"]}/>
  <Row><Field label="DOCUMENT TYPE" placeholder="e.g. UK Passport, BRP, Share Code" width="50%"/><Field label="DOCUMENT EXPIRY DATE" placeholder="dd/mm/yyyy or N/A" width="50%"/></Row>
  <Field label="RIGHT TO WORK NOTES" placeholder="Any restrictions, conditions, or follow-up required?" rows={2}/>
  <SectionTitle title="IR35 (CONTRACT & SOW ONLY)"/>
  <RadioRow label="IR35 STATUS" options={["Inside IR35","Outside IR35","Not applicable (Perm / SOW)","To be determined"]}/>
  <RadioRow label="DETERMINATION METHOD" options={["Client SDS (Status Determination Statement)","CEST tool assessment","Independent assessment","PSC self-assessment (pre-April 2021 only)"]}/>
  <CheckList items={["IR35 status confirmed by client in writing (SDS issued)","SDS shared with and acknowledged by candidate","Payment method aligned with IR35 status (PAYE inside / ltd or umbrella outside)","Candidate confirmed preferred payment method","Umbrella company name confirmed (if applicable)","Ltd company details confirmed (if applicable) — company number, VAT number","Substitution clause reviewed (if claiming outside IR35)"]}/>
  <Field label="IR35 NOTES" placeholder="Any disputes, concerns, or follow-up on IR35 status?" rows={2}/>
  <SectionTitle title="REFERENCES"/>
  <RadioRow label="REFERENCES REQUIRED?" options={["Yes — perm placement","Yes — contract (client requires)","No — not required for this engagement"]}/>
  <CheckList items={["Minimum 2 references obtained (for perm placements)","At least 1 reference from a direct line manager","References cover most recent 2 years of employment","No material concerns raised in any reference","Any concerns discussed with candidate and client before start","Reference documentation stored securely"]}/>
  <Field label="REFERENCES TAKEN FROM" placeholder="Names and organisations of referees" rows={2}/>
  <SectionTitle title="CONTRACTS & DOCUMENTATION"/>
  <CheckList items={["Candidate has received and signed their contract / offer letter","Client contract / terms of business signed and on file","For contract: assignment schedule issued and signed","For SOW: SOW agreement signed by both parties before work commences","Fee / rate confirmed in writing to both parties","Start date confirmed in writing to both parties","Notice period confirmed and agreed","Probationary period terms communicated (perm)"]}/>
  <SectionTitle title="FINANCIAL & PAYROLL"/>
  <CheckList items={["Candidate's bank details obtained securely for payroll (contract)","Tax code confirmed (where applicable)","Payment frequency agreed and communicated (weekly / monthly)","Expenses policy explained to candidate","For umbrella: candidate registered and confirmed with umbrella company","Invoice / timesheet process explained to client","Payment terms confirmed with client (30/60 days)"]}/>
  <SectionTitle title="DATA PROTECTION & GDPR"/>
  <CheckList items={["Candidate has consented to data being shared with the end client","Candidate privacy notice issued","Client data processing agreement in place (where required)","No sensitive personal data shared beyond what is necessary","Candidate informed of how their data will be stored and for how long"]}/>
  <SectionTitle title="FINAL SIGN-OFF"/>
  <RadioRow label="ALL COMPLIANCE ITEMS COMPLETE?" options={["Yes — cleared to start","No — outstanding items (detail below)","Partial — approved exception (detail below)"]}/>
  <Field label="OUTSTANDING ITEMS / EXCEPTIONS" placeholder="List any items not yet complete and the agreed plan to resolve them before start date" rows={3}/>
  <Row><Field label="COMPLIANCE CHECKED BY" placeholder="Consultant name" width="50%"/><Field label="DATE COMPLETED" placeholder="dd/mm/yyyy" width="50%"/></Row>
</div>);

/* ══════════════ BD ══════════════ */

const LeadGenerationForm = () => (<div>
  <DocHeader title="Lead Generation Form" subtitle="Qualify and capture new BD leads — inbound, outbound, referral and event" category="BD"/>
  <Row><Field label="COMPANY" placeholder="Company name" width="50%"/><Field label="CONTACT NAME & TITLE" placeholder="Who you want to reach" width="50%"/></Row>
  <Row><Field label="DATE LOGGED" placeholder="dd/mm/yyyy" width="50%"/><Field label="LOGGED BY" placeholder="Consultant name" width="50%"/></Row>
  <SectionTitle title="LEAD SOURCE & CONTEXT"/>
  <RadioRow label="HOW WAS THIS LEAD GENERATED?" options={["Referral","LinkedIn","Inbound enquiry","Event","Placed candidate","Market mapping","Cold outreach"]}/>
  <Field label="THE TRIGGER — WHY REACH OUT NOW?" placeholder="Funding round, new leader, job ads, product launch. What's the specific hook?" rows={3}/>
  <SectionTitle title="COMPANY INTELLIGENCE"/>
  <Row><Field label="SECTOR" placeholder="e.g. FinTech, defence-tech" width="33%"/><Field label="STAGE" placeholder="e.g. Series B" width="33%"/><Field label="HEADCOUNT" placeholder="Approx." width="33%"/></Row>
  <Row><Field label="LOCATION(S)" placeholder="HQ and hubs" width="50%"/><Field label="TECH STACK" placeholder="Known technologies" width="50%"/></Row>
  <Field label="RECENT NEWS / FUNDING" placeholder="What has happened in the last 6 months?" rows={2}/>
  <Field label="CURRENT HIRING ACTIVITY" placeholder="Live roles, team growth, ads that have been open a long time" rows={2}/>
  <Field label="KNOWN PAIN POINTS" placeholder="What is likely hurting them right now?" rows={2}/>
  <SectionTitle title="RELATIONSHIP & ACCESS"/>
  <Field label="WARM ROUTE IN" placeholder="Mutual connections, placed candidates, past contacts" rows={2}/>
  <Field label="PRIOR HISTORY WITH STOTT AND MAY" placeholder="Any previous work, contact or conversations?" rows={1}/>
  <RadioRow label="DO THEY USE AGENCIES?" options={["Yes — PSL","Yes — ad hoc","Direct hire only","Unknown"]}/>
  <ScoreRow label="Openness to a conversation"/>
  <SectionTitle title="OPPORTUNITY ASSESSMENT (BANT LITE)"/>
  <Field label="B — BUDGET" placeholder="Have they raised or are they growing? Can they afford agency fees?" rows={1}/>
  <Field label="A — AUTHORITY" placeholder="Is this contact the decision-maker? If not, who is?" rows={1}/>
  <Field label="N — NEED" placeholder="What evidence is there of a real hiring need?" rows={1}/>
  <Field label="T — TIMING" placeholder="Is the need now, next quarter, or later?" rows={1}/>
  <SectionTitle title="ENGAGEMENT TYPE POTENTIAL"/>
  <Row><Field label="PERM" placeholder="Opportunity and roles" width="33%"/><Field label="CONTRACT" placeholder="Opportunity and roles" width="33%"/><Field label="SOW" placeholder="Opportunity and projects" width="33%"/></Row>
  <SectionTitle title="KEY QUESTIONS TO ASK ON FIRST CONTACT"/>
  <CheckList items={["Opening: What does hiring look like for you this year?","Need: Which roles are the priority right now?","Pain: What has been hardest to find?","Urgency: What happens if those roles stay open another quarter?","Authority: Who else is involved in hiring decisions?","Competition: How are you finding people today — agencies, direct, referrals?","Engagement: Are there project needs where contract or SOW might fit?","Close: Would it be worth a proper conversation once I've pulled together some market data?"]}/>
  <SectionTitle title="LEAD SCORING"/>
  <ScoreRow label="Trigger strength" max={5}/>
  <ScoreRow label="Need clarity" max={5}/>
  <ScoreRow label="Contact quality" max={5}/>
  <ScoreRow label="Relationship depth" max={5}/>
  <ScoreRow label="Strategic fit" max={5}/>
  <RadioRow label="OVERALL RATING" options={["Hot","Warm","Cold","Dead"]}/>
  <SectionTitle title="OUTREACH PLAN"/>
  <Field label="OPENING MESSAGE / HOOK" placeholder="What's the specific hook — the reason you're reaching out today?" rows={3}/>
  <Field label="VALUE TO LEAD WITH" placeholder="What insight, data, placed candidate, or market intel can you share first — before asking for anything?" rows={2}/>
  <Field label="PLANNED FOLLOW-UP SEQUENCE" placeholder="e.g. LinkedIn message Day 1 → Phone call Day 3 → Email with market data Day 7 → Final follow-up Day 14" rows={3}/>
  <SectionTitle title="OUTCOME & NEXT STEPS"/>
  <RadioRow label="FIRST CONTACT RESULT" options={["Positive — meeting booked","Warm — follow up agreed","No response — continue sequence","Not interested","Wrong contact — find new route"]}/>
  <Field label="NOTES FROM FIRST CONTACT" placeholder="What did you learn? What was said? Any surprises or useful intel?" rows={3}/>
  <Field label="AGREED NEXT STEP" placeholder="Exactly what happens next, and by when?" rows={2}/>
  <Field label="DATE TO REVIEW THIS LEAD" placeholder="When will you revisit if no progress?" rows={1}/>
</div>);

/* ══════════════ PLANNING ══════════════ */

const ActivityPlanner = () => (<div>
  <DocHeader title="Weekly Activity Planner" subtitle="Plan the week on Monday, review it on Friday — protect your BD time like a client meeting" category="PLANNING"/>
  <Row><Field label="CONSULTANT" placeholder="Your name" width="50%"/><Field label="WEEK COMMENCING" placeholder="dd/mm/yyyy" width="50%"/></Row>
  <SectionTitle title="THIS WEEK'S PRIORITIES"/>
  <Field label="TOP 3 OUTCOMES FOR THE WEEK" placeholder="What must be true by Friday?" rows={3}/>
  <SectionTitle title="ACTIVITY — TARGET VS ACTUAL"/>
  <Table id="Activity" columns={["Target","Actual"]} rowLabels={["BD calls","Client meetings","New jobs taken","Candidate calls","CVs sent","Interviews arranged","Offers","Placements / starts","LinkedIn posts"]}/>
  <SectionTitle title="DIARY BLOCKS"/>
  <Table id="Diary" columns={["Morning (outreach first)","Afternoon","Protected BD block"]} rowLabels={["Monday","Tuesday","Wednesday","Thursday","Friday"]}/>
  <SectionTitle title="FRIDAY REVIEW"/>
  <Field label="WHAT MOVED FORWARD?" placeholder="Wins, progress, new conversations" rows={3}/>
  <Field label="WHAT DIDN'T — AND WHY?" placeholder="Be honest about where time went" rows={3}/>
  <Field label="ONE THING TO DO DIFFERENTLY NEXT WEEK" placeholder="A single, specific change" rows={2}/>
</div>);

/* ══════════════ REGISTRY ══════════════ */
export const DOCS = [
  { id:"candidate-reg",      category:"CANDIDATE",  icon:"👤", title:"Candidate Registration Form",       desc:"Complete during or after the first candidate call", color:B.teal, Comp:CandidateRegistration },
  { id:"interview-prep",     category:"CANDIDATE",  icon:"🎤", title:"Interview Prep Sheet",              desc:"Prepare candidates for every interview", color:B.teal, Comp:InterviewPrep },
  { id:"pipeline",           category:"CANDIDATE",  icon:"📊", title:"Candidate Pipeline Tracker",        desc:"Track all active candidates across live roles", color:B.teal, Comp:PipelineTracker },
  { id:"counter-offer",      category:"CANDIDATE",  icon:"⚠️", title:"Counter-Offer Conversation Guide",  desc:"Have this conversation at screening, not at offer stage", color:B.teal, Comp:CounterOfferGuide },
  { id:"candidate-feedback", category:"CANDIDATE",  icon:"💬", title:"Candidate Feedback Form",           desc:"Structure and deliver client feedback after interviews", color:B.teal, Comp:CandidateFeedbackForm },
  { id:"cv-checklist",       category:"CANDIDATE",  icon:"📄", title:"CV Review & Submission Checklist",  desc:"Quality gate before sending any CV to a client", color:B.teal, Comp:CVSubmissionChecklist },
  { id:"reference-check",    category:"CANDIDATE",  icon:"🔍", title:"Reference Check Template",          desc:"Structured professional reference questions", color:B.teal, Comp:ReferenceCheckTemplate },
  { id:"client-brief",       category:"CLIENT",     icon:"🤝", title:"Client Meeting & Brief Sheet",      desc:"New client meetings and job briefs — perm, contract and SOW", color:"#44B3F4", Comp:ClientBrief },
  { id:"bd-call",            category:"CLIENT",     icon:"📞", title:"BD Call Prep Sheet",                desc:"Prepare for every business development call", color:"#44B3F4", Comp:BDCallPrep },
  { id:"client-qbr",         category:"CLIENT",     icon:"📈", title:"Client QBR Template",               desc:"Quarterly business review for key accounts", color:"#44B3F4", Comp:ClientQBRTemplate },
  { id:"job-qual",           category:"JOB",        icon:"✅", title:"Job Qualification Checklist",       desc:"Complete before committing resource to any role", color:B.aqua, Comp:JobQualification },
  { id:"offer",              category:"JOB",        icon:"💰", title:"Offer Management Tracker",          desc:"Track from verbal offer through to signed contract", color:B.aqua, Comp:OfferTracker },
  { id:"interview-feedback", category:"JOB",        icon:"📋", title:"Interview Feedback Form",           desc:"Capture structured client feedback after every stage", color:B.aqua, Comp:InterviewFeedbackForm },
  { id:"sow",                category:"COMMERCIAL", icon:"📐", title:"SOW Scope Checklist",               desc:"Before proposing or agreeing any SOW engagement", color:"#7EFF2C", Comp:SOWScopeChecklist },
  { id:"compliance",         category:"COMMERCIAL", icon:"🛡️", title:"Pre-Placement Compliance Checklist",desc:"Right to work, IR35, references, contracts, GDPR", color:"#7EFF2C", Comp:ComplianceChecklist },
  { id:"leads",              category:"BD",         icon:"🎯", title:"Lead Generation Form",              desc:"Qualify and capture new BD leads from every source", color:B.teal, Comp:LeadGenerationForm },
  { id:"activity",           category:"PLANNING",   icon:"📅", title:"Weekly Activity Planner",           desc:"Plan and track your weekly recruitment activity", color:"#44B3F4", Comp:ActivityPlanner },
];

export const DOC_CATS = ["All","CANDIDATE","CLIENT","JOB","COMMERCIAL","BD","PLANNING"];
