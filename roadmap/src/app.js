(function () {
  "use strict";

  const STAGES = window.ROADMAP;
  const GUIDE = window.ROADMAP_GUIDE || [];
  const SOURCES = window.ROADMAP_SOURCES || [];
  const TRACKS = {
    found: "Nền tảng", data: "Dữ liệu", ml: "Machine Learning", dl: "Deep Learning & GenAI", ops: "MLOps & Sản phẩm"
  };
  const LEVELS = { 1: "Cơ bản", 2: "Trung cấp", 3: "Nâng cao" };
  const IN_FRAME = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
  const STORE_KEY = "dsml-roadmap-done-v1";

  STAGES.forEach((s, i) => { s.no = i; s.modules.forEach(m => { m.stage = s; }); });
  const ALL_MODS = STAGES.flatMap(s => s.modules);
  const MOD_BY_ID = Object.fromEntries(ALL_MODS.map(m => [m.id, m]));
  const DIAGRAMS = window.ROADMAP_DIAGRAMS || {};
  ALL_MODS.forEach(m => { m.diagrams = DIAGRAMS[m.id] || []; });
  const OVERVIEW = window.ROADMAP_OVERVIEW;
  const GUIDE_TREE = window.ROADMAP_GUIDE_TREE;

  /* ---------- helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const totalHours = mods => mods.reduce((a, m) => a + (m.hours || 0), 0);

  /* ---------- sơ đồ Mermaid ---------- */
  const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js";
  const PDF_PALETTE = {
    dark: false, bg: "#FFFFFF", node: "#EDF0F4", ink: "#111821", muted: "#677383", line: "#9AA5B1",
    accent: "#1F5FD1", accentSoft: "#DCE7FB", note: "#FFF4DB", noteLine: "#C27400", font: "Arial, Helvetica, sans-serif"
  };
  function pagePalette() {
    const cs = getComputedStyle(document.documentElement);
    const v = n => cs.getPropertyValue(n).trim();
    const dark = isDark();
    return {
      dark, bg: v("--surface"), node: v("--surface-2"), ink: v("--ink"), muted: v("--muted"), line: v("--muted"),
      accent: v("--accent"), accentSoft: dark ? "#1D2F52" : "#DCE7FB", note: dark ? "#3A2E14" : "#FFF4DB",
      noteLine: v("--t-data"), font: '"Be Vietnam Pro", system-ui, sans-serif'
    };
  }
  function isDark() {
    const t = document.documentElement.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function mermaidConfig(p) {
    return {
      startOnLoad: false, securityLevel: "strict", theme: "base", htmlLabels: false,
      fontFamily: p.font,
      flowchart: { htmlLabels: false, curve: "basis", useMaxWidth: true, padding: 12, nodeSpacing: 36, rankSpacing: 42 },
      sequence: { mirrorActors: false, useMaxWidth: true, wrap: true, boxMargin: 8, messageMargin: 34 },
      themeVariables: {
        darkMode: p.dark, background: p.bg, fontFamily: p.font, fontSize: "14px",
        primaryColor: p.node, primaryTextColor: p.ink, primaryBorderColor: p.line, secondaryColor: p.node, tertiaryColor: p.bg,
        mainBkg: p.node, nodeBorder: p.line, lineColor: p.line, textColor: p.ink, edgeLabelBackground: p.bg, clusterBkg: p.bg,
        actorBkg: p.node, actorBorder: p.line, actorTextColor: p.ink, actorLineColor: p.line,
        signalColor: p.ink, signalTextColor: p.ink, labelBoxBkgColor: p.node, labelBoxBorderColor: p.line, labelTextColor: p.ink,
        loopTextColor: p.ink, noteBkgColor: p.note, noteBorderColor: p.noteLine, noteTextColor: p.ink,
        activationBkgColor: p.accentSoft, activationBorderColor: p.accent, sequenceNumberColor: p.bg
      }
    };
  }
  function prepareSrc(src, p) {
    return /^\s*flowchart/.test(src)
      ? src + `\n  classDef hl fill:${p.accentSoft},stroke:${p.accent},stroke-width:2px,color:${p.ink}`
      : src;
  }
  let mermaidReady = null;
  function loadMermaid() {
    if (window.mermaid) return Promise.resolve(window.mermaid);
    if (mermaidReady) return mermaidReady;
    mermaidReady = new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = MERMAID_URL;
      s.onload = () => res(window.mermaid);
      s.onerror = () => { mermaidReady = null; rej(new Error("Không tải được thư viện Mermaid")); };
      document.head.appendChild(s);
    });
    return mermaidReady;
  }
  // Mermaid chỉ nên vẽ tuần tự, nên mọi lần vẽ đi qua một hàng đợi
  let mermaidQueue = Promise.resolve(), mermaidSeq = 0;
  const svgCache = new Map();
  function renderMermaid(src, palette) {
    const key = (palette.dark ? "D" : "L") + (palette === PDF_PALETTE ? "P" : "") + src;
    if (svgCache.has(key)) return svgCache.get(key);
    const job = mermaidQueue.then(async () => {
      const m = await loadMermaid();
      m.initialize(mermaidConfig(palette));
      const { svg } = await m.render("mmd-" + (++mermaidSeq), prepareSrc(src, palette));
      return svg;
    });
    mermaidQueue = job.catch(() => {});
    svgCache.set(key, job);
    job.catch(() => svgCache.delete(key));
    return job;
  }
  function diagramSrc(key) {
    if (key === "overview") return OVERVIEW;
    if (key === "guide") return GUIDE_TREE;
    const [id, i] = key.split(":");
    return MOD_BY_ID[id] && MOD_BY_ID[id].diagrams[+i];
  }
  function figureHTML(key, d) {
    return `<figure class="dgm" data-dgm="${key}">
  <div class="dgm-canvas" role="img" aria-label="${esc(d.title)}"><span class="dgm-wait">Đang vẽ sơ đồ…</span></div>
  <figcaption>${esc(d.title)}</figcaption>
  <details class="dgm-src"><summary>Xem mã Mermaid</summary><pre>${esc(d.src)}</pre></details>
</figure>`;
  }
  async function renderFigures(root) {
    const figs = [...root.querySelectorAll("figure.dgm")].filter(f => f.dataset.done !== (isDark() ? "D" : "L"));
    for (const fig of figs) {
      const d = diagramSrc(fig.dataset.dgm);
      const box = fig.querySelector(".dgm-canvas");
      try {
        box.innerHTML = await renderMermaid(d.src, pagePalette());
        fig.dataset.done = isDark() ? "D" : "L";
      } catch (err) {
        box.innerHTML = `<p class="dgm-err">Không vẽ được sơ đồ (${esc(err.message || "lỗi")}). Mở "Xem mã Mermaid" để đọc nội dung.</p>`;
      }
    }
  }
  function rerenderOnThemeChange() {
    const redo = () => { svgCache.clear(); document.querySelectorAll("figure.dgm[data-done]").forEach(f => f.removeAttribute("data-done")); document.querySelectorAll(".panel, .mod.open").forEach(renderFigures); };
    try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redo); } catch (e) { /* trình duyệt cũ */ }
    new MutationObserver(redo).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  function loadDone() {
    try { return new Set(JSON.parse(localStorage.getItem(STORE_KEY) || "[]")); } catch (e) { return new Set(); }
  }
  function saveDone() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify([...done])); } catch (e) { /* bỏ qua */ }
  }
  const done = loadDone();

  function toast(msg, ms = 3200) {
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }

  /* Tô màu cú pháp đơn giản cho python / sql / bash / yaml / dockerfile */
  const KW = {
    python: "and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield",
    sql: "select from where group by order having join left right inner outer on as with and or not null is in case when then else end limit distinct count sum avg max min over partition filter current_date interval union all insert update delete create table config materialized ref",
    bash: "cd git pip python docker source export echo run build",
    yaml: "name on jobs runs-on steps uses run schedule cron",
    dockerfile: "FROM WORKDIR COPY RUN EXPOSE CMD ENV ARG"
  };
  function highlight(src, lang) {
    const kw = new Set((KW[lang] || "").split(" ").map(w => lang === "sql" ? w.toLowerCase() : w));
    const commentRe = lang === "sql" ? /--.*$/ : /#.*$/;
    const out = [];
    for (const line of src.split("\n")) {
      let html = "", i = 0;
      while (i < line.length) {
        const rest = line.slice(i);
        let m;
        if ((m = rest.match(commentRe)) && m.index === 0) { html += `<span class="tk-c">${esc(m[0])}</span>`; break; }
        if ((m = rest.match(/^(?:[rfbu]{0,2})("""|'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/i))) {
          html += `<span class="tk-s">${esc(m[0])}</span>`; i += m[0].length; continue;
        }
        if ((m = rest.match(/^\d[\d_.]*(e-?\d+)?/i))) { html += `<span class="tk-n">${esc(m[0])}</span>`; i += m[0].length; continue; }
        if ((m = rest.match(/^[A-Za-z_][\w-]*/))) {
          const w = m[0], key = lang === "sql" ? w.toLowerCase() : w;
          html += kw.has(key) ? `<span class="tk-k">${esc(w)}</span>` : esc(w); i += w.length; continue;
        }
        html += esc(rest[0]); i += 1;
      }
      out.push(html);
    }
    return out;
  }

  const ICON = {
    pdf: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M12 12v6"/><path d="m9 15 3 3 3-3"/></svg>',
    chev: '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>'
  };

  const lvlDots = n => `<span class="lvl"><i>${[1, 2, 3].map(k => `<b class="${k <= n ? "on" : ""}"></b>`).join("")}</i>${LEVELS[n]}</span>`;

  /* ---------- trang chính ---------- */
  function renderHero() {
    const tracksUsed = [...new Set(STAGES.map(s => s.track))];
    $("#stat-stages").textContent = STAGES.length;
    $("#stat-mods").textContent = ALL_MODS.length;
    $("#stat-hours").textContent = "~" + totalHours(ALL_MODS);
    $("#metro").innerHTML = "<ol>" + STAGES.map(s =>
      `<li data-track="${s.track}"><a href="#${s.id}" aria-label="Giai đoạn ${s.no}: ${esc(s.title)}"></a><small>GĐ ${s.no} · ${esc(s.weeks)}</small><span>${esc(s.title)}</span></li>`
    ).join("") + "</ol>";
    $("#legend").innerHTML = tracksUsed.map(t => `<span data-track="${t}"><i></i>${TRACKS[t]}</span>`).join("");
  }

  function modHTML(m) {
    const s = m.stage;
    const list = arr => arr && arr.length ? `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "<p>—</p>";
    const code = m.code ? (() => {
      const lines = highlight(m.code.src, m.code.lang);
      return `<h4>Code mẫu</h4><div class="code"><div class="code-bar"><span>${esc(m.code.lang)}</span><button class="btn ghost small" data-copy="${m.id}" type="button">${ICON.copy} Sao chép</button></div><pre><code>${lines.join("\n")}</code></pre></div>`;
    })() : "";
    return `
<article class="mod${done.has(m.id) ? " is-done" : ""}" id="m-${m.id}" data-track="${s.track}" data-level="${m.level}">
  <div class="mod-head">
    <button class="mod-toggle" type="button" aria-expanded="false" aria-controls="b-${m.id}">
      <span class="mod-title"><h3>${esc(m.title)}</h3></span>
      <div class="mod-sum">${esc(m.summary)}</div>
      <div class="meta-row">${lvlDots(m.level)}<span>~${m.hours} giờ</span>${m.example ? `<span>Case: ${esc(m.example.domain)}</span>` : ""}${m.diagrams.length ? `<span>${m.diagrams.length} sơ đồ</span>` : ""}</div>
    </button>
    <div class="mod-tools">
      <label class="done-toggle"><input type="checkbox" id="done-${m.id}" data-done="${m.id}" ${done.has(m.id) ? "checked" : ""}><span class="lbl">Đã học</span></label>
      <button class="icon-btn" type="button" data-pdf-mod="${m.id}" title="Xuất chủ đề này ra PDF" aria-label="Xuất PDF: ${esc(m.title)}">${ICON.pdf}</button>
      ${ICON.chev}
    </div>
  </div>
  <div class="mod-body" id="b-${m.id}" hidden>
    <h4>Khái niệm</h4><p>${esc(m.concept)}</p>
    ${m.diagrams.length ? `<h4>Sơ đồ</h4><div class="dgms">${m.diagrams.map((d, i) => figureHTML(m.id + ":" + i, d)).join("")}</div>` : ""}
    <h4>Khi nào dùng & vì sao</h4>
    <div class="cols">
      <div class="col why"><h4>Lý do sử dụng</h4>${list(m.why)}</div>
      <div class="col when"><h4>Khi nào dùng</h4>${list(m.when)}</div>
      <div class="col not"><h4>Khi nào không nên</h4>${list(m.whenNot)}</div>
    </div>
    ${m.example ? `<h4>Ví dụ ứng dụng thực tế</h4><div class="case"><span class="tag">${esc(m.example.domain)}</span><h5>${esc(m.example.title)}</h5><p>${esc(m.example.text)}</p></div>` : ""}
    ${code}
    ${m.pitfalls && m.pitfalls.length ? `<h4>Lỗi thường gặp</h4><ul class="list">${m.pitfalls.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    ${m.tools && m.tools.length ? `<h4>Công cụ</h4><div class="tools">${m.tools.map(t => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
    ${m.resources && m.resources.length ? `<h4>Tài liệu học</h4><ul class="res">${m.resources.map(([l, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)}</a></li>`).join("")}</ul>` : ""}
  </div>
</article>`;
  }

  function renderMain() {
    $("#stages").innerHTML = STAGES.map(s => `
<section class="stage" id="${s.id}" data-track="${s.track}">
  <div class="stage-head">
    <div class="stage-no">${s.no}</div>
    <h2>${esc(s.title)}</h2>
    <p class="stage-sub">${esc(s.subtitle)}</p>
    <div class="stage-meta"><span><b>${esc(s.weeks)}</b></span><span>${s.modules.length} chủ đề · ~${totalHours(s.modules)} giờ</span><span>${TRACKS[s.track]}</span><span class="stage-done" data-stage-done="${s.id}"></span>
      <span class="stage-actions"><button class="btn small" type="button" data-pdf-stage="${s.id}">${ICON.pdf} PDF giai đoạn</button></span></div>
    <p class="stage-goal">${esc(s.goal)}</p>
  </div>
  <div class="mods">${s.modules.map(modHTML).join("")}</div>
</section>`).join("");

    if (OVERVIEW) $("#overview-fig").innerHTML = figureHTML("overview", OVERVIEW);
    if (GUIDE_TREE) $("#guide-fig").innerHTML = figureHTML("guide", GUIDE_TREE);
    $("#guide-body").innerHTML = GUIDE.map(([need, algo, id]) =>
      `<tr><td>${esc(need)}</td><td>${MOD_BY_ID[id] ? `<a href="#m-${id}" data-open="${id}">${esc(algo)}</a>` : esc(algo)}</td><td>${MOD_BY_ID[id] ? esc(MOD_BY_ID[id].stage.title) : ""}</td></tr>`).join("");
    $("#sources").innerHTML = SOURCES.map(([l, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)}</a></li>`).join("");

    $("#sidenav-list").innerHTML = STAGES.map(s => `
<li class="st" data-track="${s.track}" data-nav-stage="${s.id}"><a href="#${s.id}">${s.no}. ${esc(s.title)}</a>
  <ol>${s.modules.map(m => `<li><a href="#m-${m.id}" data-open="${m.id}" data-nav-mod="${m.id}">${esc(m.title)}</a></li>`).join("")}</ol></li>`).join("");

    $("#mobile-toc").innerHTML = `<option value="">Đi đến giai đoạn…</option>` + STAGES.map(s => `<option value="${s.id}">${s.no}. ${esc(s.title)}</option>`).join("");
    refreshProgress();
  }

  function refreshProgress() {
    const n = ALL_MODS.filter(m => done.has(m.id)).length;
    $("#stat-done").textContent = `${n}/${ALL_MODS.length}`;
    $("#progress-bar").style.width = (100 * n / ALL_MODS.length) + "%";
    STAGES.forEach(s => {
      const k = s.modules.filter(m => done.has(m.id)).length;
      const el = document.querySelector(`[data-stage-done="${s.id}"]`);
      if (el) el.textContent = k ? `Đã học ${k}/${s.modules.length}` : "";
      const nav = document.querySelector(`[data-nav-stage="${s.id}"]`);
      if (nav) nav.classList.toggle("done", k === s.modules.length);
    });
    ALL_MODS.forEach(m => {
      const a = document.querySelector(`[data-nav-mod="${m.id}"]`);
      if (a) a.classList.toggle("is-done", done.has(m.id));
    });
  }

  function setOpen(card, open) {
    const btn = card.querySelector(".mod-toggle");
    const body = card.querySelector(".mod-body");
    body.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    card.classList.toggle("open", open);
    if (open) renderFigures(card);
  }

  let allOpen = false;
  function bindMain() {
    document.addEventListener("click", e => {
      const t = e.target;
      const tog = t.closest(".mod-toggle");
      if (tog) { const card = tog.closest(".mod"); setOpen(card, card.querySelector(".mod-body").hidden); return; }
      const chev = t.closest(".chev");
      if (chev) { const card = chev.closest(".mod"); setOpen(card, card.querySelector(".mod-body").hidden); return; }
      const opener = t.closest("[data-open]");
      if (opener) { const card = document.getElementById("m-" + opener.dataset.open); if (card) setOpen(card, true); return; }
      const cp = t.closest("[data-copy]");
      if (cp) {
        const src = MOD_BY_ID[cp.dataset.copy].code.src;
        const fallback = () => {
          const pre = cp.closest(".code").querySelector("pre");
          const r = document.createRange(); r.selectNodeContents(pre);
          const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
          toast("Đã chọn đoạn code, nhấn Ctrl+C để sao chép");
        };
        try { navigator.clipboard.writeText(src).then(() => toast("Đã sao chép code"), fallback); } catch (err) { fallback(); }
        return;
      }
      const pm = t.closest("[data-pdf-mod]");
      if (pm) { openExport({ scope: "mod", modId: pm.dataset.pdfMod }); return; }
      const ps = t.closest("[data-pdf-stage]");
      if (ps) { openExport({ scope: "pick", stages: [ps.dataset.pdfStage] }); return; }
    });
    document.addEventListener("change", e => {
      const cb = e.target.closest("[data-done]");
      if (!cb) return;
      const id = cb.dataset.done;
      cb.checked ? done.add(id) : done.delete(id);
      document.getElementById("m-" + id).classList.toggle("is-done", cb.checked);
      saveDone(); refreshProgress();
    });
    $("#toggle-all").addEventListener("click", () => {
      allOpen = !allOpen;
      document.querySelectorAll(".mod").forEach(c => { if (!c.hidden) setOpen(c, allOpen); });
      $("#toggle-all").textContent = allOpen ? "Thu gọn tất cả" : "Mở rộng tất cả";
    });
    $("#mobile-toc").addEventListener("change", e => { if (e.target.value) location.hash = e.target.value; });

    // Bộ lọc
    let level = "all";
    const q = $("#q");
    document.querySelectorAll("[data-level-filter]").forEach(b => b.addEventListener("click", () => {
      level = b.dataset.levelFilter;
      document.querySelectorAll("[data-level-filter]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      applyFilter();
    }));
    q.addEventListener("input", applyFilter);
    function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d"); }
    const hay = Object.fromEntries(ALL_MODS.map(m => [m.id, norm([m.title, m.summary, m.concept, (m.tools || []).join(" "), m.example && m.example.domain, m.example && m.example.title].join(" "))]));
    function applyFilter() {
      const terms = norm(q.value.trim()).split(/\s+/).filter(Boolean);
      let shown = 0;
      STAGES.forEach(s => {
        let k = 0;
        s.modules.forEach(m => {
          const ok = (level === "all" || String(m.level) === level) && terms.every(t => hay[m.id].includes(t));
          document.getElementById("m-" + m.id).hidden = !ok;
          if (ok) k++;
        });
        document.getElementById(s.id).hidden = k === 0;
        shown += k;
      });
      $("#empty").hidden = shown > 0;
    }

    // Bản in từ trình duyệt: mở rộng mọi thẻ trước khi in, khôi phục sau đó
    let before = null;
    window.addEventListener("beforeprint", () => {
      before = [...document.querySelectorAll(".mod")].map(c => [c, !c.querySelector(".mod-body").hidden]);
      before.forEach(([c]) => setOpen(c, true));
    });
    window.addEventListener("afterprint", () => { if (before) before.forEach(([c, o]) => setOpen(c, o)); before = null; });

    if (location.hash.startsWith("#m-")) {
      const card = document.getElementById(location.hash.slice(1));
      if (card) { setOpen(card, true); card.scrollIntoView(); }
    }
  }

  /* =====================================================================
     XUẤT PDF
     Dựng nội dung trong một iframe riêng (chỉ chứa bản in), chụp từng khối
     bằng html2canvas, ghép vào jsPDF khổ A4. Trang chỉ được cắt tại ranh giới
     đoạn văn / dòng code nên không có dòng chữ nào bị chia đôi.
     ===================================================================== */
  const LIBS = [
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
  ];
  let libsReady = null;
  function loadLibs() {
    if (libsReady) return libsReady;
    libsReady = Promise.all(LIBS.map(src => new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = () => rej(new Error("Không tải được thư viện " + src.split("/").slice(-3, -1).join(" ")));
      document.head.appendChild(s);
    }))).catch(err => { libsReady = null; throw err; });
    return libsReady;
  }

  const PDF_CSS = `
*{box-sizing:border-box}
html,body{margin:0;background:#fff}
body{width:720px;font:13.5px/1.6 "Be Vietnam Pro",Arial,sans-serif;color:#1a212b;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,h5{font-family:"Bricolage Grotesque","Be Vietnam Pro",Arial,sans-serif;margin:0;letter-spacing:-.01em}
.unit{display:none;padding:2px 0 6px}
.unit.on{display:block}
[data-track=found]{--tc:#2B63D9}[data-track=data]{--tc:#C27400}[data-track=ml]{--tc:#12875B}[data-track=dl]{--tc:#B8327F}[data-track=ops]{--tc:#6B55C9}
.cover{height:1000px;display:flex;flex-direction:column;padding:40px 8px 0}
.cover .eb{font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:#667281;font-weight:600}
.cover h1{font-size:50px;line-height:1.04;font-weight:800;margin-top:14px;max-width:560px}
.cover .sub{font-size:17px;color:#3b4552;margin-top:18px;max-width:560px}
.cover .scope{margin-top:26px;font-size:13.5px;color:#3b4552;border-left:3px solid #1a212b;padding-left:12px}
.cover .lines{margin-top:auto;display:grid;gap:7px;padding-bottom:30px}
.cover .ln{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;font-size:13px}
.cover .ln b{height:6px;border-radius:3px;background:var(--tc)}
.cover .ln span{color:#1a212b}.cover .ln small{color:#667281}
.cover .meta{border-top:1px solid #d9dfe6;padding-top:12px;font-size:12px;color:#667281;display:flex;justify-content:space-between}
.sec-title{font-size:26px;font-weight:700;margin-bottom:4px}
.sec-sub{color:#556070;margin:0 0 14px}
.toc-row{display:flex;align-items:baseline;gap:8px;padding:3px 0;font-size:13px}
.toc-row .t{flex:none;max-width:600px}
.toc-row .dots{flex:1;border-bottom:1px dotted #aab3be;transform:translateY(-4px)}
.toc-row .p{flex:none;width:30px;text-align:right;font-variant-numeric:tabular-nums;color:#3b4552}
.toc-row.st{font-weight:700;font-size:14px;margin-top:10px;padding-left:0}
.toc-row.st .t::before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;border:3px solid var(--tc);margin-right:8px;vertical-align:-1px}
.toc-row.md{padding-left:26px;color:#3b4552}
table{border-collapse:collapse;width:100%;font-size:12.5px}
th,td{text-align:left;padding:7px 8px;border-bottom:1px solid #d9dfe6;vertical-align:top}
th{font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:#667281}
.stage-band{border-top:8px solid var(--tc);padding-top:18px;margin-bottom:6px}
.stage-band .no{font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:var(--tc);font-weight:700}
.stage-band h2{font-size:30px;font-weight:800;line-height:1.12;margin-top:6px}
.stage-band .sub{font-size:15px;color:#3b4552;margin:8px 0 0}
.stage-band .facts{display:flex;gap:22px;margin-top:12px;font-size:12.5px;color:#556070}
.stage-band .facts b{color:#1a212b}
.stage-band .goal{margin:12px 0 0;padding:10px 12px;background:#f3f5f7;border-radius:8px;font-size:13px}
.stage-band ol{margin:12px 0 0;padding-left:20px;font-size:13px;color:#3b4552}
.mod{padding-top:14px;border-top:1px solid #d9dfe6;margin-top:10px}
.mod .hd{display:flex;gap:10px;align-items:baseline}
.mod .hd i{flex:none;width:10px;height:10px;border-radius:50%;background:var(--tc);transform:translateY(-1px)}
.mod h3{font-size:19px;font-weight:700;line-height:1.25}
.mod .meta{font-size:11.5px;color:#667281;margin:4px 0 0 20px}
.mod .sum{margin:6px 0 0 20px;font-size:13.5px;color:#3b4552;font-style:italic}
.mod h4{font-family:"Be Vietnam Pro",Arial,sans-serif;font-size:10.5px;text-transform:uppercase;letter-spacing:.12em;color:#667281;font-weight:700;margin:14px 0 5px}
.mod p{margin:0}
.mod ul{margin:0;padding-left:18px}
.mod li{margin:2px 0}
.k-why h4{color:#1F5FD1}.k-when h4{color:#12875B}.k-not h4{color:#B45309}
.case{border:1px solid #d9dfe6;border-left:4px solid var(--tc);border-radius:6px;padding:10px 12px;margin-top:2px}
.case .dm{font-size:10.5px;text-transform:uppercase;letter-spacing:.1em;color:var(--tc);font-weight:700}
.case h5{font-size:14.5px;margin:3px 0 4px}
.case p{font-size:13px;color:#3b4552}
.code{background:#f6f8fa;border:1px solid #e1e6ec;border-radius:6px;padding:8px 10px;font:10.8px/1.55 "JetBrains Mono",Consolas,monospace;color:#1b2430}
.code .ln{white-space:pre-wrap;word-break:break-all;min-height:1.55em}
.tk-k{color:#8A2BB0}.tk-s{color:#0B7A43}.tk-c{color:#7A8593;font-style:italic}.tk-n{color:#B4480C}
.tools{font-size:12.5px;color:#3b4552}
.res a{color:#1F5FD1;text-decoration:none}
.res .u{color:#8894a2;font-size:11px;word-break:break-all}
.src li{margin:4px 0;font-size:12.5px}
.pdg{margin:4px 0 2px;padding:10px;border:1px solid #e1e6ec;border-radius:6px;text-align:center}
.pdg svg{max-width:100%;max-height:860px;height:auto}
.pdg-cap{font-size:11.5px;color:#667281;text-align:center;margin:4px 0 6px}
`;

  function pdfFigure(opt, key, d) {
    const svg = opt.svgs && opt.svgs[key];
    return svg ? `<h4 class="bk">Sơ đồ</h4><div class="pdg bk">${svg}</div><p class="pdg-cap bk">${esc(d.title)}</p>` : "";
  }
  function pdfModHTML(m, opt) {
    const list = (cls, title, arr) => arr && arr.length ? `<div class="${cls}"><h4 class="bk">${title}</h4><ul>${arr.map(x => `<li class="bk">${esc(x)}</li>`).join("")}</ul></div>` : "";
    let h = `<div class="mod" data-track="${m.stage.track}" data-anchor="${m.id}">
<div class="hd bk"><i></i><h3>${esc(m.title)}</h3></div>
<div class="meta bk">${LEVELS[m.level]} · khoảng ${m.hours} giờ · Giai đoạn ${m.stage.no}: ${esc(m.stage.title)}</div>
<p class="sum bk">${esc(m.summary)}</p>
<h4 class="bk">Khái niệm</h4><p class="bk">${esc(m.concept)}</p>
${opt.diagrams ? m.diagrams.map((d, i) => pdfFigure(opt, m.id + ":" + i, d)).join("") : ""}
${list("k-why", "Lý do sử dụng", m.why)}${list("k-when", "Khi nào dùng", m.when)}${list("k-not", "Khi nào không nên", m.whenNot)}`;
    if (m.example) h += `<h4 class="bk">Ví dụ ứng dụng thực tế</h4><div class="case bk"><div class="dm">${esc(m.example.domain)}</div><h5>${esc(m.example.title)}</h5><p>${esc(m.example.text)}</p></div>`;
    if (opt.code && m.code) {
      const lines = highlight(m.code.src, m.code.lang);
      h += `<h4 class="bk">Code mẫu (${esc(m.code.lang)})</h4><div class="code">${lines.map(l => `<div class="ln bk">${l || " "}</div>`).join("")}</div>`;
    }
    if (m.pitfalls && m.pitfalls.length) h += list("", "Lỗi thường gặp", m.pitfalls);
    if (m.tools && m.tools.length) h += `<h4 class="bk">Công cụ</h4><p class="tools bk">${m.tools.map(esc).join(" · ")}</p>`;
    if (opt.res && m.resources && m.resources.length)
      h += `<h4 class="bk">Tài liệu học</h4><ul class="res">${m.resources.map(([l, u]) => `<li class="bk"><a href="${esc(u)}">${esc(l)}</a><br><span class="u">${esc(u)}</span></li>`).join("")}</ul>`;
    return h + `</div>`;
  }

  /* Tạo danh sách "khối" (unit): mỗi khối được chụp thành một ảnh, có thể trải qua nhiều trang */
  function buildUnits(sel, opt) {
    const units = [];
    const today = new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
    const mods = sel.stages.flatMap(s => s.modules.filter(m => sel.mods.has(m.id)));
    const single = sel.scope === "mod";
    if (opt.cover) {
      units.push({ kind: "cover", newPage: true, html: `<div class="cover">
  <div class="eb">Full Stack Data Science &amp; Machine Learning BootCamp</div>
  <h1>${single ? esc(mods[0].title) : "Lộ trình Data Science &amp; Machine Learning"}</h1>
  <p class="sub">${single ? esc(mods[0].summary) : "Bộ kiến thức nền tảng: khái niệm, lý do sử dụng, khi nào áp dụng, ví dụ thực tế, code mẫu và tài liệu học cho từng chủ đề."}</p>
  <div class="scope">${esc(sel.label)} · ${mods.length} chủ đề · khoảng ${totalHours(mods)} giờ học</div>
  <div class="lines">${sel.stages.map(s => `<div class="ln" data-track="${s.track}"><b></b><span>${s.no}. ${esc(s.title)}</span><small>${esc(s.weeks)}</small></div>`).join("")}</div>
  <div class="meta"><span>Xuất ngày ${today}</span><span>${Object.values(TRACKS).join(" · ")}</span></div>
</div>` });
    }
    if (opt.toc && !single) units.push({ kind: "toc", newPage: true, html: null /* dựng sau khi có số trang */ });
    if (opt.guide && !single) {
      units.push({ kind: "guide", newPage: true, html: `<h2 class="sec-title bk">Chọn thuật toán nhanh</h2><p class="sec-sub bk">Bắt đầu từ nhu cầu, sau đó đọc chủ đề tương ứng.</p>
${opt.diagrams && OVERVIEW ? pdfFigure(opt, "overview", OVERVIEW) : ""}${opt.diagrams && GUIDE_TREE ? pdfFigure(opt, "guide", GUIDE_TREE) : ""}
<table><thead><tr class="bk"><th>Nhu cầu</th><th>Nên thử</th><th>Giai đoạn</th></tr></thead><tbody>${GUIDE.map(([a, b, id]) => `<tr class="bk"><td>${esc(a)}</td><td><b>${esc(b)}</b></td><td>${MOD_BY_ID[id] ? MOD_BY_ID[id].stage.no + ". " + esc(MOD_BY_ID[id].stage.title) : ""}</td></tr>`).join("")}</tbody></table>` });
    }
    sel.stages.forEach(s => {
      const ms = s.modules.filter(m => sel.mods.has(m.id));
      if (!ms.length) return;
      if (!single) units.push({ kind: "stage", stage: s, newPage: true, html: `<div class="stage-band bk" data-track="${s.track}" data-anchor="${s.id}">
  <div class="no">Giai đoạn ${s.no} · ${TRACKS[s.track]}</div><h2>${esc(s.title)}</h2><p class="sub">${esc(s.subtitle)}</p>
  <div class="facts"><span>Thời lượng: <b>${esc(s.weeks)}</b></span><span>Chủ đề: <b>${ms.length}</b></span><span>Ước tính: <b>~${totalHours(ms)} giờ</b></span></div>
  <p class="goal"><b>Mục tiêu:</b> ${esc(s.goal)}</p>
  <ol>${ms.map(m => `<li>${esc(m.title)}</li>`).join("")}</ol></div>` });
      ms.forEach(m => units.push({ kind: "mod", mod: m, newPage: single, html: pdfModHTML(m, opt) }));
    });
    if (opt.res && !single && SOURCES.length) {
      units.push({ kind: "src", newPage: true, html: `<h2 class="sec-title bk">Nguồn tham khảo tổng hợp</h2><p class="sec-sub bk">Các nguồn đã dùng để đối chiếu nội dung roadmap (tra cứu tháng 9/2026).</p><ol class="src">${SOURCES.map(([l, u]) => `<li class="bk"><a href="${esc(u)}">${esc(l)}</a><br><span style="color:#8894a2;font-size:11px">${esc(u)}</span></li>`).join("")}</ol>` });
    }
    return { units, mods };
  }

  function tocHTML(sel, mods, pages) {
    const pg = id => pages && pages[id] ? pages[id] : "000";
    return `<h2 class="sec-title bk">Mục lục</h2><p class="sec-sub bk">Nhấn vào một dòng để đến trang tương ứng.</p>` +
      sel.stages.map(s => {
        const ms = s.modules.filter(m => sel.mods.has(m.id));
        if (!ms.length) return "";
        return `<div class="toc-row st bk" data-track="${s.track}" data-goto="${s.id}"><span class="t">${s.no}. ${esc(s.title)}</span><span class="dots"></span><span class="p">${pg(s.id)}</span></div>` +
          ms.map(m => `<div class="toc-row md bk" data-goto="${m.id}"><span class="t">${esc(m.title)}</span><span class="dots"></span><span class="p">${pg(m.id)}</span></div>`).join("");
      }).join("");
  }

  async function makeFrame() {
    const f = document.createElement("iframe");
    f.setAttribute("aria-hidden", "true");
    f.tabIndex = -1;
    f.style.cssText = "position:fixed;left:-12000px;top:0;width:760px;height:1200px;border:0;opacity:1;pointer-events:none";
    document.body.appendChild(f);
    const d = f.contentDocument;
    d.open();
    d.write(`<!doctype html><html lang="vi"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=JetBrains+Mono:wght@400&display=swap&subset=vietnamese">
<style>${PDF_CSS}</style></head><body><div id="root"></div></body></html>`);
    d.close();
    await new Promise(r => { if (d.readyState === "complete") r(); else f.onload = r; setTimeout(r, 2500); });
    try {
      await Promise.race([
        Promise.all(["400 13px 'Be Vietnam Pro'", "italic 400 13px 'Be Vietnam Pro'", "700 13px 'Be Vietnam Pro'", "800 30px 'Bricolage Grotesque'", "400 11px 'JetBrains Mono'"]
          .map(s => d.fonts.load(s, "Tiếng Việt"))).then(() => d.fonts.ready),
        new Promise(r => setTimeout(r, 4000))
      ]);
    } catch (e) { /* dùng font dự phòng */ }
    return f;
  }

  async function generatePDF(sel, opt, onProgress, isCancelled) {
    await loadLibs();
    const { jsPDF } = window.jspdf;
    const frame = await makeFrame();
    const doc = frame.contentDocument;
    const root = doc.getElementById("root");
    try {
      if (opt.diagrams) {
        const keys = [];
        if (opt.guide && sel.scope !== "mod") { if (OVERVIEW) keys.push("overview"); if (GUIDE_TREE) keys.push("guide"); }
        ALL_MODS.filter(m => sel.mods.has(m.id)).forEach(m => m.diagrams.forEach((d, i) => keys.push(m.id + ":" + i)));
        opt.svgs = {};
        for (let i = 0; i < keys.length; i++) {
          if (isCancelled()) throw new Error("cancelled");
          onProgress(0, `vẽ sơ đồ ${i + 1}/${keys.length}`);
          try { opt.svgs[keys[i]] = await renderMermaid(diagramSrc(keys[i]).src, PDF_PALETTE); }
          catch (e) { /* bỏ qua sơ đồ lỗi, phần chữ vẫn xuất */ }
        }
      }
      const { units, mods } = buildUnits(sel, opt);
      const PAGE_W = 210, PAGE_H = 297, M_X = 12, M_TOP = 14, M_BOTTOM = 16;
      const CONTENT_W = PAGE_W - 2 * M_X, CONTENT_H = PAGE_H - M_TOP - M_BOTTOM;
      const pxPerMm = 720 / CONTENT_W;
      const scale = opt.quality === "high" ? 2.2 : 1.5;
      const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
      let page = 1, cursor = M_TOP, pageHasContent = false;
      const anchors = {};           // id -> số trang
      const links = [];             // liên kết trong PDF
      const tocSlots = [];          // các trang dành cho mục lục

      function newPage() { pdf.addPage(); page += 1; cursor = M_TOP; pageHasContent = false; }

      function mount(html) {
        root.innerHTML = `<div class="unit on">${html}</div>`;
        return root.firstElementChild;
      }
      function measure(el) {
        const top = el.getBoundingClientRect().top;
        const H = Math.ceil(el.getBoundingClientRect().height);
        const cands = [...el.querySelectorAll(".bk")].map(b => Math.round(b.getBoundingClientRect().bottom - top) + 2)
          .filter(y => y > 0 && y < H).sort((a, b) => a - b);
        cands.push(H);
        const anc = [...el.querySelectorAll("[data-anchor]")].map(a => ({ id: a.dataset.anchor, y: a.getBoundingClientRect().top - top }));
        const hrefs = [...el.querySelectorAll("a[href]")].map(a => { const r = a.getBoundingClientRect(); return { url: a.getAttribute("href"), x: r.left - el.getBoundingClientRect().left, y: r.top - top, w: r.width, h: r.height }; });
        const gotos = [...el.querySelectorAll("[data-goto]")].map(a => { const r = a.getBoundingClientRect(); return { id: a.dataset.goto, y: r.top - top, h: r.height }; });
        return { H, cands: [...new Set(cands)], anc, hrefs, gotos };
      }

      // Đặt một khối đã đo lên các trang. drawFn(slice) vẽ ảnh; trả về danh sách lát cắt.
      function layout(meas, newPageFirst, draw) {
        if (newPageFirst && pageHasContent) newPage();
        else if (pageHasContent) cursor += 4;
        const slices = [];
        let y0 = 0;
        const { H, cands } = meas;
        while (y0 < H) {
          const availPx = (M_TOP + CONTENT_H - cursor) * pxPerMm;
          let cut;
          if (H - y0 <= availPx) cut = H;
          else {
            const fits = cands.filter(c => c > y0 && c <= y0 + availPx);
            cut = fits.length ? fits[fits.length - 1] : null;
            // Tránh để lại tiêu đề mồ côi ở cuối trang
            if (cut !== null && y0 === 0 && cut < 90 && pageHasContent) cut = null;
            if (cut === null) {
              if (pageHasContent) { newPage(); continue; }
              cut = Math.floor(y0 + availPx);    // khối không có điểm ngắt: cắt cứng
            }
          }
          const hMm = (cut - y0) / pxPerMm;
          const sl = { page, y0, y1: cut, topMm: cursor };
          slices.push(sl);
          if (draw) draw(sl);
          cursor += hMm; pageHasContent = true;
          y0 = cut;
          if (y0 < H) newPage();
        }
        return slices;
      }

      function mapY(slices, y) {
        const s = slices.find(sl => y >= sl.y0 && y < sl.y1) || slices[0];
        return { page: s.page, mm: s.topMm + (y - s.y0) / pxPerMm };
      }

      async function capture(el) {
        return window.html2canvas(el, { scale, backgroundColor: "#ffffff", logging: false, useCORS: true, windowWidth: 760 });
      }

      function drawer(canvas) {
        return sl => {
          const sy = Math.round(sl.y0 * scale), sh = Math.max(1, Math.round((sl.y1 - sl.y0) * scale));
          const c = doc.createElement("canvas");
          c.width = canvas.width; c.height = sh;
          const ctx = c.getContext("2d");
          ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
          ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);
          pdf.setPage(sl.page);
          pdf.addImage(c.toDataURL("image/jpeg", opt.quality === "high" ? 0.92 : 0.86), "JPEG", M_X, sl.topMm, CONTENT_W, (sl.y1 - sl.y0) / pxPerMm, undefined, "FAST");
        };
      }

      function recordLinks(meas, slices) {
        meas.anc.forEach(a => { if (!(a.id in anchors)) anchors[a.id] = mapY(slices, Math.max(0, a.y)).page; });
        meas.hrefs.forEach(h => {
          if (!/^https?:/.test(h.url)) return;
          const p = mapY(slices, h.y);
          links.push({ page: p.page, x: M_X + h.x / pxPerMm, y: p.mm, w: h.w / pxPerMm, h: h.h / pxPerMm, url: h.url });
        });
      }

      const total = units.length;
      for (let i = 0; i < total; i++) {
        if (isCancelled()) throw new Error("cancelled");
        const u = units[i];
        onProgress(i / total, u.kind === "mod" ? u.mod.title : u.kind === "stage" ? u.stage.title : "Trang " + (u.kind === "cover" ? "bìa" : u.kind === "toc" ? "mục lục" : "tổng hợp"));
        if (u.kind === "toc") {
          // Giữ chỗ cho mục lục: đo với số trang giả, vẽ sau
          const el = mount(tocHTML(sel, mods, null));
          const meas = measure(el);
          const slices = layout(meas, true, null);
          tocSlots.push({ meas, slices });
          continue;
        }
        const el = mount(u.html);
        const meas = measure(el);
        const canvas = await capture(el);
        const slices = layout(meas, u.newPage, drawer(canvas));
        recordLinks(meas, slices);
        canvas.width = canvas.height = 0;          // giải phóng bộ nhớ
        await new Promise(r => setTimeout(r, 0));
      }

      // Vẽ mục lục với số trang thật và liên kết nội bộ
      for (const slot of tocSlots) {
        onProgress(0.98, "Mục lục");
        const el = mount(tocHTML(sel, mods, anchors));
        const meas = measure(el);
        const canvas = await capture(el);
        const draw = drawer(canvas);
        slot.slices.forEach(draw);
        meas.gotos.forEach(g => {
          const p = mapY(slot.slices, g.y);
          if (anchors[g.id]) links.push({ page: p.page, x: M_X, y: p.mm, w: CONTENT_W, h: g.h / pxPerMm, target: anchors[g.id] });
        });
      }

      // Liên kết + chân trang
      const n = pdf.getNumberOfPages();
      links.forEach(l => {
        pdf.setPage(l.page);
        if (l.url) pdf.link(l.x, l.y, l.w, l.h, { url: l.url });
        else pdf.link(l.x, l.y, l.w, l.h, { pageNumber: l.target });
      });
      for (let p = 1; p <= n; p++) {
        if (opt.cover && p === 1) continue;
        pdf.setPage(p);
        pdf.setDrawColor(217, 223, 230); pdf.setLineWidth(0.2);
        pdf.line(M_X, PAGE_H - 11, PAGE_W - M_X, PAGE_H - 11);
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor(120, 130, 142);
        pdf.text("Data Science & Machine Learning Roadmap", M_X, PAGE_H - 7);
        pdf.text(`${p} / ${n}`, PAGE_W - M_X, PAGE_H - 7, { align: "right" });
      }
      pdf.setProperties({ title: "Data Science & Machine Learning Roadmap", subject: sel.label, creator: "DS & ML Roadmap" });
      onProgress(1, "Hoàn tất");
      return { blob: pdf.output("blob"), pages: n, pdf };
    } finally {
      frame.remove();
    }
  }

  /* ---------- hộp thoại xuất PDF ---------- */
  let cancelFlag = false, busy = false;
  function openExport(preset = {}) {
    const back = $("#export");
    back.hidden = false;
    const scope = preset.scope || "all";
    document.querySelectorAll('input[name="scope"]').forEach(r => { r.checked = r.value === scope; });
    const picks = preset.stages ? new Set(preset.stages) : null;
    document.querySelectorAll("[data-pick]").forEach(cb => { cb.checked = picks ? picks.has(cb.dataset.pick) : true; });
    back.dataset.mod = preset.modId || "";
    const modOpt = $("#scope-mod-opt");
    modOpt.hidden = !preset.modId;
    if (preset.modId) $("#scope-mod-name").textContent = MOD_BY_ID[preset.modId].title;
    $("#exp-status").hidden = true; $("#exp-bar").hidden = true;
    syncScope();
    setTimeout(() => $("#exp-go").focus(), 30);
  }
  function closeExport() { if (busy) { cancelFlag = true; return; } $("#export").hidden = true; }
  function syncScope() {
    const v = document.querySelector('input[name="scope"]:checked').value;
    $("#stage-picks").hidden = v !== "pick";
    const sel = currentSelection();
    $("#exp-summary").textContent = sel.mods.size ? `${sel.mods.size} chủ đề, khoảng ${totalHours(ALL_MODS.filter(m => sel.mods.has(m.id)))} giờ học` : "Chưa chọn chủ đề nào";
    $("#exp-go").disabled = !sel.mods.size || busy;
  }
  function currentSelection() {
    const v = document.querySelector('input[name="scope"]:checked').value;
    if (v === "mod") {
      const m = MOD_BY_ID[$("#export").dataset.mod];
      return { scope: "mod", label: "Chủ đề: " + m.title, stages: [m.stage], mods: new Set([m.id]) };
    }
    if (v === "pick") {
      const ids = new Set([...document.querySelectorAll("[data-pick]:checked")].map(c => c.dataset.pick));
      const st = STAGES.filter(s => ids.has(s.id));
      return { scope: "pick", label: st.length === 1 ? `Giai đoạn ${st[0].no}: ${st[0].title}` : `${st.length} giai đoạn đã chọn`, stages: st, mods: new Set(st.flatMap(s => s.modules.map(m => m.id))) };
    }
    if (v === "todo") {
      const ms = ALL_MODS.filter(m => !done.has(m.id));
      return { scope: "todo", label: "Các chủ đề chưa học", stages: STAGES, mods: new Set(ms.map(m => m.id)) };
    }
    return { scope: "all", label: "Toàn bộ lộ trình", stages: STAGES, mods: new Set(ALL_MODS.map(m => m.id)) };
  }
  function fileName(sel) {
    const base = sel.scope === "mod" ? [...sel.mods][0] : sel.scope === "pick" && sel.stages.length === 1 ? "giai-doan-" + sel.stages[0].no : sel.scope === "todo" ? "chua-hoc" : "toan-bo";
    return `ds-ml-roadmap-${base}.pdf`;
  }

  async function runExport() {
    const sel = currentSelection();
    const opt = {
      cover: $("#o-cover").checked, toc: $("#o-toc").checked, guide: $("#o-guide").checked,
      code: $("#o-code").checked, res: $("#o-res").checked,
      quality: document.querySelector('input[name="quality"]:checked').value,
      diagrams: $("#o-dgm").checked
    };
    const status = $("#exp-status"), bar = $("#exp-bar"), go = $("#exp-go");
    busy = true; cancelFlag = false; go.disabled = true;
    $("#exp-cancel").textContent = "Huỷ";
    status.hidden = false; status.className = "status"; bar.hidden = false;
    status.textContent = "Đang tải thư viện tạo PDF…";
    try {
      const res = await generatePDF(sel, opt, (p, label) => {
        bar.firstElementChild.style.width = Math.round(p * 100) + "%";
        status.textContent = `Đang dựng trang: ${label} (${Math.round(p * 100)}%)`;
      }, () => cancelFlag);
      status.textContent = `Đã tạo ${res.pages} trang. Đang mở hộp thoại lưu file…`;
      const name = fileName(sel);
      let dl = null;
      try { dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null; } catch (e) { dl = null; }
      if (dl) {
        try {
          await dl.save({ filename: name, data: res.blob });
          status.className = "status ok"; status.textContent = `Đã lưu ${name} (${res.pages} trang).`;
        } catch (err) {
          status.className = "status err";
          status.textContent = err && err.code === "declined" ? "Bạn đã huỷ lưu file. Nhấn Tạo PDF để thử lại." :
            err && err.code === "rate_limited" ? "Đang có một hộp thoại lưu file khác. Đợi vài giây rồi thử lại." :
            "Không lưu được file trong chế độ xem này (" + (err && err.code || "lỗi") + ").";
        }
      } else if (!IN_FRAME) {
        res.pdf.save(name);
        status.className = "status ok"; status.textContent = `Đã tải xuống ${name} (${res.pages} trang).`;
      } else {
        // Khung nhúng không cho tải trực tiếp: thử mở PDF ở tab mới
        const url = URL.createObjectURL(res.blob);
        const w = window.open(url, "_blank");
        status.className = w ? "status ok" : "status err";
        status.textContent = w ? "Đã mở PDF ở tab mới, dùng nút Tải xuống của trình duyệt để lưu." :
          "Trình xem này chặn tải file. Hãy mở website ở trình duyệt (file roadmap/index.html trong repo) để xuất PDF.";
      }
    } catch (err) {
      status.className = "status err";
      status.textContent = err.message === "cancelled" ? "Đã huỷ tạo PDF." : "Không tạo được PDF: " + err.message + ". Kiểm tra kết nối mạng rồi thử lại.";
    } finally {
      busy = false; bar.hidden = true;
      $("#exp-cancel").textContent = "Đóng";
      syncScope();
    }
  }

  function renderExportDialog() {
    $("#stage-picks").innerHTML = STAGES.map(s => `<label data-track="${s.track}"><input type="checkbox" id="pick-${s.id}" data-pick="${s.id}" checked><i></i>${s.no}. ${esc(s.title)}</label>`).join("");
    if (IN_FRAME) $("#print-btn").hidden = true;
    $("#export").addEventListener("change", syncScope);
    $("#exp-go").addEventListener("click", runExport);
    $("#exp-cancel").addEventListener("click", closeExport);
    $("#exp-x").addEventListener("click", closeExport);
    $("#export").addEventListener("click", e => { if (e.target.id === "export") closeExport(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#export").hidden) closeExport(); });
    $("#print-btn").addEventListener("click", () => { $("#export").hidden = true; setTimeout(() => window.print(), 50); });
    document.querySelectorAll("[data-export]").forEach(b => b.addEventListener("click", () => openExport({ scope: b.dataset.export })));
  }

  renderHero();
  renderMain();
  document.querySelectorAll(".panel").forEach(renderFigures);
  rerenderOnThemeChange();
  bindMain();
  renderExportDialog();
})();
