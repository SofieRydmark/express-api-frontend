import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { library } from '../reducers/library'
import { Loading } from './Loading'
import { AuthorSelect } from './AuthorSelect'
import { BookSearch } from './BookSearch'

export const StartPage = () => {
    const [books, setBooks] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const authors = useSelector((store) => store.library.authorSelect)
    const bookSearchResult = useSelector((store) => store.library.bookSearch)

const bookSearchInput = (e) => {
    e.preventDefault();
    dispatch(library.actions.setBookSearch(input))
    setInput('')
  }
    
const selectAuthor = (event) => {
    dispatch(library.actions.setAuthorSelect(event.target.value))
  }


useEffect(() => {
    setLoading(true)
    fetch('https://books-api-7kza2noima-lz.a.run.app/books')
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((error) => alert(error, 'error'))
        .finally(() => setLoading(false));
}, [])

    
if (loading) {
    return (
     <Loading />
    )
} else {

  return (
    <main>
    {books &&
        <section>
            <div className="start">
                <h1>Hello and welcome to The Little Library. </h1>
                <p>Search for a book <br/>
                Or select an author/authors from dropdown-menu to display the books they have written</p>
            </div>

            <div>
                <form onSubmit={bookSearchInput}>
                        <label hidden htmlFor="bookSearchInput">Booksearch</label>
                        <input
                            id="bookSearchInput"
                            required
                            type="text"
                            placeholder="search book, ex Harry Potter"
                            value={input}
                            onChange={(event) => setInput(event.target.value)} />
                        <button type="submit" onClick={bookSearchInput}>Search</button>
                    </form>
                </div>
              
                <label hidden htmlFor="authors">Authors</label>
                    <select value="author" name="authors" id="authorList" onChange={selectAuthor} aria-label='authorList'>
                    <option defaultValue={true}>Choose authors</option>
                        {books.map((item) => {
                            return (
                            <option 
                            key={item.bookID}
                            value={item.authors}>
                            {item.authors.replace('-', ', ')}</option>
                            )
                        })}
                    </select>

        </section>
    }

    {authors.length > 1 ? <AuthorSelect /> : ''}
    {bookSearchResult.length > 1 ? <BookSearch /> : ''}
    </main>
  )
}
}
