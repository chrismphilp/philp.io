import type { ThemeRegistration } from 'shiki';
import githubLight from 'shiki/themes/github-light.mjs';
import monokai from 'shiki/themes/monokai.mjs';

// Keep the existing palettes, adjusting tokens for the actual cream/dark backgrounds.
const lightColors: Record<string, string> = {
  '#6a737d': '#626b75',
  '#22863a': '#1f7a35',
  '#d73a49': '#c83240',
  '#e36209': '#ad4906',
};
const darkColors: Record<string, string> = { '#75715e': '#98937e' };

const withTokenColors = (
  theme: ThemeRegistration,
  colors: Record<string, string>,
): ThemeRegistration => ({
  ...theme,
  tokenColors: theme.tokenColors?.map((rule) => ({
    ...rule,
    settings: {
      ...rule.settings,
      foreground:
        colors[rule.settings.foreground?.toLowerCase() ?? ''] ?? rule.settings.foreground,
    },
  })),
});

export const codeThemes = {
  light: withTokenColors(githubLight, lightColors),
  dark: withTokenColors(monokai, darkColors),
};
