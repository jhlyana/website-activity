(() => {
  'use strict';
  const {topics, lessons, quizzes} = window.BLOOM;
  const $ = selector => document.querySelector(selector);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state = {completed:[], scores:{}};
  let storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem('bloomscript-progress-v1') || 'null');
    if (saved && typeof saved === 'object') {
      state.completed = [...new Set((Array.isArray(saved.completed) ? saved.completed : []).filter(id => lessons.some(l => l.id === id)))];
      topics.forEach(t => { const n = saved.scores?.[t.id]; if (Number.isInteger(n) && n >= 0 && n <= quizzes[t.id].length) state.scores[t.id] = n; });
    }
  } catch { storageAvailable = false; }
  let activeFrame = null;
  let runTimer;
  let activeToken = '';
  let activeCode = '';
  let outputCount = 0;
  const announce = message => { $('#announcement').textContent = message; };
  function save() {
    try { localStorage.setItem('bloomscript-progress-v1', JSON.stringify(state)); }
    catch { storageAvailable = false; announce('Browser storage is unavailable. Progress is saved for this visit only.'); }
  }
  function closeMenu() { $('#sidebar').classList.remove('open'); $('#menu-toggle').setAttribute('aria-expanded','false'); }
  function progress() {
    $('#progress-label').textContent = `${state.completed.length} of ${lessons.length} lessons completed`;
    $('#overall-progress').value = state.completed.length;
    $('#overall-progress').setAttribute('aria-label', `${state.completed.length} of ${lessons.length} lessons completed`);
    $('#utility-progress').textContent = `${state.completed.length} / ${lessons.length}`;
    const homeProgress = $('#home-progress');
    if (homeProgress) homeProgress.innerHTML = `<div><span class="eyebrow">YOUR GROWTH, AT A GLANCE</span><h3>${state.completed.length} little steps forward</h3><p>${lessons.length - state.completed.length} lessons left to explore · ${Object.keys(state.scores).length} of 4 quizzes tried</p></div><div class="progress-visual"><strong>${Math.round(state.completed.length / lessons.length * 100)}%</strong><progress max="${lessons.length}" value="${state.completed.length}" aria-label="Lesson completion"></progress></div>`;
  }
  function nav(current) {
    $('#lesson-nav').innerHTML = topics.map(topic => {
      const chapter = lessons.filter(l => l.topic === topic.id);
      const count = chapter.filter(l => state.completed.includes(l.id)).length;
      return `<details ${!current || current.startsWith(topic.id) ? 'open' : ''}><summary><span>${topic.icon} ${topic.title}</span><span class="chapter-number" aria-label="${count} of ${chapter.length} completed">${count}/${chapter.length}</span></summary><div class="nav-links">${chapter.map(l => `<a href="#lesson/${l.id}" ${l.id === current ? 'aria-current="page"' : ''}><span>${escapeHTML(l.title)}</span><span class="lesson-check" aria-label="${state.completed.includes(l.id) ? 'Completed' : 'Not completed'}">${state.completed.includes(l.id) ? '✓' : '○'}</span></a>`).join('')}<a class="quiz-link" href="#quiz/${topic.id}" ${current === topic.id+'-quiz' ? 'aria-current="page"' : ''}>✧ Knowledge check</a></div></details>`;
    }).join('');
    progress();
  }
  function home() {
    $('#main').innerHTML = `<div class="dashboard-home">
      <div class="dashboard-intro"><span class="eyebrow">WELCOME TO YOUR LITTLE CORNER OF CURIOSITY</span><span class="weather-note">☀️ A lovely day to learn</span></div>
      <section class="hero"><div class="hero-copy"><span class="pill">🌿 A LITTLE LEARNING, EVERY DAY</span><h1>Learn JavaScript<br>in <em>full bloom.</em></h1><p>A gentle place to plant your first lines of code. Explore, experiment, and let your confidence grow — one little lesson at a time.</p><div class="button-row"><a class="button primary" href="#lesson/variables-intro">Start learning <span>↗</span></a><a class="button secondary" href="#journey">View my journey <span>→</span></a></div><div class="hero-note"><span class="tiny-flowers">✿ ❋ ✿</span> Made for beginners. Room to blossom.</div></div><figure class="garden-art"><img src="assets/painting.png" alt="Impressionist landscape painting of a sunlit meadow, tall green trees, and soft clouds in a blue sky" width="1920" height="1080"><figcaption>☁️ A quiet place for bright ideas.</figcaption><div class="art-stamp"><span>NOTE TO SELF</span><em>Small steps.<br>Beautiful growth.</em><span>🌸</span></div></figure></section>
      <section id="explore" class="section"><div class="section-heading"><div><span class="eyebrow">JAVASCRIPT BASICS · PPT 01</span><h2>Choose a topic to explore</h2><p>Four little chapters. A whole garden of possibilities.</p></div><a class="text-link" href="#explore">Explore lessons ↓</a></div><div class="topic-grid">${topics.map((t,i) => {
        const chapter = lessons.filter(l=>l.topic===t.id);
        const completed = chapter.filter(l=>state.completed.includes(l.id)).length;
        return `<a class="topic-card ${t.color}" href="#lesson/${t.id}-intro"><div class="card-top"><span class="topic-icon">${t.icon}</span><span class="eyebrow">CHAPTER 0${i+1}</span></div><h3>${t.title}</h3><p>${t.description}</p><div class="topic-completion"><span>${completed} of ${chapter.length} lessons</span><span>${Math.round(completed/chapter.length*100)}%</span></div><progress max="${chapter.length}" value="${completed}" aria-label="${t.title}: ${completed} of ${chapter.length} lessons completed"></progress><div class="card-bottom"><span>Let’s explore</span><span class="round-arrow">↗</span></div></a>`;
      }).join('')}</div></section>
      <section class="dashboard-extras" aria-label="A little inspiration"><div class="mini-playground"><div><span class="eyebrow">WHERE IDEAS TAKE ROOT</span><h2>A tiny coding playground 🍃</h2><p>A little space to try, tinker, and surprise yourself.</p><a class="text-link" href="#playground">Try a little code ↗</a></div><div class="code-postcard" aria-hidden="true"><span>// a small beginning</span><code>const you = "a little curious";<br>console.log("Keep growing 🌱");</code></div></div><blockquote class="quote-card"><span class="quote-flower" aria-hidden="true">✿</span><p>“A little curiosity today.<br>A little more confidence tomorrow.”</p><cite>A reminder from your learning garden</cite><span class="quote-note">You’re growing, even on the quiet days. 💙</span></blockquote></section>
      <section id="journey" class="journey-section"><div class="section-heading"><div><span class="eyebrow">AT YOUR OWN PACE</span><h2>Your journey, gently unfolding</h2></div><span class="season-note" aria-hidden="true">🍁 🍂 🍃</span></div><section id="home-progress" class="growth-card" aria-label="Your learning progress"></section><div class="journey-steps"><span><b>01</b> Read a little</span><span><b>02</b> Try it yourself</span><span><b>03</b> Watch yourself grow</span></div></section>
      <div class="course-strip"><span>🌸 A beginner-friendly JavaScript garden</span><span>17 lessons <i>·</i> 4 knowledge checks <i>·</i> Endless fresh starts</span></div>
    </div>`;
    progress();
  }
  function editor(code) {
    activeCode = code;
    return `<section class="playground" aria-label="Interactive JavaScript editor"><div class="editor-heading"><div><span class="eyebrow">A LITTLE SPACE TO EXPERIMENT</span><h3>Try it yourself <span>🍃</span></h3></div><span class="language-badge">JavaScript</span></div><label class="sr-only" for="code-editor">Editable JavaScript code</label><textarea id="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off">${escapeHTML(code)}</textarea><div class="editor-actions"><button id="run-code" class="button primary">▶ Run code</button><button id="reset-code" class="button secondary">Reset code</button><button id="stop-code" class="text-button" disabled>Remove runner</button></div><div class="output-heading"><span>CONSOLE OUTPUT</span><span id="run-status" role="status">Ready when you are</span></div><pre id="code-output" tabindex="0" aria-label="Code output">Your output will appear here.</pre><p class="sandbox-note">Code runs in an isolated, sandboxed iframe. Use console.log() to display results. Avoid infinite loops: this editor cannot guarantee stopping blocking code, and removing the runner may not recover a frozen tab. DOM output stays inside the hidden runner.</p><div id="runner-host" hidden></div></section>`;
  }
  function lesson(id) {
    const item = lessons.find(l => l.id === id);
    if (!item) return notFound();
    const i = lessons.indexOf(item), topic = topics.find(t => t.id === item.topic);
    $('#main').innerHTML = `<article class="lesson-page"><div class="breadcrumb"><a href="#home">The learning garden</a><span>/</span><span>${topic.title}</span></div><span class="eyebrow">${topic.icon} CHAPTER 0${topics.indexOf(topic)+1} · LESSON ${lessons.filter(l=>l.topic===item.topic).indexOf(item)+1}</span><h1>${item.title}</h1><p class="lesson-lead">${item.objective}</p><div class="objective"><strong>🌱 By the end of this lesson</strong><p>${item.objective} Read the example, run it, and change one value to check your understanding.</p></div><h2>Let’s get to know it</h2><p>${item.explanation}</p><div class="analogy"><span>🌿</span><div><h3>A little everyday connection</h3><p>${item.analogy}</p></div></div><h2>See it in JavaScript</h2><pre class="code-sample"><code>${escapeHTML(item.code)}</code></pre><h3>How it works</h3><p>${item.walkthrough}</p><div class="expected"><span class="eyebrow">EXPECTED OUTPUT</span><pre>${escapeHTML(item.output)}</pre></div><aside class="tip"><strong>☀️ A helpful little tip</strong><p>${item.tip}</p></aside>${editor(item.code)}<div class="lesson-complete"><div><h3>Another seed planted.</h3><p>Mark this lesson when you feel ready.</p></div><button id="complete-lesson" class="button primary" aria-pressed="${state.completed.includes(id)}">${state.completed.includes(id) ? '✓ Completed' : 'Mark as completed'}</button></div><div class="lesson-pagination">${i ? `<a class="button secondary" href="#lesson/${lessons[i-1].id}">← Previous lesson</a>` : '<a class="button secondary" href="#home">← Home</a>'}<a class="text-link" href="#quiz/${item.topic}">Take the ${topic.title.toLowerCase()} quiz ↗</a>${i < lessons.length-1 ? `<a class="button primary" href="#lesson/${lessons[i+1].id}">Next lesson →</a>` : '<a class="button primary" href="#quizzes">Explore quizzes →</a>'}</div></article>`;
    $('#complete-lesson').addEventListener('click', () => {
      if (!state.completed.includes(id)) state.completed.push(id);
      save(); nav(id);
      $('#complete-lesson').textContent = '✓ Completed';
      $('#complete-lesson').setAttribute('aria-pressed','true');
      announce('Lesson completed. Your learning progress has been updated.');
    });
    wireEditor();
  }
  function stopRunner() {
    clearTimeout(runTimer);
    if (activeFrame) activeFrame.remove();
    activeFrame = null; activeToken = '';
    if ($('#stop-code')) $('#stop-code').disabled = true;
  }
  function wireEditor() {
    $('#run-code').addEventListener('click', runCode);
    $('#reset-code').addEventListener('click', () => { stopRunner(); $('#code-editor').value = activeCode; $('#code-output').textContent = 'Example restored. Ready to run.'; $('#run-status').textContent = 'Reset'; });
    $('#stop-code').addEventListener('click', () => { stopRunner(); $('#run-status').textContent = 'Runner removed'; });
    $('#code-editor').addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runCode(); }
    });
  }
  function runCode() {
    stopRunner(); outputCount = 0;
    const code = $('#code-editor').value;
    $('#code-output').textContent = '';
    $('#code-output').classList.remove('has-error');
    $('#run-status').textContent = 'Running…';
    activeToken = `${Date.now()}-${Math.random()}`;
    const token = JSON.stringify(activeToken);
    // Only this isolated iframe executes learner code. No allow-same-origin permission.
    // Code is JSON-encoded and '<' is escaped to prevent closing the bootstrap script.
    const serialized = JSON.stringify(code).replace(/</g,'\\u003c');
    const bootstrap = `(() => {
      const token = ${token};
      const send = (kind, text) => parent.postMessage({bloomRunner:token, kind, text}, '*');
      let count = 0;
      function format(value) {
        if (typeof value === 'string') return value;
        if (typeof value === 'bigint') return value.toString() + 'n';
        if (value instanceof Error) return value.name + ': ' + value.message;
        if (typeof value === 'object' && value !== null) {
          const seen = new WeakSet();
          try { return JSON.stringify(value, (key, v) => {
            if (typeof v === 'bigint') return v.toString() + 'n';
            if (typeof v === 'object' && v !== null) { if (seen.has(v)) return '[Circular]'; seen.add(v); }
            return v;
          }, 2); } catch { return String(value); }
        }
        return String(value);
      }
      ['log','info','warn','error','debug'].forEach(kind => {
        console[kind] = (...args) => {
          if (++count > 200) { if (count === 201) send('warn', 'Output limited to 200 messages.'); return; }
          send(kind, args.map(format).join(' ').slice(0, 12000));
        };
      });
      addEventListener('error', event => send('error', event.message));
      addEventListener('unhandledrejection', event => send('error', format(event.reason)));
      try { new Function(${serialized})(); send('done', ''); }
      catch (error) { send('error', format(error)); send('done', ''); }
    })();`;
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox','allow-scripts');
    frame.title = 'Isolated JavaScript code runner';
    frame.srcdoc = '<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\' \'unsafe-eval\'; connect-src \'none\'; form-action \'none\'; base-uri \'none\'"></head><body><script>' + bootstrap + '</scr' + 'ipt></body></html>';
    activeFrame = frame;
    $('#runner-host').append(frame);
    $('#stop-code').disabled = false;
    runTimer = setTimeout(() => { if (activeFrame === frame) $('#run-status').textContent = 'Runner active · use Remove runner when finished'; }, 4000);
  }
  window.addEventListener('message', event => {
    if (!activeFrame || event.source !== activeFrame.contentWindow || !event.data || event.data.bloomRunner !== activeToken) return;
    const {kind, text} = event.data;
    if (kind === 'done') {
      clearTimeout(runTimer);
      $('#run-status').textContent = 'Finished synchronous code';
      if (!outputCount) $('#code-output').textContent = 'Code ran without console output. Try console.log().';
      return;
    }
    if (!['log','info','warn','error','debug'].includes(kind) || typeof text !== 'string' || outputCount >= 201) return;
    const output = $('#code-output');
    if (!outputCount) output.textContent = '';
    output.textContent += (outputCount ? '\n' : '') + (kind === 'error' ? 'Error: ' : kind === 'warn' ? 'Warning: ' : '') + text.slice(0,12000);
    outputCount++;
    if (kind === 'error') output.classList.add('has-error');
  });
  function playground() {
    $('#main').innerHTML = `<section class="lesson-page"><span class="eyebrow">☁️ ROOM FOR YOUR IDEAS</span><h1>The JavaScript playground</h1><p class="lesson-lead">Change a line. Run an experiment. See what grows.</p><label for="example-select">Choose a starting example</label><select id="example-select">${topics.map(t=>`<option value="${t.id}">${t.title}</option>`).join('')}</select><div id="editor-slot"></div><p class="tip">Keyboard shortcut: Ctrl + Enter (or Command + Enter) runs your code while the editor is focused. Tab moves to the next control.</p></section>`;
    function loadExample() { stopRunner(); const example = lessons.find(l=>l.id === $('#example-select').value+'-code'); $('#editor-slot').innerHTML = editor(example.code); wireEditor(); }
    $('#example-select').addEventListener('change', loadExample); loadExample();
  }
  function quizHub() {
    $('#main').innerHTML = `<section class="lesson-page"><span class="eyebrow">✧ CHECK IN WITH YOURSELF</span><h1>A moment to blossom</h1><p class="lesson-lead">Four friendly quizzes. Five questions each. As many fresh starts as you need.</p><div class="quiz-grid">${topics.map(t=>`<a class="topic-card ${t.color}" href="#quiz/${t.id}"><span class="topic-icon">${t.icon}</span><h2>${t.title}</h2><p>Review your understanding with five beginner-friendly questions.</p><strong>${state.scores[t.id] !== undefined ? `Best score: ${state.scores[t.id]} / 5` : 'Ready for your first try?'}</strong><span class="card-bottom">Start quiz <span>↗</span></span></a>`).join('')}</div></section>`;
  }
  function quiz(id) {
    const topic = topics.find(t=>t.id === id);
    if (!topic) return notFound();
    const questions = quizzes[id];
    $('#main').innerHTML = `<section class="lesson-page"><div class="breadcrumb"><a href="#quizzes">All quizzes</a><span>/</span><span>${topic.title}</span></div><span class="eyebrow">${topic.icon} A LITTLE KNOWLEDGE CHECK</span><h1>${topic.title} quiz</h1><p class="lesson-lead">Choose one answer for each question. Your best score is saved on this browser.</p><form id="quiz-form">${questions.map((q,i)=>`<fieldset class="question"><legend><span>0${i+1}</span> ${escapeHTML(q.question)}</legend>${q.choices.map((choice,j)=>`<label class="answer"><input type="radio" name="q${i}" value="${j}" required><span>${escapeHTML(choice)}</span></label>`).join('')}<div id="feedback-${i}" class="answer-feedback"></div></fieldset>`).join('')}<div class="button-row"><button type="submit" class="button primary">Check my answers ↗</button><button type="button" id="retry-quiz" class="button secondary">Start again</button></div></form><div id="quiz-result" tabindex="-1" aria-live="polite"></div></section>`;
    $('#quiz-form').addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      let score = 0;
      questions.forEach((q,i) => {
        const correct = Number(data.get('q'+i)) === q.answer;
        if (correct) score++;
        const feedback = $('#feedback-'+i);
        feedback.className = 'answer-feedback ' + (correct ? 'correct' : 'incorrect');
        feedback.textContent = `${correct ? '✓ Correct.' : '↳ Keep growing.'} Answer: ${q.choices[q.answer]} — ${q.explanation}`;
      });
      state.scores[id] = Math.max(state.scores[id] ?? 0, score); save(); progress();
      $('#quiz-result').innerHTML = `<div class="result-card"><span class="topic-icon">${score === 5 ? '🌸' : '🌱'}</span><h2>${score} / ${questions.length} — ${score === 5 ? 'In full bloom!' : 'Every try helps you grow.'}</h2><p>Best score: ${state.scores[id]} / ${questions.length}. Review the explanations above, then try again whenever you’re ready.</p><a href="#lesson/${id}-intro" class="text-link">Revisit these lessons →</a></div>`;
      $('#quiz-result').focus();
    });
    $('#retry-quiz').addEventListener('click', () => { quiz(id); $('#quiz-form input').focus(); });
  }
  function notFound() { $('#main').innerHTML = '<section class="lesson-page"><h1>This path hasn’t been planted.</h1><p>Choose a lesson from the garden to keep exploring.</p><a class="button primary" href="#home">Back to home</a></section>'; }
  function route() {
    stopRunner(); closeMenu();
    const hash = location.hash.slice(1) || 'home';
    const [page,id] = hash.split('/');
    if (page === 'lesson') { nav(id); lesson(id); }
    else if (page === 'quiz') { nav(id+'-quiz'); quiz(id); }
    else { nav(''); if (page === 'playground') playground(); else if (page === 'quizzes') quizHub(); else if (page === 'home' || page === 'explore' || page === 'journey') home(); else notFound(); }
    document.title = `${page === 'lesson' ? lessons.find(l=>l.id===id)?.title || 'Lesson' : page === 'quiz' ? 'Knowledge check' : 'Learn JavaScript in Full Bloom'} · BloomScript`;
    if (!storageAvailable) $('#main').insertAdjacentHTML('afterbegin','<p class="storage-notice" role="status">Browser storage is unavailable. Your progress will last for this visit only.</p>');
    $('#search').value = ''; $('#search-results').innerHTML = '';
    document.querySelectorAll('.header nav a').forEach(a=>{ if (a.hash === '#'+page || (page === 'lesson' && a.hash.startsWith('#lesson'))) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
    const atHome = ['home','explore','journey'].includes(page);
    if (atHome) $('.garden-home').setAttribute('aria-current','page'); else $('.garden-home').removeAttribute('aria-current');
    if (page === 'explore' || page === 'journey') requestAnimationFrame(()=>$('#'+page).scrollIntoView());
    else window.scrollTo({top:0, behavior:'instant'});
    $('#main').focus({preventScroll:true});
  }
  $('#search').addEventListener('input', e => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) { $('#search-results').innerHTML = ''; return; }
    const matches = lessons.filter(l=>`${l.title} ${l.topic} ${l.terms} ${l.explanation}`.toLowerCase().includes(query));
    $('#search-results').innerHTML = `<p class="small">${matches.length} matching lesson${matches.length===1?'':'s'}</p>${matches.map(l=>`<a href="#lesson/${l.id}">${escapeHTML(l.title)} <span>↗</span></a>`).join('') || '<p class="small">Try “const”, “method”, or “arrow”.</p>'}`;
  });
  $('#search-results').addEventListener('click', e => { const a = e.target.closest('a'); if (a && a.hash === location.hash) { closeMenu(); $('#main').focus(); } });
  $('#lesson-nav').addEventListener('click', e => { const a = e.target.closest('a'); if (a && a.hash === location.hash) { closeMenu(); $('#main').focus(); } });
  $('#menu-toggle').addEventListener('click', () => { const open = $('#sidebar').classList.toggle('open'); $('#menu-toggle').setAttribute('aria-expanded',String(open)); if (open) $('#menu-close').focus(); });
  $('#sidebar').addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  $('#menu-close').addEventListener('click', () => { closeMenu(); $('#menu-toggle').focus(); });
  document.addEventListener('keydown', e=>{ if (e.key === 'Escape') { closeMenu(); $('#menu-toggle').focus(); } });
  window.addEventListener('hashchange',route);
  route();
})();
