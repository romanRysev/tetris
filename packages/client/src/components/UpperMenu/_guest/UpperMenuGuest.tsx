import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import './UpperMenuGuest.scss';
import { ThemesNames, themesOptions } from '../../../themes/themes';
import { setGuestTheme } from '../../../redux/actions/themeActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

export const UpperMenuGuest: FC = () => {
  const dispatch = useAppDispatch();
  const [themeActive, setThemeActive] = useState('classic');
  const theme = useAppSelector((state) => state.theme.active);

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleThemeSelect = useCallback(async () => {
    const val = selectRef.current?.value;
    const req: ThemesNames = val ? themesOptions[val] : 'classic';
    selectRef.current?.blur();
    return await dispatch(setGuestTheme(req));
  }, [dispatch]);

  useEffect(() => {
    setThemeActive(theme);
  }, [theme]);

  const defaultSelectValue = () => {
    let activeValue = '';
    Object.values(themesOptions).map((value, index) => {
      if (value == themeActive) {
        activeValue = Object.keys(themesOptions)[index];
      }
    });
    return activeValue;
  };

  return (
    <div className="upper-menu upper-menu_guest">
      <h3 className="upper-menu__h3">Добро пожаловать в игру ТЕТРИС от команды Кодинск</h3>
      <span className="upper-menu__theme_guest">
        Тема:{' '}
        <select
          value={defaultSelectValue()}
          ref={selectRef}
          onChange={handleThemeSelect}
          className="upper-menu__select"
        >
          {Object.keys(themesOptions).map((theme, index) => (
            <option key={index} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};
