import express from 'express';
import { body } from 'express-validator';
import { AuthorController } from '../controllers/author'

export const authorRouter = express.Router();

authorRouter.get('/', AuthorController.listar);
authorRouter.get('/:id', AuthorController.obter);
authorRouter.post('/', body('firstName').isString(), body('lastName').isString(), 
    AuthorController.inserir);
authorRouter.put('/:id', body('firstName').isString(), body('lastName').isString(),
    AuthorController.atualizar);
authorRouter.delete('/:id', AuthorController.excluir);