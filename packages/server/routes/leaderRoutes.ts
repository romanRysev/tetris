import express from 'express'
import * as leaderController from './../app/controllers/leaderController'

const router = express.Router();

// получить запись по userID
router.get('/:userID', leaderController.getLeader);

// удалить запись по userID
router.delete('/:userID', leaderController.deleteLeader);

// получить вeсь лидерборд
router.get('/', leaderController.getLeaderBoard);

// создать/обновить запись
router.put('/', leaderController.createOrUpdateLeader);

// удалить все записи
router.delete('/', leaderController.deleteAllLeaders);

export default router;
