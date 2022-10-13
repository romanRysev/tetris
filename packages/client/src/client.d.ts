declare const __SERVER_PORT__: number;
declare module '*.scss';

declare module '*.svg' {
  const content: string;
  export default content;
}
