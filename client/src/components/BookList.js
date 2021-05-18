import React, { useState } from 'react';
import {useQuery } from '@apollo/client'
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';


function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedId, setSelectedId] = useState('');

  const dispalyBook = () => {
    if (loading) {
      return <div>Loading Books...</div>
    }else {
      return (data.books.map(book => {
        return <li key={book.id} onClick={(e) => {
          setSelectedId(book.id);
        }}>{book.name}</li>
      }))
    }
  }
  return (
    <div>
      <ul id="book-list">
          {dispalyBook()}
      </ul>
      <BookDetails bookId={selectedId}/>
    </div>
  );
}

export default BookList;