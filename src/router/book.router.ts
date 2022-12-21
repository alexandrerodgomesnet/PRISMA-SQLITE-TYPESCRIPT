import express from 'express';
import { body } from 'express-validator';
import { BookController } from '../controllers/book';

export const bookRouter = express.Router();

bookRouter.get('/', BookController.listar);
bookRouter.get('/:id', BookController.obter);
bookRouter.post('/', 
    body('title').isString(), 
    body('authorId').isInt(),
    body('datePublished').isDate().toDate(), 
    body('isFiction').isBoolean(),
    BookController.inserir);
bookRouter.put('/:id', 
    body('title').isString(), 
    body('authorId').isInt(),
    body('datePublished').isDate().toDate(), 
    body('isFiction').isBoolean(),
    BookController.atualizar);
bookRouter.delete('/:id', BookController.excluir);