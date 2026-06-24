import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BA5ETqig.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYMPFxI9wX1OajKt7Xr0exwWR-6VNEGpUE1N6Wf_phXLMZQ1_U1bwh1CXq9hvBCyVCctF-KfQEon6B/pub?gid=0&single=true&output=csv";
function parseInitials(name) {
	const parts = name.trim().split(/\s+/);
	return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}
function parseCsv(text) {
	const [, ...rows] = text.trim().split("\n");
	return rows.map((row) => {
		const [name, revenueRaw, initialsRaw] = row.split(",");
		const revenue = Number(revenueRaw?.trim().replace(/[^0-9]/g, ""));
		if (!name?.trim() || !revenue) return null;
		return {
			name: name.trim(),
			revenue,
			initials: initialsRaw?.trim() || parseInitials(name)
		};
	}).filter(Boolean);
}
var formatMoney = (n) => `$${n.toLocaleString("en-US")}`;
function Crown({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7zm2.5 14h13a1 1 0 010 2h-13a1 1 0 010-2z" })
	});
}
function Bulbs({ count = 14, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex justify-between gap-1 ${className}`,
		"aria-hidden": true,
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-2 w-2 rounded-full animate-marquee-blink",
			style: {
				background: "var(--gold)",
				animationDelay: `${i % 4 * .25}s`
			}
		}, i))
	});
}
function ChipIcon({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "30",
				fill: "var(--neon-red)",
				stroke: "var(--gold)",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "18",
				fill: "none",
				stroke: "var(--gold)",
				strokeWidth: "2",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "10",
				fill: "var(--gold)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "32",
				y: "37",
				textAnchor: "middle",
				fontSize: "12",
				fontWeight: "900",
				fill: "var(--background)",
				children: "$"
			})
		]
	});
}
function SlotCard({ employee, rank }) {
	const isTop = rank <= 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: [
			"relative rounded-2xl bg-card p-6 text-center transition-transform hover:-translate-y-1",
			"border-2",
			isTop ? "border-gold shadow-neon-gold" : "border-border shadow-[var(--shadow-card)]",
			rank === 1 ? "md:scale-105" : ""
		].join(" "),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bulbs, {
				count: 10,
				className: "absolute top-2 left-4 right-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bulbs, {
				count: 10,
				className: "absolute bottom-2 left-4 right-4"
			}),
			isTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 text-neon-gold animate-neon-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["#", rank.toString().padStart(2, "0")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-neon-red",
					children: "● JACKPOT"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-2xl font-black text-primary-foreground shadow-neon-gold",
				children: employee.initials
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-lg font-bold text-foreground",
				children: employee.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 grid grid-cols-3 gap-1.5 rounded-md border border-border bg-background/80 p-2",
				children: [
					"7",
					"7",
					"7"
				].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-10 items-center justify-center rounded bg-card font-serif text-2xl font-black text-neon-red",
					children: r
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-background/60 px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground",
					children: "Revenue Generated"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: ["font-mono text-2xl font-black tabular-nums", isTop ? "text-neon-gold" : "text-foreground"].join(" "),
					children: formatMoney(employee.revenue)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex justify-center gap-3 text-base",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-neon-red",
						children: "♥"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "var(--gold)" },
						children: "♦"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: "♠"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-neon-purple",
						children: "♣"
					})
				]
			})
		]
	});
}
function PodiumBlock({ employee, place, height }) {
	const medal = place === 1 ? "🥇" : place === 2 ? "🥈" : "🥉";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: ["mb-3 flex w-full max-w-[220px] flex-col items-center rounded-xl border-2 bg-card p-5", place === 1 ? "shadow-neon-gold border-gold" : place === 2 ? "border-border" : "border-border"].join(" "),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-3xl",
					children: medal
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base font-bold",
					children: employee.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: ["mt-1 font-mono text-xl font-black", place === 1 ? "text-neon-gold" : "text-foreground"].join(" "),
					children: formatMoney(employee.revenue)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-full max-w-[220px] items-start justify-center rounded-t-lg border-2 border-b-0 border-border bg-gradient-to-b from-muted to-background pt-3 font-black text-muted-foreground",
			style: { height },
			children: place
		})]
	});
}
function LoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-2xl font-black text-neon-gold animate-neon-pulse",
			children: "🎰 Loading…"
		})
	});
}
function Index() {
	const [employees, setEmployees] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		fetch(SHEET_CSV_URL).then((r) => r.text()).then((text) => setEmployees(parseCsv(text))).finally(() => setLoading(false));
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	const sorted = [...employees].sort((a, b) => b.revenue - a.revenue);
	const top3 = sorted.slice(0, 3);
	const totalRevenue = sorted.reduce((s, e) => s + e.revenue, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-gold/40 bg-background/80 py-2 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max gap-12 whitespace-nowrap animate-ticker text-xs font-bold uppercase tracking-[0.35em] text-neon-gold",
					children: Array.from({ length: 2 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "★ Jackpot Hits ★" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "♠ Big Wins ♠" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "♦ 24/7 Open ♦" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "♥ House Always Pays ♥" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "♣ Lucky 7s ♣" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "★ High Rollers Only ★" })
						]
					}, k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden px-6 pt-20 pb-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-0 opacity-30",
						style: { backgroundImage: "radial-gradient(circle at 20% 30%, var(--neon-red) 0%, transparent 40%), radial-gradient(circle at 80% 60%, var(--neon-purple) 0%, transparent 45%), radial-gradient(circle at 50% 100%, var(--gold) 0%, transparent 50%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipIcon, { className: "pointer-events-none absolute top-12 left-8 h-16 w-16 opacity-70 animate-spin-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipIcon, { className: "pointer-events-none absolute bottom-12 right-10 h-20 w-20 opacity-60 animate-spin-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipIcon, { className: "pointer-events-none absolute top-1/3 right-20 h-10 w-10 opacity-50 animate-spin-slow hidden md:block" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-4xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 inline-flex items-center gap-3 rounded-full border-2 border-neon-red px-5 py-1.5 text-xs font-black uppercase tracking-[0.4em] text-neon-red animate-flicker",
								style: { borderColor: "var(--neon-red)" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "●" }),
									" Open 24 / 7 ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "●" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-serif text-6xl font-black leading-none text-neon-gold animate-neon-pulse md:text-8xl",
								children: "Champions Casino"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mt-6 max-w-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bulbs, { count: 20 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl",
								children: "Who hit the biggest jackpot for the company?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#leaderboard",
								className: "mt-10 inline-flex items-center justify-center rounded-full bg-gradient-gold px-10 py-4 text-base font-black uppercase tracking-wider text-primary-foreground shadow-neon-gold transition-transform hover:scale-105",
								children: "View Leaderboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-14 grid grid-cols-3 gap-3 rounded-2xl border-2 border-gold bg-card/60 p-4 shadow-neon-gold md:gap-6 md:p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
										children: "Total Jackpot"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-xl font-black text-neon-gold md:text-3xl",
										children: formatMoney(totalRevenue)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-x border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
											children: "Players"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-xl font-black text-neon-red md:text-3xl",
											children: sorted.length
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
										children: "Top Spin"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-xl font-black text-neon-purple md:text-3xl",
										children: formatMoney(sorted[0].revenue)
									})] })
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "casino-stripe h-3",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "leaderboard",
				className: "px-6 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs font-bold uppercase tracking-[0.4em] text-neon-purple animate-flicker",
								children: "♠ ♥ ♦ ♣"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-4xl font-black md:text-5xl",
								children: ["The ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-neon-red",
									children: "High Rollers"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground",
								children: "Every employee is a slot machine. Every spin is revenue on the board."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4",
						children: sorted.map((emp, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotCard, {
							employee: emp,
							rank: i + 1
						}, emp.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "casino-stripe h-3",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-background/50 px-6 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipIcon, { className: "pointer-events-none absolute -top-6 right-10 h-16 w-16 opacity-40 animate-spin-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipIcon, { className: "pointer-events-none absolute bottom-4 left-10 h-12 w-12 opacity-40 animate-spin-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-5xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-14 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-3 text-xs font-bold uppercase tracking-[0.4em] text-neon-red",
									children: "★ ★ ★ Hall of Fame ★ ★ ★"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-4xl font-black md:text-5xl",
									children: ["Top ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neon-gold",
										children: "Winners"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted-foreground",
									children: "The three biggest jackpots of the period."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 items-end gap-4 md:gap-8",
							children: [
								top3[1] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodiumBlock, {
									employee: top3[1],
									place: 2,
									height: "120px"
								}),
								top3[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodiumBlock, {
									employee: top3[0],
									place: 1,
									height: "180px"
								}),
								top3[2] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodiumBlock, {
									employee: top3[2],
									place: 3,
									height: "90px"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "casino-stripe h-3",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative px-6 py-24 text-center overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0 opacity-25",
						"aria-hidden": true,
						style: { backgroundImage: "radial-gradient(circle at 50% 50%, var(--neon-purple) 0%, transparent 60%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex justify-center gap-2 text-3xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neon-red animate-neon-pulse",
										children: "7"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neon-gold animate-neon-pulse",
										style: { animationDelay: "0.2s" },
										children: "7"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neon-purple animate-neon-pulse",
										style: { animationDelay: "0.4s" },
										children: "7"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-4xl font-black leading-tight text-neon-purple md:text-5xl",
								children: "Keep Spinning the Wheels of Success"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-lg text-muted-foreground",
								children: "Every deal closed lights up the floor. Every quarter, new jackpots. Here's to the team turning every spin into another win."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => typeof window !== "undefined" && window.location.reload(),
								className: "mt-10 inline-flex items-center justify-center rounded-full border-2 border-gold bg-transparent px-10 py-4 text-base font-black uppercase tracking-wider text-neon-gold transition-colors hover:bg-gradient-gold hover:text-primary-foreground",
								children: "Refresh Results"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative mt-16 text-xs uppercase tracking-[0.3em] text-muted-foreground",
						children: "© Champions Casino — House Always Wins"
					})
				]
			})
		]
	});
}
//#endregion
export { Index as component };
