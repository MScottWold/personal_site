import Constellation from "./background/constellation";
import { notFoundArtboard } from './background/artboard';

window.addEventListener('DOMContentLoaded', () => {
  const constellation = new Constellation('my-canvas', notFoundArtboard);
  constellation.changeMouseMode('coalesce');
});