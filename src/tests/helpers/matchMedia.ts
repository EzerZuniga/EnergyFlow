/**
 * Sustituye window.matchMedia (no implementado en jsdom).
 * Solo implementa la API moderna (addEventListener), que es la que usa la aplicación.
 * @param prefersDark valor de `(prefers-color-scheme: dark)`.
 */
export function mockMatchMedia(prefersDark: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList => {
      const list: Partial<MediaQueryList> = {
        matches: query.includes('prefers-color-scheme: dark') ? prefersDark : false,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      };
      return list as MediaQueryList;
    },
  });
}
