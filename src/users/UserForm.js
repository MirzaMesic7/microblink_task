import React, { useState, useEffect } from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Form, Icon } from "semantic-ui-react"

import { addUser, updateUser } from '../api/api';
import { showDateOfBirth } from '../utils/utils';


const UserForm = props => {
    const [firstName, setFirstName] = useState(props.firstName || '')
    const [lastName, setLastName] = useState(props.lastName || '')
    const [dateOfBirth, setDateOfBirth] = useState(props.dateOfBirth || '')

    useEffect(() => {
        setFirstName(props.firstName || '')
        setLastName(props.lastName || '')
        setDateOfBirth(showDateOfBirth(props.dateOfBirth) || '')
    }, [props.id, props.firstName, props.lastName, props.dateOfBirth])

    const submit = () => {
        if (props.id) {
            updateUser({ id: props.id, firstName, lastName, dateOfBirth })
            .then(user => {
                clear()
                props.onSuccess(user)
            })
        }
        else {
            addUser({ firstName, lastName, dateOfBirth })
            .then(user => {
                clear()
                props.onSuccess(user)
            })
        }
    }

    const clear = () => {
        setFirstName('')
        setLastName('')
        setDateOfBirth('')
    }

    const handleDateOfBirthChange = (data) =>{
        setDateOfBirth(data.value)
    }

    return <Form onSubmit={submit}>
                <Form.Field>
                    <label>Id</label>
                    <Form.Input disabled value={props.id || ''} placeholder='Id of the user' />
                </Form.Field>
                <Form.Field required>
                    <label>First Name</label>
                    <Form.Input required value={firstName} onChange={(e, {value}) => setFirstName(value)} placeholder='Enter the first name...' />
                </Form.Field>
                <Form.Field required>
                    <label>Last Name</label>
                    <Form.Input required value={lastName} onChange={(e, {value}) => setLastName(value)} placeholder='Enter the last name...' />
                </Form.Field>
                <Form.Field required>
                    <label>Date of Birth</label>
                    <DateInput
                        name="date"
                        placeholder="Pick a date..."
                        clearable
                        clearIcon={<Icon name="remove" color="red" />}
                        startMode="year"
                        value={dateOfBirth}
                        iconPosition="left"
                        onChange={(e, data) => handleDateOfBirthChange(data)}
                    />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
}

export default UserForm