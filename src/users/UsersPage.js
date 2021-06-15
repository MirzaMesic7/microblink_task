import React, { useState, useEffect } from 'react';
import { Button, Grid, Table, Message } from 'semantic-ui-react';

import { getUsers, deleteUser } from '../api/api';
import { showDateOfBirth } from '../utils/utils';
import UserForm from './UserForm';


const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [message, setMessage] = useState('')


    useEffect(() => {
        if(message){
            setTimeout(()=> setMessage(''), 3000)
        }
        loadUsers()
    }, [message])

    const userSaved = () => {
        loadUsers()
        setSelectedUser(null)
    }

    const loadUsers = () => getUsers().then(users => setUsers(users))

    const removeUser = (user) => {
        deleteUser(user).then(users => {
            if(users.borrowed){
                setMessage("User has borrowed book. Not possible to delete.")
            } else {
                setUsers(users)
            }
        })
    }

    return(
        <Grid>     
            <Grid.Row> <h1>Users</h1> </Grid.Row>
           
            <Grid.Row> <Button onClick={() => setSelectedUser({})}>New</Button> </Grid.Row> 

            <Grid.Row>  { message&& <Grid.Row> <Message negative >{message}</Message> </Grid.Row>} </Grid.Row>
            
            <Grid.Row> 
                <Table celled textAlign="left" striped color="black">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Borrowed books</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {users.map(user => (
                            <Table.Row key={user.id}>
                                <Table.Cell>{user.id}</Table.Cell>
                                <Table.Cell>{user.firstName}</Table.Cell>
                                <Table.Cell>{user.lastName}</Table.Cell>
                                <Table.Cell>{showDateOfBirth(user.dateOfBirth)}</Table.Cell>
                                <Table.Cell textAlign="center">{user.borrowed ? user.borrowed : '-' }</Table.Cell>
                                <Table.Cell collapsing textAlign="center">
                                    <Button onClick={() => setSelectedUser(user)} icon="pencil" style={{ background: 'none', color: 'black', padding: '0px', marginLeft: '5px', marginRight: '5px' }} />
                                    <Button 
                                        onClick={() => removeUser(user)} 
                                        icon="trash" 
                                        style={{ background: 'none', padding: '0px', color: 'black', marginLeft: '5px', marginRight: '5px' }} 
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Grid.Row>

            <Grid.Row> 
                {selectedUser && <UserForm {...selectedUser} onSuccess={userSaved}/>}
            </Grid.Row>
        </Grid>
    )
}

export default UsersPage