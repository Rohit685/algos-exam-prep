window.PROBLEMS = window.PROBLEMS || [];
window.PROBLEMS.push(
{
  id: "F1", topic: "flow", diff: 1, source: "Exam staple (trace)", tags: ["Ford–Fulkerson", "residual graph", "min cut"],
  title: "Max flow and min cut by hand",
  statement: `<p>Edge capacities: s→a 10, s→b 10, a→b 2, a→c 4, a→d 8, b→d 9, d→c 6, c→t 10, d→t 10.</p>
<ol><li>Find a maximum flow and its value.</li><li>Draw the final residual graph and find the set <i>A</i> of vertices reachable from <i>s</i>.</li><li>Give a minimum cut and check that its capacity equals the flow value.</li></ol>`,
  hint: `<p>The cuts {s} and {c, d, t} both have capacity 20, but vertex <i>b</i> can only send 9 onward. Look at the cut {s, b}.</p>`,
  solution: `<p><b>Max flow = 19.</b> One maximum flow: s→a 10, s→b 9, a→c 4, a→d 6, a→b 0, b→d 9, d→c 6, d→t 9, c→t 10. Conservation holds: a has 10 in and 4 + 6 out; b has 9 in and 9 out; d has 6 + 9 = 15 in and 6 + 9 out; c has 4 + 6 in and 10 out.</p>
<p><b>Residual graph:</b> s→a is saturated, so the residual graph only has the back edge a→s. s→b has 1 unit left, so <i>s</i> reaches <i>b</i>. From <i>b</i>, the edge b→d is saturated, and the back edge b→a has residual capacity 0 because a→b carries no flow. So <i>A</i> = {s, b}.</p>
<p><b>Min cut</b> (<i>A</i>, <i>B</i>) = ({s, b}, {a, c, d, t}), with capacity c(s→a) + c(b→d) = 10 + 9 = <b>19</b>. The edge a→b points into <i>A</i>, so it does not count.</p>`
},
{
  id: "F2", topic: "flow", diff: 1, source: "K–T 7.1 / CLRS 26.2", tags: ["residual graph", "back edges"],
  title: "Why do we need back edges?",
  statement: `<p>Edges, each of capacity 1: s→a, s→b, a→b, a→t, b→t. Show that naive "augment along any s–t path until none is left, without residual back edges" can get stuck below the maximum flow. Then show how the residual graph fixes this.</p>`,
  solution: `<p>If the first path is s→a→b→t, then s→a, a→b, and b→t are all full. Without back edges, the only remaining edges out of <i>s</i> lead nowhere useful (s→b, but b→t is full), so the flow is stuck at 1. The maximum is 2: s→a→t plus s→b→t.</p>
<p><b>With residual edges:</b> after the first augmentation, the residual graph contains b→a, the reverse of a→b, with capacity 1. The path s→b→a→t is then an augmenting path. Pushing along it <i>cancels</i> the flow on a→b, and the result is the optimal flow of value 2.</p>`
},
{
  id: "F3", topic: "flow", diff: 2, source: "K–T 7.2", tags: ["max-flow min-cut", "proof"],
  title: "Weak duality and the optimality certificate",
  statement: `<ol><li>Prove that for any flow <i>f</i> and any s–t cut (<i>A</i>, <i>B</i>), <i>v</i>(<i>f</i>) = <i>f</i><sup>out</sup>(<i>A</i>) − <i>f</i><sup>in</sup>(<i>A</i>) ≤ <i>c</i>(<i>A</i>, <i>B</i>).</li>
<li>Prove that if the residual graph <i>G</i><sub>f</sub> has no s–t path, then <i>f</i> is a maximum flow. Use <i>A</i> = the set of vertices reachable from <i>s</i> in <i>G</i><sub>f</sub>.</li>
<li>Conclude that for any max flow <i>f</i> and <b>any</b> min cut (<i>A</i>, <i>B</i>), every edge from <i>A</i> to <i>B</i> is saturated and every edge from <i>B</i> to <i>A</i> carries zero flow.</li></ol>`,
  solution: `<p><b>(1)</b> Sum the conservation constraints over the vertices of <i>A</i>. Only the source has nonzero net flow, so <i>v</i>(<i>f</i>) = Σ<sub>v∈A</sub>(<i>f</i><sup>out</sup>(<i>v</i>) − <i>f</i><sup>in</sup>(<i>v</i>)). Edges with both endpoints in <i>A</i> cancel out, which leaves <i>f</i><sup>out</sup>(<i>A</i>) − <i>f</i><sup>in</sup>(<i>A</i>) ≤ <i>f</i><sup>out</sup>(<i>A</i>) ≤ <i>c</i>(<i>A</i>, <i>B</i>).</p>
<p><b>(2)</b> <i>t</i> ∉ <i>A</i>, so (<i>A</i>, <i>B</i>) is a cut. Every edge (<i>u</i>, <i>v</i>) from <i>A</i> to <i>B</i> is saturated, since otherwise there would be a forward residual edge and <i>v</i> would be reachable. Every edge from <i>B</i> to <i>A</i> carries 0 flow, since otherwise there would be a backward residual edge. So <i>v</i>(<i>f</i>) = <i>c</i>(<i>A</i>, <i>B</i>), and by (1), no flow can exceed this.</p>
<p><b>(3)</b> If <i>f</i> is a max flow and (<i>A</i>, <i>B</i>) is a min cut, then <i>v</i>(<i>f</i>) = <i>c</i>(<i>A</i>, <i>B</i>), so both inequalities in (1) are equalities. That means <i>f</i><sup>in</sup>(<i>A</i>) = 0 and <i>f</i><sup>out</sup>(<i>A</i>) = <i>c</i>(<i>A</i>, <i>B</i>).</p>`
},
{
  id: "F4", topic: "flow", diff: 2, source: "K–T 7.2 / 7.3", tags: ["running time", "Edmonds–Karp", "scaling"],
  title: "How fast is Ford–Fulkerson?",
  statement: `<ol><li>With integer capacities, show that Ford–Fulkerson terminates in <i>O</i>(<i>mC</i>) time, where <i>C</i> = Σ capacities out of <i>s</i>.</li>
<li>Give a 4-node network where a bad choice of paths takes 2<i>X</i> augmentations, which is exponential in the input size.</li>
<li>State the running times of capacity scaling and of Edmonds–Karp, which uses shortest augmenting paths.</li></ol>`,
  solution: `<p><b>(1)</b> Each augmentation raises the flow value by at least 1, the value is at most <i>C</i>, and each augmentation (BFS/DFS plus update) costs <i>O</i>(<i>m</i>). Integrality is maintained throughout.</p>
<p><b>(2)</b> Edges s→a, s→b, a→t, b→t each have capacity <i>X</i>, and the edge a→b has capacity 1. Alternately augment along s→a→b→t and s→b→a→t, where the second path uses the residual back edge of a→b. Each augmentation adds only 1 unit, so reaching 2<i>X</i> takes 2<i>X</i> augmentations. The input has size <i>O</i>(log <i>X</i>), so this is exponential.</p>
<p><b>(3)</b> Capacity scaling: <i>O</i>(<i>m</i><sup>2</sup> log <i>C</i>). Edmonds–Karp: <i>O</i>(<i>nm</i><sup>2</sup>), which does not depend on the capacities. (With irrational capacities, generic Ford–Fulkerson may not even terminate.)</p>`
},
{
  id: "F5", topic: "flow", diff: 1, source: "K–T 7.1", tags: ["min cut", "counterexample", "scaling"],
  title: "Min cut: uniqueness and scaling",
  statement: `<ol><li>True or false: if all capacities are distinct, the min cut is unique.</li><li>True or false: multiplying every capacity by λ &gt; 0 keeps every min cut a min cut.</li><li>True or false: adding 1 to every capacity keeps every min cut a min cut.</li></ol>`,
  solution: `<ol><li><b>False.</b> Take s→a 3, a→t 1, a→b 2, b→t 4. The cut {s} has capacity 3, and the cut {s, a} has capacity 1 + 2 = 3. The max flow is 3, so both are minimum.</li>
<li><b>True.</b> Every cut's capacity is multiplied by λ, so the ordering of cuts is unchanged.</li>
<li><b>False.</b> A cut with <i>k</i> edges gains <i>k</i>, so cuts with fewer edges gain less. Example: s→x with capacity 4; x→a, x→b, x→c with capacity 1 each; and a→t, b→t, c→t with capacity 10 each. The cut {s, x} has capacity 3 and is the min cut, beating {s} with capacity 4. After adding 1 to every capacity, {s, x} becomes 6 and {s} becomes 5, so the min cut changes.</li></ol>`
},
{
  id: "F6", topic: "flow", diff: 1, source: "K–T 7.6 / Menger", tags: ["edge-disjoint paths", "integrality"],
  title: "Edge-disjoint paths",
  statement: `<p>Given a directed graph and nodes <i>s</i> and <i>t</i>, find the maximum number of edge-disjoint s→t paths. Prove Menger's theorem: this maximum equals the minimum number of edges whose removal disconnects <i>t</i> from <i>s</i>. Then handle undirected graphs.</p>`,
  solution: `<p>Give every edge capacity 1 and compute an integral max flow, <i>O</i>(<i>mn</i>) with Ford–Fulkerson since the value is at most <i>n</i> − 1. <b>(≥)</b> <i>k</i> disjoint paths give a flow of value <i>k</i>. <b>(≤)</b> An integral flow of value <i>k</i> puts 0 or 1 on each edge. Follow flow edges out of <i>s</i>; conservation guarantees that you reach <i>t</i>. Remove that path and repeat. If a cycle appears, cancel it. This gives <i>k</i> disjoint paths.</p>
<p><b>Menger:</b> a min cut has capacity equal to its number of crossing edges. Removing those edges disconnects <i>t</i> from <i>s</i>, and any disconnecting set of edges contains all edges crossing some cut.</p>
<p><b>Undirected:</b> replace each edge with two opposite directed edges of capacity 1. If an optimal flow uses both directions of one edge, cancel them; the value stays the same.</p>`
},
{
  id: "F7", topic: "flow", diff: 2, source: "K–T 7.6 ext.", tags: ["vertex-disjoint paths", "node splitting"],
  title: "Vertex-disjoint paths and vertex capacities",
  statement: `<ol><li>Find the maximum number of s→t paths that share no internal vertex.</li><li>More generally, solve max flow when every vertex <i>v</i> has a capacity <i>c</i>(<i>v</i>).</li><li>Find the fewest vertices, other than <i>s</i> and <i>t</i>, whose removal disconnects <i>t</i> from <i>s</i>, assuming (<i>s</i>, <i>t</i>) ∉ <i>E</i>.</li></ol>`,
  solution: `<p><b>Node splitting:</b> replace each vertex <i>v</i> with <i>v</i><sub>in</sub> → <i>v</i><sub>out</sub> of capacity <i>c</i>(<i>v</i>). Use capacity 1 for (1), and give <i>s</i> and <i>t</i> capacity ∞. Each edge (<i>u</i>, <i>v</i>) becomes <i>u</i><sub>out</sub> → <i>v</i><sub>in</sub>, with capacity ∞ (or its original capacity). Then compute a max flow.</p>
<p>(1) A flow of value 1 through <i>v</i><sub>in</sub> → <i>v</i><sub>out</sub> means only one path can use <i>v</i>. (3) By max-flow min-cut, a finite min cut can only cut the vertex edges, since all other edges are ∞. So the minimum vertex separator has size equal to the max number of vertex-disjoint paths (Menger's vertex version).</p>`
},
{
  id: "F8", topic: "flow", diff: 1, source: "K–T 7.5", tags: ["bipartite matching", "integrality"],
  title: "Bipartite matching via flow",
  statement: `<p>Reduce maximum bipartite matching on <i>X</i> ∪ <i>Y</i> to max flow. Prove that the max flow value equals the maximum matching size, and give the running time.</p>`,
  solution: `<p>Add a source <i>s</i> with an edge of capacity 1 to every <i>x</i> ∈ <i>X</i>, direct every edge from <i>X</i> to <i>Y</i> with capacity 1 (∞ also works), and add an edge of capacity 1 from every <i>y</i> to a sink <i>t</i>.</p>
<p><b>(≥)</b> A matching of size <i>k</i> gives <i>k</i> unit paths s→x→y→t. <b>(≤)</b> Take an integral flow of value <i>k</i>. Each <i>x</i> has inflow ≤ 1, so it sends flow on at most one edge. Each <i>y</i> has outflow ≤ 1, so it receives flow on at most one edge. So the X–Y edges carrying flow form a matching of size <i>k</i>.</p>
<p><b>Time:</b> the value is at most <i>n</i>, so Ford–Fulkerson takes <i>O</i>(<i>mn</i>).</p>`
},
{
  id: "F9", topic: "flow", diff: 2, source: "K–T 7.5 (Hall) / exercise", tags: ["Hall's theorem", "perfect matching", "regular graphs"],
  title: "Hall's theorem and regular bipartite graphs",
  statement: `<ol><li>Prove Hall's theorem with max-flow min-cut: a bipartite graph with |<i>X</i>| = |<i>Y</i>| = <i>n</i> has a perfect matching if and only if |<i>N</i>(<i>S</i>)| ≥ |<i>S</i>| for every <i>S</i> ⊆ <i>X</i>.</li>
<li>Show that every <i>k</i>-regular bipartite graph (<i>k</i> ≥ 1) has a perfect matching.</li></ol>`,
  solution: `<p><b>(1)</b> (⇒) is clear: a perfect matching maps <i>S</i> to |<i>S</i>| distinct neighbors. (⇐) Use the network of F8, but give the X→Y edges capacity ∞. Take a min cut (<i>A</i>, <i>B</i>) and let <i>S</i> = <i>A</i> ∩ <i>X</i>. The cut is finite, so <i>N</i>(<i>S</i>) ⊆ <i>A</i>. Its capacity is |<i>X</i> \\ <i>S</i>| (edges from <i>s</i> to <i>X</i> \\ <i>S</i>) plus at least |<i>N</i>(<i>S</i>)| (edges from <i>N</i>(<i>S</i>) to <i>t</i>). That is at least (<i>n</i> − |<i>S</i>|) + |<i>S</i>| = <i>n</i>. So the max flow is <i>n</i>, which is a perfect matching.</p>
<p><b>(2)</b> Put flow 1 on each edge from <i>s</i> and each edge to <i>t</i>, and 1/<i>k</i> on every graph edge. This is a valid fractional flow of value <i>n</i>, so the max flow is ≥ <i>n</i>. By the integrality theorem, some integral max flow has value <i>n</i>, and that is a perfect matching. (Alternatively, check Hall's condition: the <i>k</i>|<i>S</i>| edges leaving <i>S</i> land in <i>N</i>(<i>S</i>), which absorbs at most <i>k</i>|<i>N</i>(<i>S</i>)| edges.)</p>`
},
{
  id: "F10", topic: "flow", diff: 2, source: "Classic / CLRS 26-2", tags: ["path cover", "DAG", "matching"],
  title: "Minimum path cover of a DAG",
  statement: `<p>Cover all vertices of a DAG with the fewest vertex-disjoint directed paths, where a single vertex counts as a path. Show that the minimum equals <i>n</i> − (maximum matching) in a suitable bipartite graph.</p>`,
  solution: `<p>Build a bipartite graph with left copies <i>v</i><sup>L</sup> and right copies <i>v</i><sup>R</sup>, and an edge <i>u</i><sup>L</sup>–<i>v</i><sup>R</sup> for each edge (<i>u</i>, <i>v</i>) of the DAG. A matching means "<i>u</i>'s successor in its path is <i>v</i>". Each vertex has at most one successor and at most one predecessor, and the DAG has no cycles, so a matching of size <i>k</i> corresponds exactly to a path cover with <i>n</i> − <i>k</i> paths: each matched edge merges two paths into one. Maximizing the matching minimizes the number of paths. Using the flow approach, this takes <i>O</i>(<i>nm</i>).</p>`
},
{
  id: "F11", topic: "flow", diff: 2, source: "K–T 7.9 (airline scheduling)", tags: ["path cover", "circulation", "reuse"],
  title: "Fewest planes for a set of flights",
  statement: `<p>There are <i>k</i> flights, each with an origin, destination, departure time, and arrival time. A plane can fly flight <i>j</i> after flight <i>i</i> if it can get from <i>i</i>'s destination to <i>j</i>'s origin in time (you are given this as a "reachable" relation, which is acyclic in time). Find the fewest planes that cover all flights. Give two formulations.</p>`,
  solution: `<p><b>(1) Path cover:</b> build a DAG on the flights with an edge <i>i</i> → <i>j</i> when <i>j</i> can follow <i>i</i>. The fewest planes is the minimum path cover, <i>k</i> − (maximum matching), as in F10.</p>
<p><b>(2) K–T circulation:</b> for each flight, create nodes <i>u</i><sub>i</sub> → <i>v</i><sub>i</sub> with lower bound = capacity = 1. Add <i>s</i> → <i>u</i><sub>i</sub> (cap 1), <i>v</i><sub>i</sub> → <i>t</i> (cap 1), <i>v</i><sub>i</sub> → <i>u</i><sub>j</sub> (cap 1) when <i>j</i> can follow <i>i</i>, and <i>s</i> → <i>t</i> (cap <i>c</i>) for idle planes. Give <i>s</i> demand −<i>c</i> and <i>t</i> demand +<i>c</i>. A feasible circulation exists if and only if <i>c</i> planes suffice. Binary search on <i>c</i> gives <i>O</i>(<i>k</i><sup>3</sup> log <i>k</i>).</p>`
},
{
  id: "F12", topic: "flow", diff: 2, source: "CS577 F22 HW7 #2", tags: ["min cut structure", "residual graph"],
  title: "Upstream, downstream, and central nodes",
  statement: `<p>A node is <i>upstream</i> if it is on the <i>s</i>-side of <b>every</b> min cut, <i>downstream</i> if it is on the <i>t</i>-side of every min cut, and <i>central</i> otherwise. Given a max flow <i>f</i>, classify every node in linear time.</p>`,
  solution: `<p>Let <i>S</i>* be the set of nodes reachable from <i>s</i> in <i>G</i><sub>f</sub>, and <i>T</i>* the set of nodes that can reach <i>t</i> in <i>G</i><sub>f</sub>. Compute them with one BFS from <i>s</i> and one BFS from <i>t</i> on the reversed residual graph. Then <b>upstream = <i>S</i>*</b>, <b>downstream = <i>T</i>*</b>, and <b>central = everything else</b>.</p>
<p><b>Why:</b> for any min cut (<i>A</i>, <i>B</i>) and max flow <i>f</i>, no residual edge leaves <i>A</i> (F3, part 3). So everything reachable from <i>s</i> is in <i>A</i>, which gives <i>S</i>* ⊆ <i>A</i>. Symmetrically, <i>T</i>* ⊆ <i>B</i>. Both (<i>S</i>*, <i>V</i> − <i>S</i>*) and (<i>V</i> − <i>T</i>*, <i>T</i>*) are themselves min cuts. So a node outside <i>S</i>* is on the <i>t</i>-side of the first, which means it is not upstream, and a node outside <i>T</i>* is on the <i>s</i>-side of the second, which means it is not downstream.</p>`
},
{
  id: "F13", topic: "flow", diff: 2, source: "Classic (follows from F12)", tags: ["unique min cut"],
  title: "Is the minimum cut unique?",
  statement: `<p>Given a flow network, decide whether it has a unique min cut, using one max-flow computation plus linear time.</p>`,
  solution: `<p>Compute a max flow, then <i>S</i>* and <i>T</i>* as in F12. The min cut is unique if and only if <i>S</i>* ∪ <i>T</i>* = <i>V</i>, which is the same as saying there are no central nodes.</p>
<p>(⇐) Every min cut side <i>A</i> satisfies <i>S</i>* ⊆ <i>A</i> ⊆ <i>V</i> − <i>T</i>* = <i>S</i>*, so <i>A</i> = <i>S</i>*. (⇒) If some node lies outside both sets, then (<i>S</i>*, ·) and (<i>V</i> − <i>T</i>*, ·) are two different min cuts.</p>`
},
{
  id: "F14", topic: "flow", diff: 3, source: "CS577 F22 HW7 #3", tags: ["binding edges", "min cut structure", "SCC"],
  title: "Upper-binding and lower-binding edges",
  statement: `<p>Capacities are integers. An edge is <i>upper-binding</i> if increasing its capacity by 1 increases the max flow, and <i>lower-binding</i> if decreasing its capacity by 1 decreases the max flow. Given a max flow <i>f</i>, find all upper-binding edges in linear time. Then find all lower-binding edges, aiming for linear time.</p>`,
  hint: `<p>Write the new max flow as a minimum over cuts. When does every min cut change, and when does at least one change?</p>`,
  solution: `<p>Let <i>v</i> be the max-flow value. Every cut has integer capacity, and changing <i>c</i>(<i>e</i>) by ±1 changes exactly the cuts that <i>e</i> crosses forward.</p>
<p><b>Upper-binding ⇔ <i>e</i> crosses every min cut.</b> Non-minimum cuts have capacity ≥ <i>v</i> + 1, so the minimum rises only if every min cut rises. Using F12, <i>e</i> = (<i>x</i>, <i>y</i>) crosses every min cut if and only if <i>x</i> ∈ <i>S</i>* and <i>y</i> ∈ <i>T</i>*: check (<i>S</i>*, ·) and (·, <i>T</i>*), and note that every min cut contains <i>S</i>* on the <i>s</i>-side and <i>T</i>* on the <i>t</i>-side. This takes linear time.</p>
<p><b>Lower-binding ⇔ <i>e</i> crosses at least one min cut.</b> The min cut sides are exactly the sets <i>A</i> containing <i>s</i>, not containing <i>t</i>, and with no residual edge leaving <i>A</i>. Some such <i>A</i> contains <i>x</i> but not <i>y</i> if and only if <i>A</i> = R(<i>s</i>) ∪ R(<i>x</i>) works, where R means reachable in <i>G</i><sub>f</sub>. That requires: <i>e</i> is saturated, <i>x</i> ∉ <i>T</i>* (so <i>t</i> ∉ R(<i>x</i>)), <i>y</i> ∉ <i>S</i>*, and <i>y</i> ∉ R(<i>x</i>). Since <i>e</i> carries flow, the back edge y→x exists in the residual graph, so "<i>y</i> ∉ R(<i>x</i>)" is the same as "<i>x</i> and <i>y</i> are in different SCCs of <i>G</i><sub>f</sub>". One SCC computation plus the two BFS runs gives linear time.</p>`
},
{
  id: "F15", topic: "flow", diff: 2, source: "CS577 F22 HW7 #1", tags: ["min cut", "edge deletion"],
  title: "Delete k edges to hurt the max flow most",
  statement: `<p>Every edge has capacity 1. Choose <i>k</i> edges to delete so that the max flow in the remaining network is as small as possible.</p>`,
  solution: `<p>Compute a min cut (<i>A</i>, <i>B</i>) with value <i>F</i>, which is the number of edges from <i>A</i> to <i>B</i>. Delete any min(<i>k</i>, <i>F</i>) of those edges. The new max flow is at most max(<i>F</i> − <i>k</i>, 0).</p>
<p><b>Optimality:</b> deleting a single unit-capacity edge lowers every cut's capacity by at most 1, and therefore lowers the min cut by at most 1. So after any <i>k</i> deletions the max flow is still at least <i>F</i> − <i>k</i>. Our choice achieves that bound.</p>`
},
{
  id: "F16", topic: "flow", diff: 2, source: "CLRS 26-4", tags: ["incremental", "residual graph"],
  title: "Updating a max flow when one capacity changes",
  statement: `<p>Capacities are integers, and you have a max flow <i>f</i>. Update it in <i>O</i>(<i>m</i> + <i>n</i>) time when (a) one edge's capacity increases by 1, and (b) one edge's capacity decreases by 1.</p>`,
  solution: `<p><b>(a)</b> The max flow rises by at most 1, because every cut gains at most 1. Update the residual capacity of that edge, then search once for an augmenting path. If you find one, push 1 unit.</p>
<p><b>(b)</b> Let the edge be (<i>u</i>, <i>v</i>). If <i>f</i>(<i>u</i>, <i>v</i>) is at most the new capacity, nothing changes. Otherwise, the edge is over capacity by 1, so remove 1 unit of flow through it. Follow positive-flow edges backward from <i>u</i> to <i>s</i> and forward from <i>v</i> to <i>t</i>, and decrease each edge on that s→u→v→t route by 1. If you find a positive-flow cycle through (<i>u</i>, <i>v</i>) instead, cancel 1 unit around it, which leaves the value unchanged. The flow is now valid with value <i>v</i>(<i>f</i>) − 1 or <i>v</i>(<i>f</i>). Finally, try one augmentation to recover the lost unit if possible. Each step is <i>O</i>(<i>m</i> + <i>n</i>).</p>`
},
{
  id: "F17", topic: "flow", diff: 2, source: "K–T 7.7 / CLRS 26.1", tags: ["flow decomposition"],
  title: "Flow decomposition",
  statement: `<p>Prove that any flow can be decomposed into at most <i>m</i> s→t paths and cycles, each carrying a positive amount of flow. Explain why this implies that a max flow can be computed with at most <i>m</i> augmenting paths, even though finding them may be hard.</p>`,
  solution: `<p>While the flow value is positive, start at <i>s</i> and follow edges with positive flow. Conservation guarantees you can always continue until you reach <i>t</i> or repeat a vertex. If you reach <i>t</i>, you have a path; if you repeat a vertex, you have a cycle. Let δ be the minimum flow along it, subtract δ from every edge of the path or cycle, and record it. At least one edge drops to 0 each time. If the value is 0 but some flow remains, the remaining flow consists only of cycles, so repeat the process from any vertex with positive outflow. In total there are at most <i>m</i> rounds, each taking <i>O</i>(<i>n</i>), for <i>O</i>(<i>nm</i>). The path parts of the decomposition of a max flow are at most <i>m</i> augmenting paths of the original graph that together achieve the max flow.</p>`
},
{
  id: "F18", topic: "flow", diff: 2, source: "K–T 7.7", tags: ["circulation", "demands", "lower bounds"],
  title: "Circulations with demands and lower bounds",
  statement: `<ol><li>Each node has a demand <i>d</i><sub>v</sub>: negative for supply, positive for demand. Reduce the question "does a feasible circulation exist?" to a single max-flow computation, and state the obvious necessary condition.</li>
<li>Now edges also have lower bounds ℓ<sub>e</sub> ≤ <i>f</i><sub>e</sub> ≤ <i>c</i><sub>e</sub>. Reduce this to part (1).</li></ol>`,
  solution: `<p><b>(1)</b> A necessary condition is Σ<i>d</i><sub>v</sub> = 0. Add a super-source <i>s</i>* with an edge to each supply node <i>v</i> of capacity −<i>d</i><sub>v</sub>, and a super-sink <i>t</i>* with an edge from each demand node of capacity <i>d</i><sub>v</sub>. Let <i>D</i> = Σ<sub><i>d</i><sub>v</sub>&gt;0</sub> <i>d</i><sub>v</sub>. A feasible circulation exists if and only if the max flow equals <i>D</i>, with integral solutions when the data are integral.</p>
<p><b>(2)</b> First send ℓ<sub>e</sub> on every edge. Define the new capacity <i>c</i>′<sub>e</sub> = <i>c</i><sub>e</sub> − ℓ<sub>e</sub> and the adjusted demand <i>d</i>′<sub>v</sub> = <i>d</i><sub>v</sub> − (ℓ<sup>in</sup>(<i>v</i>) − ℓ<sup>out</sup>(<i>v</i>)). A feasible circulation <i>f</i>′ for (<i>c</i>′, <i>d</i>′) exists if and only if one exists for the original problem, with <i>f</i> = <i>f</i>′ + ℓ.</p>`
},
{
  id: "F19", topic: "flow", diff: 2, source: "K–T 7.8", tags: ["survey design", "circulation", "lower bounds"],
  title: "Survey design",
  statement: `<p>There are <i>n</i><sub>1</sub> customers and <i>n</i><sub>2</sub> products. Customer <i>i</i> can only be asked about products they bought. Customer <i>i</i> must be asked between <i>c</i><sub>i</sub> and <i>c</i>′<sub>i</sub> questions, and product <i>j</i> must be asked about by between <i>p</i><sub>j</sub> and <i>p</i>′<sub>j</sub> customers. Decide whether a valid survey exists.</p>`,
  solution: `<p>Use a circulation with lower bounds. The edge <i>s</i> → customer <i>i</i> has bounds [<i>c</i><sub>i</sub>, <i>c</i>′<sub>i</sub>]. The edge customer <i>i</i> → product <i>j</i>, present when <i>i</i> bought <i>j</i>, has bounds [0, 1]. The edge product <i>j</i> → <i>t</i> has bounds [<i>p</i><sub>j</sub>, <i>p</i>′<sub>j</sub>]. Add the edge <i>t</i> → <i>s</i> with bounds [0, ∞], and set every demand to 0. An integral feasible circulation is a valid survey: each unit on customer → product means "ask <i>i</i> about <i>j</i>". Solve it with F18. Bipartite perfect matching is the special case where every bound is 1.</p>`
},
{
  id: "F20", topic: "flow", diff: 2, source: "K–T 7.10", tags: ["image segmentation", "min cut"],
  title: "Image segmentation",
  statement: `<p>Each pixel <i>i</i> has a foreground likelihood <i>a</i><sub>i</sub> ≥ 0 and a background likelihood <i>b</i><sub>i</sub> ≥ 0. Each pair of neighboring pixels has a separation penalty <i>p</i><sub>ij</sub> ≥ 0. Partition the pixels into a foreground <i>A</i> and background <i>B</i> to maximize</p>
<p style="text-align:center">q(<i>A</i>, <i>B</i>) = Σ<sub>i∈A</sub> <i>a</i><sub>i</sub> + Σ<sub>j∈B</sub> <i>b</i><sub>j</sub> − Σ<sub>neighbors split</sub> <i>p</i><sub>ij</sub>.</p>
<p>Reduce this to a min cut.</p>`,
  solution: `<p>Since Σ(<i>a</i><sub>i</sub> + <i>b</i><sub>i</sub>) = <i>Q</i> is a constant, maximizing q is the same as minimizing q′ = Σ<sub>i∈A</sub> <i>b</i><sub>i</sub> + Σ<sub>j∈B</sub> <i>a</i><sub>j</sub> + Σ<sub>split</sub> <i>p</i><sub>ij</sub>.</p>
<p><b>Network:</b> the edge <i>s</i> → <i>i</i> has capacity <i>a</i><sub>i</sub>, the edge <i>i</i> → <i>t</i> has capacity <i>b</i><sub>i</sub>, and each neighbor pair gets edges <i>i</i> → <i>j</i> and <i>j</i> → <i>i</i>, both of capacity <i>p</i><sub>ij</sub>. A cut (<i>A</i> ∪ {s}, <i>B</i> ∪ {t}) pays <i>a</i><sub>j</sub> for each <i>j</i> ∈ <i>B</i>, <i>b</i><sub>i</sub> for each <i>i</i> ∈ <i>A</i>, and <i>p</i><sub>ij</sub> once for each split pair (only the edge going from <i>A</i> to <i>B</i> counts). So the cut capacity equals q′, and a min cut gives the optimal segmentation.</p>`
},
{
  id: "F21", topic: "flow", diff: 2, source: "K–T 7.11", tags: ["project selection", "closure", "min cut"],
  title: "Project selection (with numbers)",
  statement: `<p>The projects and their profits: P1 +10, P2 +6, P3 −8, P4 −5. P1 requires P3, and P2 requires both P3 and P4. Choose a prerequisite-closed set of projects that maximizes the total profit. Build the network, find the min cut, and read off the answer. Then state the general reduction.</p>`,
  solution: `<p><b>Network:</b> the edge <i>s</i> → <i>i</i> has capacity <i>p</i><sub>i</sub> when <i>p</i><sub>i</sub> &gt; 0, the edge <i>i</i> → <i>t</i> has capacity −<i>p</i><sub>i</sub> when <i>p</i><sub>i</sub> &lt; 0, and each "<i>i</i> requires <i>j</i>" becomes an edge <i>i</i> → <i>j</i> of capacity ∞. Here that means s→P1 10, s→P2 6, P3→t 8, P4→t 5, and P1→P3, P2→P3, P2→P4 with capacity ∞.</p>
<p>Let <i>C</i> = sum of the positive profits = 16. For a closed set <i>A</i>, the cut ({s} ∪ <i>A</i>, rest) has capacity <i>C</i> − profit(<i>A</i>). The ∞ edges force <i>A</i> to be closed, since otherwise the cut would be infinite.</p>
<p><b>The cuts:</b> <i>A</i> = ∅ gives 16. {P1, P3} gives 6 + 8 = 14. <b>{P1, P2, P3, P4} gives 8 + 5 = 13</b>. {P2, P3, P4} gives 10 + 8 + 5 = 23. So the min cut is 13, and the max profit is 16 − 13 = <b>3</b>, achieved by doing all four projects.</p>`
},
{
  id: "F22", topic: "flow", diff: 3, source: "K–T 7.12", tags: ["baseball elimination", "certificate"],
  title: "Baseball elimination",
  statement: `<p>Team <i>i</i> has <i>w</i><sub>i</sub> wins, and <i>g</i><sub>ij</sub> games remain between teams <i>i</i> and <i>j</i>. Is team <i>z</i> mathematically eliminated, meaning it cannot finish with at least as many wins as every other team? Give the flow network and the certificate of elimination.</p>`,
  solution: `<p>Assume <i>z</i> wins all its remaining games, for a total of <i>m</i> = <i>w</i><sub>z</sub> + <i>r</i><sub>z</sub> wins. If some <i>w</i><sub>i</sub> &gt; <i>m</i>, then <i>z</i> is eliminated immediately.</p>
<p><b>Network:</b> for each pair {<i>i</i>, <i>j</i>} not involving <i>z</i>, add a game node with an edge from <i>s</i> of capacity <i>g</i><sub>ij</sub>. From each game node, add edges of capacity ∞ to team nodes <i>i</i> and <i>j</i>. From each team node <i>i</i>, add an edge to <i>t</i> of capacity <i>m</i> − <i>w</i><sub>i</sub>. Team <i>z</i> survives if and only if the max flow equals <i>g</i>* = Σ<i>g</i><sub>ij</sub>, meaning every game can be assigned a winner without any team passing <i>m</i>.</p>
<p><b>Certificate:</b> if the max flow is below <i>g</i>*, let <i>T</i> be the set of team nodes on the source side of a min cut. Then (Σ<sub>i∈T</sub> <i>w</i><sub>i</sub> + Σ<sub>{i,j}⊆T</sub> <i>g</i><sub>ij</sub>) / |<i>T</i>| &gt; <i>m</i>: the teams in <i>T</i> must, on average, finish with more than <i>m</i> wins.</p>`
},
{
  id: "F23", topic: "flow", diff: 2, source: "K–T Ch. 7 exercise", tags: ["scheduling", "bipartite gadget"],
  title: "Doctors on holidays",
  statement: `<p>There are <i>k</i> holiday periods, and period <i>j</i> is a set of days <i>D</i><sub>j</sub>. Doctor <i>i</i> is available on a set of days <i>S</i><sub>i</sub>. Every holiday day needs exactly one doctor. Each doctor works at most <i>c</i> holiday days in total, and at most <b>one day per holiday period</b>. Decide whether a valid assignment exists.</p>`,
  solution: `<p><b>Network:</b> an edge <i>s</i> → doctor <i>i</i> of capacity <i>c</i>. For each doctor <i>i</i> and period <i>j</i>, a gadget node (<i>i</i>, <i>j</i>) with an edge doctor <i>i</i> → (<i>i</i>, <i>j</i>) of capacity <b>1</b>. That capacity is what enforces "one day per period". Edges (<i>i</i>, <i>j</i>) → day <i>d</i> of capacity 1 for each <i>d</i> ∈ <i>D</i><sub>j</sub> ∩ <i>S</i><sub>i</sub>, and day <i>d</i> → <i>t</i> of capacity 1.</p>
<p>A valid assignment exists if and only if the max flow equals the total number of holiday days. An integral flow gives the assignment, and each constraint corresponds to one layer of capacities.</p>`
},
{
  id: "F24", topic: "flow", diff: 2, source: "CLRS-style", tags: ["matrix rounding", "circulation"],
  title: "Matrix rounding",
  statement: `<p>You have a <i>p</i> × <i>q</i> matrix of non-negative reals with row sums <i>r</i><sub>i</sub> and column sums <i>c</i><sub>j</sub>. Round every entry, and every row and column sum, up or down to an integer so that the rounded entries still add up to the rounded row and column sums. Show that this is always possible.</p>`,
  solution: `<p>Build a network with an edge <i>s</i> → row <i>i</i> with bounds [⌊<i>r</i><sub>i</sub>⌋, ⌈<i>r</i><sub>i</sub>⌉], an edge row <i>i</i> → column <i>j</i> with bounds [⌊<i>a</i><sub>ij</sub>⌋, ⌈<i>a</i><sub>ij</sub>⌉], an edge column <i>j</i> → <i>t</i> with bounds [⌊<i>c</i><sub>j</sub>⌋, ⌈<i>c</i><sub>j</sub>⌉], and an edge <i>t</i> → <i>s</i> with bounds [0, ∞]. The original matrix is a feasible <b>fractional</b> circulation. All bounds are integers, so an integral circulation also exists (integrality theorem plus F18), and it is exactly a valid rounding.</p>`
},
{
  id: "F25", topic: "flow", diff: 1, source: "CLRS 26.1 style", tags: ["assignment", "capacities"],
  title: "Families at dinner tables",
  statement: `<p>Family <i>i</i> has <i>a</i><sub>i</sub> members, and table <i>j</i> seats <i>b</i><sub>j</sub> people. No two members of the same family may sit at the same table. Decide whether everyone can be seated, and produce a seating if so.</p>`,
  solution: `<p>Add an edge <i>s</i> → family <i>i</i> of capacity <i>a</i><sub>i</sub>, an edge family <i>i</i> → table <i>j</i> of capacity <b>1</b> for every pair, and an edge table <i>j</i> → <i>t</i> of capacity <i>b</i><sub>j</sub>. Everyone can be seated if and only if the max flow equals Σ<i>a</i><sub>i</sub>. Each unit on family <i>i</i> → table <i>j</i> seats one member of family <i>i</i> at table <i>j</i>.</p>`
},
{
  id: "F26", topic: "flow", diff: 2, source: "CLRS 26-1", tags: ["escape problem", "vertex capacities"],
  title: "The escape problem",
  statement: `<p>In an <i>n</i> × <i>n</i> grid, <i>m</i> starting cells are marked. Decide whether there are <i>m</i> <b>vertex-disjoint</b> paths from the starting cells to (distinct) boundary cells.</p>`,
  solution: `<p>Split every cell <i>v</i> into <i>v</i><sub>in</sub> → <i>v</i><sub>out</sub> with capacity 1. Connect neighboring cells with <i>u</i><sub>out</sub> → <i>v</i><sub>in</sub> of capacity 1 (in both directions). Add an edge from <i>s</i> to each starting cell's in-node with capacity 1, and from each boundary cell's out-node to <i>t</i> with capacity 1. Escape is possible if and only if the max flow equals <i>m</i>. The network has <i>O</i>(<i>n</i><sup>2</sup>) nodes and edges, and the value is at most <i>m</i>, so Ford–Fulkerson takes <i>O</i>(<i>mn</i><sup>2</sup>).</p>`
},
{
  id: "F27", topic: "flow", diff: 2, source: "K–T Ch. 7 exercise", tags: ["assignment", "geometry"],
  title: "Clients and base stations",
  statement: `<p>There are <i>n</i> clients and <i>k</i> base stations, all at known positions. A client can connect only to a station within distance <i>r</i>, and each station can serve at most <i>L</i> clients. Decide whether every client can be connected.</p>`,
  solution: `<p>Add an edge <i>s</i> → client of capacity 1, an edge client → station of capacity 1 whenever the distance is ≤ <i>r</i>, and an edge station → <i>t</i> of capacity <i>L</i>. Every client can be connected if and only if the max flow equals <i>n</i>. The network has <i>O</i>(<i>nk</i>) edges and the flow value is at most <i>n</i>, so this takes <i>O</i>(<i>n</i><sup>2</sup><i>k</i>).</p>`
},
{
  id: "F28", topic: "flow", diff: 2, source: "CLRS 26.2-11", tags: ["edge connectivity", "undirected"],
  title: "Edge connectivity of an undirected graph",
  statement: `<p>The <i>edge connectivity</i> of an undirected graph is the minimum number of edges whose removal disconnects it. Compute it with <i>n</i> − 1 max-flow computations rather than <i>n</i>(<i>n</i> − 1)/2.</p>`,
  solution: `<p>Fix any vertex <i>s</i>. For every <i>t</i> ≠ <i>s</i>, compute the max flow from <i>s</i> to <i>t</i>, using unit capacities with each edge in both directions. Return the minimum. The global min cut separates <i>s</i> from <i>some</i> vertex <i>t</i>, so it is found when the algorithm tries that <i>t</i>. Each flow costs <i>O</i>(<i>nm</i>), because the value is at most <i>n</i>, for a total of <i>O</i>(<i>n</i><sup>2</sup><i>m</i>).</p>`
},
{
  id: "F29", topic: "flow", diff: 3, source: "König's theorem", tags: ["vertex cover", "bipartite", "min cut"],
  title: "Minimum vertex cover in a bipartite graph",
  statement: `<p>Show that in a bipartite graph, the minimum vertex cover has the same size as the maximum matching, and construct the cover from a min cut.</p>`,
  solution: `<p>Use the matching network of F8, with capacity ∞ on the X→Y edges. Take a min cut (<i>A</i>, <i>B</i>) and define <i>C</i> = (<i>X</i> ∩ <i>B</i>) ∪ (<i>Y</i> ∩ <i>A</i>). The cut capacity is |<i>X</i> ∩ <i>B</i>| + |<i>Y</i> ∩ <i>A</i>| = |<i>C</i>|.</p>
<p><i>C</i> is a vertex cover: an uncovered edge (<i>x</i>, <i>y</i>) would have <i>x</i> ∈ <i>A</i> and <i>y</i> ∈ <i>B</i>, and that ∞ edge would cross the cut. Conversely, any vertex cover <i>C</i>′ gives a cut of capacity |<i>C</i>′|: take <i>A</i> = {<i>s</i>} ∪ (<i>X</i> \\ <i>C</i>′) ∪ (<i>Y</i> ∩ <i>C</i>′). So the minimum vertex cover equals the min cut, which equals the max flow, which equals the maximum matching.</p>`
},
{
  id: "F30", topic: "flow", diff: 1, source: "Classic", tags: ["bipartite matching", "modeling"],
  title: "Non-attacking rooks on a damaged board",
  statement: `<p>Some squares of an <i>n</i> × <i>n</i> chessboard are broken. Place as many rooks as possible on unbroken squares so that no two share a row or a column.</p>`,
  solution: `<p>Build a bipartite graph with rows on one side and columns on the other, and an edge (<i>r</i>, <i>c</i>) for each unbroken square. A set of non-attacking rooks is exactly a matching, so the answer is the maximum bipartite matching (F8), found in <i>O</i>(<i>n</i> · #squares).</p>`
},
{
  id: "F31", topic: "flow", diff: 2, source: "Classic", tags: ["orientation", "degree constraints"],
  title: "Orient edges to meet out-degree targets",
  statement: `<p>Given an undirected graph and a target out-degree <i>d</i>(<i>v</i>) for each vertex, decide whether the edges can be oriented so that every vertex has out-degree exactly <i>d</i>(<i>v</i>). For example, each edge is a game, and <i>d</i>(<i>v</i>) is the number of games team <i>v</i> must win.</p>`,
  solution: `<p>If Σ<i>d</i>(<i>v</i>) ≠ <i>m</i>, the answer is no. Otherwise, build a network with one node per edge <i>e</i> = {<i>u</i>, <i>v</i>}. Add <i>s</i> → <i>e</i> with capacity 1, then <i>e</i> → <i>u</i> and <i>e</i> → <i>v</i> with capacity 1 each, and <i>v</i> → <i>t</i> with capacity <i>d</i>(<i>v</i>). A valid orientation exists if and only if the max flow is <i>m</i>. A unit of flow from <i>e</i> to <i>u</i> means <i>e</i> is oriented out of <i>u</i>, so <i>u</i> "wins" that game. Baseball elimination (F22) uses the same structure.</p>`
},
{
  id: "F32", topic: "flow", diff: 1, source: "K–T 7.1", tags: ["model transformations"],
  title: "Turning a messy problem into a standard max flow",
  statement: `<p>Reduce each variation to ordinary single-source, single-sink max flow on a directed graph.</p>
<ol><li>Several sources and several sinks.</li><li>Undirected edges.</li><li>Vertex capacities.</li><li>Antiparallel edges (u→v and v→u both present), when your textbook's algorithm forbids them.</li></ol>`,
  solution: `<ol><li>Add a super-source with edges of capacity ∞ to every source, and a super-sink with edges of capacity ∞ from every sink. Use finite capacities instead if a source has a limited supply.</li>
<li>Replace each undirected edge with two directed edges of the same capacity. If an optimal flow uses both directions, cancel the overlap.</li>
<li>Split each vertex into <i>v</i><sub>in</sub> → <i>v</i><sub>out</sub> with capacity <i>c</i>(<i>v</i>).</li>
<li>Subdivide one of the two edges: u→v becomes u→x→v, both with the same capacity.</li></ol>`
}
);
