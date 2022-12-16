import DOMPurify from 'dompurify';

export const purify = (text: string) => {
  return DOMPurify.sanitize(text, { USE_PROFILES: { html: true } });
};
