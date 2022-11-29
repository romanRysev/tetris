import { Theme } from './../config/db.config'
import type { ITheme } from './../models/themes'

// Создание записи
export async function createTheme(props: ITheme) {
  return Theme.create({ ...props })
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
