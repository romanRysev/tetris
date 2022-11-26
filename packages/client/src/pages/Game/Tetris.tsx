import React, { Component, ReactNode } from 'react';
import { UserChars } from '../../redux/reducers/userSlice';
import { AddLeader, addToLeaderBoard } from '../../utils/api';
import { makeUserAvatarFromUser, makeUserNameFromUser } from '../../utils/makeUserProps';
import { fillGameCanvas, gray, Sequence, sequence, TetrominoMatrix, tetrominos } from './constant';
import { colors } from '../../themes/classic/classic-theme';
import { man, shark, water } from '../../themes/shark/shark-theme';
import { themes, musicTrackTime, ThemeSounds, ThemeFlags, ThemesNames, SoundControls } from '../../themes/themes';
import { setThemeColors } from '../../utils/setThemeColors';

type TetrisProps = {
  canvas: HTMLCanvasElement;
  canvasFigure: HTMLCanvasElement;
  getDataUp: (score: number, level: number, lineCount: number) => void;
  sendEnd: () => void;
  gameNo: number;
  isAuthorized: boolean;
  userProfile: UserChars;
  theme: ThemesNames;
  musicOn: boolean;
  soundOn: boolean;
  musicVolume?: string;
  soundVolume?: string;
  isPause?: boolean;
};

type Playfield = (Sequence | undefined)[][];

export class Tetris extends Component<TetrisProps> {
  private currentTetromino = this.getNextTetromino();
  private nextTetromino = this.getNextTetromino();
  private gameOver = false;
  private gameStarted = false;
  private paused = false;
  private width: number;
  private height: number;
  private canvas: HTMLCanvasElement;
  private canvasFigure: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ctxFigure: CanvasRenderingContext2D;
  private tetrominoSequence: string[] = [];
  private playfield: Playfield = [];
  private tetrominos = tetrominos;
  private colors = colors;
  private sequence = sequence;
  private score = 0;
  private lineCount = 0;
  private level = 0;
  private speed = 1000;
  private shareData;
  private sendEnd;
  private cellSize = 50;
  private timestamp = 0;
  private theme: ThemesNames = 'classic';
  private themeMusic: HTMLAudioElement = new Audio();
  private musicPreloaded: ThemeFlags = {
    classic: false,
    shark: false,
  };
  private themeSounds: {
    start?: HTMLAudioElement;
    end?: HTMLAudioElement;
    fall?: HTMLAudioElement;
    line?: HTMLAudioElement;
    position?: HTMLAudioElement;
  } = {};
  private musicVolume = '1';
  private soundVolume = '1';
  private musicTrack: MediaElementAudioSourceNode;
  private musicGainNode: GainNode;
  private musicTrackTime: Record<ThemesNames, number> = musicTrackTime;
  private soundControls: Record<string, SoundControls> = {};
  private soundsPreloaded: ThemeFlags = {
    classic: false,
    shark: false,
  };
  private themes = themes;
  private userName: string;
  private userAvatar: string;
  private userID: number;

  // shark theme
  private manPic = 0;
  private sharkCoords = {
    x: 0,
    y: 0,
  };
  private sharkForward = true;
  private sharkStep = 10;
  private manCoords = 0;
  private manPreloaded = false;
  private sharkPreloaded = false;
  private manPics: Record<string, HTMLImageElement> = {};
  private sharkPics: Record<string, HTMLImageElement> = {};
  private waterLevel = 0;

  public constructor(props: TetrisProps) {
    super(props);
    const { canvas, canvasFigure, getDataUp, sendEnd, userProfile, theme } = props;
    this.canvas = canvas;
    this.canvasFigure = canvasFigure;
    this.width = 10;
    this.height = 20;
    this.shareData = getDataUp;
    this.sendEnd = sendEnd;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctxFigure = this.canvasFigure.getContext('2d') as CanvasRenderingContext2D;
    this.userName = makeUserNameFromUser(userProfile);
    this.userAvatar = makeUserAvatarFromUser(userProfile);
    this.userID = userProfile.id;
    this.theme = theme;

    /* вынесла в отдельный метод, но в конструкторе оставила так,
    иначе ругается, что переменные не инициализируются */
    this.preloadMusic(this.themes[this.theme].music).then(() => {
      this.musicPreloaded[this.theme] = true;
    });
    this.preloadSounds(this.themes[this.theme].sounds).then(() => {
      this.soundsPreloaded[this.theme] = true;
    });

    const AudioContext = window.AudioContext;
    const musicAudioContext = new AudioContext();
    this.musicTrack = musicAudioContext.createMediaElementSource(this.themeMusic);
    this.musicGainNode = musicAudioContext.createGain();
    this.musicTrack.connect(this.musicGainNode).connect(musicAudioContext.destination);
    if (musicAudioContext.state === 'suspended') {
      musicAudioContext.resume();
    }

    this.colors = setThemeColors(theme).colors;

    // if (theme === 'dark') {
    //   this.colors = colorsDarkTheme;
    // }
  }

