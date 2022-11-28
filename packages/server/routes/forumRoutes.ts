import express from 'express'
import * as topicController from '../app/controllers/topicController'
import * as postController from '../app/controllers/postController'
import * as reactionController from '../app/controllers/reactionController'

const router = express.Router();

// получить список тем
router.get('/all', topicController.getTopicList);

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
router.get('/topics/:userID', topicController.getTopicListByAuthor);

// получить список постов
router.get('/posts', postController.getAll);

// удалить все темы
router.delete('/all', topicController.deleteAll);

// удалить тему по id
router.delete('/:id', topicController.deleteOne);

// создать пост в теме
router.post('/:topicID', postController.createNewPost);

// апдейт темы (lastReply)
router.put('/:topicID', topicController.setLastReply);

// список постов темы
router.get('/:topicID', postController.getPostListForTopic)




// получить список тем с ограничением количества
// offset и limit в url
router.get('/', topicController.getTopicListWithCount);

// создать тему 
router.post('/', topicController.createTopicRow);

export default router;
