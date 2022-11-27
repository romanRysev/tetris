import express from 'express'
import { createUserRow, deleteAll, deleteOne, findAll, findOne, getAll, update } from './../app/controllers/userController'

const router = express.Router();

// получить всех пользователей 
router.get('/', getAll);

// получить пользователя по id 
router.get('/:id', findOne);

// удалить пользователя по id
router.delete('/:id', deleteOne);

//удалить всех пользователей 
router.delete('/', deleteAll);

// найти по параметрам 
router.get('/', findAll);

// обновить пользователя по id 
router.put('/:id', update);

// создать пользователя 
router.post('/', createUserRow);

export default router;
