import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import defaultAvatar from '../../assets/avatar.svg';

import './avatarLg.scss';

interface AvatarLgProps extends PropsWithChildren {
  avatarPath?: string;
  onClick: () => void;
  className?: string;
  name?: string;
}

export const AvatarLg: FC<AvatarLgProps> = ({ avatarPath, onClick, name, className }) => {
  return (
    <div className={classNames('avatar-lg', className)}>
      <div className="avatar-lg__img-wrapper" onClick={onClick}>
        <img className="avatar-lg__img" src={avatarPath ? avatarPath : defaultAvatar} alt="Аватар" />
        <span className="avatar-lg__text"> Поменять аватар </span>
      </div>
      {name && <h3 className="avatar-lg__person-name">{name}</h3>}
    </div>
  );
};
