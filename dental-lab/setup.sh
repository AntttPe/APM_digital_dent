# 1. Napraw rozszerzenie pliku i18n (z .ts na .tsx)
mv src/lib/i18n.ts src/lib/i18n.tsx

# 2. Nadpisz globals.css bezpieczną wersją (bez niestandardowych zmiennych)
cat > src/app/globals.css << 'EOF'
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 3%;
    --foreground: 0 0% 98%;
  }

  body {
    @apply bg-zinc-950 text-zinc-50 antialiased;
    font-feature-settings: 'cv11', 'ss01';
  }

  /* Naprawiony błąd border-border -> border-zinc-800 */
  * {
    @apply border-zinc-800;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
EOF

# 3. Wyczyść cache (dla pewności)
rm -rf .next

echo "✅ Naprawiono błędy! Spróbuj teraz wpisać: npm run dev"