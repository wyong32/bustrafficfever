export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryId: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "bus-traffic-fever-beginner-guide",
    title: "Bus Traffic Fever Beginner Guide: How to Clear Parking Jams",
    excerpt: "Learn the basic Bus Traffic Fever rules, bus move order, passenger flow, lane clearing, and beginner mistakes to avoid.",
    image: "/Bus-Traffic-Fever-1.jpg",
    category: "Guides & Tips",
    categoryId: "guides",
    date: "July 9, 2026",
    readTime: "8 min read",
    author: "Bus Traffic Fever Guide Team",
    content: `
      <p>Bus Traffic Fever looks simple at first: move buses, clear space, and collect passengers. The challenge comes from the order of those moves. A bus that seems helpful can block the next route if you move it too early.</p>
      <h2>Read the Parking Lot Before Moving</h2>
      <p>Start each level by checking which buses have a clear exit and which vehicles are trapped behind others. The first move should open more space, not create a new bottleneck.</p>
      <h2>Clear Front Lanes First</h2>
      <p>Front lanes usually control the rest of the board. If you can open a path near the exit, later buses become easier to route without forcing awkward moves.</p>
      <h2>Watch Passenger Flow</h2>
      <p>Passenger collection is part of the puzzle. Keep buses moving toward the right waiting groups and avoid wasting a lane on a bus that cannot leave cleanly yet.</p>
      <h2>Avoid Deadlocks</h2>
      <p>A deadlock happens when a bus parks in the only lane another vehicle needs. Before moving, ask whether that space will still be useful after the bus stops.</p>
      <h2>Use Walkthroughs Carefully</h2>
      <p>When stuck, watch only the next few moves, pause, and return to your board. This helps you learn the route logic instead of only copying the full solution.</p>
    `,
  },
  {
    id: 2,
    slug: "bus-traffic-fever-strategy-tips",
    title: "Bus Traffic Fever Strategy Tips for Hard Parking Jam Levels",
    excerpt: "Improve Bus Traffic Fever solving with route planning, open-lane management, passenger matching, and safer bus movement decisions.",
    image: "/Bus-Traffic-Fever-2.jpg",
    category: "Strategy",
    categoryId: "strategy",
    date: "July 9, 2026",
    readTime: "9 min read",
    author: "Bus Traffic Fever Guide Team",
    content: `
      <p>Hard Bus Traffic Fever levels reward players who think about traffic flow instead of tapping every possible bus. The goal is not just to move something; the goal is to make the next move easier.</p>
      <h2>Think Two Moves Ahead</h2>
      <p>Before moving a bus, check what space it opens and what space it occupies. A strong move should unlock at least one new route or improve passenger collection.</p>
      <h2>Keep a Recovery Lane</h2>
      <p>Try to preserve one flexible lane when the board is crowded. This lane gives you a place to redirect buses when the obvious route is not ready yet.</p>
      <h2>Prioritize Blocking Vehicles</h2>
      <p>Buses that block multiple vehicles are usually more important than buses that can already leave. Freeing a central blocker often clears several routes at once.</p>
      <h2>Match Color and Direction</h2>
      <p>If the level uses passenger or color matching, do not send buses randomly. The best route keeps the correct bus type moving toward the correct collection area.</p>
      <h2>Review Video Solutions</h2>
      <p>A walkthrough is most useful when you compare board states. Pause after each key move and note which lane became available.</p>
    `,
  },
  {
    id: 3,
    slug: "solve-bus-traffic-fever-levels-faster",
    title: "How to Solve Bus Traffic Fever Levels Faster",
    excerpt: "Solve Bus Traffic Fever levels faster by scanning exits first, avoiding lane traps, planning passenger pickup, and using walkthroughs efficiently.",
    image: "/Bus-Traffic-Fever-3.jpg",
    category: "Walkthroughs",
    categoryId: "walkthroughs",
    date: "July 9, 2026",
    readTime: "7 min read",
    author: "Bus Traffic Fever Guide Team",
    content: `
      <p>Faster Bus Traffic Fever clears come from fewer wasted moves. The best players slow down for a few seconds at the start, then execute a clean route through the parking jam.</p>
      <h2>Scan Exits First</h2>
      <p>Identify the buses closest to an open exit and the vehicles blocking those exits. This gives you a natural starting route.</p>
      <h2>Remove Chain Blockers</h2>
      <p>Some buses block only one vehicle, while others block a whole chain. Focus on the chain blockers first because one move can free several later moves.</p>
      <h2>Do Not Fill Every Open Space</h2>
      <p>An empty lane is valuable. If you fill it too early, you may lose the flexibility needed for the next bus.</p>
      <h2>Use Walkthroughs in Small Steps</h2>
      <p>Watch the next move, pause the video, and solve from there. This keeps the level engaging while still helping you pass difficult layouts.</p>
      <h2>Stay Consistent</h2>
      <p>Bus Traffic Fever is about clean traffic planning. A steady route with no deadlocks is faster than rushed tapping that forces restarts.</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(categoryId: string): BlogPost[] {
  if (categoryId === 'all') return blogPosts;
  return blogPosts.filter(post => post.categoryId === categoryId);
}
