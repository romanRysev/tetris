import express from 'express'
import * as themeController from '../app/controllers/themeController'

const router = express.Router();

// получить запись по userID пользователя 
router.get('/:userID', themeController.findOne);

// удалить запись по userID
router.delete('/:userID', themeController.deleteOne);

// обновить запись по id пользователя
router.put('/:userID', themeController.update);

// создать запись 
router.put('/', themeController.createTHemeRow);

// получить все записи
router.get('/', themeController.getAll);

//удалить все записи
router.delete('/', themeController.deleteAll);

export default router;
