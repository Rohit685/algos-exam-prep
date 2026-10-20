window.PROBLEMS = window.PROBLEMS || [];
window.PROBLEMS.push(
{
  id: "M1", topic: "mst", diff: 1, source: "K–T 4.17 / 4.20", tags: ["cut property", "cycle property", "proof"],
  title: "Prove the cut and cycle properties",
  statement: `<p>Assume all edge costs are distinct.</p>
<ol><li><b>Cut property:</b> for any nonempty <i>S</i> ⊊ <i>V</i>, the cheapest edge <i>e</i> crossing (<i>S</i>, <i>V</i> − <i>S</i>) belongs to every MST.</li>
<li><b>Cycle property:</b> the most expensive edge <i>f</i> on any cycle <i>C</i> belongs to no MST.</li></ol>
<p>Then explain how (1) proves both Prim and Kruskal correct.</p>`,
  solution: `<p><b>(1) Exchange argument.</b> Suppose an MST <i>T</i> does not contain <i>e</i> = (<i>v</i>, <i>w</i>). The path from <i>v</i> to <i>w</i> in <i>T</i> must cross the cut along some edge <i>e</i>′. Then <i>T</i>′ = <i>T</i> − <i>e</i>′ + <i>e</i> is still a spanning tree: it is connected because the path is rerouted through <i>e</i>, and it has <i>n</i> − 1 edges. Since <i>c</i>(<i>e</i>) &lt; <i>c</i>(<i>e</i>′), <i>T</i>′ is cheaper than <i>T</i>, a contradiction.</p>
<p><b>(2)</b> Suppose <i>f</i> = (<i>v</i>, <i>w</i>) ∈ <i>T</i>. Removing <i>f</i> splits <i>T</i> into two sides, <i>S</i> containing <i>v</i> and <i>V</i> − <i>S</i> containing <i>w</i>. The rest of the cycle <i>C</i> goes from <i>v</i> to <i>w</i>, so it contains another edge <i>e</i>′ crossing between the sides, with <i>c</i>(<i>e</i>′) &lt; <i>c</i>(<i>f</i>). Then <i>T</i> − <i>f</i> + <i>e</i>′ is a cheaper spanning tree, a contradiction.</p>
<p><b>Prim:</b> each added edge is the cheapest edge leaving the current tree's vertex set <i>S</i>, so the cut property applies. <b>Kruskal:</b> when Kruskal adds (<i>v</i>, <i>w</i>), let <i>S</i> be <i>v</i>'s current component. No cheaper edge crosses this cut, because any cheaper crossing edge would already have been considered and added. Every edge Kruskal skips closes a cycle on which it is the most expensive edge.</p>`
},
{
  id: "M2", topic: "mst", diff: 1, source: "K–T Ch. 4 exercise", tags: ["uniqueness"],
  title: "Distinct weights mean a unique MST",
  statement: `<p>Prove that if all edge weights are distinct, the MST is unique. Is the converse true?</p>`,
  solution: `<p>Suppose <i>T</i><sub>1</sub> ≠ <i>T</i><sub>2</sub> are both MSTs. Let <i>e</i> be the cheapest edge in their symmetric difference, say <i>e</i> ∈ <i>T</i><sub>1</sub> \\ <i>T</i><sub>2</sub>. Adding <i>e</i> to <i>T</i><sub>2</sub> creates a cycle. That cycle contains some edge <i>e</i>′ ∉ <i>T</i><sub>1</sub>, because <i>T</i><sub>1</sub> has no cycles, so <i>e</i>′ ∈ <i>T</i><sub>2</sub> \\ <i>T</i><sub>1</sub>. By the choice of <i>e</i>, and since weights are distinct, <i>w</i>(<i>e</i>) &lt; <i>w</i>(<i>e</i>′). Then <i>T</i><sub>2</sub> + <i>e</i> − <i>e</i>′ is cheaper than <i>T</i><sub>2</sub>, a contradiction. (You can also use the cut property: every MST must contain exactly the edges the cut property forces.)</p>
<p><b>Converse: false.</b> If <i>G</i> is itself a tree with all weights equal, its MST is unique even though the weights are not distinct.</p>`
},
{
  id: "M3", topic: "mst", diff: 2, source: "K–T Ch. 4 exercise / CLRS 23.1", tags: ["MST update"],
  title: "Adding a new edge to a graph with a known MST",
  statement: `<p>You know the MST <i>T</i> of <i>G</i>. A new edge <i>e</i> = (<i>u</i>, <i>v</i>) with weight <i>w</i> is added to <i>G</i>. Update the MST in <i>O</i>(<i>n</i>) time and prove that it is correct.</p>`,
  solution: `<p><i>T</i> + <i>e</i> contains exactly one cycle: <i>e</i> plus the u–v path in <i>T</i>, which you can find by DFS/BFS in <i>T</i> in <i>O</i>(<i>n</i>). Remove the heaviest edge on that cycle, which may be <i>e</i> itself.</p>
<p><b>Correctness:</b> every edge <i>f</i> ∉ <i>T</i> of the old graph was the heaviest edge on some cycle of <i>G</i>, namely <i>f</i> plus its T-path. That cycle still exists, so <i>f</i> is still excluded by the cycle property. So some MST of <i>G</i> + <i>e</i> uses only edges of <i>T</i> + <i>e</i>. That graph has <i>n</i> edges and one cycle, so its MST is obtained by deleting the cycle's maximum edge.</p>`
},
{
  id: "M4", topic: "mst", diff: 2, source: "CLRS 23.1 style", tags: ["MST update", "case analysis"],
  title: "One edge weight changes: four cases",
  statement: `<p>You know the MST <i>T</i> of <i>G</i>, and the weight of one edge <i>e</i> changes. For each case, explain how to update <i>T</i> and give the running time.</p>
<ol><li><i>e</i> ∉ <i>T</i> and its weight increases.</li><li><i>e</i> ∈ <i>T</i> and its weight decreases.</li><li><i>e</i> ∉ <i>T</i> and its weight decreases.</li><li><i>e</i> ∈ <i>T</i> and its weight increases.</li></ol>`,
  solution: `<ol><li>No change, <i>O</i>(1). <i>T</i> is still at least as good as before, and all other trees only got worse or stayed the same.</li>
<li>No change, <i>O</i>(1). Every tree containing <i>e</i> drops by the same amount, and <i>T</i> was the best tree to begin with.</li>
<li>Like M3: find the T-path between <i>e</i>'s endpoints, and if its heaviest edge is heavier than the new <i>w</i>(<i>e</i>), swap it for <i>e</i>. <i>O</i>(<i>n</i>).</li>
<li>Remove <i>e</i>, which splits <i>T</i> into two components (label them with BFS in <i>O</i>(<i>n</i>)). Scan all edges for the cheapest one crossing between the components, including <i>e</i> at its new weight, and add it. This is correct by the cut property, and takes <i>O</i>(<i>m</i>).</li></ol>`
},
{
  id: "M5", topic: "mst", diff: 2, source: "Classic", tags: ["cut property", "cycle property", "BFS"],
  title: "Is edge e in some MST? In every MST?",
  statement: `<p>Weights may tie. Given an edge <i>e</i> = (<i>u</i>, <i>v</i>) with weight <i>w</i>, decide in <i>O</i>(<i>n</i> + <i>m</i>) time whether (a) <i>e</i> belongs to <b>some</b> MST, and (b) <i>e</i> belongs to <b>every</b> MST.</p>`,
  solution: `<p><b>(a)</b> Let <i>G</i><sub>&lt;</sub> be the subgraph of edges with weight <b>&lt; <i>w</i></b>. Then <i>e</i> is in some MST if and only if <i>u</i> and <i>v</i> are disconnected in <i>G</i><sub>&lt;</sub>, which one BFS checks.</p>
<p>(⇐) Run Kruskal and break ties so that <i>e</i> comes first among the weight-<i>w</i> edges. When <i>e</i> is considered, only edges lighter than <i>w</i> have been added, and they do not connect <i>u</i> to <i>v</i>, so Kruskal takes <i>e</i>. (⇒) If a lighter u–v path exists, <i>e</i> is the unique maximum on a cycle, so no MST contains it.</p>
<p><b>(b)</b> Let <i>G</i><sub>≤</sub> be the subgraph of edges with weight <b>≤ <i>w</i></b>, excluding <i>e</i>. Then <i>e</i> is in every MST if and only if <i>u</i> and <i>v</i> are disconnected in <i>G</i><sub>≤</sub>. If they are disconnected, take <i>S</i> = the component of <i>u</i> in <i>G</i><sub>≤</sub>. Every other edge crossing this cut is heavier than <i>w</i>, so <i>e</i> is the unique lightest crossing edge and every MST must contain it. If they are connected, take an MST that contains <i>e</i>. Removing <i>e</i> splits it into two sides, and the u–v path in <i>G</i><sub>≤</sub> has some edge <i>f</i> crossing between them with weight ≤ <i>w</i>. Swapping <i>f</i> for <i>e</i> gives a spanning tree that is no more expensive and avoids <i>e</i>.</p>`
},
{
  id: "M6", topic: "mst", diff: 3, source: "CLRS 23-1", tags: ["second-best MST"],
  title: "Second-best MST",
  statement: `<p>Assume distinct weights. The <i>second-best MST</i> is the cheapest spanning tree other than the MST <i>T</i>.</p>
<ol><li>Show that it can be obtained from <i>T</i> by swapping one edge: adding one non-tree edge and removing one tree edge.</li>
<li>Compute it in <i>O</i>(<i>n</i><sup>2</sup>) time once <i>T</i> is known.</li></ol>`,
  solution: `<p><b>(1)</b> Let <i>T</i>′ be a second-best tree, and take any <i>e</i> ∈ <i>T</i> \\ <i>T</i>′. Removing <i>e</i> from <i>T</i> defines a cut, and <i>e</i> is the lightest edge crossing it (otherwise you could improve <i>T</i>). The path in <i>T</i>′ between <i>e</i>'s endpoints crosses this cut at some edge <i>f</i>. Since <i>e</i> is the only T-edge crossing the cut and <i>e</i> ∉ <i>T</i>′, we have <i>f</i> ∉ <i>T</i>, and therefore <i>w</i>(<i>f</i>) &gt; <i>w</i>(<i>e</i>). Then <i>T</i>″ = <i>T</i>′ + <i>e</i> − <i>f</i> is a spanning tree with <i>w</i>(<i>T</i>″) &lt; <i>w</i>(<i>T</i>′). Since <i>T</i>′ is second-best, <i>T</i>″ must be <i>T</i> itself. Hence <i>T</i>′ = <i>T</i> − <i>e</i> + <i>f</i>, which is a single swap.</p>
<p><b>(2)</b> For every pair <i>u</i>, <i>v</i>, compute max[<i>u</i>][<i>v</i>], the heaviest edge on their T-path. A BFS/DFS from each vertex of <i>T</i> does this, carrying the running maximum, in <i>O</i>(<i>n</i>) per source and <i>O</i>(<i>n</i><sup>2</sup>) total. Then over all non-tree edges (<i>u</i>, <i>v</i>), minimize <i>w</i>(<i>T</i>) − max[<i>u</i>][<i>v</i>] + <i>w</i>(<i>u</i>, <i>v</i>). Scanning the edges costs <i>O</i>(<i>m</i>) = <i>O</i>(<i>n</i><sup>2</sup>).</p>`
},
{
  id: "M7", topic: "mst", diff: 2, source: "K–T 4.7", tags: ["clustering", "Kruskal", "proof"],
  title: "Maximum-spacing k-clustering",
  statement: `<p>Partition <i>n</i> points into <i>k</i> nonempty clusters so that the <b>spacing</b>, the minimum distance between points in different clusters, is as large as possible. Show that this works: run Kruskal and stop when there are <i>k</i> components. Equivalently, delete the <i>k</i> − 1 most expensive MST edges.</p>`,
  solution: `<p>Let <i>C</i> be the Kruskal clustering. Its spacing is <i>d</i>*, the weight of the edge Kruskal would add next, which is the (<i>k</i> − 1)-th most expensive MST edge. Take any other <i>k</i>-clustering <i>C</i>′. Some Kruskal cluster <i>C</i><sub>r</sub> must contain points <i>p</i> and <i>q</i> that lie in different clusters of <i>C</i>′. Kruskal connected <i>p</i> and <i>q</i> by a path of edges, each of weight ≤ <i>d</i>*. Somewhere along that path, consecutive points <i>p</i>′ and <i>q</i>′ lie in different clusters of <i>C</i>′. So the spacing of <i>C</i>′ is at most <i>d</i>(<i>p</i>′, <i>q</i>′) ≤ <i>d</i>*.</p>`
},
{
  id: "M8", topic: "mst", diff: 2, source: "K–T Ch. 4 exercise (minimum altitude)", tags: ["minimax path", "proof"],
  title: "MST paths minimize the maximum edge",
  statement: `<p>Prove that for every pair of vertices <i>u</i> and <i>v</i>, the u–v path in an MST minimizes, over all u–v paths in <i>G</i>, the weight of the heaviest edge. Example: route a flight between two airports so that the highest altitude you ever have to climb to is as low as possible.</p>`,
  solution: `<p>Let <i>e</i> be the heaviest edge on the u–v path in the MST <i>T</i>. Removing <i>e</i> splits <i>T</i> into two sides with <i>u</i> and <i>v</i> on opposite sides. Every u–v path in <i>G</i> crosses this cut along some edge <i>f</i>. By the cut property, as in the exchange argument, <i>w</i>(<i>f</i>) ≥ <i>w</i>(<i>e</i>): otherwise <i>T</i> − <i>e</i> + <i>f</i> would be a cheaper spanning tree. So every u–v path has some edge of weight ≥ <i>w</i>(<i>e</i>), and the tree path achieves exactly <i>w</i>(<i>e</i>). (This also proves that every MST is a minimum bottleneck spanning tree.)</p>`
},
{
  id: "M9", topic: "mst", diff: 1, source: "CLRS-style", tags: ["transformations"],
  title: "Spanning tree variants by transformation",
  statement: `<p>Reduce each problem to an ordinary MST computation.</p>
<ol><li>Maximum-weight spanning tree.</li><li>Spanning tree minimizing the <b>product</b> of its edge weights (all weights &gt; 0).</li><li>The weights can be negative. Do Prim and Kruskal still work?</li></ol>`,
  solution: `<ol><li>Negate every weight, or equivalently sort in decreasing order and run Kruskal.</li><li>Minimizing a product is the same as minimizing Σ log <i>w</i>, because log is increasing. In fact Kruskal only compares weights, so any strictly increasing transformation gives the same tree; you can run Kruskal on the original weights.</li><li>Yes. The cut and cycle properties never used non-negativity, and both algorithms depend only on the relative order of the weights. Only shortest path algorithms like Dijkstra care about negative weights.</li></ol>`
},
{
  id: "M10", topic: "mst", diff: 2, source: "Classic", tags: ["complement", "max spanning tree"],
  title: "Cheapest way to break all cycles",
  statement: `<p>Given a connected undirected graph with non-negative edge weights, find a minimum-weight set of edges <i>F</i> whose removal leaves an acyclic graph.</p>`,
  solution: `<p>After removing <i>F</i>, the remaining graph is a forest, so minimizing <i>w</i>(<i>F</i>) is the same as maximizing the weight of the forest you keep. With non-negative weights, some maximum-weight forest is a spanning tree, because adding an edge between two components never hurts. So compute a <b>maximum spanning tree</b> <i>T</i> and output <i>F</i> = <i>E</i> \\ <i>T</i>. This takes <i>O</i>(<i>m</i> log <i>n</i>).</p>`
},
{
  id: "M11", topic: "mst", diff: 2, source: "Classic", tags: ["constrained MST"],
  title: "MST where certain vertices must be leaves",
  statement: `<p>Given a weighted connected graph and a vertex set <i>U</i>, find the cheapest spanning tree in which every vertex of <i>U</i> is a leaf, or report that none exists. Assume |<i>V</i> \\ <i>U</i>| ≥ 2.</p>`,
  solution: `<p>In any such tree, deleting the vertices of <i>U</i> leaves a spanning tree of <i>G</i>[<i>V</i> \\ <i>U</i>]. Each <i>u</i> ∈ <i>U</i> hangs from exactly one edge into <i>V</i> \\ <i>U</i>, since <i>u</i>–<i>u</i>′ edges would make one of them a non-leaf. The cost splits into two independent parts, so:</p>
<ol><li>Compute the MST of <i>G</i>[<i>V</i> \\ <i>U</i>]. If that subgraph is disconnected, no solution exists.</li><li>For each <i>u</i> ∈ <i>U</i>, add its cheapest edge into <i>V</i> \\ <i>U</i>. If it has none, no solution exists.</li></ol>
<p>Each part is optimal on its own, so the sum is optimal. The time is <i>O</i>(<i>m</i> log <i>n</i>).</p>`
},
{
  id: "M12", topic: "mst", diff: 2, source: "Classic (virtual node)", tags: ["modeling", "super-node"],
  title: "Wells and pipes",
  statement: `<p>Each of <i>n</i> houses needs water. House <i>i</i> can dig its own well at cost <i>w</i><sub>i</sub>, or connect by pipe to a house that already has water. Laying a pipe between houses <i>i</i> and <i>j</i> costs <i>p</i><sub>ij</sub>. Find the minimum total cost.</p>`,
  solution: `<p>Add a virtual "water source" vertex 0, with an edge (0, <i>i</i>) of cost <i>w</i><sub>i</sub> for each house, and compute the MST of the resulting graph on <i>n</i> + 1 vertices.</p>
<p>Any valid plan corresponds to a connected spanning subgraph that includes vertex 0: each connected group of houses must contain at least one well, which is an edge to 0. Conversely, any spanning tree of the new graph is a valid plan. So the minimum cost is the MST weight.</p>`
},
{
  id: "M13", topic: "mst", diff: 2, source: "CLRS 23.2 style", tags: ["linear time", "BFS"],
  title: "MST when weights are only 1 or 2",
  statement: `<p>Every edge weight is 1 or 2. Find an MST in <i>O</i>(<i>n</i> + <i>m</i>) time.</p>`,
  solution: `<p>This simulates Kruskal with only two weight classes.</p>
<ol><li>Using only the weight-1 edges, run BFS/DFS to compute connected components together with a spanning forest of each component. Keep all the forest edges.</li>
<li>Contract each component to a single node. Using the weight-2 edges between different components, run BFS on the contracted graph and keep the BFS tree edges.</li></ol>
<p>This is exactly what Kruskal does: take all useful weight-1 edges first, then the weight-2 edges that join different components. Both steps are linear. (In general, weights from a small integer range let you replace sorting with counting sort.)</p>`
},
{
  id: "M14", topic: "mst", diff: 2, source: "Classic", tags: ["verification"],
  title: "Verify that a given tree is an MST",
  statement: `<p>Given <i>G</i> and a spanning tree <i>T</i>, decide in <i>O</i>(<i>n</i><sup>2</sup>) time whether <i>T</i> is an MST.</p>`,
  solution: `<p><i>T</i> is an MST if and only if every non-tree edge (<i>u</i>, <i>v</i>) satisfies <i>w</i>(<i>u</i>, <i>v</i>) ≥ max{ <i>w</i>(<i>e</i>) : <i>e</i> on the T-path from <i>u</i> to <i>v</i> }.</p>
<p>(⇒) If some non-tree edge were lighter than an edge on its T-path, swapping it in would give a cheaper tree. (⇐) Run Kruskal and break ties in favor of edges of <i>T</i>. The condition guarantees that every non-tree edge is skipped, because when it is considered, its T-path is already complete. So Kruskal outputs <i>T</i>, which is therefore an MST.</p>
<p>Computing the path maximum for all pairs takes one BFS per source, <i>O</i>(<i>n</i><sup>2</sup>) total, and the edges are checked in <i>O</i>(<i>m</i>).</p>`
},
{
  id: "M15", topic: "mst", diff: 2, source: "K–T 4.5", tags: ["reverse-delete", "cycle property"],
  title: "Reverse-delete is correct",
  statement: `<p>Reverse-delete considers the edges from most to least expensive, and deletes an edge whenever doing so keeps the graph connected. Prove that it outputs an MST (assume distinct weights).</p>`,
  solution: `<p>When edge <i>e</i> is deleted, the graph stays connected without it, so <i>e</i> lies on a cycle <i>C</i> in the current graph. All other edges on <i>C</i> are still present, and since we process edges in decreasing order, they are all lighter than <i>e</i>. So <i>e</i> is the heaviest edge on <i>C</i>, and by the cycle property it is in no MST. When an edge is kept, deleting it would disconnect the graph, so at the end the graph is connected. It is also acyclic: any remaining cycle's heaviest edge would have been deletable when it was considered. So the output is a spanning tree containing no non-MST edge, and that tree is the MST.</p>`
},
{
  id: "M16", topic: "mst", diff: 1, source: "Exam staple (trace)", tags: ["Kruskal", "Prim", "trace"],
  title: "Run Kruskal and Prim by hand",
  statement: `<p>Undirected edges: AB 4, AC 3, BC 1, BD 2, CD 4, CE 6, DE 5, DF 7, EF 3.</p>
<ol><li>List the order in which Kruskal accepts edges, and for each rejected edge, say why.</li><li>List the order in which Prim, started from A, adds edges.</li><li>Give the MST weight and say whether the MST is unique.</li></ol>`,
  solution: `<p><b>Kruskal</b> (sorted order BC1, BD2, AC3, EF3, AB4, CD4, DE5, CE6, DF7): accept <b>BC</b>, <b>BD</b>, <b>AC</b>, <b>EF</b>. Reject AB because A–C–B is already connected, and reject CD because C–B–D is. Accept <b>DE</b>, which joins {A,B,C,D} and {E,F}. Reject CE and DF, which would close cycles.</p>
<p><b>Prim from A:</b> AC (3), CB (1), BD (2), DE (5), EF (3).</p>
<p><b>Weight:</b> 1 + 2 + 3 + 3 + 5 = <b>14</b>. The MST is <b>unique</b>, even though some weights tie: every rejected edge is the strict maximum on its cycle. AB is heavier than AC and CB; CD is heavier than CB and BD; CE is heavier than CB, BD, and DE; DF is heavier than DE and EF.</p>`
},
{
  id: "M17", topic: "mst", diff: 1, source: "K–T 4.6", tags: ["union–find", "running time"],
  title: "Implementations and running times",
  statement: `<ol><li>What is the running time of Kruskal with union–find, using union by rank? What changes with path compression?</li><li>What is the running time of Prim with a binary heap, and with an unsorted array? Which is better for dense graphs?</li><li>Why is <i>O</i>(<i>m</i> log <i>m</i>) the same as <i>O</i>(<i>m</i> log <i>n</i>)?</li></ol>`,
  solution: `<ol><li>Sorting takes <i>O</i>(<i>m</i> log <i>m</i>). With union by rank, each Find is <i>O</i>(log <i>n</i>) because the trees have height at most log <i>n</i>, so <i>m</i> Finds cost <i>O</i>(<i>m</i> log <i>n</i>), for <i>O</i>(<i>m</i> log <i>n</i>) total. With path compression as well, the union–find work is <i>O</i>(<i>m</i> α(<i>n</i>)), so sorting dominates.</li><li>With a binary heap, Prim takes <i>O</i>(<i>m</i> log <i>n</i>). With an array it takes <i>O</i>(<i>n</i><sup>2</sup>): <i>n</i> linear scans for the minimum and <i>O</i>(1) per key update. For dense graphs, where <i>m</i> = Θ(<i>n</i><sup>2</sup>), the array version is better.</li><li>Since <i>m</i> ≤ <i>n</i><sup>2</sup>, log <i>m</i> ≤ 2 log <i>n</i>.</li></ol>`
},
{
  id: "M18", topic: "mst", diff: 2, source: "Classic", tags: ["forced edges", "Kruskal"],
  title: "Cheapest spanning tree containing required edges",
  statement: `<p>Given an acyclic set <i>F</i> of edges that must be included, find the cheapest spanning tree containing all of <i>F</i>. Prove that your method is correct.</p>`,
  solution: `<p>Union all the edges of <i>F</i> first, then run Kruskal on the remaining edges in sorted order. This is the same as contracting each component of <i>F</i> into a single super-vertex and computing an MST of the contracted multigraph.</p>
<p>Every spanning tree that contains <i>F</i> corresponds exactly to <i>F</i> plus a spanning tree of the contracted graph, and its cost is <i>w</i>(<i>F</i>) plus the cost of that spanning tree. The first term is fixed, so the best choice is an MST of the contracted graph, which is what Kruskal produces there.</p>`
}
);
