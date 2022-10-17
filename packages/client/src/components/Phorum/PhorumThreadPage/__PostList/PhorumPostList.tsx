import React, { FC } from 'react';
import { PhorumPost, PhorumPostProps } from '../__Post/PhorumPost';
import './PhorumPostList.scss';

export const PhorumPostList: FC<PhorumPostProps[]> = (postList: PhorumPostProps[]) => {
  const list = Object.values(postList);

  return (
    <ul className="post-list">
      {list.map((item, index) => (
        <PhorumPost
          userAvatar={item.userAvatar}
          userName={item.userName}
          text={item.text}
          postDate={item.postDate}
          id={item.id}
          className={item.className}
          key={'post' + index}
        />
      ))}
    </ul>
  );
};
