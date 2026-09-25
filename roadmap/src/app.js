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
  const APPS = window.ROADMAP_APPS || {};
  ALL_MODS.forEach(m => { m.apps = APPS[m.id] || []; });
  const ALL_APPS = ALL_MODS.flatMap(m => m.apps.map(a => Object.assign({ mod: m }, a)));
  const SECTORS = [
    ["Tài chính & thanh toán", ["Tài chính", "Ngân hàng", "Thanh toán", "Fintech", "Fintech Việt Nam", "Ngân hàng đầu tư", "Tín dụng"]],
    ["Thương mại, bán lẻ & marketing", ["Bán lẻ", "Thương mại điện tử", "Marketing", "Quảng cáo"]],
    ["Giao thông & giao nhận", ["Gọi xe", "Giao đồ ăn", "Logistics", "Siêu ứng dụng Đông Nam Á"]],
    ["Du lịch, hàng không & bất động sản", ["Du lịch", "Hàng không", "Bất động sản"]],
    ["Giải trí & mạng xã hội", ["Giải trí", "Âm nhạc", "Mạng xã hội", "Game"]],
    ["Y tế & khoa học", ["Y tế", "Khoa học", "Sinh học", "Hàng không vũ trụ", "Nghiên cứu"]],
    ["Sản xuất & năng lượng", ["Sản xuất ô tô", "Năng lượng"]],
    ["Công nghệ, tìm kiếm & AI", ["Công nghệ", "AI", "AI Việt Nam", "Tìm kiếm", "Phần mềm", "Email", "Văn bản", "Ngôn ngữ", "Thị giác máy"]],
    ["Giáo dục, nhân sự & khu vực công", ["Giáo dục", "Tuyển dụng", "Chính trị"]]
  ];
  const sectorOf = ind => (SECTORS.find(([, list]) => list.includes(ind)) || ["Khác"])[0];
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
    accent: "#1F5FD1", accentSoft: "#DCE7FB", note: "#FFF4DB", noteLine: "#C27400", font: "Arial, Helvetica, sans-serif",
    good: "#12875B", goodSoft: "#D6F2E4", warn: "#B45309", warnSoft: "#FCE9CF"
  };
  function pagePalette() {
    const cs = getComputedStyle(document.documentElement);
    const v = n => cs.getPropertyValue(n).trim();
    const dark = isDark();
    return {
      dark, bg: v("--surface"), node: v("--surface-2"), ink: v("--ink"), muted: v("--muted"), line: v("--muted"),
      accent: v("--accent"), accentSoft: dark ? "#1D2F52" : "#DCE7FB", note: dark ? "#3A2E14" : "#FFF4DB",
      noteLine: v("--t-data"), font: '"Be Vietnam Pro", system-ui, sans-serif',
      good: v("--good"), goodSoft: dark ? "#153D2C" : "#D6F2E4", warn: v("--warn"), warnSoft: dark ? "#3D2A12" : "#FCE9CF"
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
      gantt: { barHeight: 26, barGap: 6, topPadding: 44, leftPadding: 170, gridLineStartPadding: 34, fontSize: 14, sectionFontSize: 14, numberSectionStyles: 2, useMaxWidth: true },
      themeVariables: {
        darkMode: p.dark, background: p.bg, fontFamily: p.font, fontSize: "14px",
        primaryColor: p.node, primaryTextColor: p.ink, primaryBorderColor: p.line, secondaryColor: p.node, tertiaryColor: p.bg,
        mainBkg: p.node, nodeBorder: p.line, lineColor: p.line, textColor: p.ink, edgeLabelBackground: p.bg, clusterBkg: p.bg,
        actorBkg: p.node, actorBorder: p.line, actorTextColor: p.ink, actorLineColor: p.line,
        signalColor: p.ink, signalTextColor: p.ink, labelBoxBkgColor: p.node, labelBoxBorderColor: p.line, labelTextColor: p.ink,
        loopTextColor: p.ink, noteBkgColor: p.note, noteBorderColor: p.noteLine, noteTextColor: p.ink,
        activationBkgColor: p.accentSoft, activationBorderColor: p.accent, sequenceNumberColor: p.bg,
        sectionBkgColor: p.bg, altSectionBkgColor: p.node, sectionBkgColor2: p.bg, gridColor: p.line, titleColor: p.ink,
        taskBkgColor: p.node, taskBorderColor: p.line, taskTextColor: p.ink, taskTextLightColor: p.ink, taskTextDarkColor: p.ink,
        taskTextOutsideColor: p.ink, activeTaskBkgColor: p.accentSoft, activeTaskBorderColor: p.accent,
        doneTaskBkgColor: p.goodSoft, doneTaskBorderColor: p.good, critBkgColor: p.warnSoft, critBorderColor: p.warn, todayLineColor: p.warn
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
    if (key === "plan") return PLAN;
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

  /* ---------- trạng thái học ---------- */
  const STATUSES = [
    { id: "todo", label: "Chưa học", hint: "Chưa mở chủ đề này." },
    { id: "doing", label: "Đang học", hint: "Đang đọc, xem sơ đồ, chạy code hoặc làm bài tập." },
    { id: "done", label: "Đã xong", hint: "Giải thích được khái niệm, đã chạy code và tự làm lại với dữ liệu khác." },
    { id: "review", label: "Cần ôn lại", hint: "Đã học nhưng làm lại sau 1–2 tuần thì chưa chắc." }
  ];
  const ST_LABEL = Object.fromEntries(STATUSES.map(x => [x.id, x.label]));
  const PROGRESS_KEY = "dsml-roadmap-progress-v2";
  const progress = loadProgress();
  function loadProgress() {
    let p = null;
    try { p = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "null"); } catch (e) { p = null; }
    if (!p || typeof p !== "object") p = {};
    if (!p.items || typeof p.items !== "object") p.items = {};
    if (!p.plan || typeof p.plan !== "object") p.plan = {};
    try { // chuyển dữ liệu "Đã học" của phiên bản trước sang trạng thái "Đã xong"
      const old = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      if (Array.isArray(old) && old.length) {
        old.forEach(id => { if (!p.items[id]) p.items[id] = { s: "done", t: new Date().toISOString() }; });
        localStorage.removeItem(STORE_KEY);
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
      }
    } catch (e) { /* bỏ qua */ }
    return p;
  }
  const statusOf = id => (progress.items[id] && ST_LABEL[progress.items[id].s]) ? progress.items[id].s : "todo";
  const statusDate = id => progress.items[id] && progress.items[id].t ? new Date(progress.items[id].t) : null;
  const fmtDate = d => d ? d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
  function saveLocal() { try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch (e) { /* bỏ qua */ } }
  function saveProgress() { saveLocal(); scheduleSync(); }
  function setStatus(id, st) {
    progress.items[id] = { s: st, t: new Date().toISOString() };
    saveProgress();
    refreshProgress();
  }
  function countStatus(mods) {
    const c = { todo: 0, doing: 0, done: 0, review: 0 };
    mods.forEach(m => { c[statusOf(m.id)]++; });
    return c;
  }
  function stackedBar(c, total) {
    return ["done", "doing", "review"].map(k => `<i class="seg-${k}" style="width:${(100 * c[k] / total).toFixed(2)}%"></i>`).join("");
  }

  /* Đồng bộ theo tài khoản (khi mở trong trang Artifact có lưu trữ); nếu không, chỉ lưu trong trình duyệt */
  let syncRef = null, syncTimer = null, syncChain = Promise.resolve(), lastSynced = "";
  const syncBody = () => JSON.stringify({ items: progress.items, plan: progress.plan });
  function scheduleSync() {
    if (!syncRef) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => { syncChain = syncChain.then(pushSync).catch(() => {}); }, 900);
  }
  async function pushSync() {
    if (!syncRef) return;
    const body = syncBody();
    if (body === lastSynced) return;
    try {
      await syncRef.set({ items: progress.items, plan: progress.plan, updatedAt: new Date().toISOString() });
      lastSynced = body;
    } catch (e) {
      if (e && e.code === "unavailable") { setTimeout(scheduleSync, 3000 + Math.random() * 2000); return; }
      syncRef = null; setSyncNote(false);
    }
  }
  function mergeRemote(data) {
    let changed = false;
    const items = (data && data.items) || {};
    for (const [id, v] of Object.entries(items)) {
      if (!MOD_BY_ID[id] || !v || !ST_LABEL[v.s]) continue;
      const mine = progress.items[id];
      if (!mine || String(v.t || "") > String(mine.t || "")) { progress.items[id] = { s: v.s, t: v.t }; changed = true; }
    }
    const plan = data && data.plan;
    if (plan && plan.t && String(plan.t) > String(progress.plan.t || "")) { progress.plan = Object.assign({}, plan); changed = true; }
    return changed;
  }
  function setSyncNote(synced) {
    const el = document.getElementById("sync-note");
    if (el) el.textContent = synced
      ? "Trạng thái được lưu theo tài khoản của bạn và đồng bộ giữa các thiết bị."
      : "Trạng thái được lưu trong trình duyệt này. Mở trên máy khác sẽ không thấy.";
  }
  async function initSync() {
    if (!window.claude || typeof window.claude.use !== "function") return;
    try {
      const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
      if (!db || !user) return;
      const uid = await user.id();
      if (!uid) return;
      const ref = db.doc("data/users/" + uid + "/progress");
      const snap = await ref.get();
      if (snap.exists) {
        const d = snap.data();
        lastSynced = JSON.stringify({ items: d.items, plan: d.plan });
        if (mergeRemote(d)) { saveLocal(); refreshProgress(); syncPlanInputs(); }
      }
      syncRef = ref;
      setSyncNote(true);
      scheduleSync();
      ref.onSnapshot(sn => {
        if (!sn.exists || sn.metadata.hasPendingWrites) return;
        if (mergeRemote(sn.data())) { saveLocal(); refreshProgress(); syncPlanInputs(); }
      }, () => {});
    } catch (e) { /* tiếp tục lưu trong trình duyệt */ }
  }

  /* Kế hoạch học: biểu đồ Gantt tự tính từ số giờ mỗi tuần và ngày bắt đầu */
  const isoDay = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  function planSettings() {
    const hpw = Math.min(60, Math.max(2, Math.round(+progress.plan.hpw || 10)));
    const start = /^\d{4}-\d{2}-\d{2}$/.test(progress.plan.start || "") ? progress.plan.start : isoDay(new Date());
    return { hpw, start };
  }
  function stageTag(s) {
    const st = s.modules.map(m => statusOf(m.id));
    if (st.every(x => x === "done")) return "done";
    if (st.some(x => x === "review")) return "crit";
    if (st.some(x => x !== "todo")) return "active";
    return "";
  }
  function buildPlan() {
    const { hpw, start } = planSettings();
    let d = new Date(start + "T00:00:00");
    return STAGES.map(s => {
      const days = Math.max(3, Math.ceil(totalHours(s.modules) / hpw * 7));
      const from = new Date(d);
      d.setDate(d.getDate() + days);
      return { s, from, to: new Date(d), days, tag: stageTag(s) };
    });
  }
  const ganttText = t => t.replace(/[:;#,]/g, " ").replace(/&/g, "và").replace(/\s+/g, " ").trim();
  function planSrc() {
    const rows = buildPlan();
    const spanDays = (rows[rows.length - 1].to - rows[0].from) / 864e5;
    const lines = ["gantt", "  dateFormat YYYY-MM-DD", `  axisFormat ${spanDays > 120 ? "%m/%Y" : "%d/%m"}`];
    let track = null;
    rows.forEach(r => {
      if (r.s.track !== track) { track = r.s.track; lines.push("  section " + ganttText(TRACKS[track])); }
      const name = ganttText(`GĐ ${r.s.no} ${r.s.title}`).slice(0, 48);
      lines.push(`  ${name} :${r.tag ? r.tag + ", " : ""}g${r.s.no}, ${isoDay(r.from)}, ${r.days}d`);
    });
    return lines.join("\n");
  }
  const PLAN = { title: "Kế hoạch học theo tuần, tô màu theo trạng thái của bạn", get src() { return planSrc(); } };
  function planSummary() {
    const { hpw } = planSettings();
    const rows = buildPlan();
    const end = rows[rows.length - 1].to;
    const total = totalHours(ALL_MODS);
    const left = ALL_MODS.reduce((a, m) => a + (statusOf(m.id) === "done" ? 0 : statusOf(m.id) === "doing" ? m.hours / 2 : m.hours), 0);
    const finish = new Date(); finish.setDate(finish.getDate() + Math.ceil(left / hpw * 7));
    return `Toàn bộ khoảng ${total} giờ, với ${hpw} giờ/tuần mất khoảng ${Math.ceil(total / hpw)} tuần, kết thúc theo kế hoạch ngày ${fmtDate(end)}. ` +
      (left < total ? `Còn lại khoảng ${Math.round(left)} giờ: nếu giữ nhịp này từ hôm nay, bạn xong vào khoảng ${fmtDate(finish)}.` : "Bạn chưa đánh dấu chủ đề nào, hãy bắt đầu từ giai đoạn 0.");
  }
  let planTimer = null;
  function refreshPlan() {
    clearTimeout(planTimer);
    planTimer = setTimeout(() => {
      const fig = document.querySelector('figure.dgm[data-dgm="plan"]');
      if (!fig) return;
      fig.removeAttribute("data-done");
      fig.querySelector(".dgm-src pre").textContent = PLAN.src;
      const sum = document.getElementById("plan-summary");
      if (sum) sum.textContent = planSummary();
      renderFigures(fig.parentElement);
    }, 250);
  }
  function syncPlanInputs() {
    const { hpw, start } = planSettings();
    const h = document.getElementById("plan-hpw"), d = document.getElementById("plan-start");
    if (h) h.value = hpw;
    if (d) d.value = start;
    refreshPlan();
  }

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

  function appHTML(a) {
    return `<article class="app${a.kind === "fail" ? " app-fail" : ""}">
  <div class="app-top"><span class="app-org">${esc(a.org)}</span><span class="app-ind">${esc(a.ind)}</span>${a.kind === "fail" ? `<span class="app-flag">Thất bại · bài học</span>` : ""}</div>
  <h5>${esc(a.title)}</h5>
  <p>${esc(a.text)}</p>
  <p class="app-res"><b>${a.kind === "fail" ? "Hậu quả" : "Kết quả"}:</b> ${esc(a.result)}</p>
  ${a.lesson ? `<p class="app-lesson"><b>Bài học:</b> ${esc(a.lesson)}</p>` : ""}
  <a class="app-src" href="${esc(a.src[1])}" target="_blank" rel="noopener">Nguồn: ${esc(a.src[0])}</a>
</article>`;
  }

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
<article class="mod" id="m-${m.id}" data-track="${s.track}" data-level="${m.level}" data-status="${statusOf(m.id)}">
  <div class="mod-head">
    <button class="mod-toggle" type="button" aria-expanded="false" aria-controls="b-${m.id}">
      <span class="mod-title"><h3>${esc(m.title)}</h3></span>
      <div class="mod-sum">${esc(m.summary)}</div>
      <div class="meta-row">${lvlDots(m.level)}<span>~${m.hours} giờ</span>${m.example ? `<span>Case: ${esc(m.example.domain)}</span>` : ""}${m.diagrams.length ? `<span>${m.diagrams.length} sơ đồ</span>` : ""}${m.apps.length ? `<span>${m.apps.length} case doanh nghiệp</span>` : ""}<span class="st-since" data-since="${m.id}"></span></div>
    </button>
    <div class="mod-tools">
      <label class="st-pick" title="Đổi trạng thái học"><span class="dot" aria-hidden="true"></span><select id="st-${m.id}" data-status-of="${m.id}" aria-label="Trạng thái: ${esc(m.title)}">${STATUSES.map(o => `<option value="${o.id}"${statusOf(m.id) === o.id ? " selected" : ""}>${o.label}</option>`).join("")}</select></label>
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
    ${m.apps.length ? `<h4>Doanh nghiệp đã áp dụng</h4><div class="apps">${m.apps.map(appHTML).join("")}</div>` : ""}
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
    <div class="stage-meta"><span><b>${esc(s.weeks)}</b></span><span>${s.modules.length} chủ đề · ~${totalHours(s.modules)} giờ</span><span>${TRACKS[s.track]}</span><span class="stage-done"><span class="st-bar" data-stage-bar="${s.id}"></span><span data-stage-done="${s.id}"></span></span>
      <span class="stage-actions"><button class="btn small" type="button" data-pdf-stage="${s.id}">${ICON.pdf} PDF giai đoạn</button></span></div>
    <p class="stage-goal">${esc(s.goal)}</p>
  </div>
  <div class="mods">${s.modules.map(modHTML).join("")}</div>
</section>`).join("");

    if (OVERVIEW) $("#overview-fig").innerHTML = figureHTML("overview", OVERVIEW);
    if (GUIDE_TREE) $("#guide-fig").innerHTML = figureHTML("guide", GUIDE_TREE);
    $("#guide-body").innerHTML = GUIDE.map(([need, algo, id]) =>
      `<tr><td>${esc(need)}</td><td>${MOD_BY_ID[id] ? `<a href="#m-${id}" data-open="${id}">${esc(algo)}</a>` : esc(algo)}</td><td>${MOD_BY_ID[id] ? esc(MOD_BY_ID[id].stage.title) : ""}</td></tr>`).join("");
    renderAppsIndex("all");
    $("#sources").innerHTML = SOURCES.map(([l, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)}</a></li>`).join("");

    $("#sidenav-list").innerHTML = STAGES.map(s => `
<li class="st" data-track="${s.track}" data-nav-stage="${s.id}"><a href="#${s.id}">${s.no}. ${esc(s.title)}</a>
  <ol>${s.modules.map(m => `<li><a href="#m-${m.id}" data-open="${m.id}" data-nav-mod="${m.id}"><i class="sdot" aria-hidden="true"></i>${esc(m.title)}</a></li>`).join("")}</ol></li>`).join("");
    $("#status-legend").innerHTML = STATUSES.map(o => `<li data-status="${o.id}"><span class="pill"><i></i>${o.label}</span><span>${esc(o.hint)}</span></li>`).join("");
    $("#plan-fig").innerHTML = figureHTML("plan", PLAN);

    $("#mobile-toc").innerHTML = `<option value="">Đi đến giai đoạn…</option>` + STAGES.map(s => `<option value="${s.id}">${s.no}. ${esc(s.title)}</option>`).join("");
    refreshProgress();
  }

  function renderAppsIndex(filter) {
    const fails = ALL_APPS.filter(a => a.kind === "fail");
    const sectorsUsed = [...new Set(ALL_APPS.map(a => sectorOf(a.ind)))];
    $("#apps-stats").innerHTML = `<span><b>${ALL_APPS.length}</b> case đã công bố</span><span><b>${new Set(ALL_APPS.map(a => a.org)).size}</b> tổ chức</span><span><b>${sectorsUsed.length}</b> nhóm ngành</span><span><b>${fails.length}</b> thất bại có bài học</span>`;
    $("#apps-filter").innerHTML = [["all", "Tất cả"], ...sectorsUsed.map(x => [x, x]), ["fail", "Chỉ thất bại"]]
      .map(([k, l]) => `<button class="chip" type="button" data-sector="${esc(k)}" aria-pressed="${k === filter}">${esc(l)}</button>`).join("");
    const rows = ALL_APPS.filter(a => filter === "all" || (filter === "fail" ? a.kind === "fail" : sectorOf(a.ind) === filter));
    const groups = {};
    rows.forEach(a => { (groups[sectorOf(a.ind)] = groups[sectorOf(a.ind)] || []).push(a); });
    $("#apps-body").innerHTML = Object.entries(groups).map(([g, list]) =>
      `<tr class="grp"><td colspan="4">${esc(g)} <span>${list.length}</span></td></tr>` + list.map(a => `<tr${a.kind === "fail" ? ' class="is-fail"' : ""}>
  <td><b>${esc(a.org)}</b>${a.kind === "fail" ? '<span class="app-flag">Thất bại</span>' : ""}</td>
  <td>${esc(a.title)}</td>
  <td>${esc(a.result)}</td>
  <td><a href="#m-${a.mod.id}" data-open="${a.mod.id}">${esc(a.mod.title)}</a></td></tr>`).join("")).join("");
  }

  function refreshProgress() {
    const c = countStatus(ALL_MODS);
    $("#stat-done").textContent = `${c.done}/${ALL_MODS.length}`;
    $("#progress-bar").innerHTML = stackedBar(c, ALL_MODS.length);
    $("#status-counts").innerHTML = STATUSES.map(o => `<span data-status="${o.id}"><i></i>${o.label} <b>${c[o.id]}</b></span>`).join("");
    STAGES.forEach(s => {
      const k = countStatus(s.modules);
      const bar = document.querySelector(`[data-stage-bar="${s.id}"]`);
      if (bar) bar.innerHTML = stackedBar(k, s.modules.length);
      const el = document.querySelector(`[data-stage-done="${s.id}"]`);
      if (el) el.textContent = `Xong ${k.done}/${s.modules.length}` + (k.doing ? ` · đang học ${k.doing}` : "") + (k.review ? ` · cần ôn ${k.review}` : "");
      const nav = document.querySelector(`[data-nav-stage="${s.id}"]`);
      if (nav) nav.classList.toggle("done", k.done === s.modules.length);
    });
    ALL_MODS.forEach(m => {
      const st = statusOf(m.id);
      const card = document.getElementById("m-" + m.id);
      if (card) card.dataset.status = st;
      const sel = document.getElementById("st-" + m.id);
      if (sel && sel.value !== st) sel.value = st;
      const a = document.querySelector(`[data-nav-mod="${m.id}"]`);
      if (a) a.dataset.status = st;
      const since = document.querySelector(`[data-since="${m.id}"]`);
      if (since) {
        const d = statusDate(m.id);
        since.textContent = st === "doing" && d ? `Bắt đầu ${fmtDate(d)}` : st === "done" && d ? `Xong ${fmtDate(d)}` : st === "review" && d ? `Đánh dấu ôn ${fmtDate(d)}` : "";
      }
    });
    // Gợi ý chủ đề tiếp theo: ưu tiên chủ đề đang học, rồi cần ôn, rồi chủ đề chưa học đầu tiên theo thứ tự
    const next = ALL_MODS.find(m => statusOf(m.id) === "doing") || ALL_MODS.find(m => statusOf(m.id) === "review") || ALL_MODS.find(m => statusOf(m.id) === "todo");
    const nb = $("#next-btn");
    if (nb) {
      nb.hidden = !next;
      if (next) {
        const verb = statusOf(next.id) === "doing" ? "Học tiếp" : statusOf(next.id) === "review" ? "Ôn lại" : c.done || c.doing ? "Học tiếp" : "Bắt đầu";
        nb.textContent = `${verb}: ${next.title}`;
        nb.href = "#m-" + next.id;
        nb.dataset.open = next.id;
      }
    }
    if (typeof applyFilterRef === "function") applyFilterRef();
    refreshPlan();
  }
  let applyFilterRef = null;

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
      const sec = t.closest("[data-sector]");
      if (sec) { renderAppsIndex(sec.dataset.sector); return; }
      const pm = t.closest("[data-pdf-mod]");
      if (pm) { openExport({ scope: "mod", modId: pm.dataset.pdfMod }); return; }
      const ps = t.closest("[data-pdf-stage]");
      if (ps) { openExport({ scope: "pick", stages: [ps.dataset.pdfStage] }); return; }
    });
    document.addEventListener("change", e => {
      const sel = e.target.closest("[data-status-of]");
      if (sel) { setStatus(sel.dataset.statusOf, sel.value); toast(`Đã đổi trạng thái: ${ST_LABEL[sel.value]}`, 1800); return; }
      if (e.target.id === "plan-hpw" || e.target.id === "plan-start") {
        const h = Math.min(60, Math.max(2, Math.round(+$("#plan-hpw").value || 10)));
        const d = $("#plan-start").value;
        progress.plan = { hpw: h, start: /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : planSettings().start, t: new Date().toISOString() };
        saveProgress(); syncPlanInputs();
      }
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
    let stFilter = "all";
    document.querySelectorAll("[data-status-filter]").forEach(b => b.addEventListener("click", () => {
      stFilter = b.dataset.statusFilter;
      document.querySelectorAll("[data-status-filter]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      applyFilter();
    }));
    q.addEventListener("input", applyFilter);
    applyFilterRef = () => { if (stFilter !== "all") applyFilter(); };
    function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d"); }
    const hay = Object.fromEntries(ALL_MODS.map(m => [m.id, norm([m.title, m.summary, m.concept, (m.tools || []).join(" "), m.example && m.example.domain, m.example && m.example.title, m.apps.map(a => [a.org, a.ind, a.title].join(" ")).join(" ")].join(" "))]));
    function applyFilter() {
      const terms = norm(q.value.trim()).split(/\s+/).filter(Boolean);
      let shown = 0;
      STAGES.forEach(s => {
        let k = 0;
        s.modules.forEach(m => {
          const ok = (level === "all" || String(m.level) === level) && (stFilter === "all" || statusOf(m.id) === stFilter) && terms.every(t => hay[m.id].includes(t));
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
.pst{display:inline-block;font-weight:600;font-size:11px;padding:1px 7px;border-radius:999px;border:1px solid currentColor}
.pst-todo{color:#667281}.pst-doing{color:#1F5FD1}.pst-done{color:#12875B}.pst-review{color:#B45309}
.ptrack td{font-size:12px;padding:5px 8px}.ptrack .grp td{font-weight:700;background:#f3f5f7;border-left:4px solid var(--tc)}
.ptrack .note{width:150px;border-bottom:1px dotted #aab3be}
.papp{border:1px solid #d9dfe6;border-left:4px solid #12875B;border-radius:6px;padding:8px 11px;margin:0 0 8px;font-size:12.5px}
.papp.fail{border-left-color:#B45309}
.papp p{margin:3px 0 0;color:#3b4552}
.pa-top{font-size:11px;color:#667281}.pa-top b{color:#1a212b}
.pa-flag{color:#B45309;font-weight:700}
.pa-t{font-family:"Bricolage Grotesque","Be Vietnam Pro",Arial,sans-serif;font-weight:700;font-size:14px;margin-top:2px}
.pa-src{font-size:11px}.pa-src a{color:#1F5FD1;text-decoration:none}
`;

  function pdfFigure(opt, key, d) {
    const svg = opt.svgs && opt.svgs[key];
    return svg ? `<h4 class="bk">Sơ đồ</h4><div class="pdg bk">${svg}</div><p class="pdg-cap bk">${esc(d.title)}</p>` : "";
  }
  function pdfModHTML(m, opt) {
    const list = (cls, title, arr) => arr && arr.length ? `<div class="${cls}"><h4 class="bk">${title}</h4><ul>${arr.map(x => `<li class="bk">${esc(x)}</li>`).join("")}</ul></div>` : "";
    let h = `<div class="mod" data-track="${m.stage.track}" data-anchor="${m.id}">
<div class="hd bk"><i></i><h3>${esc(m.title)}</h3></div>
<div class="meta bk">${LEVELS[m.level]} · khoảng ${m.hours} giờ · Giai đoạn ${m.stage.no}: ${esc(m.stage.title)} · Trạng thái: <b class="pst pst-${statusOf(m.id)}">${ST_LABEL[statusOf(m.id)]}</b></div>
<p class="sum bk">${esc(m.summary)}</p>
<h4 class="bk">Khái niệm</h4><p class="bk">${esc(m.concept)}</p>
${opt.diagrams ? m.diagrams.map((d, i) => pdfFigure(opt, m.id + ":" + i, d)).join("") : ""}
${list("k-why", "Lý do sử dụng", m.why)}${list("k-when", "Khi nào dùng", m.when)}${list("k-not", "Khi nào không nên", m.whenNot)}`;
    if (m.example) h += `<h4 class="bk">Ví dụ ứng dụng thực tế</h4><div class="case bk"><div class="dm">${esc(m.example.domain)}</div><h5>${esc(m.example.title)}</h5><p>${esc(m.example.text)}</p></div>`;
    if (opt.apps && m.apps.length) {
      h += `<h4 class="bk">Doanh nghiệp đã áp dụng</h4>` + m.apps.map(a => `<div class="papp bk${a.kind === "fail" ? " fail" : ""}">
<div class="pa-top"><b>${esc(a.org)}</b> · ${esc(a.ind)}${a.kind === "fail" ? ' · <span class="pa-flag">Thất bại / bài học</span>' : ""}</div>
<div class="pa-t">${esc(a.title)}</div><p>${esc(a.text)}</p>
<p><b>${a.kind === "fail" ? "Hậu quả" : "Kết quả"}:</b> ${esc(a.result)}</p>${a.lesson ? `<p><b>Bài học:</b> ${esc(a.lesson)}</p>` : ""}
<p class="pa-src">Nguồn: <a href="${esc(a.src[1])}">${esc(a.src[0])}</a></p></div>`).join("");
    }
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
    if (opt.plan && !single) {
      const c = countStatus(mods);
      units.push({ kind: "plan", newPage: true, html: `<h2 class="sec-title bk">Kế hoạch học và theo dõi trạng thái</h2>
<p class="sec-sub bk">${esc(planSummary())}</p>
<p class="sec-sub bk">Trong phạm vi này: Đã xong ${c.done} · Đang học ${c.doing} · Cần ôn lại ${c.review} · Chưa học ${c.todo} (trên ${mods.length} chủ đề).</p>
${opt.diagrams ? pdfFigure(opt, "plan", PLAN) : ""}
<table class="ptrack"><thead><tr class="bk"><th>#</th><th>Chủ đề</th><th>Giờ</th><th>Trạng thái</th><th>Cập nhật</th><th>Ghi chú</th></tr></thead><tbody>
${sel.stages.map(s => { const ms = s.modules.filter(m => sel.mods.has(m.id)); return ms.length ? `<tr class="bk grp" data-track="${s.track}"><td colspan="6">${s.no}. ${esc(s.title)}</td></tr>` + ms.map((m, i) => `<tr class="bk"><td>${s.no}.${i + 1}</td><td>${esc(m.title)}</td><td>${m.hours}</td><td><span class="pst pst-${statusOf(m.id)}">${ST_LABEL[statusOf(m.id)]}</span></td><td>${fmtDate(statusDate(m.id))}</td><td class="note"></td></tr>`).join("") : ""; }).join("")}
</tbody></table>` });
    }
    if (opt.apps && !single) {
      const list = ALL_APPS.filter(a => sel.mods.has(a.mod.id));
      const groups = {};
      list.forEach(a => { (groups[sectorOf(a.ind)] = groups[sectorOf(a.ind)] || []).push(a); });
      if (list.length) units.push({ kind: "apps", newPage: true, html: `<h2 class="sec-title bk">Ứng dụng thực tế theo ngành</h2>
<p class="sec-sub bk">${list.length} case đã được công bố, ${list.filter(a => a.kind === "fail").length} trong số đó là thất bại kèm bài học. Chi tiết và nguồn nằm trong từng chủ đề.</p>
<table class="ptrack"><thead><tr class="bk"><th>Tổ chức</th><th>Ứng dụng</th><th>Kết quả</th><th>Chủ đề</th></tr></thead><tbody>
${Object.entries(groups).map(([g, l]) => `<tr class="bk grp"><td colspan="4" style="border-left-color:#1a212b">${esc(g)}</td></tr>` + l.map(a => `<tr class="bk"><td><b>${esc(a.org)}</b>${a.kind === "fail" ? '<br><span class="pst pst-review">Thất bại</span>' : ""}</td><td>${esc(a.title)}</td><td>${esc(a.result)}</td><td>${esc(a.mod.title)}</td></tr>`).join("")).join("")}
</tbody></table>` });
    }
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
        if (opt.plan && sel.scope !== "mod") keys.push("plan");
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
      const ms = ALL_MODS.filter(m => statusOf(m.id) !== "done");
      return { scope: "todo", label: "Các chủ đề chưa xong", stages: STAGES, mods: new Set(ms.map(m => m.id)) };
    }
    return { scope: "all", label: "Toàn bộ lộ trình", stages: STAGES, mods: new Set(ALL_MODS.map(m => m.id)) };
  }
  function fileName(sel) {
    const base = sel.scope === "mod" ? [...sel.mods][0] : sel.scope === "pick" && sel.stages.length === 1 ? "giai-doan-" + sel.stages[0].no : sel.scope === "todo" ? "chua-xong" : "toan-bo";
    return `ds-ml-roadmap-${base}.pdf`;
  }

  async function runExport() {
    const sel = currentSelection();
    const opt = {
      cover: $("#o-cover").checked, toc: $("#o-toc").checked, guide: $("#o-guide").checked,
      code: $("#o-code").checked, res: $("#o-res").checked,
      quality: document.querySelector('input[name="quality"]:checked').value,
      diagrams: $("#o-dgm").checked, plan: $("#o-plan").checked, apps: $("#o-apps").checked
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
  syncPlanInputs();
  setSyncNote(false);
  document.querySelectorAll(".panel").forEach(renderFigures);
  initSync();
  rerenderOnThemeChange();
  bindMain();
  renderExportDialog();
})();
