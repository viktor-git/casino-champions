// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Целевая площадка сборки выбирается через env BUILD_TARGET:
//   BUILD_TARGET=vercel — SSR-сборка под Vercel (nitro preset "vercel")
//   иначе               — статичный SPA-билд (nitro отключён, prerender index.html)
const isVercel = process.env.BUILD_TARGET === "vercel";

export default defineConfig(
  isVercel
    ? {
        tanstackStart: {
          server: { entry: "server" },
        },
        nitro: {
          preset: "vercel",
        },
      }
    : {
        tanstackStart: {
          server: { entry: "server" },
          spa: {
            enabled: true,
            prerender: { outputPath: "/index.html" },
          },
        },
        nitro: false,
      },
);
