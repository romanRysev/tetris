import { Theme } from './../config/db.config'
import type { ITheme, IThemeUpdate } from './../models/themes'

// Создание записи
export async function createTheme(props: ITheme) {
  const { userID } = props;
  return Theme.findOrCreate({where: { userID }, defaults: {...props}}).then(() => Theme.update({ ...props }, {where: { userID }}));
}

// Обновление записи по userID/id пользователя - здесь везде лучше userID
export async function updateThemeByUserID(userID: number, data: IThemeUpdate) {
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

// Удалить все записи
export async function deleteAllThemes() {
  return Theme.destroy({
    where: {},
    truncate: false,
  })
}

// Получить все записи
export async function getAllThemes() {
  return Theme.findAll()
}
