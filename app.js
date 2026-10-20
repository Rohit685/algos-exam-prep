(function () {
  const TOPICS = [
    { key: "graphs", short: "Graph search", label: "Graph Search, DAGs & SCCs", color: "var(--graphs)",
      desc: "BFS, DFS, edge classification, bipartiteness, topological sort, SCCs, bridges / cut vertices." },
    { key: "shortest", short: "Shortest paths", label: "Shortest Paths & APSP", color: "var(--shortest)",
      desc: "Dijkstra, Bellman–Ford, DAG shortest paths, Floyd–Warshall, Johnson, graph transformations." },
    { key: "mst", short: "MST", label: "Minimum Spanning Trees", color: "var(--mst)",
      desc: "Cut / cycle properties, Prim, Kruskal, union–find, clustering, MST updates." },
    { key: "greedy", short: "Greedy", label: "Greedy Algorithms", color: "var(--greedy)",
      desc: "Stays-ahead and exchange arguments, scheduling, intervals, Huffman, caching, counterexamples." },
    { key: "flow", short: "Flow", label: "Network Flow", color: "var(--flow)",
      desc: "Ford–Fulkerson, max-flow min-cut, residual graphs, matching, disjoint paths, circulations, reductions." },
    { key: "concepts", short: "True/False", label: "True / False Rapid Fire", color: "var(--concepts)",
      desc: "Quick conceptual checks. Decide true or false and justify (proof sketch or counterexample)." }
  ];
  const DIFF = { 1: "Warm-up", 2: "Exam level", 3: "Challenge" };
  const STORE_KEY = "cs577-exam-done";
  const HW4_OVERLAP = new Set(["S2", "M8", "M9", "Q11", "Q13", "Q17", "R23"]);

  const problems = window.PROBLEMS || [];
  const done = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  const state = { topic: "all", diff: "all", q: "", hideDone: false };

  const $ = (id) => document.getElementById(id);
  const list = $("list");

  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(done)); }

  function textOf(p) {
    if (!p._text) {
      const div = document.createElement("div");
      div.innerHTML = p.title + " " + p.statement + " " + (p.tags || []).join(" ") + " " + p.source;
      p._text = div.textContent.toLowerCase();
    }
    return p._text;
  }

  function matches(p) {
    if (state.topic !== "all" && p.topic !== state.topic) return false;
    if (state.diff !== "all" && String(p.diff) !== state.diff) return false;
    if (state.hideDone && done[p.id]) return false;
    if (state.q && !textOf(p).includes(state.q)) return false;
    return true;
  }

  function card(p, topic) {
    const el = document.createElement("article");
    el.className = "card" + (done[p.id] ? " done" : "");
    el.id = "p-" + p.id;
    el.style.setProperty("--c", topic.color);
    el.innerHTML = `
      <div class="card-head">
        <h3><span class="pid">${p.id}</span>${p.title}</h3>
        <label class="done-box"><input type="checkbox" ${done[p.id] ? "checked" : ""}> Done</label>
      </div>
      <div class="meta">
        <span class="badge d${p.diff}">${DIFF[p.diff]}</span>
        <span class="badge">${p.source}</span>
        ${HW4_OVERLAP.has(p.id) ? `<span class="badge hw" title="Solution gives away part of HW4">Overlaps HW4, open after Oct 22</span>` : ""}
        ${(p.tags || []).map((t) => `<span class="badge">${t}</span>`).join("")}
      </div>
      <div class="statement">${p.statement}</div>
      ${p.hint ? `<details class="hint"><summary>Hint</summary><div class="body">${p.hint}</div></details>` : ""}
      <details class="sol"><summary>Solution</summary><div class="body">${p.solution}</div></details>`;
    el.querySelector(".done-box input").addEventListener("change", (e) => {
      if (e.target.checked) done[p.id] = true; else delete done[p.id];
      save();
      el.classList.toggle("done", e.target.checked);
      updateStats();
      if (state.hideDone && e.target.checked) render();
    });
    return el;
  }

  function render() {
    list.innerHTML = "";
    let shown = 0;
    for (const t of TOPICS) {
      if (state.topic !== "all" && state.topic !== t.key) continue;
      const items = problems.filter((p) => p.topic === t.key && matches(p));
      if (!items.length) continue;
      const h = document.createElement("h2");
      h.className = "section-title";
      h.style.setProperty("--c", t.color);
      h.textContent = `${t.label} (${items.length})`;
      const d = document.createElement("p");
      d.className = "section-desc";
      d.textContent = t.desc;
      list.append(h, d);
      items.forEach((p) => list.appendChild(card(p, t)));
      shown += items.length;
    }
    if (!shown) list.innerHTML = `<div class="empty">No problems match these filters.</div>`;
  }

  function renderChips() {
    const wrap = $("topic-chips");
    const all = [{ key: "all", label: "All" }].concat(TOPICS);
    wrap.innerHTML = "";
    for (const t of all) {
      const n = t.key === "all" ? problems.length : problems.filter((p) => p.topic === t.key).length;
      const b = document.createElement("button");
      b.className = "chip" + (state.topic === t.key ? " active" : "");
      b.innerHTML = `${t.short || t.label}<span class="count">${n}</span>`;
      b.title = t.label;
      b.addEventListener("click", () => { state.topic = t.key; renderChips(); render(); });
      wrap.appendChild(b);
    }
  }

  function updateStats() {
    const n = problems.length;
    const k = problems.filter((p) => done[p.id]).length;
    $("stat-total").textContent = n;
    $("stat-done").textContent = k;
    $("progress-bar").style.width = (n ? (100 * k) / n : 0) + "%";
    const exam = new Date(2026, 10, 5);
    const days = Math.ceil((exam - new Date()) / 86400000);
    $("stat-days").textContent = days >= 0 ? days : 0;
  }

  $("diff-select").addEventListener("change", (e) => { state.diff = e.target.value; render(); });
  $("search").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); render(); });
  $("hide-done").addEventListener("change", (e) => { state.hideDone = e.target.checked; render(); });
  $("collapse-btn").addEventListener("click", () => document.querySelectorAll("details[open]").forEach((d) => d.removeAttribute("open")));
  $("random-btn").addEventListener("click", () => {
    const pool = problems.filter((p) => !done[p.id] && matches(p));
    if (!pool.length) return;
    const p = pool[Math.floor(Math.random() * pool.length)];
    const el = document.getElementById("p-" + p.id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  });

  renderChips();
  render();
  updateStats();
})();
