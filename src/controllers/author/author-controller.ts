import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as AuthorService from '../../services';

export const listar = async (_: Request, response: Response) => {
    try {
        const authors = await AuthorService.listAuthor();
        return response.status(200).json(authors);
    } 
    catch (error: any) {
        return response.status(500).json(error.message);
    }
}
    
export const obter = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const author = await AuthorService.getAuthor(id);
        if(author)
            return response.status(200).json(author);

        return response.status(404).json('Author could not be found');
    } 
    catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const inserir = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty())
        return response.status(404).json({errors: errors.array() });
    
    try {
        const author = request.body;
        const newAuthor = await AuthorService.createAuthor(author);

        return response.status(201).json(newAuthor);
    } 
    catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const atualizar = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty())
        return response.status(404).json({errors: errors.array() });

    const id: number = parseInt(request.params.id, 10);
    
    try {
        const author = request.body;
        const updateAuthor = await AuthorService.updateAuthor(author, id);

        return response.status(200).json(updateAuthor);
    } 
    catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const excluir = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        await AuthorService.deleteAuthor(id);

        return response.status(204).json('Author has been successfully deleted');
    } 
    catch (error: any) {
        return response.status(500).json(error.message);
    }
}