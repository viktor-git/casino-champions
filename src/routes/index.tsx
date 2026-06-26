import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Казино Чемпионов — Внутренний рейтинг по выручке" },
      { name: "description", content: "Премиальный рейтинг в стиле казино, посвящённый сотрудникам, сорвавшим самый крупный джекпот по выручке." },
      { property: "og:title", content: "Казино Чемпионов — Внутренний рейтинг по выручке" },
      { property: "og:description", content: "Кто сорвал самый большой джекпот для компании? Крутите барабаны и узнайте." },
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
  { name: "Иван Смирнов", revenue: 12500000, initials: "ИС" },
  { name: "Анна Иванова", revenue: 9800000, initials: "АИ" },
  { name: "Михаил Кузнецов", revenue: 7600000, initials: "МК" },
  { name: "София Петрова", revenue: 6450000, initials: "СП" },
  { name: "Лев Соколов", revenue: 5820000, initials: "ЛС" },
  { name: "Ольга Морозова", revenue: 5180000, initials: "ОМ" },
  { name: "Никита Васильев", revenue: 4730000, initials: "НВ" },
  { name: "Алиса Фёдорова", revenue: 4210000, initials: "АФ" },
];

const formatMoney = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

function Crown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7zm2.5 14h13a1 1 0 010 2h-13a1 1 0 010-2z" />
    </svg>
  );
}

function Bulbs({ count = 14, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex justify-between gap-1 ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full animate-marquee-blink"
          style={{
            background: "var(--gold)",
            animationDelay: `${(i % 4) * 0.25}s`,
          }}
        />
      ))}
    </div>
  );
}

function ChipIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="var(--neon-red)" stroke="var(--gold)" strokeWidth="3" />
      <circle cx="32" cy="32" r="18" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="32" cy="32" r="10" fill="var(--gold)" />
      <text x="32" y="37" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--background)">
        $
      </text>
    </svg>
  );
}

