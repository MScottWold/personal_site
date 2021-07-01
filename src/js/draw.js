import { drawArtboard } from './background/artboard';
import AnimatedBackground from './background/animated_background';

$(() => {
  new AnimatedBackground('my-canvas', drawArtboard, true);
})