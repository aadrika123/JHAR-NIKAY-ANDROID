// Modern Theme Configuration
export const COLORS = {
  // Primary Colors
  primary: '#6366f1', // Indigo
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',

  // Secondary Colors
  secondary: '#ec4899', // Pink
  secondaryLight: '#f472b6',
  secondaryDark: '#ec0c88',

  // Accent Colors
  accent: '#f59e0b', // Amber
  accentLight: '#fbbf24',
  accentDark: '#d97706',

  // Status Colors
  success: '#10b981', // Emerald
  successLight: '#6ee7b7',
  successDark: '#059669',

  warning: '#f59e0b', // Amber
  error: '#ef4444', // Red
  errorLight: '#fca5a5',
  info: '#3b82f6', // Blue

  // Neutral Colors
  white: '#ffffff',
  black: '#000000',
  gray900: '#111827',
  gray800: '#1f2937',
  gray700: '#374151',
  gray600: '#4b5563',
  gray500: '#6b7280',
  gray400: '#9ca3af',
  gray300: '#d1d5db',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  gray50: '#f9fafb',

  // Backgrounds
  background: '#ffffff',
  backgroundSecondary: '#f9fafb',
  backgroundTertiary: '#f3f4f6',

  // Borders
  borderLight: '#e5e7eb',
  borderMed: '#d1d5db',
  borderDark: '#9ca3af',

  // Text
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  textTertiary: '#9ca3af',
  textInverse: '#ffffff',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lg: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: FONT_SIZES.md,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySm: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  button: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};
