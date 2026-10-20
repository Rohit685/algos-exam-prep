window.PROBLEMS = window.PROBLEMS || [];
window.PROBLEMS.push(
{
  id: "S1", topic: "shortest", diff: 1, source: "Classic", tags: ["Dijkstra", "counterexample"],
  title: "Breaking Dijkstra (two fixes that don't work)",
  statement: `<ol><li>Give a 3-vertex graph with one negative edge and no negative cycle where Dijkstra returns a wrong distance.</li>
<li>A classmate suggests a fix: "add |min weight| to every edge so all weights are non-negative, then run Dijkstra." Show that this fix is wrong.</li>
<li>Does <i>multiplying</i> every weight by a constant <i>c</i> &gt; 0 preserve shortest paths? What about squaring every positive weight?</li></ol>`,
  solution: `<ol><li>Edges s→a (2), s→b (3), b→a (−2). Dijkstra finalizes <i>a</i> with distance 2, but s→b→a has length 1.</li>
<li>Adding a constant <i>c</i> to every edge adds <i>c</i>·(number of edges) to each path, which penalizes paths with many edges. Example: s→t (6) versus s→a→b→t with weights 1, 1, 1 (total 3). After adding 3, the direct edge costs 9 and the 3-edge path costs 12, so the shortest path changes.</li>
<li>Multiplying by <i>c</i> &gt; 0 scales every path by the same factor, so shortest paths are preserved. Squaring is <b>not</b> safe: the single edge of weight 2 beats the path 1 + 1 + 1 = 3, but after squaring the edge costs 4 and the path costs 3, so the path wins. (Compare with MSTs, where any increasing transformation of the weights is safe.)</li></ol>`
},
{
  id: "S2", topic: "shortest", diff: 2, source: "CLRS 24.3-6 / HW4 P2", tags: ["Dijkstra", "log transform"],
  title: "Most reliable path",
  statement: `<p>Each directed edge (<i>u</i>, <i>v</i>) of a network has a probability <i>r</i>(<i>u</i>, <i>v</i>) ∈ (0, 1] that it does not fail, and failures are independent. Find the most reliable path from <i>s</i> to <i>t</i>, meaning the one maximizing the product of its edge probabilities. Give two different approaches and justify each.</p>`,
  solution: `<p><b>Approach 1 (transform):</b> set <i>w</i>(<i>u</i>, <i>v</i>) = −log <i>r</i>(<i>u</i>, <i>v</i>) ≥ 0. Maximizing Π<i>r</i> is the same as minimizing Σ−log <i>r</i>, because log is increasing. All weights are non-negative, so Dijkstra applies, in <i>O</i>(<i>m</i> log <i>n</i>) time.</p>
<p><b>Approach 2 (direct):</b> run Dijkstra with a max-heap, the key <i>R</i>(<i>s</i>) = 1, and the relaxation <i>R</i>(<i>v</i>) = max(<i>R</i>(<i>v</i>), <i>R</i>(<i>u</i>)·<i>r</i>(<i>u</i>, <i>v</i>)). This is correct because multiplying by a factor of at most 1 never increases a value, which is the same monotonicity that non-negative weights give the usual Dijkstra. The exchange argument goes through unchanged.</p>`
},
{
  id: "S3", topic: "shortest", diff: 2, source: "CLRS 24-3", tags: ["Bellman–Ford", "negative cycle", "arbitrage"],
  title: "Currency arbitrage",
  statement: `<p>You are given <i>n</i> currencies and an exchange table <i>R</i>[<i>i</i>][<i>j</i>], the number of units of currency <i>j</i> you get for one unit of currency <i>i</i>. An <i>arbitrage</i> is a cycle <i>i</i><sub>1</sub> → <i>i</i><sub>2</sub> → … → <i>i</i><sub><i>k</i></sub> → <i>i</i><sub>1</sub> with Π<i>R</i> &gt; 1. Give an <i>O</i>(<i>n</i><sup>3</sup>) algorithm that detects an arbitrage and prints one if it exists.</p>`,
  solution: `<p>Set the edge weights to <i>w</i>(<i>i</i>, <i>j</i>) = −log <i>R</i>[<i>i</i>][<i>j</i>]. Then Π<i>R</i> &gt; 1 ⇔ Σ log <i>R</i> &gt; 0 ⇔ Σ<i>w</i> &lt; 0, so an arbitrage is exactly a <b>negative cycle</b>.</p>
<p>Add a super-source joined to every currency with weight 0, and run Bellman–Ford: <i>n</i> − 1 rounds of <i>O</i>(<i>n</i><sup>2</sup>) edges each, for <i>O</i>(<i>n</i><sup>3</sup>) total. If round <i>n</i> still relaxes an edge into some vertex <i>v</i>, a negative cycle exists. To print it, follow predecessor pointers from <i>v</i> for <i>n</i> steps, which guarantees you are on the cycle. Then keep following pointers until you return to the same vertex. (Floyd–Warshall also works: look for some <i>d</i>[<i>i</i>][<i>i</i>] &lt; 0.)</p>`
},
{
  id: "S4", topic: "shortest", diff: 2, source: "Classic", tags: ["Dijkstra", "counting"],
  title: "Count the shortest paths",
  statement: `<p>Given a directed graph with <b>positive</b> weights, compute for every vertex <i>v</i> the number of distinct shortest s→v paths in <i>O</i>(<i>m</i> log <i>n</i>) time. Why does the algorithm break if zero-weight edges are allowed?</p>`,
  solution: `<p>Run Dijkstra and keep a count cnt, with cnt(<i>s</i>) = 1. When relaxing (<i>u</i>, <i>v</i>): if d(<i>u</i>) + <i>w</i> &lt; d(<i>v</i>), set d(<i>v</i>) = d(<i>u</i>) + <i>w</i> and cnt(<i>v</i>) = cnt(<i>u</i>). If d(<i>u</i>) + <i>w</i> = d(<i>v</i>), add cnt(<i>u</i>) to cnt(<i>v</i>).</p>
<p>This works because every shortest-path predecessor <i>u</i> of <i>v</i> has d(<i>u</i>) &lt; d(<i>v</i>) when weights are positive. So all of them are extracted, with their final counts, before <i>v</i> is extracted. With zero-weight edges two vertices can tie, so a vertex might pass along its count before receiving all of its own. Cycles of zero weight would even make the count infinite. One fix is to restrict to the "tight" edges and process them in topological order.</p>`
},
{
  id: "S5", topic: "shortest", diff: 1, source: "Classic", tags: ["Dijkstra", "tie-breaking"],
  title: "Shortest path with the fewest edges",
  statement: `<p>Among all minimum-weight s→t paths, find one that uses the fewest edges. The weights are non-negative.</p>`,
  solution: `<p>Run Dijkstra on pairs (distance, hops), compared lexicographically. Relax with (d(<i>u</i>) + <i>w</i>, h(<i>u</i>) + 1). Pairs add componentwise, and adding a non-negative edge pair never makes a pair lexicographically smaller, so Dijkstra's correctness proof goes through. Equivalently, use the weights <i>w</i>′ = <i>w</i>·(<i>n</i>) + 1 when weights are integers: any weight difference outweighs every possible difference in hop count, since paths have fewer than <i>n</i> edges.</p>`
},
{
  id: "S6", topic: "shortest", diff: 1, source: "CLRS 24.2", tags: ["DAG", "negative weights", "longest path"],
  title: "Shortest and longest paths in a DAG",
  statement: `<p>Give an <i>O</i>(<i>n</i> + <i>m</i>) algorithm for single-source shortest paths in a DAG whose weights may be negative. Then explain how to compute <b>longest</b> paths in a DAG, and why the same trick fails in general graphs.</p>`,
  solution: `<p>Topologically sort the DAG, set d(<i>s</i>) = 0 and all other distances to ∞, and relax each vertex's out-edges in topological order. When <i>v</i> is processed, every predecessor of <i>v</i> on any path has already been finalized, so d(<i>v</i>) is correct by induction. Negative weights are fine because a DAG has no cycles at all.</p>
<p><b>Longest paths:</b> negate all the weights (or use max instead of min). This is valid only because the graph is a DAG. In general graphs, longest simple path is NP-hard, and negating the weights creates negative cycles.</p>`
},
{
  id: "S7", topic: "shortest", diff: 2, source: "K–T Ch. 4 / CLRS-style", tags: ["Dijkstra", "bottleneck", "widest path"],
  title: "Widest (maximum bottleneck) path",
  statement: `<p>Each road has a height clearance <i>c</i>(<i>e</i>). A truck wants a route from <i>s</i> to <i>t</i> whose smallest clearance is as large as possible. Give an <i>O</i>(<i>m</i> log <i>n</i>) algorithm. Bonus: for an undirected graph, relate the answer to a spanning tree.</p>`,
  solution: `<p><b>Modified Dijkstra:</b> let <i>b</i>(<i>v</i>) be the best bottleneck found so far, with <i>b</i>(<i>s</i>) = ∞ and all others −∞. Use a max-heap. Repeatedly extract the <i>u</i> with the largest <i>b</i>, and for each edge set <i>b</i>(<i>v</i>) = max(<i>b</i>(<i>v</i>), min(<i>b</i>(<i>u</i>), <i>c</i>(<i>u</i>, <i>v</i>))). This works because extending a path never increases its bottleneck, which is the same monotonicity Dijkstra needs.</p>
<p><b>Undirected bonus:</b> in a <i>maximum</i> spanning tree, the tree path between <i>s</i> and <i>t</i> is a widest path. Suppose a better path existed, so all its edges are wider than the narrowest tree edge <i>e</i> on the s–t tree path. Removing <i>e</i> splits the tree into two sides, and that better path must contain some edge crossing between them. Swapping that edge in for <i>e</i> gives a heavier spanning tree, a contradiction. This is the cut property for maximum spanning trees, and K–T's "minimum altitude" exercise is the mirror image of this problem.</p>`
},
{
  id: "S8", topic: "shortest", diff: 2, source: "Classic (state graph)", tags: ["Dijkstra", "layered graph"],
  title: "One free road (coupon)",
  statement: `<p>You may make at most one road cost 0. Find the cheapest s→t route with non-negative weights in <i>O</i>(<i>m</i> log <i>n</i>) time. Generalize the idea to <i>k</i> coupons.</p>`,
  solution: `<p>Build a 2-layer graph with vertices (<i>v</i>, 0) for "coupon unused" and (<i>v</i>, 1) for "coupon used". Each edge (<i>u</i>, <i>v</i>, <i>w</i>) becomes (<i>u</i>,0)→(<i>v</i>,0) with weight <i>w</i>, (<i>u</i>,1)→(<i>v</i>,1) with weight <i>w</i>, and (<i>u</i>,0)→(<i>v</i>,1) with weight 0. Run Dijkstra from (<i>s</i>, 0) and answer min(d(<i>t</i>,0), d(<i>t</i>,1)). The new graph has 2<i>n</i> vertices and 3<i>m</i> edges.</p>
<p><b>Alternative:</b> run Dijkstra from <i>s</i> in <i>G</i> and from <i>t</i> in <i>G</i><sup>R</sup>, then answer min over edges (<i>u</i>, <i>v</i>) of d<sub>s</sub>(<i>u</i>) + d<sub>t</sub>(<i>v</i>), together with d<sub>s</sub>(<i>t</i>). With <i>k</i> coupons, use <i>k</i> + 1 layers.</p>`
},
{
  id: "S9", topic: "shortest", diff: 2, source: "CLRS 24.3-8", tags: ["Dijkstra", "bucket queue"],
  title: "Small integer weights",
  statement: `<p>All edge weights are integers in {0, 1, …, <i>W</i>}. Modify Dijkstra to run in <i>O</i>(<i>Wn</i> + <i>m</i>) time.</p>`,
  solution: `<p>Every distance is at most <i>W</i>(<i>n</i> − 1). Replace the heap with an array of buckets indexed 0 … <i>W</i>(<i>n</i> − 1), where bucket <i>k</i> holds the vertices with tentative distance <i>k</i>. A decrease-key moves a vertex between buckets in <i>O</i>(1) using doubly linked lists. Scan the buckets in increasing order and extract vertices as you go. The pointer only moves forward, because extracted distances never decrease. That gives <i>O</i>(<i>Wn</i>) for scanning plus <i>O</i>(<i>m</i>) for relaxations.</p>
<p><b>Alternative:</b> replace each edge of weight <i>w</i> ≥ 1 with a path of <i>w</i> unit edges and run BFS. That costs <i>O</i>(<i>n</i> + <i>Wm</i>), which is a different bound.</p>`
},
{
  id: "S10", topic: "shortest", diff: 1, source: "Classic", tags: ["transformation", "vertex weights"],
  title: "Vertex weights instead of edge weights",
  statement: `<p>Each vertex <i>v</i> has a non-negative cost <i>c</i>(<i>v</i>) for passing through it, and edges are free. Find the cheapest s→t path, counting both endpoints. Show two reductions to ordinary Dijkstra.</p>`,
  solution: `<ol><li><b>Push the cost onto incoming edges:</b> give each edge (<i>u</i>, <i>v</i>) the weight <i>c</i>(<i>v</i>), and add <i>c</i>(<i>s</i>) at the end.</li>
<li><b>Vertex splitting:</b> replace <i>v</i> with <i>v</i><sub>in</sub> → <i>v</i><sub>out</sub> of weight <i>c</i>(<i>v</i>). Each edge (<i>u</i>, <i>v</i>) becomes <i>u</i><sub>out</sub> → <i>v</i><sub>in</sub> with weight 0. The same splitting trick is how you handle vertex capacities in network flow.</li></ol>`
},
{
  id: "S11", topic: "shortest", diff: 2, source: "Classic (Bellman–Ford)", tags: ["Bellman–Ford", "hop limit"],
  title: "Cheapest flight with at most k stops",
  statement: `<p>Find the cheapest route from <i>s</i> to <i>t</i> that uses <b>at most k edges</b>. The weights may be negative. Give an <i>O</i>(<i>km</i>) algorithm and point out the subtle bug in the naive implementation.</p>`,
  solution: `<p>Bellman–Ford maintains the invariant that after round <i>i</i>, d(<i>v</i>) ≤ the shortest path to <i>v</i> using at most <i>i</i> edges. But the standard in-place version can do <i>better</i> than that, because a single round can relax a chain of several edges. To get exactly "≤ <i>i</i> edges", compute each round from the <b>previous round's copy</b>: new[<i>v</i>] = min(prev[<i>v</i>], min<sub>(<i>u</i>,<i>v</i>)</sub> prev[<i>u</i>] + <i>w</i>(<i>u</i>, <i>v</i>)). After <i>k</i> rounds, new[<i>t</i>] is the answer. This is the DP OPT(<i>i</i>, <i>v</i>) and takes <i>O</i>(<i>km</i>).</p>`
},
{
  id: "S12", topic: "shortest", diff: 2, source: "CLRS 24.1-4", tags: ["Bellman–Ford", "negative cycle"],
  title: "Which vertices have distance −∞?",
  statement: `<p>Given a directed graph that may contain negative cycles, label each vertex <i>v</i> with d(<i>s</i>, <i>v</i>) ∈ ℝ ∪ {+∞, −∞} in <i>O</i>(<i>nm</i>) time.</p>`,
  solution: `<p>Run Bellman–Ford for <i>n</i> − 1 rounds. Then run one more round and mark every vertex <i>v</i> whose distance still decreases. Every marked vertex is on, or reachable from, a negative cycle that is reachable from <i>s</i>. Conversely, every vertex on such a cycle can reach a marked vertex: some edge on the cycle must still be relaxable, otherwise summing the inequalities around the cycle would give a non-negative total. So run BFS/DFS from all the marked vertices; everything reached has distance −∞. Unreached vertices that were never discovered have distance +∞. Every other vertex has the finite value Bellman–Ford found.</p>`
},
{
  id: "S13", topic: "shortest", diff: 2, source: "CLRS 25.2 (hand trace)", tags: ["Floyd–Warshall", "APSP", "trace"],
  title: "Floyd–Warshall by hand",
  statement: `<p>Vertices 1–4 with directed edges: 1→2 (3), 1→3 (8), 2→4 (1), 3→2 (4), 4→1 (2), 4→3 (−5).</p>
<ol><li>Write D<sup>(0)</sup>.</li><li>Write D<sup>(1)</sup>, allowing only vertex 1 as an intermediate.</li><li>Give the final matrix D<sup>(4)</sup>. Is there a negative cycle?</li></ol>`,
  solution: `<p><b>D<sup>(0)</sup></b> (rows are sources, columns are destinations):</p>
<table class="mini"><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
<tr><th>1</th><td>0</td><td>3</td><td>8</td><td>∞</td></tr>
<tr><th>2</th><td>∞</td><td>0</td><td>∞</td><td>1</td></tr>
<tr><th>3</th><td>∞</td><td>4</td><td>0</td><td>∞</td></tr>
<tr><th>4</th><td>2</td><td>∞</td><td>−5</td><td>0</td></tr></table>
<p><b>D<sup>(1)</sup>:</b> only row 4 can improve, because 4 is the only vertex with an edge into 1. We get d(4, 2) = 2 + 3 = 5, and d(4, 3) = min(−5, 2 + 8) = −5. Every other entry is unchanged.</p>
<p><b>Final D<sup>(4)</sup>:</b></p>
<table class="mini"><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
<tr><th>1</th><td>0</td><td>3</td><td>−1</td><td>4</td></tr>
<tr><th>2</th><td>3</td><td>0</td><td>−4</td><td>1</td></tr>
<tr><th>3</th><td>7</td><td>4</td><td>0</td><td>5</td></tr>
<tr><th>4</th><td>2</td><td>−1</td><td>−5</td><td>0</td></tr></table>
<p>For example, d(1, 3) = 1→2→4→3 = 3 + 1 − 5 = −1. The diagonal is all 0, so there is no negative cycle. The cycle 2→4→3→2 has weight exactly 0.</p>`
},
{
  id: "S14", topic: "shortest", diff: 2, source: "CLRS 25.3", tags: ["Johnson", "reweighting", "APSP"],
  title: "Johnson's reweighting",
  statement: `<p>Given potentials <i>h</i>: <i>V</i> → ℝ, define <i>ŵ</i>(<i>u</i>, <i>v</i>) = <i>w</i>(<i>u</i>, <i>v</i>) + <i>h</i>(<i>u</i>) − <i>h</i>(<i>v</i>).</p>
<ol><li>Prove that a path is shortest under <i>w</i> if and only if it is shortest under <i>ŵ</i>.</li>
<li>Show that if <i>h</i>(<i>v</i>) = δ(<i>q</i>, <i>v</i>), where <i>q</i> is a new vertex with 0-weight edges to every vertex, then <i>ŵ</i> ≥ 0.</li>
<li>State Johnson's running time and say when it beats Floyd–Warshall.</li></ol>`,
  solution: `<ol><li>For any path <i>p</i> = v<sub>0</sub> … v<sub>k</sub>, the sum telescopes: <i>ŵ</i>(<i>p</i>) = <i>w</i>(<i>p</i>) + <i>h</i>(v<sub>0</sub>) − <i>h</i>(v<sub>k</sub>). Every path between the same two endpoints shifts by the same constant, so the ranking of paths is unchanged. Cycles keep their exact weight, so negative cycles are preserved too.</li>
<li>By the triangle inequality, δ(<i>q</i>, <i>v</i>) ≤ δ(<i>q</i>, <i>u</i>) + <i>w</i>(<i>u</i>, <i>v</i>), which rearranges to <i>ŵ</i>(<i>u</i>, <i>v</i>) ≥ 0. Compute <i>h</i> with one Bellman–Ford run from <i>q</i>, which also detects negative cycles.</li>
<li>One Bellman–Ford, <i>O</i>(<i>nm</i>), plus <i>n</i> Dijkstras, <i>O</i>(<i>nm</i> log <i>n</i>) with a binary heap, for <i>O</i>(<i>nm</i> log <i>n</i>) total. That beats Floyd–Warshall's Θ(<i>n</i><sup>3</sup>) on sparse graphs, roughly when <i>m</i> = <i>o</i>(<i>n</i><sup>2</sup>/log <i>n</i>).</li></ol>`
},
{
  id: "S15", topic: "shortest", diff: 2, source: "Classic", tags: ["Dijkstra", "two-sided search"],
  title: "Which new road helps most?",
  statement: `<p>You have a road network <i>G</i> with non-negative weights and a list <i>L</i> of <i>k</i> candidate new roads (<i>u</i><sub>i</sub>, <i>v</i><sub>i</sub>, <i>w</i><sub>i</sub>). You may build exactly one. Pick the candidate that minimizes the new dist(<i>s</i>, <i>t</i>) in <i>O</i>(<i>m</i> log <i>n</i> + <i>k</i>) time.</p>`,
  solution: `<p>Run Dijkstra from <i>s</i> in <i>G</i> to get d<sub>s</sub>(·), and from <i>t</i> in the reverse graph <i>G</i><sup>R</sup> to get d<sub>t</sub>(·). The best path that uses new road <i>i</i> costs d<sub>s</sub>(<i>u</i><sub>i</sub>) + <i>w</i><sub>i</sub> + d<sub>t</sub>(<i>v</i><sub>i</sub>). For an undirected road, also try the other orientation. Each candidate is evaluated in <i>O</i>(1). Pick the best one, comparing against d<sub>s</sub>(<i>t</i>). Using the road twice never helps, because weights are non-negative.</p>`
},
{
  id: "S16", topic: "shortest", diff: 2, source: "Classic", tags: ["Dijkstra", "shortest-path DAG"],
  title: "Is edge e on some or every shortest path?",
  statement: `<p>With non-negative weights, decide for a given edge <i>e</i> = (<i>u</i>, <i>v</i>) whether (a) <i>e</i> lies on <b>some</b> shortest s→t path, and (b) <i>e</i> lies on <b>every</b> shortest s→t path. Assume positive weights for (b).</p>`,
  solution: `<p><b>(a)</b> Compute d<sub>s</sub> from <i>s</i>, and d<sub>t</sub> from <i>t</i> in the reverse graph. Edge <i>e</i> is on some shortest path if and only if d<sub>s</sub>(<i>u</i>) + <i>w</i>(<i>e</i>) + d<sub>t</sub>(<i>v</i>) = d<sub>s</sub>(<i>t</i>).</p>
<p><b>(b)</b> Count shortest paths from <i>s</i> to every vertex, N<sub>s</sub>, and from every vertex to <i>t</i>, N<sub>t</sub> (see S4). Edge <i>e</i> is on every shortest path if and only if (a) holds and N<sub>s</sub>(<i>u</i>)·N<sub>t</sub>(<i>v</i>) = N<sub>s</sub>(<i>t</i>). The counts can be exponentially large, so in practice compute them modulo a random prime.</p>
<p><b>Count-free alternative:</b> keep only the edges that pass test (a). Edge <i>e</i> is on every shortest path if and only if no other such edge (<i>x</i>, <i>y</i>) has an interval (d<sub>s</sub>(<i>x</i>), d<sub>s</sub>(<i>y</i>)) overlapping (d<sub>s</sub>(<i>u</i>), d<sub>s</sub>(<i>v</i>)). Every shortest path has to cross each distance value somewhere.</p>`
},
{
  id: "S17", topic: "shortest", diff: 1, source: "Classic", tags: ["super-source", "Dijkstra"],
  title: "Nearest hospital for every town",
  statement: `<p>A weighted road network (non-negative weights) has a set <i>H</i> of hospital vertices. For every vertex, compute the distance to its nearest hospital, and which hospital that is, using a single Dijkstra.</p>`,
  solution: `<p>Add a super-source <i>z</i> with 0-weight edges to every hospital, or equivalently start Dijkstra with all hospitals in the heap at distance 0. Record the "origin" hospital of each vertex and pass it along whenever an edge relaxation succeeds. Then d(<i>z</i>, <i>v</i>) = min<sub>h∈H</sub> d(<i>h</i>, <i>v</i>). If the roads are one-way and you need the distance <i>to</i> a hospital, run this on the reverse graph. The time is <i>O</i>(<i>m</i> log <i>n</i>).</p>`
},
{
  id: "S18", topic: "shortest", diff: 2, source: "Classic (product graph)", tags: ["BFS", "parity"],
  title: "Shortest walk with an even number of edges",
  statement: `<p>In an unweighted directed graph, find the shortest s→t walk that uses an <b>even</b> number of edges, in <i>O</i>(<i>n</i> + <i>m</i>) time.</p>`,
  solution: `<p>Build the product graph on the vertices (<i>v</i>, <i>p</i>), <i>p</i> ∈ {0, 1}. Each edge (<i>u</i>, <i>v</i>) becomes (<i>u</i>, 0)→(<i>v</i>, 1) and (<i>u</i>, 1)→(<i>v</i>, 0). Run BFS from (<i>s</i>, 0) and return d((<i>t</i>, 0)). The product graph has 2<i>n</i> vertices and 2<i>m</i> edges. The same idea handles "length ≡ <i>r</i> (mod <i>k</i>)" with <i>k</i> copies.</p>`
},
{
  id: "S19", topic: "shortest", diff: 2, source: "Classic (0-1 BFS)", tags: ["BFS", "deque", "grid"],
  title: "Escape the maze by breaking the fewest walls",
  statement: `<p>In an <i>r</i> × <i>c</i> grid, some cells are walls. Moving to a free cell costs 0, and moving into a wall cell costs 1 because you have to break it. Find the minimum number of walls to break to get from the top-left corner to the bottom-right, in <i>O</i>(<i>rc</i>) time.</p>`,
  solution: `<p>This is a shortest path problem with weights in {0, 1}. Use <b>0-1 BFS</b> with a deque: when relaxing an edge of weight 0, push the vertex to the front; when relaxing an edge of weight 1, push it to the back. The deque always holds at most two distinct distance values, <i>d</i> and <i>d</i> + 1, in sorted order, so this behaves exactly like Dijkstra, with <i>O</i>(1) per operation. The total is <i>O</i>(<i>V</i> + <i>E</i>) = <i>O</i>(<i>rc</i>).</p>`
},
{
  id: "S20", topic: "shortest", diff: 2, source: "CLRS 24.1 / K–T 6.8", tags: ["Bellman–Ford", "proof"],
  title: "Why n − 1 rounds of Bellman–Ford suffice",
  statement: `<p>Prove that if <i>G</i> has no negative cycle reachable from <i>s</i>, then after <i>n</i> − 1 rounds of relaxing every edge, d(<i>v</i>) = δ(<i>s</i>, <i>v</i>) for all <i>v</i>. Then prove that if a negative cycle is reachable from <i>s</i>, some edge can still be relaxed after <i>n</i> − 1 rounds.</p>`,
  solution: `<p><b>Part 1.</b> With no negative cycle reachable, some shortest path to each <i>v</i> is simple, so it has at most <i>n</i> − 1 edges: <i>s</i> = v<sub>0</sub>, …, v<sub>k</sub> = <i>v</i>. By induction on <i>i</i>, after round <i>i</i>, d(v<sub>i</sub>) = δ(<i>s</i>, v<sub>i</sub>). Round <i>i</i> relaxes (v<sub>i−1</sub>, v<sub>i</sub>) after d(v<sub>i−1</sub>) is already correct. The values never drop below the true distances, because every d value is the length of a real path. So after <i>k</i> ≤ <i>n</i> − 1 rounds, d(<i>v</i>) is correct.</p>
<p><b>Part 2.</b> Suppose the cycle <i>c</i> = v<sub>0</sub> … v<sub>k</sub> = v<sub>0</sub> has negative weight but no edge on it can be relaxed: d(v<sub>i</sub>) ≤ d(v<sub>i−1</sub>) + <i>w</i>(v<sub>i−1</sub>, v<sub>i</sub>) for every <i>i</i>. Summing around the cycle, the d terms cancel and leave 0 ≤ <i>w</i>(<i>c</i>), a contradiction. (The d values are finite because the cycle is reachable.)</p>`
},
{
  id: "S21", topic: "shortest", diff: 2, source: "K–T 4.4 / CLRS 24.3", tags: ["Dijkstra", "proof"],
  title: "Prove Dijkstra correct",
  statement: `<p>With non-negative weights, prove that when Dijkstra extracts <i>u</i> from the priority queue, d(<i>u</i>) = δ(<i>s</i>, <i>u</i>). Point out exactly where the proof uses non-negativity.</p>`,
  solution: `<p><b>Invariant:</b> for every vertex in the explored set <i>S</i>, d is correct. Suppose <i>u</i> is the next vertex extracted, and let <i>P</i> be any s→u path. <i>P</i> leaves <i>S</i> for the first time along some edge (<i>x</i>, <i>y</i>) with <i>x</i> ∈ <i>S</i> and <i>y</i> ∉ <i>S</i>. Then</p>
<p style="text-align:center">len(<i>P</i>) ≥ len(s⇝x) + <i>w</i>(<i>x</i>, <i>y</i>) ≥ d(<i>x</i>) + <i>w</i>(<i>x</i>, <i>y</i>) ≥ d(<i>y</i>) ≥ d(<i>u</i>).</p>
<p>The first inequality uses <b>non-negativity</b>: the rest of <i>P</i>, from <i>y</i> to <i>u</i>, has length ≥ 0. The next two hold because x→y was relaxed when <i>x</i> was added to <i>S</i>. The last holds because <i>u</i> had the minimum key. So no path is shorter than d(<i>u</i>), and d(<i>u</i>) is the length of an actual path, so d(<i>u</i>) = δ(<i>s</i>, <i>u</i>).</p>`
},
{
  id: "S22", topic: "shortest", diff: 1, source: "Exam staple", tags: ["APSP", "running time", "algorithm choice"],
  title: "Pick the right shortest path algorithm",
  statement: `<p>For each setting, name the best algorithm and its running time.</p>
<ol><li>Single source, unweighted.</li><li>Single source, weights ≥ 0.</li><li>Single source, negative weights allowed, need to detect negative cycles.</li><li>Single source, DAG with arbitrary weights.</li><li>All pairs, dense graph, negative weights.</li><li>All pairs, sparse graph, negative weights.</li><li>All pairs, unweighted.</li></ol>`,
  solution: `<ol><li>BFS: <i>O</i>(<i>n</i> + <i>m</i>).</li><li>Dijkstra: <i>O</i>(<i>m</i> log <i>n</i>) with a binary heap, or <i>O</i>(<i>m</i> + <i>n</i> log <i>n</i>) with a Fibonacci heap.</li><li>Bellman–Ford: <i>O</i>(<i>nm</i>).</li><li>Topological order plus relaxation: <i>O</i>(<i>n</i> + <i>m</i>).</li><li>Floyd–Warshall: Θ(<i>n</i><sup>3</sup>).</li><li>Johnson: <i>O</i>(<i>nm</i> log <i>n</i>).</li><li>BFS from every vertex: <i>O</i>(<i>n</i>(<i>n</i> + <i>m</i>)).</li></ol>`
},
{
  id: "S23", topic: "shortest", diff: 2, source: "CLRS 25.2 (transitive closure)", tags: ["Floyd–Warshall", "reachability"],
  title: "Transitive closure and negative-cycle detection with Floyd–Warshall",
  statement: `<ol><li>Adapt Floyd–Warshall to compute the transitive closure (the matrix of whether <i>i</i> can reach <i>j</i>) in Θ(<i>n</i><sup>3</sup>).</li>
<li>Show that <i>G</i> has a negative cycle if and only if some diagonal entry of the final matrix is negative.</li>
<li>State the Floyd–Warshall recurrence and explain why the loop over <i>k</i> must be the <b>outermost</b> loop.</li></ol>`,
  solution: `<ol><li>Use T[<i>i</i>][<i>j</i>] ← T[<i>i</i>][<i>j</i>] OR (T[<i>i</i>][<i>k</i>] AND T[<i>k</i>][<i>j</i>]), starting from the adjacency matrix with T[<i>i</i>][<i>i</i>] = 1.</li>
<li>If <i>i</i> is on a negative cycle, then once all of that cycle's vertices are allowed as intermediates, d[<i>i</i>][<i>i</i>] becomes at most the cycle's weight, which is below 0. Conversely, a negative d[<i>i</i>][<i>i</i>] is the weight of some closed walk through <i>i</i>, and a negative closed walk contains a negative simple cycle.</li>
<li>D<sup>(k)</sup>[i][j] = min(D<sup>(k−1)</sup>[i][j], D<sup>(k−1)</sup>[i][k] + D<sup>(k−1)</sup>[k][j]). Phase <i>k</i> must read values that are correct for intermediates {1..<i>k</i>−1} in <i>every</i> (<i>i</i>, <i>j</i>) pair. If the <i>k</i> loop is placed inside, some pairs get finalized before the intermediates they need have been processed.</li></ol>`
}
);
