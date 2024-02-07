import { useEffect, useState } from 'react';
import './App.scss';
import data from './feladat6-adatok.json';
import img from './img/feladat6-loading.gif';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetch('./feladat6-adatok.json')
        .then((response) => response.json())
        .then((data) => {
          setBooks(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <img src={img} alt="Betöltés" />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  console.log(books);
  return (
    <main className="App">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Cím</th>
            <th scope="col">Polc</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.cim}</td>
              <td>{book.polc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
