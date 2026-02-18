export type EntityType = "book" | "author" | "publisher";

/**
 * Author
 */
export type Author = {
	id: number;
	name: string;
	birthyear: number | null;
}

export type AuthorWithBooks = Author & {
	books: Book[];
}

/**
 * Book
 */
export type Book = {
	id: number;
	title: string;
	pages: number;
	publisher: Publisher | null;
}

export type BookWithAuthors = {
	id: number;
	title: string;
	pages: number;
	authors: Author[];
	publisher: Publisher | null;
}

/**
 * Publisher
 */
export type Publisher = {
	id: number;
	name: string;
}

export type PublisherWithBooksAndAuthors = Publisher & {
	books: Array<{
		id: number;
		title: string;
		pages: number;
		authors: Pick<Author, "id" | "name">[];
	}>;
};
