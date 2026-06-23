import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Champions Casino — Internal Revenue Leaderboard" },
      { name: "description", content: "A premium casino-style leaderboard celebrating the employees who hit the biggest revenue jackpots." },
      { property: "og:title", content: "Champions Casino — Internal Revenue Leaderboard" },
      { property: "og:description", content: "Who hit the biggest jackpot for the company? Spin the wheels and find out." },
    ],
  }),
  component: Index,
});

type Employee = {
  name: string;
  revenue: number;
  initials: string;
};

const employees: Employee[] = [
  { name: "John Smith", revenue: 125000, initials: "JS" },
  { name: "Emma Johnson", revenue: 98000, initials: "EJ" },
  { name: "Michael Brown", revenue: 76000, initials: "MB" },
  { name: "Sophia Davis", revenue: 64500, initials: "SD" },
  { name: "Liam Wilson", revenue: 58200, initials: "LW" },
  { name: "Olivia Martinez", revenue: 51800, initials: "OM" },
  { name: "Noah Anderson", revenue: 47300, initials: "NA" },
  { name: "Ava Thompson", revenue: 42100, initials: "AT" },
];

const formatMoney = (n: number) => `$${n.toLocaleString("en-US")}`;

function Crown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7zm2.5 14h13a1 1 0 010 2h-13a1 1 0 010-2z" />
    </svg>
  );
}

function SlotCard({ employee, rank }: { employee: Employee; rank: number }) {
  const isTop = rank <= 3;
  return (
    <div
      className={[
        "relative rounded-2xl bg-card p-6 text-center transition-transform hover:-translate-y-1",
        "border-2",
        isTop ? "border-gold shadow-neon-gold" : "border-border shadow-[var(--shadow-card)]",
        rank === 1 ? "md:scale-105" : "",
      ].join(" ")}
    >
      {isTop && (
        <Crown className="absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 text-neon-gold animate-neon-pulse" />
      )}

      {/* Slot machine top */}
      <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <span>#{rank.toString().padStart(2, "0")}</span>
        <span className="text-neon-red">● JACKPOT</span>
      </div>

      {/* Avatar */}
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-2xl font-black text-primary-foreground shadow-neon-gold">
        {employee.initials}
      </div>

      <h3 className="mb-3 text-lg font-bold text-foreground">{employee.name}</h3>

      {/* Reel display */}
      <div className="rounded-lg border border-border bg-background/60 px-3 py-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Revenue Generated
        </p>
        <p
          className={[
            "font-mono text-2xl font-black tabular-nums",
            isTop ? "text-neon-gold" : "text-foreground",
          ].join(" ")}
        >
          {formatMoney(employee.revenue)}
        </p>
      </div>

      {/* Slot lever dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-neon-red shadow-neon-red" style={{ background: "var(--neon-red)" }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--gold)" }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--neon-purple)" }} />
      </div>
    </div>
  );
}

function PodiumBlock({
  employee,
  place,
  height,
}: {
  employee: Employee;
  place: 1 | 2 | 3;
  height: string;
}) {
  const medal = place === 1 ? "🥇" : place === 2 ? "🥈" : "🥉";
  const glow =
    place === 1 ? "shadow-neon-gold border-gold" : place === 2 ? "border-border" : "border-border";
  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          "mb-3 flex w-full max-w-[220px] flex-col items-center rounded-xl border-2 bg-card p-5",
          glow,
        ].join(" ")}
      >
        <div className="text-3xl">{medal}</div>
        <p className="mt-2 text-base font-bold">{employee.name}</p>
        <p
          className={[
            "mt-1 font-mono text-xl font-black",
            place === 1 ? "text-neon-gold" : "text-foreground",
          ].join(" ")}
        >
          {formatMoney(employee.revenue)}
        </p>
      </div>
      <div
        className="flex w-full max-w-[220px] items-start justify-center rounded-t-lg border-2 border-b-0 border-border bg-gradient-to-b from-muted to-background pt-3 font-black text-muted-foreground"
        style={{ height }}
      >
        {place}
      </div>
    </div>
  );
}

function Index() {
  const sorted = [...employees].sort((a, b) => b.revenue - a.revenue);
  const top3 = sorted.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--neon-red) 0%, transparent 40%), radial-gradient(circle at 80% 60%, var(--neon-purple) 0%, transparent 45%), radial-gradient(circle at 50% 100%, var(--gold) 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-neon-purple">
            ★ Internal Leaderboard ★
          </p>
          <h1 className="font-serif text-6xl font-black leading-none text-neon-gold animate-neon-pulse md:text-8xl">
            Champions Casino
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Who hit the biggest jackpot for the company?
          </p>
          <a
            href="#leaderboard"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-gold px-10 py-4 text-base font-black uppercase tracking-wider text-primary-foreground shadow-neon-gold transition-transform hover:scale-105"
          >
            View Leaderboard
          </a>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaderboard" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black md:text-5xl">
              The <span className="text-neon-red">High Rollers</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every employee is a slot machine. Every spin is revenue on the board.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sorted.map((emp, i) => (
              <SlotCard key={emp.name} employee={emp} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* PODIUM */}
      <section className="border-y border-border bg-background/50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-black md:text-5xl">
              Top <span className="text-neon-gold">Winners</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              The three biggest jackpots of the period.
            </p>
          </div>

          <div className="grid grid-cols-3 items-end gap-4 md:gap-8">
            {top3[1] && <PodiumBlock employee={top3[1]} place={2} height="120px" />}
            {top3[0] && <PodiumBlock employee={top3[0]} place={1} height="180px" />}
            {top3[2] && <PodiumBlock employee={top3[2]} place={3} height="90px" />}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-black leading-tight text-neon-purple md:text-5xl">
            Keep Spinning the Wheels of Success
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every deal closed lights up the floor. Every quarter, new jackpots.
            Here's to the team turning every spin into another win.
          </p>
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.location.reload()}
            className="mt-10 inline-flex items-center justify-center rounded-full border-2 border-gold bg-transparent px-10 py-4 text-base font-black uppercase tracking-wider text-neon-gold transition-colors hover:bg-gradient-gold hover:text-primary-foreground"
          >
            Refresh Results
          </button>
        </div>

        <p className="mt-16 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © Champions Casino — House Always Wins
        </p>
      </section>
    </main>
  );
}
