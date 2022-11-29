import express from 'express'
import * as themeController from '../app/controllers/themeController'

const router = express.Router();

// получить все записи
router.get('/', themeController.getAll);

// получить запись по userID пользователя 
router.get('/:userID', themeController.findOne);

// удалить запись по id
router.delete('/:id', themeController.deleteOne);

//удалить все записи
router.delete('/', themeController.deleteAll);

// найти по параметрам 
router.get('/', themeController.findAll);

// обновить запись по id 
router.put('/:id', themeController.update);

// создать запись 
router.post('/', themeController.createTHemeRow);

export default router;
