import neuralVideo from '../../../assets/neural-bg.mp4';
import neuralTexture from '../../../assets/neural-texture.png';

// Looping AI-generated video backdrop for dark sections.
export function VideoBackdrop({ opacity = 0.3, scrim = 'bg-brand-dark/60' }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity }}
        autoPlay muted loop playsInline preload="metadata"
        aria-hidden="true"
      >
        <source src={neuralVideo} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${scrim}`} />
    </div>
  );
}

// AI-generated neural texture image as a soft overlay.
export function TextureOverlay({ opacity = 0.18, blend = 'mix-blend-screen' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-cover bg-center ${blend}`}
      style={{ backgroundImage: `url(${neuralTexture})`, opacity }}
      aria-hidden="true"
    />
  );
}
