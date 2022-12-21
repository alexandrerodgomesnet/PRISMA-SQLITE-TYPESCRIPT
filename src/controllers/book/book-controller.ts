import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as BookService from '../../services';

export const listar = async (_: Request, response: Response) => {
    try {
        const books = await BookService.listAuthor();
        return response.status(200).json(books);
    } 
    catch (error: any) {
        return response.status(500).json(error.message);
    }
}
    
export const obter = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const book = await BookService.getAuthor(id);
        if(book)
            return response.status(200).json(book);

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
        const book = request.body;
        const newBook = await BookService.createAuthor(book);

        return response.status(201).json(newBook);
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
        const book = request.body;
        const updateBook = await BookService.updateAuthor(book, id);

        return response.status(200).json(updateBook);
    } 
    catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const excluir = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        await BookService.deleteAuthor(id);

        return response.status(204).json('Book has been successfully deleted');
    } 
    catch (error: any) {
        return response.status(500).json(error.message);
    }
}