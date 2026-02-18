import { ApolloClient, type DocumentNode, InMemoryCache, gql } from "@apollo/client/core";

const GRAPHQL_SERVER = import.meta.env.VITE_GRAPHQL_SERVER || "http://localhost:4000";

const client = new ApolloClient({
	uri: GRAPHQL_SERVER,
	cache: new InMemoryCache(),
});

export const GET_ALL_BOOKS = gql`
	query GetAllBooks {
		books {
			id
			title
			pages
		}
	}
`;

export const GET_ALL_AUTHORS = gql`
	query GetAllAuthors {
		authors {
			id
			name
			birthyear
		}
	}
`;

export const GET_ALL_PUBLISHERS = gql`
	query GetAllPublishers {
		publishers {
			id
			name
		}
	}
`;

export const GET_BOOK_DETAILS = gql`
	query GetBookDetails($id: Int!) {
		book(id: $id) {
			id
			title
			pages
			authors {
				id
				name
				birthyear
			}
			publisher {
				id
				name
			}
		}
	}
`;

export const GET_AUTHOR_DETAILS = gql`
	query GetAuthorDetails($id: Int!) {
		author(id: $id) {
			id
			name
			birthyear
			books {
				id
				title
				pages
				publisher {
					id
					name
				}
			}
		}
	}
`;

export const GET_PUBLISHER_DETAILS = gql`
	query GetPublisherDetails($id: Int!) {
		publisher(id: $id) {
			id
			name
			books {
				id
				title
				pages
				authors {
					id
					name
				}
			}
		}
	}
`;

export const execQuery = async <T>(query: DocumentNode, variables?: Record<string, unknown>) => {
	const result = await client.query({
		query,
		variables,
		fetchPolicy: "no-cache",
	});

	return result.data as T;
};
