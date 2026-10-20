window.PROBLEMS = window.PROBLEMS || [];
window.PROBLEMS.push(
{
  id: "G1", topic: "graphs", diff: 1, source: "CLRS Ch. 22 (wrestlers)", tags: ["BFS", "bipartite"],
  title: "Babyfaces and heels",
  statement: `<p>There are <i>n</i> professional wrestlers and a list of <i>r</i> pairs of rivals. Can you label every wrestler as a "babyface" or a "heel" so that every rivalry is between a babyface and a heel? Give an <i>O</i>(<i>n</i> + <i>r</i>) algorithm that finds such a labeling, or reports that none exists. Prove that it is correct.</p>`,
  hint: `<p>This asks whether the rivalry graph is bipartite. What does an edge inside a single BFS layer tell you?</p>`,
  solution: `<p><b>Algorithm.</b> Build the graph (wrestlers as vertices, rivalries as edges). For each unvisited vertex, run BFS. Label even layers "babyface" and odd layers "heel". Then scan every edge. If some edge has both ends in the same layer, report "impossible". Otherwise output the labels.</p>
<p><b>Correctness.</b> In BFS on an undirected graph, every edge joins two vertices whose layers differ by at most 1. So an edge either crosses adjacent layers, which means its ends get opposite labels, or stays inside one layer. If edge (<i>x</i>, <i>y</i>) lies inside layer <i>j</i>, let <i>z</i> be the lowest common ancestor of <i>x</i> and <i>y</i> in the BFS tree, at layer <i>i</i>. The tree paths z→x and z→y plus the edge (<i>x</i>, <i>y</i>) form a cycle of length 2(<i>j</i> − <i>i</i>) + 1, which is odd. An odd cycle cannot be 2-colored, so no valid labeling exists.</p>
<p><b>Time.</b> BFS takes <i>O</i>(<i>n</i> + <i>r</i>), and so does the edge scan.</p>`
},
{
  id: "G2", topic: "graphs", diff: 2, source: "K–T 3.4 (butterflies)", tags: ["BFS", "parity", "consistency"],
  title: "Same or different species?",
  statement: `<p>A biologist has <i>n</i> butterfly specimens and <i>m</i> judgments. Each judgment says that a pair of specimens is the <b>same</b> species or <b>different</b> species. There are only two species, A and B. Decide in <i>O</i>(<i>m</i> + <i>n</i>) time whether the judgments are consistent, meaning there is some way to assign A/B to every specimen that agrees with every judgment.</p>`,
  hint: `<p>Generalize 2-coloring: give each edge a parity (0 for "same", 1 for "different").</p>`,
  solution: `<p>Build an undirected graph with an edge for each judgment. Give "same" edges parity 0 and "different" edges parity 1. For each connected component, pick a root, label it A, and run BFS or DFS. When you cross an edge (<i>u</i>, <i>v</i>) of parity <i>p</i> into an unlabeled <i>v</i>, set label(<i>v</i>) = label(<i>u</i>) XOR <i>p</i>. When you reach an already-labeled <i>v</i>, check that label(<i>v</i>) = label(<i>u</i>) XOR <i>p</i>. If any check fails, the judgments are inconsistent.</p>
<p><b>Why it works.</b> Within a component, the root's label forces every other label (flipping the root's label just swaps A and B everywhere). So if the forced labels conflict, no assignment works. If there's no conflict, the labels satisfy every edge. This takes <i>O</i>(<i>m</i> + <i>n</i>).</p>`
},
{
  id: "G3", topic: "graphs", diff: 1, source: "CLRS 22.4-3", tags: ["DFS", "cycle"],
  title: "Cycle detection in O(n), independent of m",
  statement: `<p>Give an algorithm that determines whether an undirected graph <i>G</i> = (<i>V</i>, <i>E</i>) contains a cycle. It must run in <i>O</i>(<i>n</i>) time, independent of <i>m</i>.</p>`,
  hint: `<p>A forest on <i>n</i> vertices has at most <i>n</i> − 1 edges. When can you stop early?</p>`,
  solution: `<p>Run DFS. In an undirected graph every non-tree edge is a back edge, and a back edge means there is a cycle. (When you scan the edge back to your DFS parent, ignore it once.) Stop as soon as you find a back edge.</p>
<p><b>Why O(n).</b> If the graph is acyclic, it is a forest with at most <i>n</i> − 1 edges, so DFS costs <i>O</i>(<i>n</i>). If it has a cycle, DFS examines at most <i>n</i> − 1 tree edges before the first back edge, because every edge it examines before then is a tree edge. Either way, at most <i>O</i>(<i>n</i>) edges are touched.</p>`
},
{
  id: "G4", topic: "graphs", diff: 2, source: "K–T 3.6", tags: ["BFS", "DFS", "proof"],
  title: "Same BFS tree and DFS tree",
  statement: `<p>Let <i>G</i> be a connected undirected graph and <i>u</i> a vertex. Suppose BFS from <i>u</i> and DFS from <i>u</i> produce the <b>same</b> spanning tree <i>T</i>. Prove that <i>G</i> = <i>T</i>, meaning <i>G</i> has no edges outside <i>T</i>.</p>`,
  hint: `<p>Take a non-tree edge (<i>a</i>, <i>b</i>). What does DFS say about how <i>a</i> and <i>b</i> are related in <i>T</i>? What does BFS say about their depths?</p>`,
  solution: `<p>Suppose (<i>a</i>, <i>b</i>) ∈ <i>E</i> \\ <i>T</i>.</p>
<ul><li><b>DFS property:</b> every non-tree edge of an undirected DFS tree joins an ancestor and a descendant. So, without loss of generality, <i>a</i> is an ancestor of <i>b</i> in <i>T</i>.</li>
<li><b>BFS property:</b> every edge joins vertices whose depths differ by at most 1.</li></ul>
<p>Since <i>a</i> is a proper ancestor of <i>b</i>, depth(<i>b</i>) − depth(<i>a</i>) ≥ 1, so the difference is exactly 1. An ancestor exactly one level up is the parent, so (<i>a</i>, <i>b</i>) is a tree edge. That contradicts our assumption. Therefore <i>E</i> = <i>T</i>.</p>`
},
{
  id: "G5", topic: "graphs", diff: 2, source: "K–T 3.9", tags: ["BFS", "layers", "connectivity"],
  title: "Far-apart nodes have a single point of failure",
  statement: `<p>An undirected graph <i>G</i> has <i>n</i> nodes, and nodes <i>s</i> and <i>t</i> are at distance strictly greater than <i>n</i>/2. Prove that some node <i>v</i> ∉ {<i>s</i>, <i>t</i>} exists whose deletion destroys every s–t path. Then give an <i>O</i>(<i>m</i> + <i>n</i>) algorithm to find it.</p>`,
  hint: `<p>Count the BFS layers strictly between <i>s</i> and <i>t</i>, and the nodes available to fill them.</p>`,
  solution: `<p>Run BFS from <i>s</i>, and let <i>d</i> = dist(<i>s</i>, <i>t</i>) &gt; <i>n</i>/2. The layers <i>L</i><sub>1</sub>, …, <i>L</i><sub><i>d</i>−1</sub> are all nonempty, because every shortest path passes through each of them. If every one of these layers had at least 2 nodes, they would hold at least 2(<i>d</i> − 1) nodes, all different from <i>s</i> and <i>t</i>. So 2(<i>d</i> − 1) ≤ <i>n</i> − 2, which gives <i>d</i> ≤ <i>n</i>/2, a contradiction. Hence some layer <i>L</i><sub><i>i</i></sub> with 1 ≤ <i>i</i> ≤ <i>d</i> − 1 contains a single node <i>v</i>.</p>
<p>Every s–t path must pass through layer <i>i</i>, because BFS edges only join the same or adjacent layers, so a path cannot skip a layer. So every s–t path goes through <i>v</i>, and deleting <i>v</i> disconnects <i>s</i> from <i>t</i>.</p>
<p><b>Algorithm:</b> run BFS, count layer sizes, and return the node of any layer of size 1 strictly between <i>s</i> and <i>t</i>. This is <i>O</i>(<i>m</i> + <i>n</i>).</p>`
},
{
  id: "G6", topic: "graphs", diff: 2, source: "CLRS-style", tags: ["topological sort", "DAG"],
  title: "Is the topological order unique?",
  statement: `<p>Given a DAG <i>G</i>, decide in <i>O</i>(<i>n</i> + <i>m</i>) time whether <i>G</i> has exactly one topological ordering.</p>`,
  hint: `<p>Look at consecutive vertices in any topological order. Alternatively, use Kahn's algorithm and watch the size of the queue of sources.</p>`,
  solution: `<p>Compute any topological order <i>v</i><sub>1</sub>, …, <i>v</i><sub><i>n</i></sub>. The order is unique if and only if (<i>v</i><sub><i>i</i></sub>, <i>v</i><sub><i>i</i>+1</sub>) ∈ <i>E</i> for every <i>i</i>. In other words, the DAG has a Hamiltonian path.</p>
<p>(⇐) If all consecutive edges exist, each vertex must come before the next one, so the order is forced. (⇒) If some (<i>v</i><sub><i>i</i></sub>, <i>v</i><sub><i>i</i>+1</sub>) is missing, then swapping these two vertices gives another valid order. No other edge can be violated: an edge between them would have to go from <i>v</i><sub><i>i</i></sub> to <i>v</i><sub><i>i</i>+1</sub>, and that edge is missing.</p>
<p><b>Equivalent check:</b> in Kahn's algorithm, the order is unique exactly when the set of current sources never has more than one vertex. Either check runs in <i>O</i>(<i>n</i> + <i>m</i>).</p>`
},
{
  id: "G7", topic: "graphs", diff: 2, source: "K–T 3.12", tags: ["DAG", "modeling", "topological sort"],
  title: "Births and deaths: are the facts consistent?",
  statement: `<p>Historians studied <i>n</i> people <i>P</i><sub>1</sub>, …, <i>P</i><sub><i>n</i></sub> and recorded facts of two kinds:</p>
<ul><li>"<i>P</i><sub><i>i</i></sub> died before <i>P</i><sub><i>j</i></sub> was born", and</li>
<li>"the lifespans of <i>P</i><sub><i>i</i></sub> and <i>P</i><sub><i>j</i></sub> overlapped (at least partially)".</li></ul>
<p>Give an <i>O</i>(<i>n</i> + <i>m</i>) algorithm that either produces birth and death dates consistent with all <i>m</i> facts, or reports that no such dates exist.</p>`,
  hint: `<p>Make two events per person, B<sub>i</sub> and D<sub>i</sub>, and turn every fact into "event X happens before event Y".</p>`,
  solution: `<p>Create nodes B<sub>i</sub> and D<sub>i</sub> for each person and add these directed edges ("happens before"):</p>
<ul><li>B<sub>i</sub> → D<sub>i</sub> for every <i>i</i> (each person is born before dying);</li>
<li>"<i>i</i> died before <i>j</i> was born": D<sub>i</sub> → B<sub>j</sub>;</li>
<li>"<i>i</i> and <i>j</i> overlapped": B<sub>i</sub> → D<sub>j</sub> and B<sub>j</sub> → D<sub>i</sub>. Two intervals overlap exactly when each one starts before the other ends.</li></ul>
<p>Run a topological sort. If there's a cycle, the facts are inconsistent, because a cycle would require some event to happen before itself. Otherwise, assign dates 1, 2, …, 2<i>n</i> in topological order. Every edge then points forward in time, so all facts hold. The graph has 2<i>n</i> nodes and <i>O</i>(<i>n</i> + <i>m</i>) edges.</p>`
},
{
  id: "G8", topic: "graphs", diff: 1, source: "CLRS 22.4-2", tags: ["DAG", "DP", "counting"],
  title: "Count the s–t paths in a DAG",
  statement: `<p>Given a DAG and vertices <i>s</i> and <i>t</i>, compute the number of distinct directed paths from <i>s</i> to <i>t</i> in <i>O</i>(<i>n</i> + <i>m</i>) time (counting each arithmetic operation as <i>O</i>(1)).</p>`,
  solution: `<p>Topologically sort the DAG. Let <i>P</i>(<i>v</i>) be the number of v→t paths. Set <i>P</i>(<i>t</i>) = 1, and process the vertices in <b>reverse</b> topological order: <i>P</i>(<i>v</i>) = Σ<sub>(<i>v</i>,<i>w</i>)∈<i>E</i></sub> <i>P</i>(<i>w</i>) for <i>v</i> ≠ <i>t</i>. Return <i>P</i>(<i>s</i>).</p>
<p>This is correct because every v→t path starts with exactly one out-edge (<i>v</i>, <i>w</i>) followed by a w→t path, and all the <i>P</i>(<i>w</i>) values are already computed when <i>v</i> is processed. Each edge is used once, so the total is <i>O</i>(<i>n</i> + <i>m</i>).</p>`
},
{
  id: "G9", topic: "graphs", diff: 2, source: "Classic (critical path)", tags: ["DAG", "longest path", "job scheduling"],
  title: "Project with unlimited workers: critical path",
  statement: `<p>A project has <i>n</i> tasks. Task <i>v</i> takes <i>d</i>(<i>v</i>) &gt; 0 days, and there are <i>m</i> prerequisite pairs "<i>u</i> must finish before <i>v</i> starts". You have unlimited workers.</p>
<ol><li>Compute the earliest time at which the whole project can finish.</li>
<li>Find every <b>critical</b> task: a task such that delaying its start by any amount delays the whole project.</li></ol>
<p>Both parts should take <i>O</i>(<i>n</i> + <i>m</i>) time.</p>`,
  hint: `<p>This is a longest path problem on a DAG with vertex weights. Do one forward pass and one backward pass.</p>`,
  solution: `<p>If the prerequisite graph has a cycle, the project is infeasible. Otherwise, take a topological order.</p>
<p><b>Forward pass:</b> EF(<i>v</i>) = <i>d</i>(<i>v</i>) + max<sub>(<i>u</i>,<i>v</i>)</sub> EF(<i>u</i>), with the max over an empty set equal to 0. The project finishes at <i>T</i> = max<sub>v</sub> EF(<i>v</i>). This is the longest weighted path, which is the best possible because every chain of prerequisites must run one after another.</p>
<p><b>Backward pass</b> (reverse topological order): LF(<i>v</i>) = min<sub>(<i>v</i>,<i>w</i>)</sub> (LF(<i>w</i>) − <i>d</i>(<i>w</i>)), with LF(<i>v</i>) = <i>T</i> if <i>v</i> has no successors. The slack of <i>v</i> is LF(<i>v</i>) − EF(<i>v</i>), and <i>v</i> is critical if and only if its slack is 0. The critical tasks are exactly those on some longest path.</p>`
},
{
  id: "G10", topic: "graphs", diff: 1, source: "Classic / DPV", tags: ["BFS", "reverse graph", "strong connectivity"],
  title: "One-way streets: is the city strongly connected?",
  statement: `<p>The mayor made every street one-way and claims you can still drive legally from any intersection to any other. Check the claim in linear time. Then strengthen it: check whether "from town hall <i>h</i>, wherever you drive, you can always get back to <i>h</i>".</p>`,
  hint: `<p>Use two searches, one on <i>G</i> and one on the reversed graph <i>G</i><sup>R</sup>. For the second claim, think about the SCC of <i>h</i>.</p>`,
  solution: `<p><b>Claim 1:</b> run BFS from any vertex <i>s</i> in <i>G</i> and again in <i>G</i><sup>R</sup>. The graph is strongly connected if and only if both searches reach every vertex. If both do, any <i>u</i> can reach <i>s</i> (from the <i>G</i><sup>R</sup> search) and <i>s</i> can reach any <i>v</i> (from the <i>G</i> search), so <i>u</i> reaches <i>v</i>. The time is <i>O</i>(<i>n</i> + <i>m</i>).</p>
<p><b>Claim 2:</b> every vertex reachable from <i>h</i> must be able to reach <i>h</i> back. Equivalently, the SCC of <i>h</i> is a <b>sink</b> in the condensation graph. Compute R = the set reachable from <i>h</i> in <i>G</i> and R′ = the set reachable from <i>h</i> in <i>G</i><sup>R</sup>, and check that R ⊆ R′. This is linear time.</p>`
},
{
  id: "G11", topic: "graphs", diff: 2, source: "Classic", tags: ["SCC", "condensation"],
  title: "Mother vertices",
  statement: `<p>A <i>mother vertex</i> of a directed graph is a vertex from which every other vertex is reachable. Find <b>all</b> mother vertices in <i>O</i>(<i>n</i> + <i>m</i>) time.</p>`,
  hint: `<p>Use the SCC condensation. How many source components can there be if a mother vertex exists?</p>`,
  solution: `<p>Compute the SCCs and the condensation DAG. A vertex is a mother vertex if and only if its SCC can reach every other SCC. If the DAG has two or more source SCCs, neither source can be reached from the other, so there is no mother vertex. If there is exactly one source SCC <i>C</i>, then every SCC is reachable from <i>C</i>, because following edges backwards from any SCC in a DAG must end at a source. So the mother vertices are exactly the vertices of <i>C</i>.</p>
<p><b>Alternative:</b> run a full DFS. The vertex <i>v</i> that finishes last is a mother vertex if any mother vertex exists. Check it with one more DFS from <i>v</i>. If it works, the answer is the SCC of <i>v</i>, which you can get from a search in <i>G</i><sup>R</sup>.</p>`
},
{
  id: "G12", topic: "graphs", diff: 2, source: "CLRS 22.5-7", tags: ["SCC", "topological sort"],
  title: "Semiconnected graphs",
  statement: `<p>A directed graph is <i>semiconnected</i> if for every pair <i>u</i>, <i>v</i>, either <i>u</i> ⇝ <i>v</i> or <i>v</i> ⇝ <i>u</i> (or both). Give an <i>O</i>(<i>n</i> + <i>m</i>) algorithm to test this, and prove that it is correct.</p>`,
  solution: `<p>Compute the SCCs and build the condensation DAG <i>G</i><sup>SCC</sup>. Topologically sort it as <i>C</i><sub>1</sub>, …, <i>C</i><sub><i>k</i></sub>. <i>G</i> is semiconnected if and only if the edge (<i>C</i><sub><i>i</i></sub>, <i>C</i><sub><i>i</i>+1</sub>) exists for every <i>i</i>.</p>
<p>(⇐) The edges <i>C</i><sub>1</sub> → <i>C</i><sub>2</sub> → … → <i>C</i><sub><i>k</i></sub> form a path through every component. Vertices inside one SCC reach each other, and a vertex in <i>C</i><sub><i>i</i></sub> reaches every vertex in <i>C</i><sub><i>j</i></sub> for <i>j</i> &gt; <i>i</i>.</p>
<p>(⇒) If (<i>C</i><sub><i>i</i></sub>, <i>C</i><sub><i>i</i>+1</sub>) is missing, then <i>C</i><sub><i>i</i>+1</sub> cannot reach <i>C</i><sub><i>i</i></sub>, because it comes later in topological order. And <i>C</i><sub><i>i</i></sub> cannot reach <i>C</i><sub><i>i</i>+1</sub> either: any path would have to go through some <i>C</i><sub><i>j</i></sub> with <i>i</i> &lt; <i>j</i> &lt; <i>i</i> + 1, and no such index exists. So vertices <i>u</i> ∈ <i>C</i><sub><i>i</i></sub> and <i>v</i> ∈ <i>C</i><sub><i>i</i>+1</sub> violate the definition.</p>`
},
{
  id: "G13", topic: "graphs", diff: 1, source: "CLRS 22.1-6", tags: ["adjacency matrix"],
  title: "Universal sink in O(n)",
  statement: `<p>A <i>universal sink</i> is a vertex with in-degree <i>n</i> − 1 and out-degree 0. Given the adjacency matrix of a directed graph, decide in <i>O</i>(<i>n</i>) time whether a universal sink exists.</p>`,
  solution: `<p>Keep a candidate <i>c</i> = 1. For <i>j</i> = 2, …, <i>n</i>: if A[<i>c</i>][<i>j</i>] = 1, set <i>c</i> = <i>j</i>.</p>
<p>Each check eliminates one vertex. If A[<i>c</i>][<i>j</i>] = 1, then <i>c</i> has an out-edge and is not a sink. If A[<i>c</i>][<i>j</i>] = 0, then <i>j</i> is missing an in-edge from <i>c</i> and is not a universal sink. So the final <i>c</i> is the only possible sink. Verify it in <i>O</i>(<i>n</i>): row <i>c</i> must be all 0s, and column <i>c</i> must be all 1s except A[<i>c</i>][<i>c</i>].</p>`
},
{
  id: "G14", topic: "graphs", diff: 2, source: "Classic", tags: ["BFS", "trees", "proof"],
  title: "Diameter of a tree with two BFS runs",
  statement: `<p>The diameter of a tree is the largest distance between any two nodes. Show that this algorithm finds it in <i>O</i>(<i>n</i>) time: BFS from any node <i>r</i> to find the farthest node <i>a</i>; then BFS from <i>a</i> to find the farthest node <i>b</i>; output dist(<i>a</i>, <i>b</i>).</p>`,
  hint: `<p>Show that <i>a</i> is an endpoint of some longest path. Let (<i>x</i>, <i>y</i>) be a longest path and consider where the path from <i>r</i> to <i>a</i> meets it.</p>`,
  solution: `<p><b>Claim:</b> <i>a</i> is an endpoint of some diameter. Given the claim, the second BFS finds the diameter, and both BFS runs are <i>O</i>(<i>n</i>).</p>
<p>Let <i>P</i> be a diameter path from <i>x</i> to <i>y</i>, of length <i>D</i>. For any vertex <i>v</i>, let π(<i>v</i>) be the vertex of <i>P</i> closest to <i>v</i>. In a tree, d(<i>v</i>, <i>z</i>) = d(<i>v</i>, π(<i>v</i>)) + d(π(<i>v</i>), <i>z</i>) for every <i>z</i> on <i>P</i>. Let <i>u</i> = π(<i>r</i>) and <i>w</i> = π(<i>a</i>), and suppose without loss of generality that d(<i>u</i>, <i>y</i>) ≥ d(<i>u</i>, <i>x</i>). We use the fact that <i>a</i> is farthest from <i>r</i>, so d(<i>r</i>, <i>a</i>) ≥ d(<i>r</i>, <i>x</i>) and d(<i>r</i>, <i>a</i>) ≥ d(<i>r</i>, <i>y</i>).</p>
<ul>
<li><b><i>w</i> = <i>u</i>:</b> d(<i>r</i>, <i>u</i>) + d(<i>u</i>, <i>x</i>) = d(<i>r</i>, <i>x</i>) ≤ d(<i>r</i>, <i>a</i>) ≤ d(<i>r</i>, <i>u</i>) + d(<i>u</i>, <i>a</i>), so d(<i>u</i>, <i>a</i>) ≥ d(<i>u</i>, <i>x</i>). Then d(<i>a</i>, <i>y</i>) = d(<i>a</i>, <i>u</i>) + d(<i>u</i>, <i>y</i>) ≥ <i>D</i>.</li>
<li><b><i>w</i> strictly between <i>u</i> and <i>y</i>:</b> d(<i>r</i>, <i>a</i>) = d(<i>r</i>, <i>u</i>) + d(<i>u</i>, <i>w</i>) + d(<i>w</i>, <i>a</i>), and d(<i>r</i>, <i>y</i>) = d(<i>r</i>, <i>u</i>) + d(<i>u</i>, <i>w</i>) + d(<i>w</i>, <i>y</i>). So d(<i>w</i>, <i>a</i>) ≥ d(<i>w</i>, <i>y</i>), and d(<i>x</i>, <i>a</i>) = d(<i>x</i>, <i>w</i>) + d(<i>w</i>, <i>a</i>) ≥ <i>D</i>.</li>
<li><b><i>w</i> strictly between <i>u</i> and <i>x</i>:</b> from d(<i>r</i>, <i>a</i>) ≥ d(<i>r</i>, <i>y</i>) we get d(<i>u</i>, <i>w</i>) + d(<i>w</i>, <i>a</i>) ≥ d(<i>u</i>, <i>y</i>). Then d(<i>y</i>, <i>a</i>) = d(<i>y</i>, <i>u</i>) + d(<i>u</i>, <i>w</i>) + d(<i>w</i>, <i>a</i>) ≥ 2·d(<i>u</i>, <i>y</i>) ≥ d(<i>u</i>, <i>y</i>) + d(<i>u</i>, <i>x</i>) = <i>D</i>.</li>
</ul>
<p>In every case, some path starting at <i>a</i> has length at least <i>D</i>, so it is a diameter.</p>`
},
{
  id: "G15", topic: "graphs", diff: 2, source: "Classic", tags: ["BFS", "girth"],
  title: "Shortest cycle (girth) of an unweighted graph",
  statement: `<p>Find the length of a shortest cycle in an undirected, unweighted graph in <i>O</i>(<i>nm</i>) time.</p>`,
  solution: `<p>For each vertex <i>r</i>, run BFS from <i>r</i>. Whenever you scan an edge (<i>u</i>, <i>w</i>) where <i>w</i> is already discovered and <i>w</i> is not the BFS parent of <i>u</i>, record the candidate length d(<i>u</i>) + d(<i>w</i>) + 1. Return the minimum candidate over all runs.</p>
<p><b>Correctness.</b> Each candidate is at least the length of some real cycle: the two tree paths back to <i>r</i> plus the edge contain a cycle, possibly shorter if the paths share a prefix. So the answer is never below the girth. Now take a shortest cycle <i>C</i> of length <i>g</i> and run BFS from a vertex <i>r</i> on <i>C</i>. Some edge of <i>C</i> joins two vertices whose distances along <i>C</i> from <i>r</i> sum to <i>g</i> − 1. Their BFS distances are at most those values, so that edge produces a candidate of at most <i>g</i>. Running <i>n</i> BFS searches costs <i>O</i>(<i>n</i>(<i>n</i> + <i>m</i>)).</p>`
},
{
  id: "G16", topic: "graphs", diff: 2, source: "CLRS 22.5 (lemma 22.14)", tags: ["SCC", "Kosaraju", "proof"],
  title: "Why Kosaraju's SCC algorithm works",
  statement: `<p>Kosaraju's algorithm runs DFS on <i>G</i> to get finishing times, then runs DFS on <i>G</i><sup>T</sup>, starting new trees in decreasing order of finishing time. Each tree of the second DFS is one SCC.</p>
<ol><li>For an SCC <i>C</i>, let f(<i>C</i>) be the largest finishing time of any vertex in <i>C</i>. Prove: if there is an edge from SCC <i>C</i> to SCC <i>C</i>′, then f(<i>C</i>) &gt; f(<i>C</i>′).</li>
<li>Use (1) to explain why each tree of the second DFS is exactly one SCC.</li></ol>`,
  solution: `<p><b>(1)</b> Let <i>x</i> be the first vertex of <i>C</i> ∪ <i>C</i>′ that DFS discovers.</p>
<ul><li>If <i>x</i> ∈ <i>C</i>: at that moment, all of <i>C</i> ∪ <i>C</i>′ is unvisited and reachable from <i>x</i> (through the edge from <i>C</i> to <i>C</i>′). By the white-path theorem, every vertex of <i>C</i> ∪ <i>C</i>′ becomes a descendant of <i>x</i> and finishes before <i>x</i>. So f(<i>C</i>) = f(<i>x</i>) &gt; f(<i>C</i>′).</li>
<li>If <i>x</i> ∈ <i>C</i>′: all of <i>C</i>′ finishes inside <i>x</i>'s visit. <i>C</i> is not reachable from <i>C</i>′, since otherwise the two would be one SCC. So no vertex of <i>C</i> has been discovered when <i>x</i> finishes, and all of them finish later. So f(<i>C</i>) &gt; f(<i>C</i>′).</li></ul>
<p><b>(2)</b> The second DFS starts at the vertex with the largest finishing time, which lies in an SCC <i>C</i> with the largest f. In <i>G</i><sup>T</sup> the edges between SCCs are reversed. By (1), every edge leaving <i>C</i> in <i>G</i><sup>T</sup> goes to an SCC with a <i>larger</i> f, and none exists. So the DFS tree is exactly <i>C</i>. By induction, each later tree starts in the unvisited SCC with the largest f. Its reversed out-edges only lead to SCCs with larger f, which are already visited. So each tree is exactly one SCC.</p>`
},
{
  id: "G17", topic: "graphs", diff: 1, source: "Lecture 7 extension", tags: ["DFS", "cycle", "certificate"],
  title: "Output a directed cycle",
  statement: `<p>Modify DFS so that, given a directed graph, it either outputs a topological order or outputs an actual directed cycle, in <i>O</i>(<i>n</i> + <i>m</i>) time.</p>`,
  solution: `<p>Color the vertices white, gray (on the recursion stack), or black (finished), and store DFS parent pointers. When scanning an edge (<i>u</i>, <i>v</i>) where <i>v</i> is gray, it is a back edge, and <i>v</i> is an ancestor of <i>u</i>. Output the cycle <i>v</i> → … → <i>u</i> → <i>v</i> by following parent pointers from <i>u</i> up to <i>v</i> and reversing. If no back edge appears, output the vertices in reverse finishing order, which is a topological order (lecture). The time is <i>O</i>(<i>n</i> + <i>m</i>).</p>`
},
{
  id: "G18", topic: "graphs", diff: 3, source: "CLRS 22-2 / Tarjan", tags: ["DFS", "bridges", "articulation points", "low-link"],
  title: "Bridges and articulation points",
  statement: `<p>In a connected undirected graph, a <i>bridge</i> is an edge whose removal disconnects the graph, and an <i>articulation point</i> is a vertex whose removal disconnects it. Using a single DFS, find all bridges and all articulation points in <i>O</i>(<i>n</i> + <i>m</i>) time.</p>`,
  hint: `<p>Define low(<i>v</i>) as the smallest discovery time reachable from <i>v</i>'s subtree using tree edges plus at most one back edge.</p>`,
  solution: `<p>Run DFS and record the discovery time d(<i>v</i>). Compute</p>
<p style="text-align:center">low(<i>v</i>) = min( d(<i>v</i>), d(<i>w</i>) for each back edge (<i>v</i>, <i>w</i>), low(<i>c</i>) for each child <i>c</i> ).</p>
<p>All of this can be done in post-order during the same DFS.</p>
<ul><li><b>Bridge:</b> the tree edge (<i>p</i>, <i>v</i>) is a bridge if and only if low(<i>v</i>) &gt; d(<i>p</i>). In that case no back edge from <i>v</i>'s subtree climbs to <i>p</i> or above, so removing (<i>p</i>, <i>v</i>) cuts the subtree off. Non-tree (back) edges are never bridges, because they lie on a cycle.</li>
<li><b>Articulation point:</b> the root is an articulation point if and only if it has at least 2 DFS children. A non-root <i>u</i> is one if and only if some child <i>c</i> has low(<i>c</i>) ≥ d(<i>u</i>), since then <i>c</i>'s subtree can only escape through <i>u</i>.</li></ul>
<p>This works because an undirected DFS has no cross edges, so the only way out of a subtree is through a back edge to an ancestor.</p>`
},
{
  id: "G19", topic: "graphs", diff: 3, source: "Robbins' theorem", tags: ["DFS", "bridges", "orientation"],
  title: "Making every street one-way",
  statement: `<p>Given a connected undirected graph, decide whether its edges can be oriented so that the result is strongly connected. If so, produce such an orientation. Use <i>O</i>(<i>n</i> + <i>m</i>) time.</p>`,
  solution: `<p>Such an orientation exists <b>if and only if the graph has no bridge</b>. If (<i>u</i>, <i>v</i>) is a bridge, then whichever way you orient it, one side can no longer reach the other.</p>
<p><b>Construction:</b> run DFS and orient tree edges from parent to child (downward) and back edges from descendant to ancestor (upward). The root reaches every vertex using tree edges. To show every vertex reaches the root, use induction on d(<i>v</i>). If <i>v</i> is not the root and (<i>p</i>, <i>v</i>) is not a bridge, then low(<i>v</i>) ≤ d(<i>p</i>) &lt; d(<i>v</i>). So from <i>v</i> you can go down the tree and then take a back edge up to a vertex with a smaller discovery time, which reaches the root by induction. Use G18 to check for bridges first.</p>`
},
{
  id: "G20", topic: "graphs", diff: 2, source: "Dasgupta–Papadimitriou–Vazirani Ch. 3 style", tags: ["SCC", "DAG DP"],
  title: "Cheapest reachable price",
  statement: `<p>Every vertex <i>v</i> of a directed graph has a price <i>p</i>(<i>v</i>). For every vertex <i>u</i>, compute cost(<i>u</i>) = min{ <i>p</i>(<i>v</i>) : <i>v</i> reachable from <i>u</i> }, counting <i>u</i> itself as reachable. Use <i>O</i>(<i>n</i> + <i>m</i>) time.</p>`,
  hint: `<p>First solve it for a DAG using reverse topological order. Then handle cycles.</p>`,
  solution: `<p><b>DAG case:</b> process vertices in reverse topological order and set cost(<i>u</i>) = min(<i>p</i>(<i>u</i>), min<sub>(<i>u</i>,<i>w</i>)</sub> cost(<i>w</i>)).</p>
<p><b>General case:</b> all vertices in one SCC reach the same set, so they share a cost. Compute the SCCs and give each component the price min<sub>v∈C</sub> <i>p</i>(<i>v</i>). Run the DAG DP on the condensation, then give each vertex its component's value. The total is <i>O</i>(<i>n</i> + <i>m</i>).</p>`
},
{
  id: "G21", topic: "graphs", diff: 2, source: "HW4 (chicken farm) variant", tags: ["BFS", "multi-source"],
  title: "Distance to the nearest fire station",
  statement: `<p>A city is an unweighted undirected graph, and <i>k</i> of its vertices have fire stations. Compute, for every vertex, the distance to its nearest fire station in <i>O</i>(<i>n</i> + <i>m</i>) time, which is <b>not</b> <i>O</i>(<i>k</i>(<i>n</i> + <i>m</i>)).</p>`,
  solution: `<p>Use multi-source BFS: put all <i>k</i> stations into the queue at distance 0, then run ordinary BFS. This is the same as adding a super-source joined to every station and running one BFS, then subtracting 1. The layer-by-layer property of BFS still holds, so each vertex is discovered at its distance to the nearest station. The time is <i>O</i>(<i>n</i> + <i>m</i>).</p>`
}
);
