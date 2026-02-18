import {
	execQuery,
	GET_ALL_AUTHORS,
	GET_ALL_BOOKS,
	GET_ALL_PUBLISHERS,
	GET_AUTHOR_DETAILS,
	GET_BOOK_DETAILS,
	GET_PUBLISHER_DETAILS,
} from "./graphql";
import type {
	Author,
	AuthorWithBooks,
	Book,
	BookWithAuthors,
	EntityType,
	Publisher,
	PublisherWithBooksAndAuthors,
} from "./types";
import {
	detailsEl,
	hideStatus,
	renderAuthorDetails,
	renderAuthorList,
	renderBookDetails,
	renderBookList,
	renderPublisherDetails,
	renderPublisherList,
	setLoading,
	showStatus,
} from "./ui";

const loadInitialData = async () => {
	setLoading(true);
	hideStatus();

	try {
		const [booksResult, authorsResult, publishersResult] = await Promise.all([
			execQuery<{ books: Book[] }>(GET_ALL_BOOKS),
			execQuery<{ authors: Author[] }>(GET_ALL_AUTHORS),
			execQuery<{ publishers: Publisher[] }>(GET_ALL_PUBLISHERS),
		]);

		renderBookList(booksResult.books);
		renderAuthorList(authorsResult.authors);
		renderPublisherList(publishersResult.publishers);
		hideStatus();
	} catch (error) {
		console.error(error);
		showStatus("Could not load data from GraphQL server. Make sure backend is running.");
	} finally {
		setLoading(false);
	}
};

const openDetails = async (type: EntityType, id: number) => {
	setLoading(true);
	hideStatus();
	detailsEl.classList.add("d-none");
	detailsEl.innerHTML = "";

	try {
		if (type === "book") {
			const result = await execQuery<{ book: BookWithAuthors | null }>(GET_BOOK_DETAILS, { id });
			renderBookDetails(result.book);
		} else if (type === "author") {
			const result = await execQuery<{ author: AuthorWithBooks | null }>(GET_AUTHOR_DETAILS, { id });
			renderAuthorDetails(result.author);
		} else {
			const result = await execQuery<{ publisher: PublisherWithBooksAndAuthors | null }>(GET_PUBLISHER_DETAILS, { id });
			renderPublisherDetails(result.publisher);
		}

		detailsEl.classList.remove("d-none");
		hideStatus();
	} catch (error) {
		console.error(error);
		detailsEl.classList.remove("d-none");
		detailsEl.innerHTML = `<p class="mb-0 text-secondary">Could not load ${type} details.</p>`;
		showStatus(`Could not load ${type} details.`);
	} finally {
		setLoading(false);
	}
};

document.addEventListener("click", (event) => {
	const target = event.target as HTMLElement;
	if (!target.classList.contains("entity-link")) {
		return;
	}

	const type = target.getAttribute("data-type") as EntityType | null;
	const idValue = target.getAttribute("data-id");

	if (!type || !idValue) {
		return;
	}

	void openDetails(type, Number(idValue));
});

await loadInitialData();
