import { Application } from '@splinetool/runtime';

export function initSplineScene() {
  const canvas = document.getElementById('splineCanvas');
  if (!canvas) return;

  const app = new Application(canvas);
  
  // A calming, abstract interactive 3D shape from Spline public library
  // This fits the "Slime" / Organic 3D request perfectly.
  app.load('https://prod.spline.design/Q0pG70XQx0e8w8H0/scene.splinecode')
    .then(() => {
      console.log('Spline scene loaded successfully');
      
      // Ensure the canvas sits properly behind the hero content but captures mouse events
      canvas.style.pointerEvents = 'auto';
    })
    .catch((error) => {
      console.error('Error loading Spline scene:', error);
    });
}
