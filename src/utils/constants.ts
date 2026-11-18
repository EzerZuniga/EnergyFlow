/** Claves de almacenamiento local de preferencias de interfaz. */
export const PREFERENCE_KEYS = {
  /** Debe coincidir con el script de arranque de index.html (evita el parpadeo de tema). */
  theme: 'energyflow:theme',
  /** Preferencias de la interfaz de la demo (sidebar). */
  ui: 'energyflow:ui',
  /** sessionStorage: la bienvenida de la demo ya se mostró en esta sesión. */
  demoWelcome: 'energyflow:demo-welcome',
} as const;
