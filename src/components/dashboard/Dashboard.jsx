import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Outlet, Route, Routes, useNavigate } from 'react-router';

import NewBook from '../library/newBook/NewBook';
import Books from '../library/books/Books';
import BookDetails from '../library/bookDetails/BookDetails';

const Dashboard = ({ onLogout }) => {

  const books = [
    {
      id: 1,
      title: "Harry Potter 1",
      author: "J.K. Rowling",
      rating: 4,
      pageCount: 800,
      imageUrl:
        "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789878000107-b82c22cfb174dca93016944484618644-1024-1024.jpg",
      available: true,
      summary:
        "Un niño huérfano descubre que es un mago y comienza su educación en Hogwarts, enfrentándose a sus primeros desafíos mágicos.",
    },
    {
      id: 2,
      title: "El Señor de los Anillos",
      author: "J.R.R. Tolkien",
      rating: 5,
      pageCount: 1200,
      imageUrl:
        "https://images.cdn1.buscalibre.com/fit-in/360x360/66/1a/661a3760157941a94cb8db3f5a9d5060.jpg",
      available: false,
      summary:
        "Un grupo de héroes emprende un viaje épico para destruir un anillo de poder maligno que amenaza con dominar la Tierra Media.",
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      rating: 1,
      pageCount: 900,
      imageUrl:
        "https://images.cdn2.buscalibre.com/fit-in/360x360/0d/73/0d739e6e0e837d7637f97f9aad3639b4.jpg",
      available: true,
      summary:
        "En un planeta desértico donde la especia es la sustancia más valiosa del universo, un joven se convierte en el líder de una rebelión que cambiará el destino de todos.",
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      rating: 4,
      pageCount: 230,
      imageUrl:
        "https://images.cdn1.buscalibre.com/fit-in/360x360/b0/39/b039af065268818b7bd3b0e016f8db65.jpg",
      // "",
      available: true,
      summary:
        "En un mundo gobernado por un régimen totalitario, un hombre lucha contra la vigilancia constante y la manipulación de la verdad.",
    },
  ];

  const [bookList, setBookList] = useState(books);
  const navigate = useNavigate();

  const handleBookAdded = (enteredBook) => {
    fetch("http://localhost:3000/books", {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(enteredBook)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then((err) => {
	      throw new Error(err.message || "Error al crear libro");
            });
        }
        return res.json();
      })

      .then(data => {
        setBookList(prevBookList => [data, ...prevBookList])
      })
      .catch(err => console.log(err))

    /* const bookData = {
      ...enteredBook,
      id: Math.random()
    }

    setBookList(prevBookList => [bookData, ...prevBookList]); */
  }

  const handleBookDelete = (bookId) => {
    setBookList((prevBookList) =>
      prevBookList.filter((book) => book.id !== bookId)
    )
  }

  const handleClickLogout = () => {
    onLogout();
  };

  const handleNavigateAddBook = () => {
    navigate("/library/add-book", { replace: true })
  };

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then(res => res.json())
      .then(data => setBookList([...data]))
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-100 d-flex justify-content-end gap-3 p-3">
        <Button onClick={handleNavigateAddBook} className='bg-success border-success'>Agregar libro</Button>

        <Button onClick={handleClickLogout}>Cerrar sesión</Button>
      </div>

      <h2>Book Champions</h2>
      <p>Quiero leer libros!</p>

      <Routes>
        <Route index element={<Books books={bookList} onBookDeleted={handleBookDelete} />} />
        <Route path='add-book' element={<NewBook onBookAdded={handleBookAdded} />} />
        <Route path=":id" element={<BookDetails />} />
      </Routes>

    </div>
  );
}

export default Dashboard