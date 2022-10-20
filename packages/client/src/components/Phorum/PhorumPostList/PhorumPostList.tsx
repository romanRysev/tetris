import React, { FC } from 'react';
import { PhorumPost, PhorumPostProps } from '../PhorumPost/PhorumPost';
import './PhorumPostList.scss';

export const PhorumPostList: FC<PhorumPostProps[]> = (postList: PhorumPostProps[]) => {
  const list = Object.values(postList);

  return (
    <ul className="phorum-post-list">
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
