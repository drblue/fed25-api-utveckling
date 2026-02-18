import type {
	Author,
	AuthorWithBooks,
	Book,
	BookWithAuthors,
	EntityType,
	Publisher,
	PublisherWithBooksAndAuthors,
} from "./types";

export const appEl = document.querySelector("#app") as HTMLDivElement;
export const booksEl = document.querySelector("#books") as HTMLUListElement;
export const authorsEl = document.querySelector("#authors") as HTMLUListElement;
export const publishersEl = document.querySelector("#publishers") as HTMLUListElement;
export const detailsEl = document.querySelector("#details") as HTMLDivElement;

const statusEl = document.querySelector("#status") as HTMLDivElement;
const loadingEl = document.querySelector("#loading-indicator") as HTMLDivElement;

export const showStatus = (message: string) => {
	statusEl.classList.remove("d-none");
	statusEl.textContent = message;
};

export const hideStatus = () => {
	statusEl.classList.add("d-none");
};

export const setLoading = (isLoading: boolean) => {
	loadingEl.classList.toggle("d-none", !isLoading);
	appEl.classList.toggle("is-loading", isLoading);
};

export const renderEntityLink = (type: EntityType, id: number, label: string) =>
	`<button class="entity-link" data-type="${type}" data-id="${id}">${label}</button>`;

export const renderBookList = (books: Book[]) => {
	booksEl.innerHTML = books
		.map((book) => `<li>${renderEntityLink("book", book.id, `${book.title} (${book.pages} pages)`)}</li>`)
		.join("");
};

export const renderAuthorList = (authors: Author[]) => {
	authorsEl.innerHTML = authors
		.map((author) => {
			const suffix = author.birthyear ? ` (${author.birthyear})` : "";
			return `<li>${renderEntityLink("author", author.id, `${author.name}${suffix}`)}</li>`;
		})
		.join("");
};

export const renderPublisherList = (publishers: Publisher[]) => {
	publishersEl.innerHTML = publishers
		.map((publisher) => `<li>${renderEntityLink("publisher", publisher.id, publisher.name)}</li>`)
		.join("");
};

export const renderBookDetails = (book: BookWithAuthors | null) => {
	if (!book) {
		detailsEl.innerHTML = "<p class=\"mb-0 text-secondary\">Book not found.</p>";
		return;
	}

	const authors = book.authors.length > 0
		? book.authors.map((author) => renderEntityLink("author", author.id, author.name)).join(", ")
		: "<span class=\"text-secondary\">No authors connected</span>";

	const publisher = book.publisher
		? renderEntityLink("publisher", book.publisher.id, book.publisher.name)
		: "<span class=\"text-secondary\">No publisher connected</span>";

	detailsEl.innerHTML = `
		<article>
			<h3>${book.title}</h3>
			<p><strong>ID:</strong> #${book.id}</p>
			<p><strong>Pages:</strong> ${book.pages}</p>
			<p><strong>Authors:</strong> ${authors}</p>
			<p><strong>Publisher:</strong> ${publisher}</p>
		</article>
	`;
};

export const renderAuthorDetails = (author: AuthorWithBooks | null) => {
	if (!author) {
		detailsEl.innerHTML = "<p class=\"mb-0 text-secondary\">Author not found.</p>";
		return;
	}

	const books = author.books.length > 0
		? `<ul class="detail-list">${author.books
			.map((book) => {
				const publisher = book.publisher
					? ` · ${renderEntityLink("publisher", book.publisher.id, book.publisher.name)}`
					: "";

				return `<li>${renderEntityLink("book", book.id, `${book.title} (${book.pages} pages)`)}${publisher}</li>`;
			})
			.join("")}</ul>`
		: "<p class=\"mb-0 text-secondary\">This author has no books yet.</p>";

	const birthyear = author.birthyear ? author.birthyear : "Unknown";

	detailsEl.innerHTML = `
		<article>
			<h3>${author.name}</h3>
			<p><strong>ID:</strong> #${author.id}</p>
			<p><strong>Birth year:</strong> ${birthyear}</p>
			<h4 class="mt-3">Books</h4>
			${books}
		</article>
	`;
};

export const renderPublisherDetails = (publisher: PublisherWithBooksAndAuthors | null) => {
	if (!publisher) {
		detailsEl.innerHTML = "<p class=\"mb-0 text-secondary\">Publisher not found.</p>";
		return;
	}

	const books = publisher.books.length > 0
		? `<ul class="detail-list">${publisher.books
			.map((book) => {
				const authors = book.authors.length > 0
					? ` · by ${book.authors.map((author) => renderEntityLink("author", author.id, author.name)).join(", ")}`
					: "";

				return `<li>${renderEntityLink("book", book.id, `${book.title} (${book.pages} pages)`)}${authors}</li>`;
			})
			.join("")}</ul>`
		: "<p class=\"mb-0 text-secondary\">No books connected to this publisher.</p>";

	detailsEl.innerHTML = `
		<article>
			<h3>${publisher.name}</h3>
			<p><strong>ID:</strong> #${publisher.id}</p>
			<h4 class="mt-3">Books</h4>
			${books}
		</article>
	`;
};
