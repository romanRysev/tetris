import { Op } from 'sequelize';
import { Leader, User } from '../config/db.config'
import type { ILeader } from '../models/leader'

export interface ILeaderExternal {
  score: number;
  user: {
    avatar: string;
    userName: string;
    id: number;
  };
  date: string;
}

// Создание записи - проверить, может, не нужно апдейт
export async function createLeader(props: ILeader) {
  const {userID, score} = props;
  return Leader.findOrCreate({where: {userID}, defaults: { 
    userID,
    score: 0,
   }})
  .then(() => {
    Leader.update({...props}, {where: {userID, score: {[Op.lt]: score}}, fields: ['score']});
  })
}

// Обновление записи, если счет больше
export async function updateLeader(props: ILeader) {
  const { userID, score } = props;
  return Leader.update({...props}, {where: {userID, score: {[Op.lt]: score}}, fields: ['score']});
}

// Получить запись по userID
export async function getLeader(userID: number) {
  return Leader.findOne({where: {userID},     
    include: [
    {
      model: User,
      attributes: ['firstName', 'secondName', 'avatar', 'displayName'],
    },
  ], })
}

// Получить все записи с сортировкой по score и возможностью пагинации
export async function getAllLeaders(offset?: number | undefined, limit?: number | undefined) {
  return Leader.findAndCountAll({
    order: [
      ['score', 'DESC'],
    ],
    offset: offset || 0,
    limit: limit || 10,
    include: [
      {
        model: User,
        attributes: ['firstName', 'secondName', 'avatar', 'displayName'],
      },
    ],
  }) 
}

// удалить запись по id
export async function deleteLeaderById(id: number) {
  return Leader.destroy({ where: { id } })
}

// удалить запись по userID
export async function deleteLeaderByUserId(userID: number) {
  return Leader.destroy({ where: { userID } })
}

// Удалить все записи
export async function deleteAllLeaders() {
  return Leader.destroy({
    where: {},
    truncate: false,
  })
}

// импорт лидерборда из яндекса
export async function importLeaders(data: ILeaderExternal[]) {
  const leaders: {score: number, userID: number}[] = [];
  data.map((item) => {
    const score = Number(item.score);
    const userID = Number(item.user.id);
    leaders.push({ score, userID });
  })
  return Leader.bulkCreate(leaders);
}
