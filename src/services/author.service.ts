import { Author, propsAuthor } from '../models';
import { db } from '../utils/db.server'


export const listAuthor = async (): Promise<Author[]> => {
    
    return db.author.findMany({ select: propsAuthor });
}

export const getAuthor = async (id: number): Promise<Author | null> => {
    return db.author.findUnique({ 
        where: { id }, 
        select: propsAuthor
    });
}

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
    const { firstName, lastName } = author;
    return db.author.create({
        data: {
            firstName,
            lastName
        },
        select: propsAuthor
    });
}

export const updateAuthor = async (author: Omit<Author, 'id'>, id: number): Promise<Author> => {
    const { firstName, lastName } = author;
    return db.author.update({
        where: {
            id
        },
        data: {
            firstName,
            lastName
        },
        select: propsAuthor
    });
}

export const deleteAuthor = async (id: number): Promise<void> => {
    await db.author.delete({
        where: {
            id
        }
    });
}