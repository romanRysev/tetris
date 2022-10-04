import React, { BaseSyntheticEvent, useCallback, useState, FC } from 'react';
import { Avatar } from '../../components/Avatar';
import { Popup } from '../../components/Popup';

export const ProfilePage: FC = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleAvatarClick = useCallback(() => {
    setPopupVisible(true);
  }, []);

  const handlePopupClick = useCallback((event: BaseSyntheticEvent) => {
    const popupContent = document.querySelector('.popup');
    const withinBoundaries = (event.nativeEvent as Record<string, Element[]>).path.includes(popupContent as Element);
    if (!withinBoundaries) {
      setPopupVisible(false);
    }
  }, []);

  return (
    <div className="profile-page">
      <Avatar avatarPath="" onClick={handleAvatarClick} />
      {popupVisible && <Popup onClick={handlePopupClick} />}
    </div>
  );
};
