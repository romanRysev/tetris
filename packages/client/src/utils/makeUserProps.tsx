/* eslint-disable camelcase */
import { UserProps } from '../components/UserInfo/UserInfo';
import { defaulAvatar, filePrefix } from '../consts/prefix';

export function makeUserAvatarFromUser(user: UserProps) {
  const { avatar } = user;
  return avatar ? `${filePrefix}${avatar}` : defaulAvatar;
}

export function makeUserNameFromUser(user: UserProps) {
  const { first_name, second_name, display_name } = user;
  return display_name ?? `${first_name} ${second_name}`;
}
