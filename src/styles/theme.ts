export const theme = {
  colors: {
    background: 'hsl(0, 0%, 3%)',
    foreground: 'hsl(0, 0%, 98%)',
    accent: 'hsl(0, 0%, 96%)',
    muted: 'hsl(0, 0%, 15%)',
  },

  spacing: {
    section: '8rem',
    container: '7xl',
  },

  animation: {
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 1.2,
    },
    easing: {
      apple: [0.6, 0.05, 0.01, 0.9],
      smooth: [0.4, 0.0, 0.2, 1],
    },
  },
} as const;

export type Theme = typeof theme;
