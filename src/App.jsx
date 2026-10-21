import { useEffect, useState } from "react";
import portrait from "./assets/portrait.jpg";
import coverFlowers from "./assets/cover-flowers.jpg";
import week02Cover from "./assets/week02-cover.jpg";
import week02Workflow from "./assets/week02-workflow.png";
import week02Classroom from "./assets/week02-classroom.jpg";

/* ------------------------------------------------------------------ */
/*  Content — replace with your own sessions                          */
/* ------------------------------------------------------------------ */

const POSTS = [
  {
    id: "week-02",
    week: "02",
    date: "2026.10.09",
    title: "Vibe Coding — From “Can’t Code” to “Can Launch an Idea”",
    speakers: "Yibo Yang, Rishabh Modi & Nirvan Anand",
    affiliation: "Singapore American School",
    cover: { src: week02Cover, alt: "A laptop, a cup of coffee and a small plant on a sunlit wooden table, under the words “I built my website with Claude AI”" },
    excerpt:
      "Last week’s class was a special one. The speakers were three high school students from Singapore American School: Yibo Yang, Rishabh Modi, and Nirvan Anand.",
    body: [
      { p: "Last week’s class was a special one. The speakers were three high school students from Singapore American School: Yibo Yang, Rishabh Modi, and Nirvan Anand. Invited by Professor Madina Kalyayeva, they came to ESSEC to introduce us to vibe coding. The people on stage were much younger than us, yet they clearly taught a room of master’s students how to build a website from scratch. That alone made me reflect: in the age of AI, the threshold of “knowing how” is changing fast, and the real difference lies in whether you are willing to try." },
      { p: "The session was divided into three parts. The first part started with website design. The speakers suggested using Claude Design to describe how you want your site to look, creating a visual prototype without writing any code. What stood out to me most was “The Art of Prompting.” When asking AI to build a website, a prompt like “make a website for my course” produces a completely different result from one that clearly sets out the role, goal, target audience, page structure, design style, and required output. This closely mirrors my experience writing marketing briefs: the vaguer the brief to an agency or designer, the harder it is for the output to meet expectations. Working with AI, it turns out, is essentially a skill in communication and requirements management." },
      { p: "The second part introduced GitHub and Vercel. I had heard of GitHub before but only vaguely understood terms like commit, push, and pull request. Through the diagrams, I finally understood that GitHub stores code and its version history so team members don’t overwrite each other’s work, while Vercel turns that code into a real website that updates automatically with every push. The speakers also showed that you can simply ask the AI tool Claude Code to run the git commands for you, which greatly lowers the barrier for people without a technical background." },
      { img: week02Workflow, alt: "Workflow diagram: Claude Design (design the look) to Claude Code (build the files) to GitHub (store the code) to Vercel (publish online), with Supabase (logins and data) feeding into Vercel", wide: true, framed: true },
      { p: "The third part covered two limitations of static websites: they can’t remember users, and they can’t display live information. The speakers used the login process to explain the concept of a token and introduced how Supabase provides user authentication and a database. This reminded me of how CRM works. Behind every member profile and interaction record are data tables and API requests. Understanding this technical layer should help me communicate more effectively with tech teams when planning membership programs or data analysis in the future." },
      { p: "The session ended with a task: build a website with a tab for each guest speaker session this semester, each featuring an interactive game to review what we learned. I found this a clever design, as it combines learning the tools with consolidating knowledge, helping us truly internalize the content through hands-on practice." },
    ],
    reflection: [
      "My biggest takeaway from this session is that technology no longer belongs only to engineers. My background is in integrated marketing and CRM in the beauty industry, and I have long hoped to move closer to the tech sector, but not knowing how to code often held me back. Vibe coding showed me that as long as I can clearly define a problem and describe what I need, I can use AI to turn ideas into usable products.",
    ],
    closing: { img: week02Classroom, alt: "Yibo Yang, Rishabh Modi and Nirvan Anand presenting the workflow summary to the class at ESSEC" },
  },
];

/* ------------------------------------------------------------------ */
/*  Routing (hash-based so every entry has its own link)              */
/* ------------------------------------------------------------------ */

function useRoute() {
  const read = () => (window.location.hash || "#journey").slice(1);
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

/* ------------------------------------------------------------------ */
/*  Visual primitives                                                  */
/* ------------------------------------------------------------------ */

/** A diffused, out-of-focus flower drawn in SVG — the photo placeholder. */
function Bloom({ b, className = "", children }) {
  const cx = b.cx * 4;
  const cy = b.cy * 5;
  return (
    <div
      className={`bloom relative overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 90% at ${b.cx}% ${b.cy}%, ${b.wash[0]} 0%, ${b.wash[1]} 55%, ${b.wash[2]} 100%)` }}
    >
      <svg aria-hidden="true" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="bloom-art absolute inset-0 h-full w-full">
        <ellipse cx={cx - 150} cy={cy + 170} rx="70" ry="170" fill={b.leaf} opacity="0.55" transform={`rotate(-35 ${cx - 150} ${cy + 170})`} />
        <ellipse cx={cx + 160} cy={cy + 200} rx="55" ry="150" fill={b.leaf} opacity="0.4" transform={`rotate(28 ${cx + 160} ${cy + 200})`} />
        <g transform={`translate(${cx} ${cy}) rotate(${b.rot})`}>
          {Array.from({ length: b.petals }).map((_, i) => (
            <ellipse key={i} cx="0" cy="-74" rx="48" ry="90" fill={b.petal} opacity="0.78" transform={`rotate(${(360 / b.petals) * i})`} />
          ))}
          <circle r="36" fill={b.heart} opacity="0.85" />
        </g>
        <circle cx={cx + 120} cy={cy - 150} r="38" fill={b.petal} opacity="0.5" />
        <circle cx={cx - 130} cy={cy - 110} r="22" fill={b.heart} opacity="0.35" />
      </svg>
      <div aria-hidden="true" className="grain-local pointer-events-none absolute inset-0" />
      {children}
    </div>
  );
}

