/**
 * Shared crisis keyword detection & Quick Exit helper
 * Used across all free-text inputs (Curhat AI, Mood Journal, Community, Dashboard)
 */

export const CRISIS_KEYWORDS = [
  'bunuh diri',
  'suicide',
  'menyakiti diri',
  'melukai diri',
  'self-harm',
  'self harm',
  'mati saja',
  'pengen mati',
  'ingin mati',
  'ga sanggup hidup',
  'gak sanggup hidup',
  'tidak sanggup hidup',
  'akhiri hidup',
  'mengakhiri hidup',
  'nyakitin diri',
  'putus asa hidup',
];

export const detectCrisisKeyword = (text) => {
  if (!text || typeof text !== 'string') return false;
  const normalized = text.toLowerCase();
  return CRISIS_KEYWORDS.some((keyword) => normalized.includes(keyword));
};

export const triggerQuickExit = () => {
  try {
    window.open('https://www.google.com', '_blank', 'noopener,noreferrer');
  } catch {
    // fallback if popup blocked
  }
  window.location.replace('https://www.google.com');
};
