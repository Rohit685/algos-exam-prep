window.PROBLEMS = window.PROBLEMS || [];
window.PROBLEMS.push(
{
  id: "R1", topic: "greedy", diff: 1, source: "K–T 4.1", tags: ["interval scheduling", "stays ahead"],
  title: "Interval scheduling: prove earliest-finish-time first",
  statement: `<p>Prove that repeatedly choosing the compatible interval with the earliest finish time gives a maximum set of non-overlapping intervals. Use a <b>greedy stays ahead</b> argument, and give the running time.</p>`,
  solution: `<p>Let the greedy intervals be <i>i</i><sub>1</sub>, …, <i>i</i><sub><i>k</i></sub> and the optimal ones <i>j</i><sub>1</sub>, …, <i>j</i><sub><i>m</i></sub>, both sorted by finish time.</p>
<p><b>Claim:</b> f(<i>i</i><sub><i>r</i></sub>) ≤ f(<i>j</i><sub><i>r</i></sub>) for every <i>r</i> ≤ <i>k</i>. For <i>r</i> = 1, greedy picks the earliest finish overall. For <i>r</i> &gt; 1, the inductive hypothesis gives f(<i>i</i><sub><i>r</i>−1</sub>) ≤ f(<i>j</i><sub><i>r</i>−1</sub>) ≤ s(<i>j</i><sub><i>r</i></sub>). So <i>j</i><sub><i>r</i></sub> is still compatible when greedy makes its <i>r</i>-th choice, and greedy picks something that finishes no later.</p>
<p><b>Optimality:</b> suppose <i>m</i> &gt; <i>k</i>. Then <i>j</i><sub><i>k</i>+1</sub> starts after f(<i>j</i><sub><i>k</i></sub>) ≥ f(<i>i</i><sub><i>k</i></sub>), so it would still have been available, and greedy would not have stopped. That is a contradiction.</p>
<p><b>Time:</b> <i>O</i>(<i>n</i> log <i>n</i>) to sort, plus a linear scan.</p>`
},
{
  id: "R2", topic: "greedy", diff: 2, source: "K–T 4.1 (interval partitioning)", tags: ["interval partitioning", "structural bound"],
  title: "Fewest classrooms",
  statement: `<p>Lectures have start and finish times. Schedule all of them in the fewest classrooms so that no two overlapping lectures share a room. Prove that your greedy algorithm uses exactly <i>depth</i> rooms, where depth is the maximum number of lectures that overlap at a single time.</p>`,
  solution: `<p><b>Lower bound:</b> any solution needs at least depth rooms, since the lectures overlapping at one moment all need different rooms.</p>
<p><b>Greedy:</b> sort the lectures by <b>start</b> time. Give each one any room that is free, and open a new room only if every room is busy. Keep a min-heap of room finish times, for <i>O</i>(<i>n</i> log <i>n</i>) total.</p>
<p><b>Upper bound:</b> suppose greedy opens room <i>d</i> for lecture <i>j</i>. Then the other <i>d</i> − 1 rooms each hold a lecture that started no later than s(<i>j</i>), because of the sort order, and finishes after s(<i>j</i>), because the room is busy. So <i>d</i> lectures overlap at time s(<i>j</i>) + ε, and <i>d</i> ≤ depth.</p>`
},
{
  id: "R3", topic: "greedy", diff: 2, source: "K–T 4.2", tags: ["lateness", "exchange argument", "counterexample"],
  title: "Minimize the maximum lateness",
  statement: `<p>Jobs have processing times <i>t</i><sub>j</sub> and deadlines <i>d</i><sub>j</sub> on one machine. The lateness of a job is max(0, <i>f</i><sub>j</sub> − <i>d</i><sub>j</sub>), where <i>f</i><sub>j</sub> is its finish time. Minimize the maximum lateness.</p>
<ol><li>Give counterexamples for "shortest job first" and for "smallest slack <i>d</i><sub>j</sub> − <i>t</i><sub>j</sub> first".</li>
<li>Prove that Earliest Deadline First (EDF) is optimal using an exchange argument.</li></ol>`,
  solution: `<p><b>Shortest job first fails:</b> job 1 has <i>t</i> = 1, <i>d</i> = 100, and job 2 has <i>t</i> = 10, <i>d</i> = 10. Running job 1 first gives lateness 1; EDF gives 0.</p>
<p><b>Smallest slack fails:</b> job 1 has <i>t</i> = 1, <i>d</i> = 2 (slack 1), and job 2 has <i>t</i> = 10, <i>d</i> = 10 (slack 0). Smallest slack runs job 2 first, so job 1 finishes at 11 with lateness 9. EDF runs job 1 first, so job 2 finishes at 11 with lateness 1.</p>
<p><b>EDF is optimal:</b></p>
<ol><li>Some optimal schedule has no idle time.</li>
<li>Define an <i>inversion</i> as a pair <i>i</i>, <i>j</i> where <i>d</i><sub>i</sub> &lt; <i>d</i><sub>j</sub> but <i>j</i> is scheduled before <i>i</i>. If a schedule has an inversion, it has an <i>adjacent</i> inversion.</li>
<li>Swapping an adjacent inverted pair does not increase the maximum lateness. After the swap, <i>i</i> finishes earlier, and <i>j</i> now finishes at the time <i>i</i> used to finish, f. So <i>j</i>'s new lateness is f − <i>d</i><sub>j</sub> &lt; f − <i>d</i><sub>i</sub>, which was <i>i</i>'s old lateness. Every other job is unaffected.</li>
<li>Each swap reduces the number of inversions by 1. Repeating it turns an optimal schedule into the EDF schedule without making it worse. Schedules with no inversions and no idle time differ only in the order of jobs with equal deadlines, and they all have the same maximum lateness.</li></ol>`
},
{
  id: "R4", topic: "greedy", diff: 2, source: "CS577 F22 HW5 #3", tags: ["interval stabbing", "counterexample", "stays ahead"],
  title: "Fewest points stabbing all intervals",
  statement: `<p>Given <i>n</i> half-open intervals (<i>s</i><sub>i</sub>, <i>f</i><sub>i</sub>], find the fewest points such that every interval contains at least one of them.</p>
<ol><li>Show that "pick the point covered by the most intervals, remove those intervals, and repeat" can fail.</li>
<li>Give an <i>O</i>(<i>n</i> log <i>n</i>) greedy algorithm and prove it optimal.</li></ol>`,
  solution: `<p><b>(a)</b> Use the intervals (0,2], (1,4], (1,4], (1.5,4], (3,5], (3,5], (4,6], (4,7]. The most-covered point, around 3.5, hits 5 intervals, but then two more points are needed, for 3 total. The optimum is {2, 5}.</p>
<p><b>(b)</b> Sort by right endpoint. Repeatedly take the uncovered interval with the smallest right endpoint <i>f</i>, place a point at <i>f</i>, and discard every interval that contains <i>f</i>.</p>
<p><b>Stays ahead:</b> let the greedy points be <i>g</i><sub>1</sub> &lt; <i>g</i><sub>2</sub> &lt; … and any solution's points be <i>p</i><sub>1</sub> &lt; <i>p</i><sub>2</sub> &lt; …. By induction, <i>g</i><sub><i>r</i></sub> ≥ <i>p</i><sub><i>r</i></sub>. The interval that defines <i>g</i><sub><i>r</i></sub> starts after <i>g</i><sub><i>r</i>−1</sub> ≥ <i>p</i><sub><i>r</i>−1</sub>. So the other solution covers it with some point numbered <i>r</i> or later, and that point is ≤ <i>g</i><sub><i>r</i></sub>. If greedy used more points than the other solution, then the interval defining greedy's last point would be left uncovered by that solution.</p>`
},
{
  id: "R5", topic: "greedy", diff: 1, source: "K–T 4.5", tags: ["cell towers", "stays ahead"],
  title: "Cell phone towers along a road",
  statement: `<p>Houses sit at positions <i>x</i><sub>1</sub> &lt; … &lt; <i>x</i><sub>n</sub> along a straight road. A tower covers every house within 4 miles of it. Place the fewest towers that cover every house.</p>`,
  solution: `<p><b>Greedy:</b> find the westernmost uncovered house <i>x</i>. Place a tower at <i>x</i> + 4, remove every house within [<i>x</i>, <i>x</i> + 8], and repeat. This runs in <i>O</i>(<i>n</i>) once the houses are sorted.</p>
<p><b>Stays ahead:</b> the <i>r</i>-th greedy tower is at least as far east as the <i>r</i>-th tower of any valid solution. So after <i>r</i> towers, greedy has covered a prefix of houses at least as long as that solution has. Any solution must cover <i>x</i> with some tower in [<i>x</i> − 4, <i>x</i> + 4], and greedy's choice of <i>x</i> + 4 covers everything that tower does to the east of <i>x</i>, plus possibly more.</p>`
},
{
  id: "R6", topic: "greedy", diff: 2, source: "K–T 4.3 / CS577 F22 HW5 #2", tags: ["bin packing (ordered)", "stays ahead"],
  title: "Packing trucks in arrival order",
  statement: `<p>Boxes arrive in a fixed order with weights <i>w</i><sub>1</sub>, …, <i>w</i><sub>n</sub>. Each truck carries at most <i>W</i>, and boxes must be shipped in arrival order. The current greedy packs each truck until the next box does not fit, then sends it off. Prove that this minimizes the number of trucks.</p>`,
  solution: `<p><b>Claim:</b> for every <i>k</i>, greedy fits at least as many boxes into its first <i>k</i> trucks as any other valid solution <i>S</i> does.</p>
<p><b>Base case:</b> greedy fills truck 1 maximally with a prefix of the boxes. <b>Inductive step:</b> suppose that after <i>k</i> − 1 trucks, greedy has shipped boxes 1..<i>j</i> and <i>S</i> has shipped boxes 1..<i>j</i>′, with <i>j</i> ≥ <i>j</i>′. <i>S</i>'s truck <i>k</i> holds boxes <i>j</i>′+1 .. <i>i</i>′, with weight ≤ <i>W</i>. The boxes <i>j</i>+1 .. <i>i</i>′ are a subset of those, so they also fit in one truck, and greedy's truck <i>k</i> reaches at least box <i>i</i>′.</p>
<p>Applying the claim with <i>k</i> equal to the number of trucks <i>S</i> uses, greedy has shipped all the boxes by then, so it uses no more trucks than <i>S</i>.</p>`
},
{
  id: "R7", topic: "greedy", diff: 2, source: "K–T 4.13", tags: ["weighted completion time", "exchange", "Smith's rule"],
  title: "Minimize the weighted sum of completion times",
  statement: `<p>Job <i>j</i> takes <i>t</i><sub>j</sub> time and has weight <i>w</i><sub>j</sub>. Order the jobs on a single machine to minimize Σ<i>w</i><sub>j</sub><i>C</i><sub>j</sub>, where <i>C</i><sub>j</sub> is the completion time of job <i>j</i>. Give an algorithm and prove it optimal.</p>`,
  hint: `<p>Compare two adjacent jobs <i>i</i> and <i>j</i>: how does the cost change if you swap them?</p>`,
  solution: `<p><b>Smith's rule:</b> sort the jobs by <i>t</i><sub>j</sub>/<i>w</i><sub>j</sub> in increasing order. This takes <i>O</i>(<i>n</i> log <i>n</i>).</p>
<p><b>Exchange argument:</b> suppose job <i>i</i> comes immediately before job <i>j</i>, and both start after time <i>T</i>. Swapping them leaves every other job's completion time unchanged. With <i>i</i> first, their cost is <i>w</i><sub>i</sub>(<i>T</i> + <i>t</i><sub>i</sub>) + <i>w</i><sub>j</sub>(<i>T</i> + <i>t</i><sub>i</sub> + <i>t</i><sub>j</sub>). With <i>j</i> first, it is <i>w</i><sub>j</sub>(<i>T</i> + <i>t</i><sub>j</sub>) + <i>w</i><sub>i</sub>(<i>T</i> + <i>t</i><sub>i</sub> + <i>t</i><sub>j</sub>). The difference, (<i>i</i> first) − (<i>j</i> first), is <i>w</i><sub>j</sub><i>t</i><sub>i</sub> − <i>w</i><sub>i</sub><i>t</i><sub>j</sub>. That is ≤ 0 exactly when <i>t</i><sub>i</sub>/<i>w</i><sub>i</sub> ≤ <i>t</i><sub>j</sub>/<i>w</i><sub>j</sub>. So fixing an adjacent pair that is out of ratio order never hurts. Repeating this, as in bubble sort, turns any optimal order into the sorted order.</p>
<p>The unweighted case, with all <i>w</i> = 1, is <b>shortest processing time first</b>.</p>`
},
{
  id: "R8", topic: "greedy", diff: 2, source: "K–T Ch. 4 exercise (triathlon)", tags: ["scheduling", "exchange"],
  title: "Triathlon scheduling",
  statement: `<p>Each of <i>n</i> contestants must swim, then bike, then run. Only one person can be in the pool at a time, but any number can bike or run simultaneously. Contestant <i>i</i> takes <i>s</i><sub>i</sub> to swim, <i>b</i><sub>i</sub> to bike, and <i>r</i><sub>i</sub> to run. Choose the order in which people swim to minimize the time at which the last person finishes.</p>`,
  solution: `<p>Sort the contestants by <i>b</i><sub>i</sub> + <i>r</i><sub>i</sub> in <b>decreasing</b> order, and have them swim back to back with no gaps.</p>
<p><b>Exchange argument:</b> suppose <i>i</i> swims immediately before <i>j</i>, but <i>b</i><sub>i</sub> + <i>r</i><sub>i</sub> &lt; <i>b</i><sub>j</sub> + <i>r</i><sub>j</sub>. Let <i>T</i> be the time when <i>j</i>'s swim ends. Before the swap, the later of their two finishes is max(<i>T</i> − <i>s</i><sub>j</sub> + <i>b</i><sub>i</sub> + <i>r</i><sub>i</sub>, <i>T</i> + <i>b</i><sub>j</sub> + <i>r</i><sub>j</sub>) = <i>T</i> + <i>b</i><sub>j</sub> + <i>r</i><sub>j</sub>. After swapping, <i>i</i>'s swim ends at <i>T</i>, so <i>i</i> finishes at <i>T</i> + <i>b</i><sub>i</sub> + <i>r</i><sub>i</sub> &lt; <i>T</i> + <i>b</i><sub>j</sub> + <i>r</i><sub>j</sub>, and <i>j</i> finishes at <i>T</i> − <i>s</i><sub>i</sub> + <i>b</i><sub>j</sub> + <i>r</i><sub>j</sub>, which is earlier still. So the swap does not make the overall finish time worse. Removing inversions one at a time turns any optimal order into the greedy order. The same idea solves "one supercomputer plus many PCs".</p>`
},
{
  id: "R9", topic: "greedy", diff: 1, source: "CLRS 16-1", tags: ["coin change", "counterexample"],
  title: "Making change",
  statement: `<ol><li>Show that greedy, always taking the largest coin that fits, is optimal for the US coins {1, 5, 10, 25}.</li><li>Give a coin system and an amount for which greedy is not optimal.</li></ol>`,
  solution: `<p><b>(1)</b> An optimal solution has at most 4 pennies (5 pennies could be replaced by a nickel), at most 1 nickel, and at most 2 dimes. It also never has 2 dimes together with a nickel, since those make a quarter. So the pennies, nickels, and dimes in an optimal solution total at most 24 &lt; 25 cents (2 dimes + 4 pennies), which forces the number of quarters to be ⌊<i>n</i>/25⌋, the same as greedy. In the remainder, the nickels and pennies total at most 9 &lt; 10 cents, which forces the number of dimes to be ⌊<i>r</i>/10⌋. With at most 4 pennies, the number of nickels is forced the same way. So the optimal solution makes exactly greedy's choices.</p>
<p><b>(2)</b> Use the coins {1, 3, 4} and the amount 6. Greedy takes 4 + 1 + 1 (3 coins), but 3 + 3 (2 coins) is optimal. Arbitrary coin systems need DP.</p>`
},
{
  id: "R10", topic: "greedy", diff: 1, source: "CLRS 16.2", tags: ["knapsack", "counterexample"],
  title: "Fractional versus 0/1 knapsack",
  statement: `<p>Prove that greedy by value per unit weight is optimal for the <b>fractional</b> knapsack problem. Then show that the same greedy fails for the <b>0/1</b> knapsack problem.</p>`,
  solution: `<p><b>Fractional:</b> sort the items by <i>v</i>/<i>w</i>, highest first, and fill the knapsack in that order, taking a fraction of the last item if needed. <b>Exchange argument:</b> if an optimal solution uses weight <i>x</i> of a lower-ratio item while some of a higher-ratio item is left over, replace ε weight of the former with ε of the latter. The value increases by ε times the difference in ratios, which is ≥ 0. So some optimal solution agrees with greedy.</p>
<p><b>0/1 counterexample:</b> capacity <i>W</i> = 50, and items (<i>v</i> = 60, <i>w</i> = 10), (100, 20), (120, 30). Greedy by ratio takes the first two, worth 160. The optimal choice is the last two, worth 220.</p>`
},
{
  id: "R11", topic: "greedy", diff: 2, source: "K–T 4.8 / CLRS 16.3", tags: ["Huffman", "prefix codes"],
  title: "Huffman coding",
  statement: `<p>Frequencies: a: 45, b: 13, c: 12, d: 16, e: 9, f: 5.</p>
<ol><li>Build a Huffman tree and give a code for each letter.</li><li>Compute the total encoded length.</li><li>State and prove the key lemma: some optimal tree has the two lowest-frequency letters as siblings at the maximum depth.</li></ol>`,
  solution: `<p><b>Merges:</b> f5 + e9 = 14; c12 + b13 = 25; 14 + d16 = 30; 25 + 30 = 55; a45 + 55 = 100.</p>
<p><b>One valid code:</b> a = 0, c = 100, b = 101, f = 1100, e = 1101, d = 111.</p>
<p><b>Cost:</b> 45·1 + 12·3 + 13·3 + 16·3 + 5·4 + 9·4 = <b>224</b> bits. A fixed-length code would need 300.</p>
<p><b>Lemma:</b> an optimal tree is <b>full</b>, meaning every internal node has 2 children; otherwise you could contract a node with one child and shorten some codes. So the deepest leaf has a sibling leaf. Swap the two lowest-frequency letters <i>x</i> and <i>y</i> into these two deepest positions. Moving a lower frequency deeper and a higher frequency shallower changes the cost by (<i>f</i><sub>high</sub> − <i>f</i><sub>low</sub>)(depth<sub>low</sub> − depth<sub>high</sub>) ≤ 0. Then induction on the alphabet size, merging <i>x</i> and <i>y</i> into one meta-letter with frequency <i>f</i><sub>x</sub> + <i>f</i><sub>y</sub>, proves that Huffman's algorithm is optimal.</p>`
},
{
  id: "R12", topic: "greedy", diff: 2, source: "K–T 4.3", tags: ["caching", "Belady"],
  title: "Optimal caching (farthest in future)",
  statement: `<p>The cache holds <i>k</i> = 2 items and starts empty. Requests: a, b, c, b, c, a, b.</p>
<ol><li>Simulate Farthest-in-Future (FF), which evicts the item whose next request is farthest away, and count the misses.</li><li>Simulate LRU on the same sequence.</li><li>Sketch why FF is optimal.</li></ol>`,
  solution: `<p><b>FF:</b> a miss {a}; b miss {a,b}; c miss: a is next needed at position 6 and b at position 4, so evict a, giving {b,c}; b hit; c hit; a miss: b is needed at 7 and c never again, so evict c, giving {a,b}; b hit. That is <b>4 misses</b>, and the first 3 are unavoidable cold misses.</p>
<p><b>LRU:</b> a, b, then c is a miss that evicts a, giving {b,c}; b hit; c hit; a miss that evicts b, the least recently used, giving {c,a}; b miss. That is <b>5 misses</b>.</p>
<p><b>Why FF is optimal (exchange argument):</b> take an optimal reduced schedule <i>S</i> that agrees with FF on the first <i>j</i> requests. You can build an <i>S</i>′ that agrees with FF on the first <i>j</i> + 1 requests and has no more misses. At step <i>j</i> + 1, if FF evicts <i>e</i> but <i>S</i> evicts <i>f</i>, make <i>S</i>′ evict <i>e</i> and then mimic <i>S</i> until the first point where the two caches can be made equal again. Because <i>f</i> is requested before <i>e</i>, that point arrives no later than the first request involving <i>e</i> or <i>f</i>, and <i>S</i>′ incurs no extra misses.</p>`
},
{
  id: "R13", topic: "greedy", diff: 1, source: "CLRS 16.2-4 (Prof. Gekko)", tags: ["refueling", "stays ahead"],
  title: "Fewest refueling stops",
  statement: `<p>You drive along a highway with gas stations at mile markers <i>x</i><sub>1</sub> &lt; … &lt; <i>x</i><sub>n</sub>. A full tank lasts <i>D</i> miles. Choose the fewest stops that get you to the end.</p>`,
  solution: `<p><b>Greedy:</b> at each point, drive to the <b>farthest</b> station you can reach on the current tank, and refuel there. This is <i>O</i>(<i>n</i>).</p>
<p><b>Stays ahead:</b> after <i>r</i> stops, greedy is at least as far along the road as any other solution is after <i>r</i> stops. If the other solution is at position <i>p</i> ≤ greedy's position <i>g</i>, its next stop is at most <i>p</i> + <i>D</i> ≤ <i>g</i> + <i>D</i>, and greedy's next stop is the farthest station within <i>g</i> + <i>D</i>. So greedy never needs more stops.</p>`
},
{
  id: "R14", topic: "greedy", diff: 2, source: "Classic", tags: ["unit jobs", "deadlines", "profits"],
  title: "Unit jobs with deadlines and profits",
  statement: `<p>There are <i>n</i> jobs, each taking 1 time unit, and job <i>i</i> has deadline <i>d</i><sub>i</sub> and profit <i>p</i><sub>i</sub>. You earn <i>p</i><sub>i</sub> only if job <i>i</i> finishes by <i>d</i><sub>i</sub>. Maximize the total profit.</p>`,
  solution: `<p>Sort the jobs by profit in decreasing order. For each job, place it in the <b>latest free slot</b> ≤ <i>d</i><sub>i</sub>, or skip it if no such slot exists. Using union–find over the slots ("next free slot to the left"), this takes <i>O</i>(<i>n</i> log <i>n</i>).</p>
<p><b>Why it works:</b> a set of jobs is feasible if and only if, for every <i>t</i>, at most <i>t</i> of them have deadline ≤ <i>t</i>. The feasible sets form a matroid, and greedy by weight is optimal on any matroid.</p>
<p><b>Direct exchange argument:</b> suppose greedy accepts job <i>j</i>, but an optimal solution <i>O</i> that agrees with greedy so far does not contain <i>j</i>. Since greedy's set plus <i>j</i> is feasible, adding <i>j</i> to <i>O</i> either keeps it feasible or overloads some deadline prefix. In that case, remove from <i>O</i> a job in that prefix that greedy has not chosen. That job has profit ≤ <i>p</i><sub>j</sub>, because greedy considered <i>j</i> first.</p>`
},
{
  id: "R15", topic: "greedy", diff: 1, source: "Classic", tags: ["optimal merge", "Huffman-like"],
  title: "Merging sorted files optimally",
  statement: `<p>You have <i>n</i> sorted files of sizes <i>ℓ</i><sub>1</sub>, …, <i>ℓ</i><sub>n</sub>. Merging two files of sizes <i>a</i> and <i>b</i> costs <i>a</i> + <i>b</i>. Merge everything into one file at minimum total cost.</p>`,
  solution: `<p>Repeatedly merge the <b>two smallest</b> files, keeping the files in a min-heap. This takes <i>O</i>(<i>n</i> log <i>n</i>).</p>
<p>This is exactly Huffman's algorithm. The merges form a binary tree, and the total cost is Σ <i>ℓ</i><sub>i</sub>·depth(<i>i</i>), which has the same form as the cost of a prefix code. So Huffman's optimality proof applies directly.</p>`
},
{
  id: "R16", topic: "greedy", diff: 1, source: "K–T Ch. 4 exercise (subsequence)", tags: ["two pointers", "stays ahead"],
  title: "Is S′ a subsequence of S?",
  statement: `<p>Given a sequence of events <i>S</i> of length <i>n</i> and a pattern <i>S</i>′ of length <i>m</i>, decide in <i>O</i>(<i>n</i> + <i>m</i>) time whether <i>S</i>′ is a subsequence of <i>S</i>.</p>`,
  solution: `<p>Scan <i>S</i> once, matching each character of <i>S</i>′ at its <b>earliest</b> possible position: keep a pointer <i>j</i> into <i>S</i>′, and advance it whenever <i>S</i>[<i>i</i>] = <i>S</i>′[<i>j</i>]. Answer yes if <i>j</i> reaches <i>m</i>.</p>
<p><b>Stays ahead:</b> for any valid embedding at positions <i>q</i><sub>1</sub> &lt; … &lt; <i>q</i><sub>m</sub>, greedy's positions satisfy <i>g</i><sub>k</sub> ≤ <i>q</i><sub>k</sub>, by induction on <i>k</i>. So if any embedding exists, greedy finds one.</p>`
},
{
  id: "R17", topic: "greedy", diff: 2, source: "Classic", tags: ["interval cover"],
  title: "Cover [0, L] with the fewest intervals",
  statement: `<p>Given closed intervals [<i>a</i><sub>i</sub>, <i>b</i><sub>i</sub>], choose the fewest whose union contains [0, <i>L</i>], or report that it is impossible.</p>`,
  solution: `<p>Let <i>c</i> = 0 be the covered prefix. Repeatedly, among the intervals with <i>a</i><sub>i</sub> ≤ <i>c</i>, choose the one with the largest <i>b</i><sub>i</sub>, and set <i>c</i> = <i>b</i><sub>i</sub>. If <i>b</i><sub>i</sub> ≤ <i>c</i> already, the task is impossible, because there is a gap. Stop when <i>c</i> ≥ <i>L</i>. Sort by <i>a</i><sub>i</sub> and sweep, for <i>O</i>(<i>n</i> log <i>n</i>).</p>
<p><b>Stays ahead:</b> after <i>r</i> picks, greedy's covered prefix is at least as long as any solution's prefix after its first <i>r</i> picks, ordered by left endpoint. The <i>r</i>-th interval of any solution must start at or before that solution's current prefix, which is ≤ <i>c</i>. So that interval was a candidate for greedy too, and greedy reaches at least as far.</p>`
},
{
  id: "R18", topic: "greedy", diff: 3, source: "Moore–Hodgson", tags: ["deadlines", "heap"],
  title: "Maximize the number of on-time jobs",
  statement: `<p>Jobs have processing times <i>t</i><sub>j</sub> and deadlines <i>d</i><sub>j</sub> on one machine. Maximize the number of jobs that finish by their deadlines; late jobs can be skipped. Give an <i>O</i>(<i>n</i> log <i>n</i>) algorithm.</p>`,
  solution: `<p>Process the jobs in order of deadline. Add each job to the set <i>A</i> and add its time to the running total <i>T</i>. If <i>T</i> &gt; <i>d</i><sub>j</sub>, remove the <b>longest</b> job in <i>A</i>, using a max-heap, and subtract its time.</p>
<p><b>Invariants:</b> after processing the first <i>j</i> jobs, <i>A</i> is feasible when run in EDF order, and <i>A</i> is as large as possible among feasible subsets of those jobs. Among all maximum feasible subsets, <i>A</i> also has the smallest total time. When an overflow happens, the new job brought the count up by one over what can fit. Dropping the longest job keeps the count maximal and the total time as small as possible, which leaves the most room for later jobs. A full proof uses an exchange argument on these invariants.</p>`
},
{
  id: "R19", topic: "greedy", diff: 2, source: "Classic", tags: ["trees", "exchange"],
  title: "Maximum independent set in a tree",
  statement: `<p>Show that this greedy algorithm finds a maximum independent set in a tree: repeatedly take a leaf, add it to the set, and delete it together with its parent.</p>`,
  solution: `<p><b>Exchange lemma:</b> for any leaf ℓ with parent <i>p</i>, some maximum independent set contains ℓ. Let <i>I</i> be a maximum independent set. If ℓ ∈ <i>I</i>, we are done. If neither ℓ nor <i>p</i> is in <i>I</i>, then <i>I</i> + ℓ is still independent and larger, a contradiction. If <i>p</i> ∈ <i>I</i>, then <i>I</i> − <i>p</i> + ℓ is independent, because ℓ's only neighbor is <i>p</i>, and has the same size.</p>
<p>After choosing ℓ, the rest of the optimal solution must avoid <i>p</i>, so it is a maximum independent set of the forest that remains after deleting ℓ and <i>p</i>. Induct. Processing leaves in reverse BFS order gives <i>O</i>(<i>n</i>) time. Note that the same greedy fails on general graphs.</p>`
},
{
  id: "R20", topic: "greedy", diff: 1, source: "Classic", tags: ["pairing", "exchange"],
  title: "Pair people to minimize the largest pair sum",
  statement: `<p>Split 2<i>n</i> numbers into <i>n</i> pairs to minimize the largest pair sum. For example, the numbers are the times of tasks done by two-person teams, and the slowest team determines when everyone is done.</p>`,
  solution: `<p>Sort the numbers as <i>a</i><sub>1</sub> ≤ … ≤ <i>a</i><sub>2<i>n</i></sub> and pair <i>a</i><sub>i</sub> with <i>a</i><sub>2<i>n</i>+1−<i>i</i></sub>.</p>
<p><b>Exchange argument:</b> in an optimal pairing, suppose <i>a</i><sub>2<i>n</i></sub>, the largest, is paired with <i>x</i> and <i>a</i><sub>1</sub>, the smallest, is paired with <i>y</i>. Swap partners, so the pairs become (<i>a</i><sub>2<i>n</i></sub>, <i>a</i><sub>1</sub>) and (<i>x</i>, <i>y</i>). The new sums are <i>a</i><sub>2<i>n</i></sub> + <i>a</i><sub>1</sub> ≤ <i>a</i><sub>2<i>n</i></sub> + <i>x</i> and <i>x</i> + <i>y</i> ≤ <i>a</i><sub>2<i>n</i></sub> + <i>x</i>, so the maximum does not increase. Induct on the remaining 2<i>n</i> − 2 numbers.</p>`
},
{
  id: "R21", topic: "greedy", diff: 1, source: "Classic", tags: ["two pointers", "matching"],
  title: "Cookies for children",
  statement: `<p>Child <i>i</i> is content with any cookie of size ≥ <i>g</i><sub>i</sub>, and you have cookies of sizes <i>s</i><sub>1</sub>, …, <i>s</i><sub>m</sub>. Each child gets at most one cookie. Maximize the number of content children.</p>`,
  solution: `<p>Sort both lists. Go through the children from least to most demanding, and give each one the <b>smallest</b> remaining cookie that satisfies them, or skip them if none does. This takes <i>O</i>(<i>n</i> log <i>n</i> + <i>m</i> log <i>m</i>).</p>
<p><b>Exchange argument:</b> some optimal solution satisfies the least-demanding child, because if it satisfies anyone, it can give that cookie to the easiest child instead. It can also use the smallest cookie that fits that child: swapping in the smallest feasible cookie frees a larger one, which can only help everyone else.</p>`
},
{
  id: "R22", topic: "greedy", diff: 1, source: "CS577 F22 HW5 #1", tags: ["knapsack", "special structure"],
  title: "Superincreasing knapsack",
  statement: `<p>The items have weights with <i>w</i><sub>i</sub> ≥ <i>w</i><sub>1</sub> + … + <i>w</i><sub>i−1</sub> for every <i>i</i>, and value equals weight. Fill a knapsack of capacity <i>W</i> as close to <i>W</i> as possible without exceeding it, in <i>O</i>(<i>n</i>) time.</p>`,
  solution: `<p>Go from <i>i</i> = <i>n</i> down to 1, and add <i>w</i><sub>i</sub> whenever it fits.</p>
<p><b>Stays ahead:</b> take any feasible set <i>S</i>, and look at the first item <i>i</i>, scanning from heaviest to lightest, where greedy and <i>S</i> differ. Greedy only skips items that do not fit, so greedy takes <i>i</i> and <i>S</i> does not. With <i>w</i> the weight chosen before item <i>i</i>, which both share, <i>S</i> can reach at most <i>w</i> + (<i>w</i><sub>1</sub> + … + <i>w</i><sub>i−1</sub>) ≤ <i>w</i> + <i>w</i><sub>i</sub>. Greedy already has <i>w</i> + <i>w</i><sub>i</sub>, so <i>S</i> cannot do better.</p>`
},
{
  id: "R23", topic: "greedy", diff: 1, source: "Exam staple", tags: ["counterexample", "when greedy fails"],
  title: "When greedy fails: give counterexamples",
  statement: `<p>Give a small counterexample showing that each natural greedy algorithm is not optimal.</p>
<ol><li><b>Weighted</b> interval scheduling with earliest finish time.</li>
<li>Interval scheduling by "fewest conflicts first", using an instance different from the one in HW4.</li>
<li>Vertex cover by "repeatedly take a vertex of maximum degree".</li>
<li>Shortest path by "always take the cheapest outgoing edge".</li></ol>`,
  solution: `<ol><li>Intervals [0, 2) with weight 1 and [1, 10) with weight 100. Earliest finish time takes the first one (weight 1), and the second then conflicts, so it gets 1 instead of 100.</li>
<li>Use 11 intervals: A1 = [0,3], A2 = [4,7], A3 = [8,11], A4 = [12,15], B = [6,9], three copies of [2,5], and three copies of [10,13]. B has only 2 conflicts (A2 and A3), which is the fewest, so greedy picks it and discards A2 and A3. After that it can take at most one interval from each side, for 3 total. The optimum {A1, A2, A3, A4} has 4.</li>
<li>Path a–b–c–d–e. All of b, c, d have degree 2, so greedy may pick c first. Edges a–b and d–e then remain, and greedy needs 2 more vertices, for 3 total. The optimum is {b, d}, with 2. On worse instances, max-degree greedy can be off by a factor of Θ(log <i>n</i>).</li>
<li>Edges s→a (1), a→t (100), s→t (5). Following the cheapest edge out of <i>s</i> leads to <i>a</i> and a total of 101, while the direct edge costs 5.</li></ol>`
}
);
