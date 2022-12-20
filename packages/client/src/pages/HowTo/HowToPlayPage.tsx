/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';
import './HowToPlayPage.scss';
import figures from './../../assets/figs.png';
import controls from './../../assets/controls.png';
import controlsMobile from './../../assets/controls-mobile.png';

export const HowToPlay: FC = () => {
  return (
    <StaticLayout>
      <div className="rules">
        <h3 className="rules__header">Как играть в ТЕТРИС</h3>
        <div className="rules__text">
          <article>
            <h5>Все знают, как играть в тетрис! А если вы не знаете - так это просто: </h5>
            <ul>
              <li>ставите фигуры,</li>
              <li>складываете из них ряды,</li>
              <li>ряды исчезают, </li>
              <li>очки прибавляются ))</li>
            </ul>

            <h5>
              <strong>В игре есть 7 фигур</strong>, вот такие:
            </h5>
            <figure>
              <img src={figures} />
            </figure>

            <h5>
              <strong>Подсчет очков</strong> ведется по схеме:
            </h5>

            <table className="rules__table">
              <thead>
                <tr>
                  <th>
                    <strong>Уровень</strong>
                  </th>
                  <th>
                    <strong>1 ряд</strong>
                  </th>
                  <th>
                    <strong>2 ряда</strong>
                  </th>
                  <th>
                    <strong>3 ряда</strong>
                  </th>
                  <th>
                    <strong>4 ряда</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>40</td>
                  <td>100</td>
                  <td>300</td>
                  <td>1200</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>80</td>
                  <td>200</td>
                  <td>600</td>
                  <td>2400</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>120</td>
                  <td>300</td>
                  <td>900</td>
                  <td>3600</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>400</td>
                  <td>1000</td>
                  <td>3000</td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td>n</td>
                  <td>40 * (n + 1)</td>
                  <td>100 * (n + 1)</td>
                  <td>300 * (n + 1)</td>
                  <td>1200 * (n + 1)</td>
                </tr>
              </tbody>
            </table>

            <h5>
              А еще <strong>добавляются очки за ускоренную установку фигуры</strong>:
            </h5>
            <ul>
              <li>2 очка / клетка за пробел,</li>
              <li>1 очко / клетка за клавишу вниз</li>
            </ul>

            <h5>
              Кстати! <strong>Управление фигурами</strong> осуществляется клавишами (стрелки и WASD для олдовых
              геймеров)
            </h5>
            <figure>
              <img src={controls} />
            </figure>
            <ul>
              <li>
                <strong>влево / A</strong> сдвигает фигуру влево (если быстро нажать - на клетку, если нажать и не
                отпускать - до упора)
              </li>
              <li>
                <strong>вправо / D</strong>, соответственно, сдвигает фигуру вправо
              </li>
              <li>
                <strong>вверх / W</strong> поворачивает фигуру по часовой стрелке на 90 градусов
              </li>
              <li>
                <strong>вниз / S</strong> опускает фигуру быстрее
              </li>
              <li>
                <strong>пробел</strong> "бросает" фигуру
              </li>
              <li>
                по нажатию на <strong>ENTER</strong> разворачивается фуллскрин (чтобы вернуться - нажмите еще раз)
              </li>
              <li>
                по нажатию на <strong>P</strong> игра ставится на паузу
              </li>
            </ul>

            <h5>
              Для мобильной версии есть <strong>экранные контролы</strong>
            </h5>
            <figure>
              <img src={controlsMobile} />
            </figure>

            <p>
              <strong>Уровень поднимается</strong> каждые 10 убранных рядов, при этом растет и скорость, а значит,
              играть становится сложнее.
            </p>

            <p>
              Маленькая подсказка: чем больше рядов уберете сразу, тем больше получите очков. Попробуйте оставлять место
              под Длинную Палку, чтобы одним махом убирать четыре ряда! (но не переусердствуйте, а то завалит)
            </p>

            <p>
              Вроде бы все :) <strong>Приятной игры!</strong>{' '}
            </p>
          </article>
        </div>
      </div>
    </StaticLayout>
  );
};

export default HowToPlay;