  private async preloadImages(images: Record<string, string>, target: Record<string, HTMLImageElement>) {
    const sources = Object.values(images);
    const keys = Object.keys(images);
    return await Promise.allSettled(
      sources.map(
        (source, index) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = source;
            Object.assign(target, { [keys[index]]: img });
            img.onload = () => resolve(img);
            img.onerror = (event) => reject(event);
          }),
      ),
    ).catch((error) => {
      console.log(error.message); // сделать единый блок демонстрации ошибок?
    });
  }

  private async preloadMusic(src?: string) {
    if (!src) {
      return;
    }
    return await new Promise((resolve, reject) => {
      this.themeMusic.src = src;
      this.themeMusic.onload = () => resolve(this.themeMusic);
      this.themeMusic.onerror = (event) => reject(event);
    }).catch((error) => {
      console.log(error.message);
    });
  }

  private async preloadSounds(sounds?: ThemeSounds) {
    if (!sounds) {
      return;
    }
    // переделать на промис.allSettled
    return await new Promise((resolve, reject) => {
      const soundsArray = Object.values(sounds);
      const soundsEvents = Object.keys(sounds);
      soundsArray.map((item, index) => {
        const sound = new Audio();
        sound.src = item;
        Object.assign(this.themeSounds, { [soundsEvents[index]]: sound });
        const actx = new AudioContext();
        const track = actx.createMediaElementSource(sound);
        const gainNode = actx.createGain();
        track.connect(gainNode).connect(actx.destination);
        Object.assign(this.soundControls, {
          [soundsEvents[index]]: {
            context: actx,
            track: track,
            gainNode: gainNode,
          },
        });
        sound.onload = () => resolve(this.themeSounds);
        sound.onerror = (event) => reject(event);
      });
    }).catch((error) => {
      console.log(error.message);
    });
  }

  private makeSoundNodes() {
    if (!this.musicPreloaded[this.theme]) {
      this.preloadMusic(this.themes[this.theme].music).then(() => {
        this.musicPreloaded[this.theme] = true;
      });
    }
    if (!this.soundsPreloaded[this.theme]) {
      this.preloadSounds(this.themes[this.theme].sounds).then(() => {
        this.soundsPreloaded[this.theme] = true;
      });
    }
  }

  private startThemeAudio() {
    this.themeMusic.currentTime = this.musicTrackTime[this.theme];
    this.themeMusic.play().catch((e) => {
      console.log(e);
    });
    this.musicGainNode.gain.value = Number(this.musicVolume);
    this.themeMusic.addEventListener('ended', () => this.themeMusic.play());
    if (!this.gameStarted) this.themeSounds.start?.play();
  }

  componentDidMount(): void {
    this.onKeypress();

    // загрузка картинок для анимации
    // TODO мемоизировать загрузки картинок и музыки
    if (!this.manPreloaded || !this.sharkPreloaded) {
      this.preloadImages(man, this.manPics).then(() => {
        this.manPreloaded = true;
      });
      this.preloadImages(shark, this.sharkPics).then(() => {
        this.sharkPreloaded = true;
      });
    }

    this.init();
  }

  componentWillUnmount(): void {
    // как все отрубить при уходе со страницы???
    this.removeKeypress();
    this.themeMusic.pause();
    this.themeMusic.currentTime = 0;
    this.themeMusic.removeEventListener('ended', () => this.themeMusic.play());
  }

  componentDidUpdate(prevProps: Readonly<TetrisProps>): void {
    if (prevProps.gameNo != this.props.gameNo) {
      this.gameOver = false;
      this.nextTetromino = this.getNextTetromino();
      this.currentTetromino = this.nextTetromino;
      this.init();
    }
    if (!this.props.musicOn) {
      this.musicGainNode.gain.value = 0;
    } else if (this.props.musicOn) {
      this.musicGainNode.gain.value = Number(this.musicVolume);
    }

    if (!this.props.soundOn) {
      Object.values(this.soundControls).map((control) => {
        control.gainNode.gain.value = 0;
      });
    } else {
      Object.values(this.soundControls).map((control) => {
        control.gainNode.gain.value = Number(this.soundVolume);
      });
    }

    if (prevProps.musicVolume != this.props.musicVolume) {
      this.musicVolume = this.props.musicVolume || '';
      this.musicGainNode.gain.value = Number(this.props.musicVolume);
    }

    if (prevProps.soundVolume != this.props.soundVolume) {
      this.soundVolume = this.props.soundVolume || '';
      Object.values(this.soundControls).map((control) => {
        control.gainNode.gain.value = Number(this.props.soundVolume);
      });
    }

    if (prevProps.theme != this.props.theme) {
      this.theme = this.props.theme;
      this.colors = setThemeColors(this.props.theme).colors;
      this.musicTrackTime[prevProps.theme] = this.themeMusic.currentTime;
      this.makeSoundNodes();
      this.startThemeAudio();
    }

    if (this.props.theme == 'shark') {
      // загрузка картинок для анимации
      // TODO мемоизировать загрузки картинок и музыки
      if (!this.manPreloaded || !this.sharkPreloaded) {
        this.preloadImages(man, this.manPics).then(() => {
          this.manPreloaded = true;
        });
        this.preloadImages(shark, this.sharkPics).then(() => {
          this.sharkPreloaded = true;
        });
      }
    }

    if (this.paused && prevProps.theme != this.props.theme) {
      this.paused = false;
      this.currentTetromino.row--;
      setTimeout(() => {
        this.pause();
      });
    }

    if (prevProps.isPause !== this.props.isPause) {
      if (this.props.isPause && !this.paused) {
        this.pause();
      }
      if (!this.props.isPause && this.paused) {
        this.paused = false;
      }
    }
  }

  private createCanvas(): void {
    this.ctx.fillStyle = setThemeColors(this.theme).fill;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawWorld() {
    this.ctx.beginPath();
    for (let x = 0; x < this.width + 1; x++) {
      this.ctx.moveTo(this.cellSize * x, 0);
      this.ctx.lineTo(this.cellSize * x, this.height * this.cellSize);
    }
    for (let y = 0; y < this.height + 1; y++) {
      this.ctx.moveTo(0, this.cellSize * y);
      this.ctx.lineTo(this.width * this.cellSize, this.cellSize * y);
    }
    this.ctx.strokeStyle = setThemeColors(this.theme).stroke;
    this.ctx.stroke();

    this.ctx.fillStyle = fillGameCanvas;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // BEGIN для акул

  private drawWater(end: number) {
    this.ctx.fillStyle = water;
    this.ctx.fillRect(0, this.canvas.height - end + 15, this.canvas.width, this.canvas.height);
  }

  private drawMan() {
    let img: HTMLImageElement = this.manPics.basic;
    const randomNo = this.manPic;
    if (randomNo < 0.3) {
      img = this.manPics.basic;
    } else if (randomNo >= 0.3 && randomNo < 0.5) {
      img = this.manPics.head;
    } else if (randomNo >= 0.5 && randomNo < 0.8) {
      img = this.manPics.leftLeg;
    } else {
      img = this.manPics.rightLeg;
    }

    this.ctx.drawImage(img, this.manCoords, 0);
  }

  private drawManEnd() {
    let img: HTMLImageElement = this.manPics.end2;
    const randomNo = this.manPic;
    if (randomNo < 0.5) {
      img = this.manPics.end1;
    }
    this.ctx.drawImage(img, this.manCoords, 0);
  }

  private drawShark() {
    let img: HTMLImageElement = this.sharkPics.basicM;
    const randomNo = this.manPic;
    if (randomNo < 0.5) {
      img = this.sharkForward ? this.sharkPics.basicM : this.sharkPics.basic;
    } else if (randomNo >= 0.5) {
      img = this.sharkForward ? this.sharkPics.leftM : this.sharkPics.left;
    }

    this.ctx.drawImage(img, this.sharkCoords.x, this.sharkCoords.y);
  }

  private drawSharkEnd() {
    let img: HTMLImageElement = this.sharkPics.end1;
    const randomNo = Math.random();
    if (randomNo < 0.5) {
      img = this.sharkPics.end2;
    }
    this.sharkCoords.y += this.sharkStep;
    this.sharkCoords.x += this.sharkStep / 2;
    this.ctx.drawImage(img, this.sharkCoords.x, this.sharkCoords.y);
  }

  private makeManPic() {
    this.manPic = Math.random();
    if (!this.gameOver) {
      setTimeout(() => {
        this.makeManPic();
        if (this.sharkForward && this.sharkCoords.x + this.cellSize * 3 < this.canvas.width) {
          this.sharkCoords.x += this.sharkStep;
        } else if (this.sharkForward && this.sharkCoords.x + this.cellSize * 3 >= this.canvas.width) {
          this.sharkForward = false;
          this.sharkCoords.x -= this.sharkStep;
        } else if (!this.sharkForward && this.sharkCoords.x > 0) {
          this.sharkCoords.x -= this.sharkStep;
        } else if (!this.sharkForward && this.sharkCoords.x <= 0) {
          this.sharkForward = true;
          this.sharkCoords.x += this.sharkStep;
        }
      }, 200);
    }
  }

  // END для акул

  private init() {
    this.createCanvas();
    this.tetrominoSequence = [];
    this.playfield = [];
    for (let row = -2; row < 20; row++) {
      this.playfield[row] = [];
      for (let col = 0; col < 10; col++) {
        this.playfield[row][col] = undefined;
      }
    }
    this.score = 0;
    this.lineCount = 0;
    this.level = 0;
    this.speed = 1000;
    this.timestamp = Date.now();
    this.sharkCoords = {
      x: 0,
      y: 0,
    };
    this.sharkForward = true;
    this.manCoords = this.cellSize * Math.floor(Math.random() * 10);
    this.drawWorld();
    this.generateSequence();
    const step = () => {
      if (!this.gameOver) {
        requestAnimationFrame(step);
        this.loop();
      }
    };
    step();
    this.makeManPic();
    if (!this.musicPreloaded[this.theme] && !this.soundsPreloaded[this.theme]) {
      this.startThemeAudio();
      this.gameStarted = true;
    }
  }

  private generateSequence() {
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

  private getNextTetromino() {
    this.tetrominos = tetrominos;
    this.tetrominoSequence = [];
    this.generateSequence();
    const name = this.tetrominoSequence.pop() as Sequence;
    const matrix = this.tetrominos[name];
    const col = 4;
    const row = name == 'I' ? -2 : -1;
    return {
      name: name,
      matrix: matrix,
      row: row,
      col: col,
    };
  }

  private rotate(matrix: TetrominoMatrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
    return result;
  }

  private isValidMove({
    matrix = this.currentTetromino.matrix,
    row = this.currentTetromino.row,
    col = this.currentTetromino.col,
  }) {
    const cellCol = col;
    const cellRow = row;
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

  // установка фигуры
  private placeTetromino() {
    this.themeSounds.position?.play();
    let linesAtOnce = 0;
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
      // убираем линию
      if (this.playfield[row].every((cell) => !!cell)) {
        this.themeSounds.line?.play();
        linesAtOnce++;
        this.lineCount++;
        if (this.lineCount >= 10 && this.lineCount % 10 == 0) {
          this.level++;
          this.speed -= 50;
        }
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < this.playfield[r].length; c++) {
            this.playfield[r][c] = this.playfield[r - 1][c];
          }
        }
      } else {
        row--;
      }
    }
    // подсчитываем очки и отсылаем данные наверх

    const ratio = { 0: 0, 1: 40, 2: 100, 3: 300 }[linesAtOnce] ?? 1200;
    this.score += ratio * (this.level + 1);
    this.shareData(this.score, this.level, this.lineCount);

    // если на самом верхнем ряду есть фигура - заканчиваем игру
    for (let i = 0; i < this.playfield[0].length; i++) {
      if (this.playfield[0][i] != undefined) {
        return this.showGameOver();
      }
    }
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = this.getNextTetromino();
  }

  private showGameOver() {
    this.themeSounds.end?.play();
    this.waterLevel = this.canvas.height - 15;
    this.drawEnd();

    this.themeMusic.pause();
    this.themeMusic.removeEventListener('ended', () => this.themeMusic.play());
    this.sendResults();
    this.gameOver = true;
    this.gameStarted = false;
    this.sendEnd();
  }

  // отрисовка окончания игры
  private drawEnd() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawWorld();
    for (let row = -2; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.playfield[row][col]) {
          this.ctx.fillStyle = gray;
          this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize - 1, this.cellSize - 1);
        }
      }
    }
    if (this.theme === 'shark') {
      this.waterLevel -= 20;
      this.drawManEnd();
      this.drawSharkEnd();
      this.drawWater(this.waterLevel);
      if (
        (this.sharkCoords.x > 0 &&
          this.sharkCoords.y > 0 &&
          this.sharkCoords.x < this.canvas.width &&
          this.sharkCoords.y &&
          this.canvas.height) ||
        this.waterLevel > 0
      ) {
        setTimeout(() => {
          this.drawEnd();
        }, 20);
      }
    }
  }

  // отправка результатов в апи
  private async sendResults() {
    const date = new Date();
    const res: AddLeader = {
      data: {
        score: this.score,
        user: {
          avatar: this.userAvatar,
          userName: this.userName,
          id: this.userID,
        },
        date: date.toLocaleDateString('ru'),
      },
      ratingFieldName: 'score',
      teamName: 'CodinskTest',
    };
    return await addToLeaderBoard(res);
  }

  private pause() {
    this.paused = true;
    if (this.paused) {
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

  private loop() {
    if (this.gameOver || this.paused) {
      return;
    }

    // отрисовываем поле
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawWorld();
    let upperRow = 0;
    for (let row = 0; row < 20; row++) {
      let filled = 0;
      for (let col = 0; col < 10; col++) {
        if (this.playfield[row][col]) {
          filled++;
          const name = this.playfield[row][col];
          this.ctx.fillStyle = name ? this.colors[name] : 'white';
          this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize - 1, this.cellSize - 1);
        }
      }
      if (filled > 0) {
        upperRow++;
      }
    }
    // для акульей темы
    if (this.theme === 'shark') {
      this.drawWater((upperRow + 1) * this.cellSize);
      this.drawMan();
      this.sharkCoords.y = this.canvas.height - this.cellSize - upperRow * this.cellSize;
      this.drawShark();
    }

    // рисуем следующую фигуру в окошечке
    if (this.nextTetromino) {
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
    // опускаем фигуру
    if (this.currentTetromino) {
      const rightNow = Date.now();
      if (rightNow - this.timestamp > this.speed) {
        this.currentTetromino.row++;
        this.timestamp = rightNow;
        if (!this.isValidMove({})) {
          this.currentTetromino.row--;
          this.placeTetromino();
        }
      }

      // закрашиваем фигуру
      this.ctx.fillStyle = this.gameOver ? gray : this.colors[this.currentTetromino.name];
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
  // управление с клавиатуры
  private MyClick = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW': {
        const matrix = this.rotate(this.currentTetromino.matrix);
        if (this.isValidMove({ matrix })) {
          this.currentTetromino.matrix = matrix;
        }
        break;
      }
      case 'ArrowDown':
      case 'KeyS': {
        const row = this.currentTetromino.row + 1;
        if (!this.isValidMove({ row })) {
          this.currentTetromino.row = row - 1;
          this.placeTetromino();
          return;
        }
        this.currentTetromino.row = row;
        this.score += 1;
        this.shareData(this.score, this.level, this.lineCount);
        break;
      }
      case 'ArrowLeft':
      case 'KeyA': {
        const col = this.currentTetromino.col - 1;
        if (this.isValidMove({ col })) {
          this.currentTetromino.col = col;
        }
        break;
      }
      case 'ArrowRight':
      case 'KeyD': {
        const col = this.currentTetromino.col + 1;
        if (this.isValidMove({ col })) {
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
        while (this.isValidMove({})) {
          this.currentTetromino.row++;
          this.score += 2;
        }

        if (!this.isValidMove({})) {
          this.themeSounds.fall?.play();
          this.currentTetromino.row--;
          this.placeTetromino();
          this.shareData(this.score - 2, this.level, this.lineCount);
        }
        break;
      }
      case 'Enter': {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        break;
      }
    }
  };

  private onKeypress() {
    document.addEventListener('keydown', this.MyClick);
  }

  private removeKeypress() {
    document.removeEventListener('keydown', this.MyClick);
  }

  public render(): ReactNode {
    return <div></div>;
  }
}
