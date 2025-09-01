import express from 'express';
import {
  index,
  create,
  store,
  edit,
  update,
  _delete,
  errorTest,
} from '../controllers/main-controller.js';

const router = express.Router();

router.get('/', index);
router.get('/create', create);
router.post('/', store);
router.get('/:todoID/edit', edit);
router.put('/:todoID', update);
router.delete('/:todoID', _delete);

router.get('/error-test', errorTest);

export default router;
