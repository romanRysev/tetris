import { UserChars } from '../redux/reducers/userSlice';
import defaultAvatar from './../assets/avatar.svg';
import { filePrefix } from './constants';

export function makeUserAvatarFromUser(user: UserChars) {
  const { avatar } = user;
  return avatar ? `${filePrefix}${avatar}` : defaultAvatar;
}

export function makeUserNameFromUser(user: UserChars) {
  const { firstName, secondName, displayName } = user;
  return displayName || `${firstName} ${secondName}`;
}
