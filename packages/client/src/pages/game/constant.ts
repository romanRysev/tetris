export type Sequence = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export const tetrominos: Record<Sequence, (0 | 1)[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};
export const colors: Record<string, string> = {
  I: '#FFFF00',
  O: '#0DCAF0',
  T: '#EE82EE',
  S: '#FF0000',
  Z: '#FFA500',
  J: '#0000FF',
  L: '#008000',
};
export const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
