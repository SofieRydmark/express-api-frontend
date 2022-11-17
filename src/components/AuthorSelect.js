import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from './Loading'

export const AuthorSelect = () => {
    const authors = useSelector((store) => store.library.authorSelect)
    const [loading, setLoading] = useState(false)
    const [authorList, setAuthorList] = useState([])
  

    useEffect(() => {
        setLoading(true)
        fetch(`https://books-api-7kza2noima-lz.a.run.app/authors/${authors}`)
            .then((res) => res.json())
            .then((data) => setAuthorList(data))
            .catch((error) => alert(error, 'error'))
            .finally(() => setLoading(false));
    }, [authors])


    if (loading) {
        return (
            <Loading />
        )
    } else {

    return (
        <div className="authorList">
            {authorList.length > 0 && authorList.map((item) => {
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