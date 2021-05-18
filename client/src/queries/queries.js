import { gql } from '@apollo/client';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: String!){
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

const getBookQuery = gql`
  query book($id: String!){
    book(id: $id) {
      id
      name
      genre
      author{
        id
        name
        books{
          name
          id
        }
      }
    }
  }
`

export {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
  getBookQuery,
}
