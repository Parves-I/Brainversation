// Explicit icon map so only the icons we use are bundled (tree-shakeable).
import {
  User, Activity, CloudRain, Heart, Sprout, Feather, Wind, Palette, ClipboardList,
  FlaskConical, ShieldCheck, Sparkles, Building2, Leaf, BookOpen, Circle,
} from 'lucide-react';

const MAP = {
  User, Activity, CloudRain, Heart, Sprout, Feather, Wind, Palette, ClipboardList,
  FlaskConical, ShieldCheck, Sparkles, Building2, Leaf, BookOpen,
};

export function Icon({ name, ...props }) {
  const Cmp = MAP[name] || Circle;
  return <Cmp {...props} />;
}
