import { db } from '../utils/db.server'
import { BookRead, BookWrite, propsBook } from '../models';

export const listBooks = async (): Promise<BookRead[]> => {    
    return db.book.findMany({ select: propsBook });
}

export const getBook= async (id: number): Promise<BookRead | null> => {
    return db.book.findUnique({ 
        where: { id }, 
        select: propsBook
    });
}

export const createBook = async (book: BookWrite): Promise<BookRead> => {
    const { title, datePublished, isFiction, authorId } = book;
    const parsedDate: Date = new Date(datePublished);
    return db.book.create({
        data: {
            title,
            datePublished: parsedDate,
            isFiction,
            authorId
        },
        select: propsBook
    });
}

export const updateBook = async (book: BookWrite, id: number): Promise<BookRead> => {
    const { title, datePublished, isFiction, authorId } = book;
    return db.book.update({
        where: {
            id
        },
        data: {
            title,
            datePublished,
            isFiction,
            authorId
        },
        select: propsBook
    });
}

export const deleteBook = async (id: number): Promise<void> => {
    await db.book.delete({
        where: {
            id
        }
    });
}