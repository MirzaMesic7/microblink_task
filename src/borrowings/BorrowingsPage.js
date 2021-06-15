import React, { useState, useEffect } from 'react';
import { Button, Table, Grid, Confirm, Form } from 'semantic-ui-react';
import { getBorrowings } from '../api/api';
import { showDateOfBirth } from '../utils/utils';
import BorrowForm from './BorrowForm';
import { returnBook } from './BorrowingService';

const BorrowingsPage = () => {
    const [borrowingsIntact, setBorrowingsIntact] = useState([])
    const [borrowings, setBorrowings] = useState([])
    const [openBorrowing, setOpenBorrowing] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [borrowingToReturn, setBorrowingToReturn] = useState(false)

    useEffect(() => {
        loadBorrowings()
    }, [])

    const loadBorrowings = () => {
        getBorrowings().then(borrowings => {
            setBorrowings([...borrowings])
            setBorrowingsIntact([...borrowings])
        })
    }

    const onBorrowSuccess = () => {
        loadBorrowings()
        setOpenBorrowing(false)
    }

    const returnBorrowing = borrowingItem => {
        setOpenConfirm(false)
        returnBook(borrowingItem)
            .then(() => {
                loadBorrowings()
            })
    }

    const getUserFullName = borrowing => `${borrowing.user.firstName} ${borrowing.user.lastName}`

    const filterByUser = value => {
        const filtered = borrowingsIntact.filter(b => getUserFullName(b).toLowerCase().indexOf(value.toLowerCase()) !== -1)
        setBorrowings(filtered)
    }

    return(
        <Grid>
            <Grid.Row> <h1>Borrowings</h1> </Grid.Row>
            
            <Grid.Row> <Button onClick={() => { setOpenBorrowing(true) }}>Add borrowing</Button> </Grid.Row>
           
            <Grid.Row> <Form.Input placeholder="Search by user..." onChange={(e, {value}) => filterByUser(value)} /> </Grid.Row>
            
            <Grid.Row>
                <Table celled striped color="black">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                User
                            
                            </Table.HeaderCell>
                            <Table.HeaderCell>Book</Table.HeaderCell>
                            <Table.HeaderCell>When</Table.HeaderCell>
                            <Table.HeaderCell>Expires</Table.HeaderCell>
                            <Table.HeaderCell>Return</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {borrowings.map(borrowing => (
                            <Table.Row key={borrowing.id}>
                                <Table.Cell>{getUserFullName(borrowing)}</Table.Cell>
                                <Table.Cell>{`${borrowing.book.title} by ${borrowing.book.author}`}</Table.Cell>
                                <Table.Cell collapsing>{showDateOfBirth(borrowing.when)}</Table.Cell>
                                <Table.Cell collapsing>{showDateOfBirth(borrowing.expires)}</Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Button 
                                        icon="minus" 
                                        style={{ background: "none" }} 
                                        onClick={() => {
                                            setBorrowingToReturn(borrowing)
                                            setOpenConfirm(true)
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Grid.Row>

            <Confirm
                open={openConfirm}
                onConfirm={() => returnBorrowing(borrowingToReturn)}
                onCancel={() => setOpenConfirm(false)}
            />

            <Grid.Row>
                {openBorrowing && <BorrowForm onSuccess={() => onBorrowSuccess()}/>}
            </Grid.Row>
           
        </Grid>
    ) 
}

export default BorrowingsPage