function Label({ children, className = "" }) {
  return <p className={`font-sans text-[11px] font-normal uppercase tracking-[0.3em] text-mist ${className}`}>{children}</p>;
}

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

const LINKEDIN = "https://www.linkedin.com/in/eva-tsai-55a97a1b9/";
const EMAIL = "B00837570@essec.com";

function Nav({ route }) {
  const active = route === "about" ? "about" : "journey";
  const link = (id, text) => (
    <a
      href={`#${id}`}
      aria-current={active === id ? "page" : undefined}
      className={`border-b pb-1 font-sans text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
        active === id ? "border-smoke text-smoke" : "border-transparent text-mist hover:text-smoke"
      }`}
    >
      {text}
    </a>
  );
  return (
    <header className="sticky z-40 bg-oat/90 backdrop-blur-md" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-5 md:px-10">
        <nav aria-label="Main" className="flex gap-8">
          {link("journey", "Learning Journey")}
          {link("about", "About Me")}
        </nav>
        <a href="#journey" className="font-serif text-lg italic text-smoke/80">
          The Learning of Digital Platform
        </a>
      </div>
    </header>
  );
}

/** Solid charcoal button, as on the reference site. */
function Button({ href, children, external, light, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-[13px] tracking-[0.08em] transition-colors duration-300 ${
        light ? "border border-smoke/70 text-smoke hover:bg-smoke hover:text-oat" : "bg-smoke text-oat hover:bg-olive"
      }`}
    >
      {children}
    </a>
  );
}

function Rule() {
  return <span aria-hidden="true" className="block h-px w-12 bg-[#B89F82]" />;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => {}
    );
  };
  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <span className="select-all">{EMAIL}</span>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-smoke/15 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.25em] text-mist transition-colors hover:border-sage hover:text-smoke"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-smoke/10">
      <div className="mx-auto grid max-w-6xl justify-items-center gap-1.5 px-5 py-10 text-center font-sans text-[12px] font-light text-mist md:px-10">
        <p>
          LinkedIn:{" "}
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-smoke hover:underline">
            linkedin.com/in/eva-tsai-55a97a1b9
          </a>
        </p>
        <p>Email: <span className="select-all">{EMAIL}</span></p>
        <p>© 2026 Yi-Meng, Tsai</p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Learning Journey (home)                                            */
/* ------------------------------------------------------------------ */

function EntryCard({ post }) {
  return (
    <a href={`#${post.id}`} className="group flex min-w-0 flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <img src={post.cover.src} alt="" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
      </div>
      <div className="mt-6 grid gap-3">
        <Rule />
        <h3 className="font-serif text-2xl font-normal leading-snug text-smoke transition-colors duration-300 group-hover:text-olive">{post.title}</h3>
        <p className="line-clamp-3 font-sans text-[14px] font-light leading-relaxed text-smoke/75">{post.excerpt}</p>
        <span className="mt-2 justify-self-start border-b border-smoke/50 pb-0.5 font-serif text-[13px] tracking-[0.12em] text-smoke">Read Entry</span>
      </div>
    </a>
  );
}

