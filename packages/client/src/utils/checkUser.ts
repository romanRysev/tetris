import { themeInitState } from '../redux/reducers/themeSlice';
import { UserChars } from '../redux/reducers/userSlice';
import { getUserFromDB, getTheme, sendUserToDB, sendThemeToDB } from './backEndApi';

export const checkUser = async (user: UserChars) => {
  const { id } = user;
  await getUserFromDB(id)
    .then((resp: Response) => {
      if (resp.ok) {
        getTheme(id)
          .then((resp) => resp.json())
          .then((theme) => {
            return theme;
          });
      } else {
        sendUserToDB(user).then(() => {
          const { soundOn, musicOn, musicLevel, soundLevel, active } = themeInitState;
          sendThemeToDB({
            themeActive: active,
            userID: id,
            soundOn,
            musicOn,
            soundLevel,
            musicLevel,
          });
        });
        return false;
      }
    })
    .catch((e) => console.log(e));
};
