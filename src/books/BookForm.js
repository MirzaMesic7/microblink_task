import React, { useState, useEffect } from 'react';
import { Button, Form } from "semantic-ui-react"

import { addBook, updateBook } from '../api/api';


const BookForm = props => {
    const [title, setTitle] = useState(props.title || '')
    const [author, setAuthor] = useState(props.author || '')

    useEffect(() => {
        setTitle(props.title || '')
        setAuthor(props.author || '')
    }, [props.id, props.title, props.author])

    const submit = () => {
        if (props.id) {
            updateBook({id: props.id, title, author})
            .then(book => {
                clear()
                props.onSuccess(book)
            })
        }
        else {
            addBook({ title, author })
            .then(book => {
                clear()
                props.onSuccess(book)
            })
        }
    }

    const clear = () => {
        setTitle("")
        setAuthor("")
    }

    return <Form onSubmit={submit}>
                <Form.Field>
                    <label>Id</label>
                    <Form.Input disabled value={props.id || ''} placeholder='Id of the book' />
                </Form.Field>
                <Form.Field required>
                    <label>Title</label>
                    <Form.Input required value={title} onChange={(e, {value}) => setTitle(value)} placeholder='Enter a title...' />
                </Form.Field>
                <Form.Field required>
                    <label>Author</label>
                    <Form.Input required value={author} onChange={(e, {value}) => setAuthor(value)} placeholder='Enter the author...' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
}

export default BookForm