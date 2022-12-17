import DOMPurify from 'dompurify';

export const purify = (text: string) => {
  return DOMPurify.sanitize(text, { USE_PROFILES: { html: true } });
};

export const stripTags = (text: string) => {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
};

export const makeLineBreaks = (text: string) => {
  return text.replace(/\r\n?|\n/g, '<br />');
};
