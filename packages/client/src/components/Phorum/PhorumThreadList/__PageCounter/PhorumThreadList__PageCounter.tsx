import React from 'react';
import './PhorumThreadList__PageCounter.scss';

function goToPage(pageNo: number | string, pages: number) {
  const page = pageNo === '...' ? Math.floor(pages / 2) : pageNo;
  console.log(`СТРАНИЦА НОМЕР ${page}`);
}

type PhorumThreadListPageCounterProps = {
  pages: number;
};

export const PhorumThreadListPageCounter: React.FC<PhorumThreadListPageCounterProps> = (props) => {
  const { pages } = props;
  const pagesArray =
    pages > 7 ? [2, 3, 4, 5, '...', pages - 1, pages] : Array.from({ length: pages }, (v, i) => i + 1).splice(0, 2);

  return (
    <span>
      {pagesArray.map((page, index) => (
        <span
          className="phorum-thread-list__page-counter"
          onClick={() => {
            goToPage(page, pages);
          }}
          key={'a' + index}
        >
          {page}
        </span>
      ))}
    </span>
  );
};
