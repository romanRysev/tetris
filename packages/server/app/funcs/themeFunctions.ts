import { Theme } from './../config/db.config'
import type { ITheme } from './../models/themes'

// Создание записи
export async function createTheme(props: ITheme) {
  // const {  themeActive, userID, soundOn, musicOn, soundLevel, musicLevel} = props;
  return Theme.create({...props})
}

// Обновление записи по userID/id пользователя - здесь везде лучше userID
export async function updateThemeByUserID(userID: number, data: ITheme) {
  return Theme.update(data, { where: { userID } })
}

// Удаление записи по ID
export async function deleteThemeById(userID: number) {
  return Theme.destroy({ where: { userID } })
}

// Получение записи по ID
export async function getThemeById(userID: number) {
  return Theme.findOne({ where: { userID } })
}

// Поиск по параметрам
// export async function getThemesByParams(
//   themeActive?: string,
//   userID?: number,
//   soundOn?: boolean,
//   musicOn?: boolean,
//   soundLevel?: string,
//   musicLevel?: string,
// ) {
//   return Theme.findAll({ where: { firstName } })
// }

// Удалить все записи
export async function deleteAllThemes() {
  return Theme.destroy({
    where: {},
    truncate: false
  })
}

// Получить все записи
export async function getAllThemes() {
  return Theme.findAll()
}
