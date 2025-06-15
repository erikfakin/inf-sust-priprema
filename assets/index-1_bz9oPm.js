(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function Ae(e){const t=[...e];for(let n=t.length-1;n>0;n--){const i=Math.floor(Math.random()*(n+1));[t[n],t[i]]=[t[i],t[n]]}return t}const ne={perfectScore:{id:"perfectScore",title:"RIP AND TEAR",description:"Slaughter all questions without mercy. Not a single survivor.",icon:"fas fa-skull",condition:e=>e.score===e.totalQuestions},speedDemon:{id:"speedDemon",title:"SPEED KILLS",description:"Finished with half the time remaining. Inf Sustavi demons couldn't even see you coming.",icon:"fas fa-bolt",condition:e=>e.timeUsedPercentage<50},consistentPerformer:{id:"consistentPerformer",title:"BRUTAL COMBO",description:"Annihilated 5 questions in a row. The info-demons cry in the corner.",icon:"fas fa-fire",condition:e=>e.maxStreak>=5},quickThinker:{id:"quickThinker",title:"ULTRA-VIOLENCE",description:"Executed a question in under 5 seconds. That was... messy.",icon:"fas fa-radiation",condition:e=>e.fastestAnswer<=5},comeback:{id:"comeback",title:"HELL WALKER",description:"Returned from the abyss after 2 wrong answers. Not even failure can stop you.",icon:"fas fa-skull-crossbones",condition:e=>e.hadComeback},halfwayHero:{id:"halfwayHero",title:"KNEE-DEEP IN THE DEAD",description:"Scored at least 50%. You've only just begun the carnage.",icon:"fas fa-bone",condition:e=>e.score>=e.totalQuestions/2},BFG:{id:"BFG",title:"BFG DIVISION",description:"Answered a difficult question correctly. Big. Freaking. Genius.",icon:"fas fa-meteor",condition:e=>$.some(t=>{const n=t.question.length>100,i=Array.isArray(t.correctAnswer)&&t.correctAnswer.length>1;return t.isCorrect&&(n||i)})},marathonComplete:{id:"marathonComplete",title:"ULTRA NIGHTMARE",description:"Completed the MARATHON MODE. You've proven you can survive the onslaught of information systems!",icon:"fas fa-fire",condition:e=>e.marathonMode&&e.score>e.totalQuestions*.6}};let g=[],M={},ae=[],h=0,y=0,E=1200,H=1200,$=[],D=0,P=0,R=0,J=!1,le=0,V=1/0,o={questionCount:15,timerSetting:1200,soundEffects:!0,backgroundMusic:!0,musicVolume:20,marathonMode:!1},de,b=[];const Y=document.getElementById("welcome-screen"),Te=document.getElementById("start-btn"),L=document.getElementById("question-count"),w=document.getElementById("timer-setting"),A=document.getElementById("sound-toggle"),X=document.getElementById("marathon-mode"),Be=document.getElementById("view-high-scores"),ue=document.getElementById("quiz-container"),Ne=document.getElementById("question"),Q=document.getElementById("answer-buttons"),T=document.getElementById("next-btn"),G=document.getElementById("time-display"),C=document.getElementById("timer-bar"),me=document.getElementById("score"),qe=document.getElementById("progress-bar"),fe=document.getElementById("current-question"),F=document.getElementById("total-questions"),He=document.getElementById("question-number"),Oe=document.getElementById("category-badge"),N=document.getElementById("feedback-container"),$e=document.getElementById("feedback-text"),oe=document.getElementById("correct-answer"),z=document.getElementById("results-screen"),se=document.getElementById("final-score"),De=document.getElementById("time-taken"),Re=document.getElementById("accuracy"),B=document.getElementById("achievements-list"),Ge=document.getElementById("view-answers-btn"),Pe=document.getElementById("save-score-btn"),Ve=document.getElementById("restart-button"),he=document.getElementById("review-screen"),ie=document.getElementById("summary"),ze=document.getElementById("back-to-results"),ge=document.getElementById("high-scores-screen"),U=document.getElementById("high-scores-list"),Qe=document.getElementById("back-btn"),Ue=document.getElementById("clear-scores-btn"),K=document.getElementById("correct-sound"),j=document.getElementById("wrong-sound"),m=document.getElementById("click-sound"),W=document.getElementById("complete-sound"),u=document.getElementById("background-music"),v=document.getElementById("sound-toggle-btn"),p=document.getElementById("music-volume-slider");function Ye(){Fe(),ct(),fetch("questions.json").then(e=>e.json()).then(e=>{ae=e,Ke(e),je(),Je()}).catch(e=>console.error("Error loading questions:",e))}function Fe(){K.volume=.6,j.volume=.6,m.volume=.5,W.volume=.7;const e=o.musicVolume/100;u.volume=e,p&&(p.value=o.musicVolume,O(o.musicVolume)),o.backgroundMusic=!0,pe();const t=[K,j,m,W,u];t.forEach(n=>{n.preload="auto",n.load(),n.addEventListener("canplaythrough",()=>{console.log(`${n.id} loaded successfully`)}),n.addEventListener("error",i=>{console.warn(`Error loading audio ${n.id}, but will continue:`,i)})}),document.addEventListener("click",()=>{if(o.soundEffects){const n=()=>{t.forEach(i=>{i.play().then(()=>{i.pause(),i.currentTime=0}).catch(s=>{console.log(`Audio unlock attempted for ${i.id}:`,s)})}),document.removeEventListener("click",n)};n()}},{once:!0})}function pe(){if(o.backgroundMusic)try{u.currentTime=0,u.loop=!0,u.volume=o.musicVolume/100;const e=u.play();e!==void 0&&e.then(()=>{console.log("Background music started successfully")}).catch(t=>{console.log("Background music autoplay prevented:",t)})}catch(e){console.error("Error playing background music:",e)}}function Ke(e){M={"General Knowledge":[],"Computer Science":[],Business:[],Other:[]},e.forEach(t=>{const n=t.text.toLowerCase();n.includes("computer")||n.includes("software")||n.includes("hardware")||n.includes("sistem")?M["Computer Science"].push(t):n.includes("business")||n.includes("organization")||n.includes("management")||n.includes("poduzeće")||n.includes("sustav")?M.Business.push(t):n.includes("knowledge")||n.includes("information")||n.includes("informacij")?M["General Knowledge"].push(t):M.Other.push(t)})}function je(){Te.addEventListener("click",()=>{f(m),We(),o.backgroundMusic=!0,u.currentTime=0,u.loop=!0,u.volume=o.musicVolume/100;const e=()=>{u.play().then(()=>{console.log("Background music started successfully on button click")}).catch(t=>{console.log("Retrying music playback after error:",t),setTimeout(e,100)})};e(),k(ue),Xe()}),Be.addEventListener("click",()=>{f(m),_()}),T.addEventListener("click",()=>{f(m),Ee()}),Ge.addEventListener("click",()=>{f(m),k(he),tt()}),Pe.addEventListener("click",()=>{f(m),ot()}),Ve.addEventListener("click",()=>{f(m),st(),k(Y)}),ze.addEventListener("click",()=>{f(m),k(z)}),Qe.addEventListener("click",()=>{f(m),k(Y)}),Ue.addEventListener("click",()=>{f(m),nt()}),A.addEventListener("change",()=>{o.soundEffects=A.checked,localStorage.setItem("quizGameSettings",JSON.stringify(o)),q()}),v.addEventListener("click",()=>{o.soundEffects=!o.soundEffects,A.checked=o.soundEffects,localStorage.setItem("quizGameSettings",JSON.stringify(o)),q(),o.soundEffects&&f(m)}),p.addEventListener("input",()=>{const e=p.value;re(e),O(e),u.paused&&o.backgroundMusic&&u.play().catch(t=>{console.log("Tried to play music when slider moved:",t)}),o.soundEffects&&f(m)}),X.addEventListener("change",function(){if(this.checked){L.disabled=!0,L.classList.add("disabled"),w.disabled=!0,w.classList.add("disabled");const e=document.querySelector('label[for="timer-setting"]');e&&(e.innerHTML='Time limit: <span class="unlimited-label">UNLIMITED</span>'),o.marathonMode=!0,localStorage.setItem("quizGameSettings",JSON.stringify(o)),o.soundEffects&&f(m)}else{L.disabled=!1,L.classList.remove("disabled"),w.disabled=!1,w.classList.remove("disabled");const e=document.querySelector('label[for="timer-setting"]');e&&(e.textContent="Time limit:"),o.marathonMode=!1,localStorage.setItem("quizGameSettings",JSON.stringify(o)),o.soundEffects&&f(m)}}),v.addEventListener("click",()=>{o.soundEffects=!o.soundEffects,A.checked=o.soundEffects,localStorage.setItem("quizGameSettings",JSON.stringify(o)),q(),o.soundEffects&&f(m)}),p.addEventListener("input",()=>{const e=p.value;re(e),O(e),u.paused&&o.backgroundMusic&&u.play().catch(t=>{console.log("Tried to play music when slider moved:",t)}),o.soundEffects&&f(m)})}function We(){o.questionCount=parseInt(L.value),o.timerSetting=parseInt(w.value),o.soundEffects=A.checked,o.backgroundMusic=!0,o.marathonMode=X.checked,localStorage.setItem("quizGameSettings",JSON.stringify(o))}function Je(){const e=localStorage.getItem("quizGameSettings");if(e){if(o=JSON.parse(e),o.musicVolume===void 0&&(o.musicVolume=20),o.marathonMode===void 0&&(o.marathonMode=!1),o.backgroundMusic=!0,L.value=o.questionCount,w.value=o.timerSetting,X.checked=o.marathonMode,A.checked=o.soundEffects,o.marathonMode){L.disabled=!0,L.classList.add("disabled"),w.disabled=!0,w.classList.add("disabled");const t=document.querySelector('label[for="timer-setting"]');t&&(t.innerHTML='Time limit: <span class="unlimited-label">UNLIMITED</span>')}p.value=o.musicVolume,O(o.musicVolume),q()}else q(),O(o.musicVolume)}function q(){o.soundEffects?(v.classList.add("active"),v.classList.remove("muted"),v.innerHTML='<i class="fas fa-volume-up"></i>'):(v.classList.remove("active"),v.classList.add("muted"),v.innerHTML='<i class="fas fa-volume-mute"></i>'),o.backgroundMusic=!0,p.value=o.musicVolume,document.getElementById("volume-value-display")&&(document.getElementById("volume-value-display").textContent=`${o.musicVolume}%`),p.style.background=`linear-gradient(to right, var(--doom-red) 0%, var(--doom-red) ${o.musicVolume}%, #444 ${o.musicVolume}%, #444 100%)`}function k(e){Y.classList.remove("active"),ue.classList.remove("active"),z.classList.remove("active"),he.classList.remove("active"),ge.classList.remove("active"),e.classList.add("active"),e===z&&o.soundEffects&&W.play()}function Xe(){h=0,y=0,$=[],D=0,P=0,R=0,J=!1,V=1/0,o.backgroundMusic&&pe(),E=o.timerSetting,H=E,me.textContent="0",_e(),fe.textContent="1",o.marathonMode?(G.innerHTML='<span class="infinity-symbol">∞</span> UNLIMITED',G.classList.add("unlimited-time"),F.textContent=g.length):(be(),F.textContent=o.questionCount,G.classList.remove("unlimited-time")),ve(),o.marathonMode||Ze(),ye()}function _e(){g=[];const e=[...ae].sort(()=>Math.random()-.5);o.marathonMode?(g=e,F.textContent=g.length):g=e.slice(0,o.questionCount)}function ye(){clearTimeout(de);const e=g[h];Ne.textContent=e.text,He.textContent=`Question ${h+1}`;let t="General Knowledge";for(const[n,i]of Object.entries(M))if(i.some(s=>s.text===e.text)){t=n;break}if(Oe.textContent=t,Q.innerHTML="",N.style.display="none",document.getElementById("explanation-text").style.display="none",le=Date.now(),e.type==="fill-in-the-blank"){const n=document.createElement("div");n.className="doom-input-container fill-blank-container";const i=document.createElement("i");i.className="fas fa-pen-nib input-icon",n.appendChild(i);const s=document.createElement("input");s.type="text",s.id="user-answer",s.placeholder="TYPE YOUR ANSWER HERE, SLAYER...",s.setAttribute("autocomplete","off"),s.setAttribute("autocorrect","off"),s.setAttribute("autocapitalize","off"),s.setAttribute("spellcheck","false"),n.appendChild(s),Q.appendChild(n),s.focus(),s.addEventListener("keypress",function(r){r.key==="Enter"&&!T.disabled&&Ee()})}else{const n=e.answers.filter(c=>c.correct).length>1,i=e.answers.map((c,l)=>({...c,originalIndex:l})),s=e.answers.length===2&&(e.answers.some(c=>c.text==="Točno")&&e.answers.some(c=>c.text==="Netočno")||e.answers.some(c=>c.text==="True")&&e.answers.some(c=>c.text==="False"));let r;s?r=i:r=Ae(i),r.forEach((c,l)=>{const a=document.createElement("div");a.className="answer-option",a.dataset.index=c.originalIndex;const d=document.createElement("input");d.type=n?"checkbox":"radio",d.name="answer",d.id=`answer-${l}`,d.value=c.text;const S=document.createElement("label");S.htmlFor=`answer-${l}`,S.textContent=c.text,a.appendChild(d),a.appendChild(S),a.addEventListener("click",function(I){I.target!==d&&(d.type==="radio"?(document.querySelectorAll("#answer-buttons .answer-option").forEach(x=>{x.classList.remove("selected")}),a.classList.add("selected"),d.checked=!0):(d.checked=!d.checked,a.classList.toggle("selected",d.checked)))}),S.addEventListener("click",function(I){I.preventDefault(),I.stopPropagation(),d.type==="radio"?(document.querySelectorAll("#answer-buttons .answer-option").forEach(x=>{x.classList.remove("selected")}),a.classList.add("selected"),d.checked=!0):(d.checked=!d.checked,a.classList.toggle("selected",d.checked))}),Q.appendChild(a)})}T.disabled=!1,T.textContent="Attack!",T.innerHTML='Attack! <i class="fas fa-khanda"></i>'}function Ee(){const e=g[h];if(N.style.display==="none"){let t,n=!1;if(e.type==="fill-in-the-blank")t=document.getElementById("user-answer").value.trim(),Array.isArray(e.correctAnswer)?n=e.correctAnswer.map(r=>r.toLowerCase()).includes(t.toLowerCase()):n=t.toLowerCase()===e.correctAnswer.toLowerCase();else{const r=document.querySelectorAll("#answer-buttons .answer-option.selected");t=Array.from(r).map(l=>{const a=parseInt(l.dataset.index);return e.answers[a].text}),console.log("Selected answers:",t);const c=e.answers.filter(l=>l.correct).map(l=>l.text);console.log("Correct answers:",c),n=t.length===c.length&&t.every(l=>c.includes(l))&&c.every(l=>t.includes(l))}const i=(Date.now()-le)/1e3;V=Math.min(V,i),$.push({question:e.text,userAnswer:t,correctAnswer:e.type==="fill-in-the-blank"?e.correctAnswer:e.answers.filter(r=>r.correct).map(r=>r.text),isCorrect:n,timeTaken:i}),n?(D++,P=Math.max(P,D),R>=2&&(J=!0),R=0,f(K),y++,me.textContent=y,ce(!0)):(D=0,R++,f(j),ce(!1));const s=o.marathonMode?h>=g.length-1:h>=Math.min(g.length-1,o.questionCount-1);T.innerHTML=s?'Complete Quest <i class="fas fa-flag-checkered"></i>':'Next Challenge <i class="fas fa-arrow-right"></i>';return}h++,o.marathonMode&&h<g.length||!o.marathonMode&&h<g.length&&h<o.questionCount?(ve(),fe.textContent=h+1,ye()):Le()}function ce(e){const t=g[h];N.style.display="block",N.className=e?"correct":"incorrect",$e.textContent=e?"DEMON SLAYED!":"TARGET SURVIVED!";const n=document.querySelectorAll("#answer-buttons .answer-option.selected");if(Array.from(n).map(i=>{const s=parseInt(i.dataset.index);return t.answers[s].text}),e)oe.textContent="",document.getElementById("explanation-text").style.display="none",t.type!=="fill-in-the-blank"&&document.querySelectorAll("#answer-buttons .answer-option").forEach(i=>{const s=parseInt(i.dataset.index);t.answers[s].correct,i.classList.contains("selected")&&(i.classList.add("correct"),i.offsetHeight)});else{const i=t.type==="fill-in-the-blank"?t.correctAnswer:t.answers.filter(c=>c.correct).map(c=>c.text),s=Array.isArray(i)?i.join(", "):i;oe.textContent=`PROPER WEAPON: ${s}`;const r=document.getElementById("explanation-text");t.explanation?(r.textContent=t.explanation,r.style.display="block"):r.style.display="none",t.type!=="fill-in-the-blank"&&document.querySelectorAll("#answer-buttons .answer-option").forEach(c=>{const l=parseInt(c.dataset.index),a=t.answers[l].correct,d=c.classList.contains("selected");a&&(c.classList.add("correct"),c.offsetHeight),d&&!a&&(c.classList.add("incorrect"),c.offsetHeight)})}N.classList.add(e?"correct-animation":"incorrect-animation")}function ve(){const e=o.marathonMode?g.length:o.questionCount,t=h/e*100;qe.style.width=`${t}%`}function Ze(){if(b.forEach(clearInterval),b=[],!o.marathonMode){const n=setInterval(()=>{E>0?(E--,be()):(clearInterval(n),Le())},1e3);b.push(n)}C.style.transition="width 1s linear",C.style.width="100%";function e(){const n=E/H*100;C.style.width=`${n}%`,n>50?C.style.backgroundColor="var(--primary-color)":n>25?C.style.backgroundColor="var(--warning-color)":C.style.backgroundColor="var(--error-color)"}const t=setInterval(e,1e3);b.push(t)}function be(){const e=Math.floor(E/60),t=E%60;G.textContent=`${e}:${t<10?"0":""}${t}`}function Le(){b.forEach(clearInterval),b=[];const e=o.marathonMode?g.length:o.questionCount,t=y/e*100;let n=0,i=0,s="";if(o.marathonMode)s="UNLIMITED";else{n=H-E,i=n/H*100;const l=Math.floor(n/60),a=n%60;s=`${l}:${a<10?"0":""}${a}`}se.textContent=`${y}/${e}`,De.textContent=s,Re.textContent=`${Math.round(t)}%`,o.marathonMode&&(se.innerHTML+=' <span class="marathon-badge"><i class="fas fa-fire"></i> MARATHON</span>');const r={score:y,totalQuestions:e,accuracy:t,timeUsed:n,timeUsedPercentage:i,maxStreak:P,marathonMode:o.marathonMode,fastestAnswer:V,hadComeback:J};et(r),t>=70&&setTimeout(()=>{it()},300);const c=`Player_${new Date().toLocaleDateString().replace(/\//g,"-")}_${new Date().toLocaleTimeString().replace(/:/g,"-")}`;Se(c),k(z)}function et(e){B.innerHTML="";const t=document.createElement("div");t.className="achievement-header",t.innerHTML="DEMONIC ACHIEVEMENTS UNLOCKED",B.appendChild(t);let n=!1,i=0;const s=[];for(const r of Object.values(ne))r.condition(e)&&(s.push(r),n=!0,i++);if(n){const r=document.createElement("div");if(r.className="achievement-counter",r.innerHTML=`${i}/${Object.keys(ne).length} GLORY KILLS`,B.appendChild(r),o.soundEffects)try{const c=new Audio;c.volume=.7,c.src="/audio/correct.mp3",c.play()}catch(c){console.error("Failed to play achievement sound",c)}s.forEach((c,l)=>{const a=document.createElement("div");a.className="achievement doom-achievement",a.style.animationDelay=`${l*.2}s`,a.style.opacity="0",a.style.transform="translateX(-100px)",a.innerHTML=`
        <div class="achievement-icon"><i class="${c.icon}"></i></div>
        <div class="achievement-info">
          <div class="achievement-title">${c.title}</div>
          <div class="achievement-desc">${c.description}</div>
        </div>
      `,B.appendChild(a),a.offsetHeight})}else{const r=document.createElement("div");r.className="no-achievements doom-failure",r.innerHTML='MORTALLY CHALLENGED<br><span class="doom-subtitle">YOUR WEAKNESS IS SHOWING. RIP HARDER NEXT TIME.</span>',r.style.opacity="0",B.appendChild(r),r.offsetHeight,r.style.opacity="1"}}function tt(){ie.innerHTML="",$.forEach((e,t)=>{const n=document.createElement("div");n.className=e.isCorrect?"correct":"incorrect";const i=Array.isArray(e.userAnswer)?e.userAnswer.join(", "):e.userAnswer,s=Array.isArray(e.correctAnswer)?e.correctAnswer.join(", "):e.correctAnswer;n.innerHTML=`
      <p><strong>BATTLE ${t+1}:</strong> ${e.question}</p>
      <p><strong>YOUR ATTACK:</strong> <span class="${e.isCorrect?"correct":"incorrect"}">${i||"(No attack)"}</span></p>
      <p><strong>KILLING BLOW:</strong> <span class="correct">${s}</span></p>
      <p><strong>EXECUTION TIME:</strong> ${e.timeTaken.toFixed(1)} seconds</p>
    `,ie.appendChild(n)})}function _(){const e=we();if(U.innerHTML="",e.length===0){const t=document.createElement("div");t.className="no-scores-message",t.textContent="THE SLAYER'S HALL AWAITS ITS FIRST DOOM SLAYER. WILL YOU CLAIM BLOODY GLORY?",U.appendChild(t)}else e.sort((t,n)=>n.score!==t.score?n.score-t.score:t.time-n.time),e.slice(0,10).forEach((t,n)=>{const i=document.createElement("div");i.className="high-score-item",i.innerHTML=`
        <div class="high-score-rank">#${n+1}</div>
        <div class="high-score-info">
          <div class="high-score-name">${t.name}</div>
          <div class="high-score-date">${new Date(t.date).toLocaleDateString()}</div>
        </div>
        <div class="high-score-value">${t.score}/${t.totalQuestions}</div>
      `,U.appendChild(i)});k(ge)}function we(){const e=localStorage.getItem("quizHighScores");return e?JSON.parse(e):[]}function Se(e){let t=we();const n=H-E,i=Date.now(),s=t[t.length-1],r=s&&s.score===y&&s.totalQuestions===o.questionCount&&s.time===n&&i-s.date<3e5,c={name:e,score:y,totalQuestions:o.questionCount,time:n,date:i};r?t[t.length-1].name=e:t.push(c),localStorage.setItem("quizHighScores",JSON.stringify(t)),_()}function nt(){localStorage.removeItem("quizHighScores"),_()}function ot(){const e=document.createElement("div");e.id="save-score-modal",e.style.display="flex",e.innerHTML=`
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
  `,document.body.appendChild(e),document.getElementById("player-name").focus(),document.getElementById("confirm-save").addEventListener("click",()=>{const t=document.getElementById("player-name").value.trim();t&&Se(t),document.body.removeChild(e)}),document.getElementById("cancel-save").addEventListener("click",()=>{document.body.removeChild(e)}),e.addEventListener("click",t=>{t.target===e&&document.body.removeChild(e)})}function st(){h=0,y=0,$=[],clearTimeout(de),b.forEach(clearInterval),b=[]}function it(){console.log("Showing confetti");const e=document.getElementById("confetti-styles");e&&document.head.removeChild(e);const t=document.createElement("style");t.id="confetti-styles",t.textContent=`
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
  `,document.head.appendChild(t);const n=document.getElementById("confetti-container");n.innerHTML="",n.className="confetti-container";const i=n.getBoundingClientRect(),s=i.width,r=i.height,c=["#f72585","#4361ee","#4cc9f0","#4895ef","#3a0ca3","#ffbe0b","#fb5607"];for(let l=0;l<150;l++){const a=document.createElement("div"),d=["circle","rect","triangle"],S=d[Math.floor(Math.random()*d.length)];a.classList.add("confetti",`confetti-${S}`);const I=Math.random()*8+5;a.style.width=`${I}px`,a.style.height=`${I}px`;const x=c[Math.floor(Math.random()*c.length)];S==="triangle"?a.style.borderBottomColor=x:a.style.backgroundColor=x;const ke=Math.min(s,r)*.45,Z=Math.random()*Math.PI*2,ee=Math.random()*ke,xe=Math.cos(Z)*ee,Ce=Math.sin(Z)*ee,Me=Math.random()*720-360;a.style.setProperty("--tx",xe),a.style.setProperty("--ty",Ce),a.style.setProperty("--rot",`${Me}deg`);const te=Math.random()*2+2;a.style.animationDuration=`${te}s`,n.appendChild(a),setTimeout(()=>{n.contains(a)&&n.removeChild(a)},te*1e3+100)}}function ct(){const e=()=>{o.backgroundMusic&&u.paused&&u.play().then(()=>{document.removeEventListener("click",e),document.removeEventListener("touchstart",e),document.removeEventListener("keydown",e),document.removeEventListener("mousemove",e),u.paused=!1}).catch(t=>{console.log("Still can't autoplay music:",t)})};document.addEventListener("click",e),document.addEventListener("touchstart",e),document.addEventListener("keydown",e),document.addEventListener("mousemove",e)}function f(e){if(o.soundEffects)try{e.currentTime=0;const t=e.play();t!==void 0&&t.catch(n=>{console.log("Audio playback failed, but will not use synthetic fallback: ",n)})}catch(t){console.error("Audio playback error:",t)}}const Ie=document.createElement("style");Ie.innerHTML=`
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
`;document.head.appendChild(Ie);function re(e){const t=e/100;o.musicVolume=parseInt(e),u.volume=t,localStorage.setItem("quizGameSettings",JSON.stringify(o))}function O(e){p.style.background=`linear-gradient(to right, var(--doom-red) 0%, var(--doom-red) ${e}%, #444 ${e}%, #444 100%)`;const t=document.getElementById("volume-value-display");t&&(t.textContent=`${e}%`)}Ye();
