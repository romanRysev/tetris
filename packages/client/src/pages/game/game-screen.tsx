import React, { PureComponent, ReactNode } from 'react';
import { colors, Sequence, sequence, tetrominos } from './constant';

export class Tetris extends PureComponent {
  private count = 0;
  public currentTetromino = this.getNextTetromino();
  public nextTetromino = this.getNextTetromino();
  public gameOver = false;
  public paused = false;
  public title: string;
  public width: number;
  public height: number;
  public canvas: HTMLCanvasElement | null;
  public canvasFigure: HTMLCanvasElement | null;
  public ctx: CanvasRenderingContext2D | null | undefined;
  public ctxFigure: CanvasRenderingContext2D | null | undefined;
  private tetrominoSequence: string[] = [];
  public playfield: (number | string)[][] | [][] | [] = [];
  public tetrominos = tetrominos;
  public colors = colors;
  public sequence = sequence;
  public score = 0;
  public lineCount = 0;
  public level = 1;
  public speed = 150;
  public shareData;
  public sendEnd;
  private cellSize = 50;

  public constructor(props: {
    canvas: HTMLCanvasElement | null;
    canvasFigure: HTMLCanvasElement | null;
    getDataUp: (score: number, level: number, lineCount: number) => void;
    sendEnd: () => void;
  }) {
    super(props);
    // eslint-disable-next-line react/prop-types
    const { canvas, canvasFigure, getDataUp, sendEnd } = props;
    this.canvas = canvas;
    this.canvasFigure = canvasFigure;
    this.title = 'canvas';
    this.width = 10;
    this.height = 20;
    this.shareData = getDataUp;
    this.sendEnd = sendEnd;
    this.createCanvas();
  }

  componentDidMount(): void {
    console.log('MOUNT');
    this.onKeypress();
    this.init();
    const step = () => {
      requestAnimationFrame(step);
      this.loop();
    };
    step();
  }

  componentWillUnmount(): void {
    console.log('UNMOUNT');
    this.removeKeypress();
  }

