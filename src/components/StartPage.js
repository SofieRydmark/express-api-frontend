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
    <>
            <header>
                <h1>Welcome to The Little Library. </h1>
                <p>Search for a book, <br/>
                or select an author/authors from the dropdown-menu <br/> 
                to display the books they have written.</p>
            </header>

        <section className="filter">
            <div className="inputWrapper">
                <form onSubmit={bookSearchInput}>
                        <label hidden htmlFor="bookSearchInput">Booksearch</label>
                        <input
                            id="bookSearchInput"
                            required
                            type="text"
                            placeholder="Search book, ex Harry Potter"
                            value={input}
                            onChange={(event) => setInput(event.target.value)} />
                        <button className="button-82-pushable" type="submit" onClick={bookSearchInput}>
                        <span className="button-82-shadow"></span>
                            <span className="button-82-edge"></span>
                            <span className="button-82-front text">
                            Search
                            </span>
                        </button>
                    </form>

                    <p>or </p>
                </div>

              
                <div className="selectWrapper">
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
                </div>
    
            </section>
            </>

    }

  
        {authors.length > 1 ? <AuthorSelect /> : ''}
        {bookSearchResult.length > 1 ? <BookSearch /> : ''}


    </main>
  )

}
}
