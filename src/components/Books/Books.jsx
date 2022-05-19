import { useEffect, useState } from "react";
import Book from "../Book/Book";
import Loader from "../Loader/Loader";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [types, setTypes] = useState([]);
  const [err, setErr] = useState(' ')

  useEffect(() => {
    fetch("https://in3.dev/knygos/")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => setErr(err.message));
  }, []);
  useEffect(() => {
    fetch("https://in3.dev/knygos/types/")
      .then((response) => response.json())
      .then((data) => setTypes(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {books.length > 0 ? (
        books.map((book) => (
          <Book
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            url={book.img}
            type={
              types.length > 0 && types.find((el) => el.id === book.type).title
            }
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Books;
