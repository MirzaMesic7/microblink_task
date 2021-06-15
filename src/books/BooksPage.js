import React, { useState, useEffect } from 'react';
import { Button, Pagination, Table, Grid, Dropdown, Form, Message } from 'semantic-ui-react';

import { deleteBook, getBooks } from '../api/api';
import BookForm from './BookForm';


const BooksPage = () => {
    const [books, setBooks] = useState([])
    const [filterByTitleValue, setFilterByTitleValue] = useState('')
    const [selectedBook, setSelectedBook] = useState(null)
    const [activePage, setActivePage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if(message){
            setTimeout(()=> setMessage(''), 3000)
        }
        if(filterByTitleValue){
      
            getBooks().then(books => {
                const filteredBooks = books.filter(b => getTitle(b).toLowerCase().indexOf(filterByTitleValue.toLowerCase()) !== -1)
                handlePagination(filteredBooks)
            }) 
        }else {
            loadAllBooks()
        }
    }, [activePage, itemsPerPage, filterByTitleValue, message])

    const bookSaved = () => {
        loadAllBooks()
        setSelectedBook(null)
    }
    
    const loadAllBooks = () => getBooks().then(books => handlePagination(books))

    const handlePagination = (books) =>{
        let booksToShow = []    
        const totalPages = Math.ceil(books.length/itemsPerPage)
        let pageNumber = 0

        if (activePage < totalPages){
            pageNumber = activePage
        } else {
            setActivePage(0)
        }

        const offset = pageNumber * itemsPerPage
 
        for(let i=offset; i < offset + itemsPerPage; i++){
            if(books[i] !== undefined){
                booksToShow.push(books[i])
            }
        }
        
      setBooks(booksToShow)
      setTotalPages(totalPages)
    }

    const getTitle = book => book.title

    const filterByTitle = value => {
        setFilterByTitleValue(value)
    }

    const onPageChange = (e, data) =>{
        setActivePage(data.activePage-1)
    }

    const onItemsPerPageChange = (e, data) =>{
        setActivePage(0)
        setItemsPerPage(data.value) 
    }

    const removeBook = (book) => {
        deleteBook(book).then(books => {
            if(books.borrowed){
                handlePagination(books.books)
                setMessage("The book is borrowed. Not possible to delete.")
            } else {
                handlePagination(books) 
            }
        })
    }

    const itemsPerPageOptions = [
        { key: 1, text: 1, value: 1 },
        { key: 2, text: 2, value: 2 },
        { key: 3, text: 3, value: 3 },
        { key: 4, text: 4, value: 4 }
    ]

    return(  
        <Grid>
            <Grid.Row> <h1>Books</h1> </Grid.Row>
            
            <Grid.Row> <Button onClick={() => setSelectedBook({})}>New</Button> </Grid.Row>

            <Grid.Row> <Form.Input placeholder="Search by title..." onChange={(e, {value}) => filterByTitle(value)} /> </Grid.Row>
            
            { message&& <Grid.Row> <Message negative >{message}</Message> </Grid.Row>}

            <Grid.Row>
                <Table celled striped color="black">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {books.map(book => (
                            <Table.Row key={book.id}>
                                <Table.Cell>{book.id}</Table.Cell>
                                <Table.Cell>{book.title}</Table.Cell>
                                <Table.Cell>{book.author}</Table.Cell>
                                <Table.Cell collapsing style={{ textAlign: 'center' }}>
                                    <Button onClick={() => setSelectedBook(book)} icon="pencil" style={{ background: 'none', color: 'black', padding: '0px', marginLeft: '5px', marginRight: '5px' }} />
                                    <Button
                                        onClick={() => removeBook(book)}
                                        icon="trash" 
                                        style={{ background: 'none', color: 'black', padding: '0px', marginLeft: '5px',  marginRight: '5px' }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Grid.Row>
        
            <Grid.Row style={{ justifyContent: 'space-between' }}>
                <span>
                    Items per page: {' '} 
                    <Dropdown
                        inline
                        options={itemsPerPageOptions}
                        defaultValue={itemsPerPageOptions[2].value}
                        onChange={onItemsPerPageChange}
                    />
                </span>
            
                <Pagination activePage={activePage+1} totalPages={totalPages} onPageChange={onPageChange}/>
            </Grid.Row>

            <Grid.Row>
                {selectedBook && <BookForm {...selectedBook} onSuccess={bookSaved}/>}
            </Grid.Row>  
        </Grid> 
    )
}

export default BooksPage