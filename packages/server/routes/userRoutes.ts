import express from 'express'
import { createUserRow, deleteAll, deleteOne, findOne, findUserByNickName, getAll, update } from './../app/controllers/userController'

const router = express.Router();

// получить всех пользователей 
router.get('/', getAll);

// получить пользователя по id 
router.get('/:id', findOne);

// найти пользователя по никнейму
router.post('/find', findUserByNickName);

// удалить пользователя по id
router.delete('/:id', deleteOne);

//удалить всех пользователей 
router.delete('/', deleteAll);

// обновить пользователя по id 
router.put('/:id', update);

// создать пользователя 
router.post('/', createUserRow);

export default router;
