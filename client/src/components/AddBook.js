import React, { useState } from 'react';
import { useQuery, useMutation} from '@apollo/client'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, data } = useQuery(getAuthorsQuery);
  const [ addBook ] = useMutation(addBookMutation);

  const displayAuthors = () => {
    if (loading) {
      return <option>Loading Books...</option>
    }else {
      return (data.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>
      }))
    }
  }
  const submitForm = (e) => {
    e.preventDefault();
    addBook({ variables: { name: name, genre: genre, authorId: authorId},
              refetchQueries: [{query: getBooksQuery}]

            });
  }
  return (
    <form id="add-book" onSubmit={(e) => {
                     submitForm(e);
                  }}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => setGenre(e.target.value)}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => setAuthorId(e.target.value)}>
                        <option>Select author</option>
                        { displayAuthors()}
                    </select>
                </div>
                <button>+</button>

            </form>
  );
}

export default AddBook;