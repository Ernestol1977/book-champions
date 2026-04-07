import BookItem from "../bookItem/BookItem"
import { useState } from "react"
import BookSearch from "../bookSearch/BookSearch";


const Books = ({ books, onBookDeleted }) => {

  const [selectedBook, setSelectedBook] = useState("");
  const [bookSearch, setBookSearch] = useState("");

  const handleBookSearch = (book) => {
    setBookSearch(book)
  }

  const bookToShow = books.filter((book) => book.title.toLowerCase().includes(bookSearch.toLowerCase()))

  return (
    <>
      <BookSearch onFindBook={handleBookSearch} value={bookSearch} />

      {selectedBook && (
        <p>
          El libro seleccionado es <span className="fw-bold">{selectedBook}</span>
        </p>
      )}

      <div className="d-flex justify-content-center flex-wrap">
        {bookToShow.length > 0 ? (

          bookToShow.map((book) => { // con llaves va el return, con parentesis no va
            return <BookItem
              id={book.id}
              key={book.id}
              title={book.title}
              author={book.author}
              rating={book.rating}
              pageCount={book.pageCount}
              imageUrl={book.imageUrl}
              available={book.available}
              onSelectBook={setSelectedBook}
              onBookDeleted={onBookDeleted}
            />
          })
        ) : (
          <h3>No se encontraron lecturas con este nombre</h3>
        )}
      </div>
    </>
  )
}

export default Books