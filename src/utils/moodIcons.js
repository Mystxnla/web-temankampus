import { Sun, Cloud, CloudRain, Coffee } from 'lucide-react';

export const MOOD_META = {
  baik: {
    icon: Sun,
    dotClass: 'bg-semantic-positive',
    textClass: 'text-semantic-positive',
    softClass: 'bg-semantic-positive-soft',
    shortLabel: 'Semangat',
  },
  biasa: {
    icon: Cloud,
    dotClass: 'bg-semantic-info',
    textClass: 'text-semantic-info',
    softClass: 'bg-semantic-info-soft',
    shortLabel: 'Netral',
  },
  stres: {
    icon: CloudRain,
    dotClass: 'bg-semantic-warning',
    textClass: 'text-semantic-warning',
    softClass: 'bg-semantic-warning-soft',
    shortLabel: 'Kewalahan',
  },
  lelah: {
    icon: Coffee,
    dotClass: 'bg-accent',
    textClass: 'text-accent',
    softClass: 'bg-accent-soft',
    shortLabel: 'Butuh rehat',
  },
};

export const getMoodMeta = (moodId) => MOOD_META[moodId] || MOOD_META.biasa;
