import { Author, propsAuthor } from "./author";

export type BookRead = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    author: Author;
    //authorId: number;
}

export type BookWrite = {
    title: string;
    datePublished: Date;
    isFiction: boolean;
    authorId: number;
}

export const propsBook = {
    id: true,
    title: true,
    datePublished: true,
    isFiction: true,
    author: {
        select: propsAuthor
    }
    // authorId: true
};