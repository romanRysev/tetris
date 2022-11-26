export type Sequence = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type TetrominoMatrix = (0 | 1)[][];
export const tetrominos: Record<Sequence, TetrominoMatrix> = {
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

export const gray = '#D9D9D9';
export const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export const maxMobileWidth = 768;

export const fillGameCanvas = 'rgba(255, 255, 255, 0';
