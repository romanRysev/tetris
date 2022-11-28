import express from 'express'
import * as forumController from '../app/controllers/topicController'
import * as postController from '../app/controllers/postController'
import * as reactionController from '../app/controllers/reactionController'

const router = express.Router();

// получить список тем
router.get('/all', forumController.getTopicList);

// получить реакции поста
router.get('/reaction', reactionController.getReactionsByPostID);

// получить лайки поста
router.get('/like', reactionController.getLikesByPostID);

// получить дизлайки поста
router.get('/dislike', reactionController.getDislikesByPostID);

// поставить/снять лайк посту
router.put('/like', reactionController.reactionLike);

// поставить дизлайк посту
router.put('/dislike', reactionController.reactionDislike);

// получить список тем по автору - айди автора в url
router.get('/topics/:userID', forumController.getTopicListByAuthor);

// получить список постов
router.get('/posts', postController.getAll);

// удалить все темы
router.delete('/all', forumController.deleteAll);

// удалить тему по id
router.delete('/:id', forumController.deleteOne);

// создать пост в теме
router.post('/:topicID', postController.createNewPost);

// список постов темы
router.get('/:topicID', postController.getPostListForTopic)




// получить список тем с ограничением количества
// offset и limit в url
router.get('/', forumController.getTopicListWithCount);

// создать тему 
router.post('/', forumController.createTopicRow);

export default router;
