import santaRigth from '../../themes/newYear/img/santa/santa-rigth.jpg';
import santaLeft from '../../themes/newYear/img/santa/santa-left.png';
import santaEnd from '../../themes/newYear/img/santa/santa-end.png';
import santaStart from '../../themes/newYear/img/santa/santa-sani.png';
import finall from '../../themes/newYear/img/background/fin.jpg';
export const startSanta = (
  canvas: HTMLCanvasElement,
  index0: number,
  direction0: number,
  x0: number,
  y0: number,
  steps: HTMLAudioElement,
) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  let index = index0;
  let direction = direction0;
  let x = x0;
  let y = y0;
  let isStart = true;
  let isSantaMove = false;
  let interval: string | number | NodeJS.Timeout | undefined;
  const init = () => {
    document.addEventListener('keydown', handleMove);
    document.addEventListener('keyup', santaMove);
    interval = setInterval(anim, 10);
  };
  let santaImg = santaRigth;

  function update() {
    if (context && isStart) {
      if (isSantaMove) {
        steps.play();
      } else {
        steps.pause();
      }
      const santa = new Image();
      santa.src = santaImg;
      context.fillStyle = 'black';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      const sani = new Image();
      sani.src = santaStart;
      context.drawImage(sani, 0, 0, 1000, 1600, 20, 450, 600, 800);
      if (santaImg === santaRigth) {
        context.drawImage(santa, index * 150, direction * 150, 150, 150, x, y, 150, 150);
      } else if (santaImg === santaLeft) {
        context.drawImage(santa, index * 150, direction * 150, 150, 150, x, y, 150, 150);
      } else if (santaImg === santaEnd) {
        isSantaMove = false;
        const move = () => {
          for (let i = 0; i < 200; i += 5) {
            x += i / 500;
            y -= (2 * i) / 500;
          }
          setTimeout(() => {
            isStart = false;
            const fin = new Image();
            fin.src = finall;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(fin, 0, 0, context.canvas.width, context.canvas.height);
            clearInterval(interval);
          }, 1000);
        };

        setTimeout(move, 2000);
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(santa, 0, 0, 1000, 1600, x, y, 400, 800);
      }
    }
    if (0 < x && x < 50 && 400 < y && y < 450) {
      return end(x, y);
    }
  }
  function draw() {
    if (context) {
      context.drawImage(canvas, 0, 0, context.canvas.width, context.canvas.height);
    }
  }
  const end = (x0: number, y0: number) => {
    x = x0;
    y = y0;
    index = 0;
    direction = 0;
    santaImg = santaEnd;
    document.removeEventListener('keydown', handleMove);
    document.removeEventListener('keyup', santaMove);
  };
  // Main animation loop
  function anim() {
    update();
    draw();
  }
  const handleMove = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp': {
        index++;
        if (index > 3) {
          index = 0;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        if (y > 0) {
          y -= 2;
          isSantaMove = true;
        }
        break;
      }
      case 'ArrowDown': {
        index++;
        if (index > 3) {
          index = 0;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        if (y + 64 < context.canvas.height - 75) {
          y += 15;
          isSantaMove = true;
        }
        break;
      }
      case 'ArrowLeft': {
        index--;
        if (index < 0) {
          index = 3;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        santaImg = santaLeft;
        if (x > 0) {
          x -= 5;
          isSantaMove = true;
        }
        break;
      }
      case 'ArrowRight': {
        index++;
        if (index > 3) {
          index = 0;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        santaImg = santaRigth;
        if (x + 75 < context.canvas.width - 35) {
          x += 5;
          isSantaMove = true;
        }
        break;
      }
    }
  };
  function santaMove() {
    isSantaMove = false;
  }
  return init();
};
