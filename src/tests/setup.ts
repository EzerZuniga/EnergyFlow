import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { mockMatchMedia } from './helpers/matchMedia';

beforeEach(() => {
  // jsdom no implementa matchMedia: por defecto el sistema "prefiere" tema claro.
  mockMatchMedia(false);
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('style');
});
