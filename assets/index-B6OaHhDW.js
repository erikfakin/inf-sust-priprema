(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function ke(e){const t=[...e];for(let n=t.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}const X={perfectScore:{id:"perfectScore",title:"RIP AND TEAR",description:"Slaughter all questions without mercy. Not a single survivor.",icon:"fas fa-skull",condition:e=>e.score===e.totalQuestions},speedDemon:{id:"speedDemon",title:"SPEED KILLS",description:"Finished with half the time remaining. Inf Sustavi demons couldn't even see you coming.",icon:"fas fa-bolt",condition:e=>e.timeUsedPercentage<50},consistentPerformer:{id:"consistentPerformer",title:"BRUTAL COMBO",description:"Annihilated 5 questions in a row. The info-demons cry in the corner.",icon:"fas fa-fire",condition:e=>e.maxStreak>=5},quickThinker:{id:"quickThinker",title:"ULTRA-VIOLENCE",description:"Executed a question in under 5 seconds. That was... messy.",icon:"fas fa-radiation",condition:e=>e.fastestAnswer<=5},comeback:{id:"comeback",title:"HELL WALKER",description:"Returned from the abyss after 2 wrong answers. Not even failure can stop you.",icon:"fas fa-skull-crossbones",condition:e=>e.hadComeback},halfwayHero:{id:"halfwayHero",title:"KNEE-DEEP IN THE DEAD",description:"Scored at least 50%. You've only just begun the carnage.",icon:"fas fa-bone",condition:e=>e.score>=e.totalQuestions/2},BFG:{id:"BFG",title:"BFG DIVISION",description:"Answered a difficult question correctly. Big. Freaking. Genius.",icon:"fas fa-meteor",condition:e=>q.some(t=>{const n=t.question.length>100,s=Array.isArray(t.correctAnswer)&&t.correctAnswer.length>1;return t.isCorrect&&(n||s)})}};let y=[],C={},te=[],g=0,h=0,p=1200,M=1200,q=[],N=0,H=0,$=0,U=!1,ne=0,O=1/0,i={questionCount:15,timerSetting:1200,soundEffects:!0,backgroundMusic:!0,musicVolume:20},oe,v=[];const z=document.getElementById("welcome-screen"),Ie=document.getElementById("start-btn"),se=document.getElementById("question-count"),ce=document.getElementById("timer-setting"),B=document.getElementById("sound-toggle"),xe=document.getElementById("view-high-scores"),ie=document.getElementById("quiz-container"),Ce=document.getElementById("question"),V=document.getElementById("answer-buttons"),k=document.getElementById("next-btn"),Ae=document.getElementById("time-display"),x=document.getElementById("timer-bar"),re=document.getElementById("score"),Be=document.getElementById("progress-bar"),ae=document.getElementById("current-question"),Te=document.getElementById("total-questions"),Me=document.getElementById("question-number"),qe=document.getElementById("category-badge"),T=document.getElementById("feedback-container"),Ne=document.getElementById("feedback-text"),_=document.getElementById("correct-answer"),D=document.getElementById("results-screen"),$e=document.getElementById("final-score"),He=document.getElementById("time-taken"),Oe=document.getElementById("accuracy"),A=document.getElementById("achievements-list"),De=document.getElementById("view-answers-btn"),Re=document.getElementById("save-score-btn"),Pe=document.getElementById("restart-button"),le=document.getElementById("review-screen"),Z=document.getElementById("summary"),Ve=document.getElementById("back-to-results"),de=document.getElementById("high-scores-screen"),G=document.getElementById("high-scores-list"),Ge=document.getElementById("back-btn"),ze=document.getElementById("clear-scores-btn"),Q=document.getElementById("correct-sound"),Y=document.getElementById("wrong-sound"),m=document.getElementById("click-sound"),F=document.getElementById("complete-sound"),d=document.getElementById("background-music"),L=document.getElementById("sound-toggle-btn"),E=document.getElementById("music-volume-slider");function Qe(){Ye(),st(),fetch("questions.json").then(e=>e.json()).then(e=>{te=e,Fe(e),Ue(),je()}).catch(e=>console.error("Error loading questions:",e))}function Ye(){Q.volume=.6,Y.volume=.6,m.volume=.5,F.volume=.7;const e=i.musicVolume/100;d.volume=e,E&&(E.value=i.musicVolume,P(i.musicVolume)),i.backgroundMusic=!0,ue();const t=[Q,Y,m,F,d];t.forEach(n=>{n.preload="auto",n.load(),n.addEventListener("canplaythrough",()=>{console.log(`${n.id} loaded successfully`)}),n.addEventListener("error",s=>{console.warn(`Error loading audio ${n.id}, but will continue:`,s)})}),document.addEventListener("click",()=>{if(i.soundEffects){const n=()=>{t.forEach(s=>{s.play().then(()=>{s.pause(),s.currentTime=0}).catch(o=>{console.log(`Audio unlock attempted for ${s.id}:`,o)})}),document.removeEventListener("click",n)};n()}},{once:!0})}function ue(){if(i.backgroundMusic)try{d.currentTime=0,d.loop=!0,d.volume=i.musicVolume/100;const e=d.play();e!==void 0&&e.then(()=>{console.log("Background music started successfully")}).catch(t=>{console.log("Background music autoplay prevented:",t)})}catch(e){console.error("Error playing background music:",e)}}function Fe(e){C={"General Knowledge":[],"Computer Science":[],Business:[],Other:[]},e.forEach(t=>{const n=t.text.toLowerCase();n.includes("computer")||n.includes("software")||n.includes("hardware")||n.includes("sistem")?C["Computer Science"].push(t):n.includes("business")||n.includes("organization")||n.includes("management")||n.includes("poduzeće")||n.includes("sustav")?C.Business.push(t):n.includes("knowledge")||n.includes("information")||n.includes("informacij")?C["General Knowledge"].push(t):C.Other.push(t)})}function Ue(){Ie.addEventListener("click",()=>{f(m),Ke(),i.backgroundMusic=!0,d.currentTime=0,d.loop=!0,d.volume=i.musicVolume/100;const e=()=>{d.play().then(()=>{console.log("Background music started successfully on button click")}).catch(t=>{console.log("Retrying music playback after error:",t),setTimeout(e,100)})};e(),S(ie),We()}),xe.addEventListener("click",()=>{f(m),K()}),k.addEventListener("click",()=>{f(m),fe()}),De.addEventListener("click",()=>{f(m),S(le),Ze()}),Re.addEventListener("click",()=>{f(m),tt()}),Pe.addEventListener("click",()=>{f(m),nt(),S(z)}),Ve.addEventListener("click",()=>{f(m),S(D)}),Ge.addEventListener("click",()=>{f(m),S(z)}),ze.addEventListener("click",()=>{f(m),et()}),B.addEventListener("change",()=>{i.soundEffects=B.checked,localStorage.setItem("quizGameSettings",JSON.stringify(i)),R()}),L.addEventListener("click",()=>{i.soundEffects=!i.soundEffects,B.checked=i.soundEffects,localStorage.setItem("quizGameSettings",JSON.stringify(i)),R(),i.soundEffects&&f(m)}),E.addEventListener("input",()=>{const e=E.value;ct(e),P(e),d.paused&&i.backgroundMusic&&d.play().catch(t=>{console.log("Tried to play music when slider moved:",t)}),i.soundEffects&&f(m)})}function Ke(){i.questionCount=parseInt(se.value),i.timerSetting=parseInt(ce.value),i.soundEffects=B.checked,i.backgroundMusic=!0,localStorage.setItem("quizGameSettings",JSON.stringify(i))}function je(){const e=localStorage.getItem("quizGameSettings");e?(i=JSON.parse(e),i.musicVolume===void 0&&(i.musicVolume=20),i.backgroundMusic=!0,se.value=i.questionCount,ce.value=i.timerSetting,B.checked=i.soundEffects,E.value=i.musicVolume,P(i.musicVolume),R()):(R(),P(i.musicVolume))}function R(){i.soundEffects?(L.classList.add("active"),L.classList.remove("muted"),L.innerHTML='<i class="fas fa-volume-up"></i>'):(L.classList.remove("active"),L.classList.add("muted"),L.innerHTML='<i class="fas fa-volume-mute"></i>'),i.backgroundMusic=!0,E.value=i.musicVolume,document.getElementById("volume-value-display")&&(document.getElementById("volume-value-display").textContent=`${i.musicVolume}%`),E.style.background=`linear-gradient(to right, var(--doom-red) 0%, var(--doom-red) ${i.musicVolume}%, #444 ${i.musicVolume}%, #444 100%)`}function S(e){z.classList.remove("active"),ie.classList.remove("active"),D.classList.remove("active"),le.classList.remove("active"),de.classList.remove("active"),e.classList.add("active"),e===D&&i.soundEffects&&F.play()}function We(){g=0,h=0,q=[],N=0,H=0,$=0,U=!1,O=1/0,i.backgroundMusic&&ue(),p=i.timerSetting,M=p,re.textContent="0",he(),ae.textContent="1",Te.textContent=i.questionCount,Je(),ge(),Xe(),me()}function Je(){y=[],y=[...te].sort(()=>Math.random()-.5).slice(0,i.questionCount)}function me(){clearTimeout(oe);const e=y[g];Ce.textContent=e.text,Me.textContent=`Question ${g+1}`;let t="General Knowledge";for(const[n,s]of Object.entries(C))if(s.some(o=>o.text===e.text)){t=n;break}if(qe.textContent=t,V.innerHTML="",T.style.display="none",document.getElementById("explanation-text").style.display="none",ne=Date.now(),e.type==="fill-in-the-blank"){const n=document.createElement("div");n.className="doom-input-container fill-blank-container";const s=document.createElement("i");s.className="fas fa-pen-nib input-icon",n.appendChild(s);const o=document.createElement("input");o.type="text",o.id="user-answer",o.placeholder="TYPE YOUR ANSWER HERE, SLAYER...",o.setAttribute("autocomplete","off"),o.setAttribute("autocorrect","off"),o.setAttribute("autocapitalize","off"),o.setAttribute("spellcheck","false"),n.appendChild(o),V.appendChild(n),o.focus(),o.addEventListener("keypress",function(r){r.key==="Enter"&&!k.disabled&&fe()})}else{const n=e.answers.filter(c=>c.correct).length>1,s=e.answers.map((c,u)=>({...c,originalIndex:u})),o=e.answers.length===2&&(e.answers.some(c=>c.text==="Točno")&&e.answers.some(c=>c.text==="Netočno")||e.answers.some(c=>c.text==="True")&&e.answers.some(c=>c.text==="False"));let r;o?r=s:r=ke(s),r.forEach((c,u)=>{const a=document.createElement("div");a.className="answer-option",a.dataset.index=c.originalIndex;const l=document.createElement("input");l.type=n?"checkbox":"radio",l.name="answer",l.id=`answer-${u}`,l.value=c.text;const b=document.createElement("label");b.htmlFor=`answer-${u}`,b.textContent=c.text,a.appendChild(l),a.appendChild(b),a.addEventListener("click",function(w){w.target!==l&&(l.type==="radio"?(document.querySelectorAll("#answer-buttons .answer-option").forEach(I=>{I.classList.remove("selected")}),a.classList.add("selected"),l.checked=!0):(l.checked=!l.checked,a.classList.toggle("selected",l.checked)))}),b.addEventListener("click",function(w){w.preventDefault(),w.stopPropagation(),l.type==="radio"?(document.querySelectorAll("#answer-buttons .answer-option").forEach(I=>{I.classList.remove("selected")}),a.classList.add("selected"),l.checked=!0):(l.checked=!l.checked,a.classList.toggle("selected",l.checked))}),V.appendChild(a)})}k.disabled=!1,k.textContent="Attack!",k.innerHTML='Attack! <i class="fas fa-khanda"></i>'}function fe(){const e=y[g];if(T.style.display==="none"){let t,n=!1;if(e.type==="fill-in-the-blank")t=document.getElementById("user-answer").value.trim(),Array.isArray(e.correctAnswer)?n=e.correctAnswer.map(o=>o.toLowerCase()).includes(t.toLowerCase()):n=t.toLowerCase()===e.correctAnswer.toLowerCase();else{const o=document.querySelectorAll("#answer-buttons .answer-option.selected");t=Array.from(o).map(c=>{const u=parseInt(c.dataset.index);return e.answers[u].text}),console.log("Selected answers:",t);const r=e.answers.filter(c=>c.correct).map(c=>c.text);console.log("Correct answers:",r),n=t.length===r.length&&t.every(c=>r.includes(c))&&r.every(c=>t.includes(c))}const s=(Date.now()-ne)/1e3;O=Math.min(O,s),q.push({question:e.text,userAnswer:t,correctAnswer:e.type==="fill-in-the-blank"?e.correctAnswer:e.answers.filter(o=>o.correct).map(o=>o.text),isCorrect:n,timeTaken:s}),n?(N++,H=Math.max(H,N),$>=2&&(U=!0),$=0,f(Q),h++,re.textContent=h,ee(!0)):(N=0,$++,f(Y),ee(!1)),k.textContent=g>=y.length-1?"Complete Quest":"Next Challenge",k.innerHTML=g>=y.length-1?'Complete Quest <i class="fas fa-flag-checkered"></i>':'Next Challenge <i class="fas fa-arrow-right"></i>';return}g++,g<y.length&&g<i.questionCount?(ge(),ae.textContent=g+1,me()):pe()}function ee(e){const t=y[g];T.style.display="block",T.className=e?"correct":"incorrect",Ne.textContent=e?"DEMON SLAYED!":"TARGET SURVIVED!";const n=document.querySelectorAll("#answer-buttons .answer-option.selected");if(Array.from(n).map(s=>{const o=parseInt(s.dataset.index);return t.answers[o].text}),e)_.textContent="",document.getElementById("explanation-text").style.display="none",t.type!=="fill-in-the-blank"&&document.querySelectorAll("#answer-buttons .answer-option").forEach(s=>{const o=parseInt(s.dataset.index);t.answers[o].correct,s.classList.contains("selected")&&(s.classList.add("correct"),s.offsetHeight)});else{const s=t.type==="fill-in-the-blank"?t.correctAnswer:t.answers.filter(c=>c.correct).map(c=>c.text),o=Array.isArray(s)?s.join(", "):s;_.textContent=`PROPER WEAPON: ${o}`;const r=document.getElementById("explanation-text");t.explanation?(r.textContent=t.explanation,r.style.display="block"):r.style.display="none",t.type!=="fill-in-the-blank"&&document.querySelectorAll("#answer-buttons .answer-option").forEach(c=>{const u=parseInt(c.dataset.index),a=t.answers[u].correct,l=c.classList.contains("selected");a&&(c.classList.add("correct"),c.offsetHeight),l&&!a&&(c.classList.add("incorrect"),c.offsetHeight)})}T.classList.add(e?"correct-animation":"incorrect-animation")}function ge(){const e=g/i.questionCount*100;Be.style.width=`${e}%`}function Xe(){v.forEach(clearInterval),v=[];const e=setInterval(()=>{p>0?(p--,he()):(clearInterval(e),pe())},1e3);v.push(e),x.style.transition="width 1s linear",x.style.width="100%";function t(){const s=p/M*100;x.style.width=`${s}%`,s>50?x.style.backgroundColor="var(--primary-color)":s>25?x.style.backgroundColor="var(--warning-color)":x.style.backgroundColor="var(--error-color)"}const n=setInterval(t,1e3);v.push(n)}function he(){const e=Math.floor(p/60),t=p%60;Ae.textContent=`${e}:${t<10?"0":""}${t}`}function pe(){v.forEach(clearInterval),v=[];const e=M-p,t=e/M*100,n=h/i.questionCount*100,s=Math.floor(e/60),o=e%60,r=`${s}:${o<10?"0":""}${o}`;$e.textContent=`${h}/${i.questionCount}`,He.textContent=r,Oe.textContent=`${Math.round(n)}%`;const c={score:h,totalQuestions:i.questionCount,accuracy:n,timeUsed:e,timeUsedPercentage:t,maxStreak:H,fastestAnswer:O,hadComeback:U};_e(c),n>=70&&setTimeout(()=>{ot()},300);const u=`Player_${new Date().toLocaleDateString().replace(/\//g,"-")}_${new Date().toLocaleTimeString().replace(/:/g,"-")}`;ve(u),S(D)}function _e(e){A.innerHTML="";const t=document.createElement("div");t.className="achievement-header",t.innerHTML="DEMONIC ACHIEVEMENTS UNLOCKED",A.appendChild(t);let n=!1,s=0;const o=[];for(const r of Object.values(X))r.condition(e)&&(o.push(r),n=!0,s++);if(n){const r=document.createElement("div");if(r.className="achievement-counter",r.innerHTML=`${s}/${Object.keys(X).length} GLORY KILLS`,A.appendChild(r),i.soundEffects)try{const c=new Audio;c.volume=.7,c.src="/audio/correct.mp3",c.play()}catch(c){console.error("Failed to play achievement sound",c)}o.forEach((c,u)=>{const a=document.createElement("div");a.className="achievement doom-achievement",a.style.animationDelay=`${u*.2}s`,a.style.opacity="0",a.style.transform="translateX(-100px)",a.innerHTML=`
        <div class="achievement-icon"><i class="${c.icon}"></i></div>
        <div class="achievement-info">
          <div class="achievement-title">${c.title}</div>
          <div class="achievement-desc">${c.description}</div>
        </div>
      `,A.appendChild(a),a.offsetHeight})}else{const r=document.createElement("div");r.className="no-achievements doom-failure",r.innerHTML='MORTALLY CHALLENGED<br><span class="doom-subtitle">YOUR WEAKNESS IS SHOWING. RIP HARDER NEXT TIME.</span>',r.style.opacity="0",A.appendChild(r),r.offsetHeight,r.style.opacity="1"}}function Ze(){Z.innerHTML="",q.forEach((e,t)=>{const n=document.createElement("div");n.className=e.isCorrect?"correct":"incorrect";const s=Array.isArray(e.userAnswer)?e.userAnswer.join(", "):e.userAnswer,o=Array.isArray(e.correctAnswer)?e.correctAnswer.join(", "):e.correctAnswer;n.innerHTML=`
      <p><strong>BATTLE ${t+1}:</strong> ${e.question}</p>
      <p><strong>YOUR ATTACK:</strong> <span class="${e.isCorrect?"correct":"incorrect"}">${s||"(No attack)"}</span></p>
      <p><strong>KILLING BLOW:</strong> <span class="correct">${o}</span></p>
      <p><strong>EXECUTION TIME:</strong> ${e.timeTaken.toFixed(1)} seconds</p>
    `,Z.appendChild(n)})}function K(){const e=ye();if(G.innerHTML="",e.length===0){const t=document.createElement("div");t.className="no-scores-message",t.textContent="THE SLAYER'S HALL AWAITS ITS FIRST DOOM SLAYER. WILL YOU CLAIM BLOODY GLORY?",G.appendChild(t)}else e.sort((t,n)=>n.score!==t.score?n.score-t.score:t.time-n.time),e.slice(0,10).forEach((t,n)=>{const s=document.createElement("div");s.className="high-score-item",s.innerHTML=`
        <div class="high-score-rank">#${n+1}</div>
        <div class="high-score-info">
          <div class="high-score-name">${t.name}</div>
          <div class="high-score-date">${new Date(t.date).toLocaleDateString()}</div>
        </div>
        <div class="high-score-value">${t.score}/${t.totalQuestions}</div>
      `,G.appendChild(s)});S(de)}function ye(){const e=localStorage.getItem("quizHighScores");return e?JSON.parse(e):[]}function ve(e){let t=ye();const n=M-p,s=Date.now(),o=t[t.length-1],r=o&&o.score===h&&o.totalQuestions===i.questionCount&&o.time===n&&s-o.date<3e5,c={name:e,score:h,totalQuestions:i.questionCount,time:n,date:s};r?t[t.length-1].name=e:t.push(c),localStorage.setItem("quizHighScores",JSON.stringify(t)),K()}function et(){localStorage.removeItem("quizHighScores"),K()}function tt(){const e=document.createElement("div");e.id="save-score-modal",e.style.display="flex",e.innerHTML=`
    <div class="modal-content">
      <h2 class="modal-title">Claim Your Legend</h2>
      <p>Your feat has been recorded in the annals. Enter your warrior name for the Hall of Fame.</p>
      <div class="doom-input-container">
        <i class="fas fa-skull input-icon"></i>
        <input type="text" id="player-name" class="modal-input" placeholder="ENTER YOUR NAME, SLAYER..." maxlength="20" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>
      <div class="modal-buttons">
        <button id="cancel-save" class="btn secondary-btn"><i class="fas fa-times"></i> Retreat</button>
        <button id="confirm-save" class="btn primary-btn"><i class="fas fa-trophy"></i> Claim Glory</button>
      </div>
    </div>
  `,document.body.appendChild(e),document.getElementById("player-name").focus(),document.getElementById("confirm-save").addEventListener("click",()=>{const t=document.getElementById("player-name").value.trim();t&&ve(t),document.body.removeChild(e)}),document.getElementById("cancel-save").addEventListener("click",()=>{document.body.removeChild(e)}),e.addEventListener("click",t=>{t.target===e&&document.body.removeChild(e)})}function nt(){g=0,h=0,q=[],clearTimeout(oe),v.forEach(clearInterval),v=[]}function ot(){console.log("Showing confetti");const e=document.getElementById("confetti-styles");e&&document.head.removeChild(e);const t=document.createElement("style");t.id="confetti-styles",t.textContent=`
    .confetti-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 100;
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #f00;
      pointer-events: none;
      z-index: 100;
      animation: confettiAnimation 3s ease-in forwards;
      transform-origin: center;
      will-change: transform, opacity;
      top: 50%;
      left: 50%;
    }
    
    @keyframes confettiAnimation {
      0% {
        transform: translate(-50%, -50%) scale(0.1) rotate(0deg);
        opacity: 1;
      }
      25% {
        opacity: 1;
      }
      100% {
        transform: translate(calc(-50% + var(--tx) * 1px), calc(-50% + var(--ty) * 1px)) scale(1) rotate(var(--rot));
        opacity: 0;
      }
    }
    
    .confetti-circle {
      border-radius: 50%;
    }
    
    .confetti-rect {
      width: 12px;
      height: 6px;
    }
    
    .confetti-triangle {
      width: 0 !important;
      height: 0 !important;
      background-color: transparent !important;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 12px solid;
    }
  `,document.head.appendChild(t);const n=document.getElementById("confetti-container");n.innerHTML="",n.className="confetti-container";const s=n.getBoundingClientRect(),o=s.width,r=s.height,c=["#f72585","#4361ee","#4cc9f0","#4895ef","#3a0ca3","#ffbe0b","#fb5607"];for(let u=0;u<150;u++){const a=document.createElement("div"),l=["circle","rect","triangle"],b=l[Math.floor(Math.random()*l.length)];a.classList.add("confetti",`confetti-${b}`);const w=Math.random()*8+5;a.style.width=`${w}px`,a.style.height=`${w}px`;const I=c[Math.floor(Math.random()*c.length)];b==="triangle"?a.style.borderBottomColor=I:a.style.backgroundColor=I;const be=Math.min(o,r)*.45,j=Math.random()*Math.PI*2,W=Math.random()*be,we=Math.cos(j)*W,Le=Math.sin(j)*W,Se=Math.random()*720-360;a.style.setProperty("--tx",we),a.style.setProperty("--ty",Le),a.style.setProperty("--rot",`${Se}deg`);const J=Math.random()*2+2;a.style.animationDuration=`${J}s`,n.appendChild(a),setTimeout(()=>{n.contains(a)&&n.removeChild(a)},J*1e3+100)}}function st(){const e=()=>{i.backgroundMusic&&d.paused&&d.play().then(()=>{document.removeEventListener("click",e),document.removeEventListener("touchstart",e),document.removeEventListener("keydown",e),document.removeEventListener("mousemove",e),d.paused=!1}).catch(t=>{console.log("Still can't autoplay music:",t)})};document.addEventListener("click",e),document.addEventListener("touchstart",e),document.addEventListener("keydown",e),document.addEventListener("mousemove",e)}function f(e){if(i.soundEffects)try{e.currentTime=0;const t=e.play();t!==void 0&&t.catch(n=>{console.log("Audio playback failed, but will not use synthetic fallback: ",n)})}catch(t){console.error("Audio playback error:",t)}}const Ee=document.createElement("style");Ee.innerHTML=`
  @keyframes confetti-explosion {
    0% {
      transform: translate(-50%, -50%) scale(0.1) rotate(0deg);
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--x-end), var(--y-end)) scale(1) rotate(720deg);
      opacity: 0;
    }
  }
  
  .confetti {
    position: absolute;
    z-index: 100;
    transform: translate(-50%, -50%);
    animation-name: confetti-explosion;
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  .confetti.circle {
    border-radius: 50%;
  }
  
  .confetti.square {
    border-radius: 0;
  }
  
  .confetti.triangle {
    width: 0 !important;
    height: 0 !important;
    background-color: transparent !important;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 14px solid; /* Will inherit the backgroundColor as border color */
  }
  
  .confetti.rectangle {
    border-radius: 2px;
    transform-origin: center;
  }
`;document.head.appendChild(Ee);function ct(e){const t=e/100;i.musicVolume=parseInt(e),d.volume=t,localStorage.setItem("quizGameSettings",JSON.stringify(i))}function P(e){E.style.background=`linear-gradient(to right, var(--doom-red) 0%, var(--doom-red) ${e}%, #444 ${e}%, #444 100%)`;const t=document.getElementById("volume-value-display");t&&(t.textContent=`${e}%`)}Qe();
