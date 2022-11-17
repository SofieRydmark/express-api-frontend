import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from './Loading'

export const BookSearch = () => {
    const book = useSelector((store) => store.library.bookSearch)
    const [bookList, setBookList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`https://books-api-7kza2noima-lz.a.run.app/books/titles/${book}`)
            .then((res) => res.json())
            .then((data) => setBookList(data))
            .catch((error) => alert(error, 'error'))
            .finally(() => setLoading(false));
    }, [book])

    if (loading) {
        return (
            <Loading />
        )
    } else {

    return (
        <div className="bookList">
            {bookList.length > 0 && bookList.map((item) => {
                return (
                    <div key={item.isbn}>
                        <h3>{item.title}</h3>
                        <p>Written by: {item.authors.split('-').join(', ')}</p>
                        <p>Rating: {item.average_rating}</p>
                        <p>Pages: {item.num_pages}</p>
                    </div>
                )
            })}
        </div>
    )
}
 
}