import React from 'react'
import { Container, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import BooksPage from './books/BooksPage'
import UsersPage from './users/UsersPage'
import HomePage from './home/HomePage'
import BorrowingsPage from './borrowings/BorrowingsPage'


const App = () => (
  <Router>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as={Link} header to="/">Microblink Library</Menu.Item>
        <Menu.Item as={Link} to="/books">Books</Menu.Item>
        <Menu.Item as={Link} to="/users">Users</Menu.Item>
        <Menu.Item as={Link} to="/borrowings">Borrowings</Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
      <Switch>
        <Route path="/books">
          <BooksPage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/borrowings">
          <BorrowingsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Container>
    
  </Router>
)

export default App