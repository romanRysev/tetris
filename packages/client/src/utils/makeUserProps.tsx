import { defaulAvatar, filePrefix } from '../consts/prefix';
import { UserChars } from '../redux/reducers/userSlice';

export function makeUserAvatarFromUser(user: UserChars) {
  const { avatar } = user;
  return avatar ? `${filePrefix}${avatar}` : defaulAvatar;
}

export function makeUserNameFromUser(user: UserChars) {
  const { firstName, secondName, displayName } = user;
  return displayName || `${firstName} ${secondName}`;
}
