import { User } from './../config/db.config'
import type { IUser } from './../models/user'

// Создание пользователя
export async function createUser(
  firstName: string,
  secondName: string,
  // userID: number,
  displayName: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
  id: number
) {
  return User.findOrCreate({where: { id }, defaults: {
    firstName,
    secondName,
    // userID,
    displayName,
    login,
    email,
    phone,
    avatar,
    id
  }})
}

// Обновление пользователя по ID
export async function updateUserById(id: number, data: IUser) {
  return User.update(data, { where: { id } })
}

// Удаление пользователя по ID
export async function deleteUserById(id: number) {
  return User.destroy({ where: { id } })
}

// Получение пользователя по ID
export async function getUserById(id: number) {
  return User.findOne({ where: { id } })
}

// Получение пользователей по имени
export async function getUsersByFirstName(firstName: string) {
  return User.findAll({ where: { firstName } })
}

// Поиск пользователей по никнейму
export async function getUsersByDisplayName(displayName: string) {
  return User.findAll({ where: { displayName } })
}

// Поиск по userID
export async function getUsersByUserID(userID: number) {
  return User.findAll({ where: { userID } })
}

// Получение всех пользователей
export async function getAllUsers() {
  return User.findAll()
}

// Удалить всех пользователей
export async function deleteAllUsers() {
  return User.destroy({
    where: {},
    truncate: false,
  })
}
