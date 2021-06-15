import React, { useState, useEffect } from 'react';
import { Button, Form } from "semantic-ui-react"
import { getBooks, getUsers } from '../api/api';
import { borrow, canBorrowBook, canUserBorrow } from './BorrowingService';

const BorrowForm = props => {
    const [book, setBook] = useState(null)
    const [user, setUser] = useState(null)
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        getBooks().then(setBooks)
        getUsers().then(setUsers)
    }, [])

    const tryToSetUser = userId => {
        const u = users.find(u => u.id === userId)
        
        if (canUserBorrow(u)) {
            setUser(u)
        }
        else {
            alert("Cannot borrow! User already reached max books limit.")
        }
    }

    const tryToSetBook = bookId => {
        const b = books.find(b => b.id === bookId)
        if (canBorrowBook(b)) {
            setBook(b)
        }
        else {
            alert("Cannot borrow! Book is already borrowed.")
        }
    }

    const submit = () => {
        if (!book || !user) {
            return
        }

        borrow(book, user).then(item => {
            clear()
            props.onSuccess(item)
        })
    }

    const clear = () => {
        setBook(null)
        setUser(null)
    }

    return <Form onSubmit={submit}>
                <Form.Field required>
                    <label>User</label>
                    <Form.Select placeholder='Select user'
                        search
                        onChange={(e, {value}) => tryToSetUser(value)}
                        value={user ? user.id : null}
                        options={users.map(user => ({ key: user.id, value: user.id, text: `${user.firstName} ${user.lastName}` }))} 
                    />
                </Form.Field>
                <Form.Field required> 
                    <label>Book</label>
                    <Form.Select placeholder='Select book'
                        search
                        onChange={(e, {value}) => tryToSetBook(value)}
                        value={book ? book.id : null}
                        options={books.map(book => ({ key: book.id, value: book.id, text: `${book.title} by ${book.author}` }))} 
                    />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
}

export default BorrowForm