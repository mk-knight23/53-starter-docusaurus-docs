export const STORAGE_KEYS = {
  SETTINGS: 'docs-settings',
  STATS: 'docs-stats'
} as const;

export const KEYBOARD_SHORTCUTS = {
  TOGGLE_THEME: ['ctrl', 'k'],
  OPEN_SETTINGS: ['ctrl', 's'],
  CLOSE: ['escape']
} as const;

export const AUDIO_CONFIG = {
  CLICK_FREQUENCY: 800,
  CLICK_TYPE: 'sine' as const,
  CLICK_DURATION: 0.1
} as const;