function SlotCard({ employee, rank }: { employee: Employee; rank: number }) {
  const isTop = rank <= 3;
  const finalDigits = formatMoney(employee.revenue).replace(/[^0-9]/g, "").split("");
  const [revealed, setRevealed] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [display, setDisplay] = useState<string[]>(() => finalDigits.map(() => "0"));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSpin = () => {
    if (spinning || revealed) return;
    setSpinning(true);
    intervalRef.current = setInterval(() => {
      setDisplay(finalDigits.map(() => String(Math.floor(Math.random() * 10))));
    }, 70);

    finalDigits.forEach((digit, i) => {
      window.setTimeout(
        () => {
          setDisplay((prev) => {
            const next = [...prev];
            next[i] = digit;
            return next;
          });
          if (i === finalDigits.length - 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setSpinning(false);
            setRevealed(true);
          }
        },
        1200 + i * 250,
      );
    });
  };

  const reelChars = spinning
    ? display
    : revealed
      ? display
      : finalDigits.map(() => "?");
  return (
    <div
      className={[
        "relative rounded-2xl bg-card p-6 text-center transition-transform hover:-translate-y-1",
        "border-2",
        isTop ? "border-gold shadow-neon-gold" : "border-border shadow-[var(--shadow-card)]",
        rank === 1 ? "md:scale-105" : "",
      ].join(" ")}
    >
      {/* Bulb frame */}
      <Bulbs count={10} className="absolute top-2 left-4 right-4" />
      <Bulbs count={10} className="absolute bottom-2 left-4 right-4" />

      {isTop && (
        <Crown className="absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 text-neon-gold animate-neon-pulse" />
      )}

      {/* Slot machine top */}
      <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <span>#{rank.toString().padStart(2, "0")}</span>
        <span className="text-neon-red">● ДЖЕКПОТ</span>
      </div>

      {/* Avatar */}
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-2xl font-black text-primary-foreground shadow-neon-gold">
        {employee.initials}
      </div>

      <h3 className="mb-3 text-lg font-bold text-foreground">{employee.name}</h3>

      {/* Revenue reel display */}
      <div className="rounded-lg border border-border bg-background/60 px-3 py-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Выручка
        </p>
        <div className="flex items-center justify-center gap-1">
          <span
            className={[
              "font-mono text-2xl font-black",
              revealed ? (isTop ? "text-neon-gold" : "text-foreground") : "text-muted-foreground",
            ].join(" ")}
          >
            ₽
          </span>
          {reelChars.map((c, i) => (
            <span
              key={i}
              className={[
                "flex h-9 w-6 items-center justify-center rounded bg-card font-mono text-xl font-black tabular-nums",
                spinning ? "text-neon-red" : revealed ? (isTop ? "text-neon-gold" : "text-foreground") : "text-muted-foreground",
              ].join(" ")}
            >
              {c}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={handleSpin}
          disabled={spinning || revealed}
          className={[
            "mt-3 w-full rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-transform",
            revealed
              ? "border border-border bg-transparent text-muted-foreground"
              : spinning
                ? "bg-gradient-gold text-primary-foreground opacity-80"
                : "bg-gradient-gold text-primary-foreground shadow-neon-gold hover:scale-105",
          ].join(" ")}
        >
          {revealed ? "Джекпот открыт" : spinning ? "Крутим..." : "Узнать сумму"}
        </button>
      </div>

      {/* Suit row */}
      <div className="mt-4 flex justify-center gap-3 text-base">
        <span className="text-neon-red">♥</span>
        <span style={{ color: "var(--gold)" }}>♦</span>
        <span className="text-foreground">♠</span>
        <span className="text-neon-purple">♣</span>
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
  const totalRevenue = sorted.reduce((s, e) => s + e.revenue, 0);

  return (
    <main className="min-h-screen">
      {/* TOP MARQUEE TICKER */}
      <div className="border-b border-gold/40 bg-background/80 py-2 overflow-hidden">
        <div className="flex w-max gap-12 whitespace-nowrap animate-ticker text-xs font-bold uppercase tracking-[0.35em] text-neon-gold">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              <span>★ Срываем джекпоты ★</span>
              <span>♠ Крупные выигрыши ♠</span>
              <span>♦ Открыто 24/7 ♦</span>
              <span>♥ Казино всегда платит ♥</span>
              <span>♣ Счастливые семёрки ♣</span>
              <span>★ Только хайроллеры ★</span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-20 pb-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--neon-red) 0%, transparent 40%), radial-gradient(circle at 80% 60%, var(--neon-purple) 0%, transparent 45%), radial-gradient(circle at 50% 100%, var(--gold) 0%, transparent 50%)",
          }}
        />

        {/* Floating chips */}
        <ChipIcon className="pointer-events-none absolute top-12 left-8 h-16 w-16 opacity-70 animate-spin-slow" />
        <ChipIcon className="pointer-events-none absolute bottom-12 right-10 h-20 w-20 opacity-60 animate-spin-slow" />
        <ChipIcon className="pointer-events-none absolute top-1/3 right-20 h-10 w-10 opacity-50 animate-spin-slow hidden md:block" />

        <div className="relative mx-auto max-w-4xl">
          {/* Neon OPEN sign */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border-2 border-neon-red px-5 py-1.5 text-xs font-black uppercase tracking-[0.4em] text-neon-red animate-flicker"
            style={{ borderColor: "var(--neon-red)" }}>
            <span>●</span> Открыто 24 / 7 <span>●</span>
          </div>

          <h1 className="font-serif text-6xl font-black leading-none text-neon-gold animate-neon-pulse md:text-8xl">
            Казино Чемпионов
          </h1>

          {/* Bulb underline */}
          <div className="mx-auto mt-6 max-w-md">
            <Bulbs count={20} />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Кто сорвал самый большой джекпот для компании?
          </p>

          <a
            href="#leaderboard"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-gold px-10 py-4 text-base font-black uppercase tracking-wider text-primary-foreground shadow-neon-gold transition-transform hover:scale-105"
          >
            Открыть рейтинг
          </a>

          {/* Jackpot stats strip */}
          <div className="mt-14 grid grid-cols-3 gap-3 rounded-2xl border-2 border-gold bg-card/60 p-4 shadow-neon-gold md:gap-6 md:p-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Общий джекпот</p>
              <p className="mt-1 font-mono text-xl font-black text-neon-gold md:text-3xl">{formatMoney(totalRevenue)}</p>
            </div>
            <div className="border-x border-border">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Игроки</p>
              <p className="mt-1 font-mono text-xl font-black text-neon-red md:text-3xl">{sorted.length}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Лучший спин</p>
              <p className="mt-1 font-mono text-xl font-black text-neon-purple md:text-3xl">{formatMoney(sorted[0].revenue)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CASINO STRIPE DIVIDER */}
      <div className="casino-stripe h-3" aria-hidden />

      {/* LEADERBOARD */}
      <section id="leaderboard" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.4em] text-neon-purple animate-flicker">
              ♠ ♥ ♦ ♣
            </p>
            <h2 className="text-4xl font-black md:text-5xl">
              Наши <span className="text-neon-red">Хайроллеры</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Каждый сотрудник — игровой автомат. Каждый спин — выручка на табло.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sorted.map((emp, i) => (
              <SlotCard key={emp.name} employee={emp} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <div className="casino-stripe h-3" aria-hidden />

      {/* PODIUM */}
      <section className="relative overflow-hidden bg-background/50 px-6 py-20">
        <ChipIcon className="pointer-events-none absolute -top-6 right-10 h-16 w-16 opacity-40 animate-spin-slow" />
        <ChipIcon className="pointer-events-none absolute bottom-4 left-10 h-12 w-12 opacity-40 animate-spin-slow" />
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-neon-red">
              ★ ★ ★ Зал славы ★ ★ ★
            </p>
            <h2 className="text-4xl font-black md:text-5xl">
              Лучшие <span className="text-neon-gold">Победители</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Три самых крупных джекпота периода.
            </p>
          </div>

          <div className="grid grid-cols-3 items-end gap-4 md:gap-8">
            {top3[1] && <PodiumBlock employee={top3[1]} place={2} height="120px" />}
            {top3[0] && <PodiumBlock employee={top3[0]} place={1} height="180px" />}
            {top3[2] && <PodiumBlock employee={top3[2]} place={3} height="90px" />}
          </div>
        </div>
      </section>

      <div className="casino-stripe h-3" aria-hidden />

      {/* CLOSING */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--neon-purple) 0%, transparent 60%)" }} />
        <div className="relative mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center gap-2 text-3xl">
            <span className="text-neon-red animate-neon-pulse">7</span>
            <span className="text-neon-gold animate-neon-pulse" style={{ animationDelay: "0.2s" }}>7</span>
            <span className="text-neon-purple animate-neon-pulse" style={{ animationDelay: "0.4s" }}>7</span>
          </div>
          <h2 className="text-4xl font-black leading-tight text-neon-purple md:text-5xl">
            Крутите барабаны успеха дальше
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Каждая закрытая сделка зажигает огни зала. Каждый квартал — новые джекпоты.
            За команду, которая превращает любой спин в победу.
          </p>
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.location.reload()}
            className="mt-10 inline-flex items-center justify-center rounded-full border-2 border-gold bg-transparent px-10 py-4 text-base font-black uppercase tracking-wider text-neon-gold transition-colors hover:bg-gradient-gold hover:text-primary-foreground"
          >
            Обновить результаты
          </button>
        </div>

        <p className="relative mt-16 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © Казино Чемпионов — Казино всегда выигрывает
        </p>
      </section>
    </main>
  );
}