function HomeCover() {
  return (
    <section className="cover relative isolate w-full overflow-hidden text-white" aria-label="The Learning of Digital Platform">
      <img src={coverFlowers} alt="" className="cover-img absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-tr from-smoke/35 via-smoke/10 to-transparent" />

      <div className="relative flex h-full flex-col px-5 py-5 md:px-8">
        {/* title */}
        <div className="flex justify-center pt-6 md:pt-8">
          <p className="cover-shadow text-center font-serif text-[1.65rem] font-normal leading-[0.95] md:text-[2.1rem]">
            The Learning of
            <br />
            Digital Platform
          </p>
        </div>

        {/* bottom-left statement */}
        <div className="mt-auto pb-20 md:ml-[16%] md:pb-28">
          <p className="cover-shadow font-sans text-[10px] uppercase tracking-[0.18em] text-white/90 md:text-[11px]">Yi-Meng, Tsai</p>
          <p className="cover-shadow mt-2 max-w-md font-serif text-2xl font-light leading-snug tracking-[0.02em] md:text-[1.75rem]">
            Reflections &amp; Unfolding Thoughts
          </p>
        </div>

      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="entries" className="scroll-mt-6 pt-24 md:pt-32" aria-label="Weekly entries">
      <div className="text-center">
        <h2 className="font-serif text-4xl font-normal uppercase tracking-[0.04em] text-smoke md:text-5xl">Learning Journey</h2>
        <p className="mt-4 font-sans text-[15px] font-light text-smoke/70">Weekly logs, newest first.</p>
      </div>
      <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post) => (
          <EntryCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Entry detail                                                       */
/* ------------------------------------------------------------------ */

function Figure({ block }) {
  return (
    <figure className={block.wide ? "mx-auto max-w-4xl" : "mx-auto max-w-3xl"}>
      <div className={`overflow-hidden ${block.framed ? "border border-smoke/10 bg-white p-3 sm:p-5" : "bg-beige"}`}>
        <img src={block.img} alt={block.alt} className="h-auto w-full" loading="lazy" />
      </div>
    </figure>
  );
}

function Entry({ post }) {
  const i = POSTS.indexOf(post);
  const newer = POSTS[i - 1];
  const older = POSTS[i + 1];

  return (
    <article>
      <a href="#journey" className="mt-10 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.25em] text-mist transition-colors hover:text-smoke">
        ← All entries
      </a>

      <header className="mx-auto max-w-3xl pb-12 pt-12 text-center">
        <h1 className="text-balance font-serif text-4xl font-light leading-[1.1] tracking-tight text-smoke md:text-6xl">{post.title}</h1>
        <div className="mx-auto mt-8 flex justify-center">
          <Rule />
        </div>
      </header>

      <figure className="mx-auto max-w-xl">
        <img src={post.cover.src} alt={post.cover.alt} className="h-auto w-full" />
      </figure>

      <div className="mx-auto mt-16 grid max-w-[66ch] gap-7 font-sans text-[17px] font-light leading-[1.9] text-smoke/85">
        {post.body.map((b, n) =>
          b.img ? (
            <div key={n} className="my-6">
              <Figure block={b} />
            </div>
          ) : (
            <p key={n} className={n === 0 ? "dropcap" : undefined}>
              {b.p}
            </p>
          )
        )}
        {post.reflection.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {post.closing && (
        <div className="mt-20">
          <Figure block={{ ...post.closing, wide: true }} />
        </div>
      )}

      <nav aria-label="Other entries" className="mt-24 grid gap-6 border-t border-smoke/10 pt-10 sm:grid-cols-2">
        {older ? (
          <a href={`#${older.id}`} className="group grid gap-2">
            <Label>← Previous</Label>
            <span className="font-serif text-2xl text-smoke transition-colors group-hover:text-olive">{older.title}</span>
          </a>
        ) : (
          <span />
        )}
        {newer && (
          <a href={`#${newer.id}`} className="group grid gap-2 sm:text-right">
            <Label>Next →</Label>
            <span className="font-serif text-2xl text-smoke transition-colors group-hover:text-olive">{newer.title}</span>
          </a>
        )}
      </nav>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <>
      <section className="grid items-center gap-12 pt-14 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-20 md:pt-20">
        <div className="order-2 min-w-0 md:order-1">
          <h1 className="font-serif text-6xl font-light italic leading-[1.02] tracking-tight text-smoke md:text-[5rem]">Yi-Meng, Tsai</h1>
          <p className="mt-6 font-sans text-lg font-light tracking-wide text-smoke/85">
            MSc in Marketing Management &amp; Digital Student @ ESSEC Asia-Pacific
          </p>
          <div className="mt-6">
            <Rule />
          </div>
          <p className="mt-6 font-sans text-[15px] font-light text-smoke/80">
            Based in Singapore <span className="mx-2 text-mist">|</span> From Taiwan
          </p>
          <p className="mt-6 max-w-[50ch] font-sans text-[15px] font-light leading-[1.85] text-smoke/80">
            I am a dynamic marketing professional with a background in beauty omnichannel growth, CRM, and digital storytelling, exploring the intersection of digital platforms, data, and human-centric brand experiences.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={LINKEDIN} external>
              Connect on LinkedIn ↗
            </Button>
            <Button href="#journey" light>
              View Learning Journey
            </Button>
          </div>
        </div>
        <figure className="order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige">
            <img src={portrait} alt="A cup of tea resting on a book by the window" className="h-full w-full object-cover object-[50%_60%]" />
            <div aria-hidden="true" className="grain-local pointer-events-none absolute inset-0" />
          </div>
        </figure>
      </section>

    </>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const route = useRoute();
  const post = POSTS.find((p) => p.id === route);
  const isHome = route !== "about" && !post;
  const page = route === "about" ? <About /> : post ? <Entry post={post} /> : <Journey />;

  return (
    <div className="relative min-h-screen bg-oat font-sans text-smoke selection:bg-sage/30">
      <div aria-hidden="true" className="film-grain" />
      <Nav route={route} />
      {isHome && <HomeCover />}
      <main key={route} className="page-enter mx-auto max-w-6xl px-5 md:px-10">
        {page}
      </main>
      <Footer />
    </div>
  );
}