  public createCanvas(): void {
    if (this.canvas && this.canvasFigure) {
      this.ctx = this.canvas.getContext('2d');
      this.ctxFigure = this.canvasFigure.getContext('2d');
      if (this.ctx && this.ctxFigure) {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
  public drawWorld() {
    if (this.ctx) {
      this.ctx.beginPath();
      for (let x = 0; x < this.width + 1; x++) {
        this.ctx.moveTo(this.cellSize * x, 0);
        this.ctx.lineTo(this.cellSize * x, this.height * this.cellSize);
      }
      for (let y = 0; y < this.height + 1; y++) {
        this.ctx.moveTo(0, this.cellSize * y);
        this.ctx.lineTo(this.width * this.cellSize, this.cellSize * y);
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
    this.sequence = sequence.slice();
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
  public get nextTetronimo() {
    return this.nextTetromino;
  }
  public getNextTetromino() {
    this.tetrominos = tetrominos;
    this.tetrominoSequence = [];
    this.generateSequence();
    const name = this.tetrominoSequence.pop() as Sequence;
    const matrix = this.tetrominos[name];
    const col = 5;
    const row = name === 'I' ? -1 : -2;
    return {
      name: name || 'I',
      matrix: matrix,
      row: row,
      col: col,
    };
  }
  public rotate(matrix: (0 | 1)[][]) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
    return result;
  }

  public isValidMove(
    matrix: number[][] = this.currentTetromino.matrix,
    cellRow: number = this.currentTetromino.row,
    cellCol: number = this.currentTetromino.col,
  ) {
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
    for (let row = 0; row < this.currentTetromino.matrix.length; row++) {
      for (let col = 0; col < this.currentTetromino.matrix[row].length; col++) {
        if (this.currentTetromino.matrix[row][col]) {
          if (this.currentTetromino.row + row < 0) {
            return this.showGameOver();
          }
          this.playfield[this.currentTetromino.row + row][this.currentTetromino.col + col] = this.currentTetromino.name;
        }
      }
    }
    for (let row = this.playfield.length - 1; row >= 0; ) {
      if (this.playfield[row].every((cell) => !!cell)) {
        this.lineCount++;
        this.score += 40;
        if (this.lineCount >= 10 && this.lineCount % 10 == 0) {
          this.level++;
          this.speed -= 10;
        }
        this.shareData(this.score, this.level, this.lineCount);
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < this.playfield[r].length; c++) {
            this.playfield[r][c] = this.playfield[r - 1][c];
          }
        }
      } else {
        row--;
      }
    }
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = this.getNextTetromino();
  }
  public showGameOver() {
    this.gameOver = true;
    // TODO: перекрасить фигуры в серенький
    this.sendEnd();
    document.removeEventListener('keydown', this.MyClick);
  }
  public pause() {
    this.paused = true;
    if (this.paused && this.ctx && this.canvas && !this.gameOver) {
      this.ctx.fillStyle = 'black';
      this.ctx.globalAlpha = 0.75;
      this.ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = 'white';
      this.ctx.font = '36px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('Пауза', this.canvas.width / 2, this.canvas.height / 2);
    }
  }
  public loop() {
    if (!this.gameOver && !this.paused && this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawWorld();
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
          if (this.ctx && this.playfield[row][col]) {
            const name = this.playfield[row][col];
            this.ctx.fillStyle = this.colors[name];
            this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize - 1, this.cellSize - 1);
          }
        }
      }
      if (this.nextTetromino && this.ctxFigure && this.canvasFigure) {
        this.ctxFigure.clearRect(0, 0, this.canvasFigure.width, this.canvasFigure.height);
        for (let i = 0; i < this.nextTetromino.matrix.length; i++) {
          for (let j = 0; j < this.nextTetromino.matrix[i].length; j++) {
            if (this.nextTetromino.matrix[i][j] === 1) {
              let margin = 1.5;
              if (this.nextTetromino.name === 'I') margin = 1;
              else if (this.nextTetromino.name === 'O') margin = 2;
              this.ctxFigure.fillStyle = this.colors[this.nextTetromino.name];
              this.ctxFigure.fillRect(
                (j + margin) * (this.cellSize / 1.5),
                (i + margin) * (this.cellSize / 1.5),
                this.cellSize / 1.5 - 1,
                this.cellSize / 1.5 - 1,
              );
            }
          }
        }
      }
      if (this.currentTetromino && this.ctx) {
        if (++this.count > this.speed) {
          this.currentTetromino.row++;
          this.count = 0;
          if (!this.isValidMove(this.currentTetromino.matrix, this.currentTetromino.row, this.currentTetromino.col)) {
            this.currentTetromino.row--;
            this.placeTetromino();
          }
        }
        this.ctx.fillStyle = this.colors[this.currentTetromino.name];
        for (let row = 0; row < this.currentTetromino.matrix.length; row++) {
          for (let col = 0; col < this.currentTetromino.matrix[row].length; col++) {
            if (this.currentTetromino.matrix[row][col]) {
              this.ctx.fillRect(
                (this.currentTetromino.col + col) * this.cellSize,
                (this.currentTetromino.row + row) * this.cellSize,
                this.cellSize - 1,
                this.cellSize - 1,
              );
            }
          }
        }
      }
    }
  }

  private MyClick = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW': {
        const matrix = this.rotate(this.currentTetromino.matrix);
        if (this.isValidMove(matrix)) {
          this.currentTetromino.matrix = matrix;
        }
        break;
      }
      case 'ArrowDown':
      case 'KeyS': {
        const row = this.currentTetromino.row + 1;
        if (!this.isValidMove(undefined, row)) {
          this.currentTetromino.row = row - 1;
          this.placeTetromino();
          return;
        }
        this.currentTetromino.row = row;
        break;
      }
      case 'ArrowLeft':
      case 'KeyA': {
        const col = this.currentTetromino.col - 1;
        if (this.isValidMove(undefined, undefined, col)) {
          this.currentTetromino.col = col;
        }
        break;
      }
      case 'ArrowRight':
      case 'KeyD': {
        const col = this.currentTetromino.col + 1;
        if (this.isValidMove(undefined, undefined, col)) {
          this.currentTetromino.col = col;
        }
        break;
      }
      case 'KeyP': {
        this.paused = !this.paused;
        if (this.paused) {
          this.pause();
        }
        break;
      }
      case 'Space': {
        while (this.isValidMove()) {
          this.currentTetromino.row++;
        }
        if (!this.isValidMove()) {
          this.currentTetromino.row--;
          this.placeTetromino();
        }
        break;
      }
    }
  };
  public onKeypress() {
    document.addEventListener('keydown', this.MyClick);
  }

  public removeKeypress() {
    document.removeEventListener('keydown', this.MyClick);
  }

  public render(): ReactNode {
    return <div></div>;
  }
}
