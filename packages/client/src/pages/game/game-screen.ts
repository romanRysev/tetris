export class Tetris {
  public count = 0;
  public tetromino = this.getNextTetromino();
  public gameOver = false;
  public title: string;
  public width: number;
  public height: number;
  public canvasRef: React.RefObject<HTMLCanvasElement>;
  public canvas: HTMLCanvasElement | null;
  public ctx: CanvasRenderingContext2D | null | undefined;
  public tetrominoSequence: Array<[]> | any[] | Array<string>;
  public playfield: any[];
  public tetrominos: any;
  public colors: any;
  public sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  CELL_SIZE = 50;

  public constructor(
    title: string,
    width: number,
    height: number,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    canvas: HTMLCanvasElement | null,
    tetrominoSequence: any[],
    playfield: any[],
    tetrominos: any,
    colors: any,
  ) {
    this.canvas = canvas;
    this.canvasRef = canvasRef;
    this.title = title;
    this.width = width;
    this.height = height;
    this.tetrominoSequence = tetrominoSequence;
    this.playfield = playfield;
    this.tetrominos = tetrominos;
    this.colors = colors;
    this.createCanvas();
  }

  public createCanvas(): void {
    if (this.canvas && this.canvasRef.current) {
      this.ctx = this.canvasRef.current.getContext('2d');
      this.canvas.width = 500;
      this.canvas.height = 1000;
      if (this.ctx) {
        this.ctx.fillStyle = '#B0E0E6';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
  public drawWorld() {
    if (this.ctx) {
      this.ctx.beginPath();
      for (let x = 0; x < this.width + 1; x++) {
        this.ctx.moveTo(this.CELL_SIZE * x, 0);
        this.ctx.lineTo(this.CELL_SIZE * x, this.height * this.CELL_SIZE);
      }
      for (let y = 0; y < this.height + 1; y++) {
        this.ctx.moveTo(0, this.CELL_SIZE * y);
        this.ctx.lineTo(this.width * this.CELL_SIZE, this.CELL_SIZE * y);
      }
      this.ctx.stroke();
    }
  }
  public init() {
    this.tetrominoSequence = [];
    this.playfield = [];
    for (let row = -2; row < 20; row++) {
      this.playfield[row] = [];
      for (let col = 0; col < 10; col++) {
        this.playfield[row][col] = 0;
      }
    }
    this.drawWorld();
    this.generateSequence();
  }
  public generateSequence() {
    this.sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    while (this.sequence.length) {
      const rand = getRandomInt(0, this.sequence.length - 1);
      const name = this.sequence.splice(rand, 1)[0];
      this.tetrominoSequence.push(name);
    }
  }
  public getNextTetromino() {
    this.tetrominos = {
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
    this.tetrominoSequence = [];
    if (this.tetrominoSequence.length === 0) {
      this.generateSequence();
    }
    const name = this.tetrominoSequence.pop();
    const matrix = this.tetrominos[name];
    const col = 5;
    const row = name === 'I' ? -1 : -2;
    return {
      name: name,
      matrix: matrix,
      row: row,
      col: col,
    };
  }
  public rotate(matrix: Array<[]>) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
    return result;
  }
  public isValidMove(matrix: Array<[]>, cellRow: number, cellCol: number) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (
          matrix[row][col] &&
          (cellCol + col < 0 ||
            cellCol + col >= this.playfield[0].length ||
            cellRow + row >= this.playfield.length ||
            this.playfield[cellRow + row][cellCol + col])
        ) {
          return false;
        }
      }
    }
    return true;
  }
  public placeTetromino() {
    for (let row = 0; row < this.tetromino.matrix.length; row++) {
      for (let col = 0; col < this.tetromino.matrix[row].length; col++) {
        if (this.tetromino.matrix[row][col]) {
          if (this.tetromino.row + row < 0) {
            return this.showGameOver();
          }
          this.playfield[this.tetromino.row + row][this.tetromino.col + col] = this.tetromino.name;
        }
      }
    }
    for (let row = this.playfield.length - 1; row >= 0; ) {
      if (this.playfield[row].every((cell: number) => !!cell)) {
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < this.playfield[r].length; c++) {
            this.playfield[r][c] = this.playfield[r - 1][c];
          }
        }
      } else {
        row--;
      }
    }
    this.tetromino = this.getNextTetromino();
  }
  public showGameOver() {
    this.gameOver = true;
    if (this.ctx && this.canvas) {
      this.ctx.fillStyle = 'black';
      this.ctx.globalAlpha = 0.75;
      this.ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = 'white';
      this.ctx.font = '36px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('Игра окончена', this.canvas.width / 2, this.canvas.height / 2);
    }
  }
  public loop() {
    if (!this.gameOver && this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawWorld();
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
          if (this.ctx && this.playfield[row][col]) {
            const name = this.playfield[row][col];
            this.ctx.fillStyle = this.colors[name];
            this.ctx.fillRect(col * this.CELL_SIZE, row * this.CELL_SIZE, this.CELL_SIZE - 1, this.CELL_SIZE - 1);
          }
        }
      }
      if (this.tetromino && this.ctx) {
        if (++this.count > 35) {
          this.tetromino.row++;
          this.count = 0;
          if (!this.isValidMove(this.tetromino.matrix, this.tetromino.row, this.tetromino.col)) {
            this.tetromino.row--;
            this.placeTetromino();
          }
        }
        this.ctx.fillStyle = this.colors[this.tetromino.name];
        for (let row = 0; row < this.tetromino.matrix.length; row++) {
          for (let col = 0; col < this.tetromino.matrix[row].length; col++) {
            if (this.tetromino.matrix[row][col]) {
              this.ctx.fillRect(
                (this.tetromino.col + col) * this.CELL_SIZE,
                (this.tetromino.row + row) * this.CELL_SIZE,
                this.CELL_SIZE - 1,
                this.CELL_SIZE - 1,
              );
            }
          }
        }
      }
    }
  }
  public onKeypress() {
    document.addEventListener(
      'keydown',
      function (this: any, e: any) {
        switch (e.keyCode) {
          case 38: {
            const matrix = this.rotate(this.tetromino.matrix);
            if (this.isValidMove(matrix, this.tetromino.row, this.tetromino.col)) {
              this.tetromino.matrix = matrix;
            }
            break;
          }
          case 40: {
            const row = this.tetromino.row + 1;
            if (!this.isValidMove(this.tetromino.matrix, row, this.tetromino.col)) {
              this.tetromino.row = row - 1;
              this.placeTetromino();
              return;
            }
            this.tetromino.row = row;
            break;
          }
          case 37: {
            const col = this.tetromino.col - 1;
            if (this.isValidMove(this.tetromino.matrix, this.tetromino.row, col)) {
              this.tetromino.col = col;
            }
            break;
          }
          case 39: {
            const col = this.tetromino.col + 1;
            if (this.isValidMove(this.tetromino.matrix, this.tetromino.row, col)) {
              this.tetromino.col = col;
            }
            break;
          }
          case 90:
            console.log('пауза');
            console.log('Z');
            break;
        }
      }.bind(this),
    );
  }
}
