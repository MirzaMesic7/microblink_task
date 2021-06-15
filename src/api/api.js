import { 
    books, 
    users, 
    mockAddBook, 
    mockUpdateBook, 
    mockDeleteBook,
    mockAddUser,
    mockUpdateUser,
    mockDeleteUser,
    borrowings, 
    mockBorrow, 
    mockReturnBorrowing 
} from "./data"

export const getBooks = () => {
    return Promise.resolve(books)
}

export const addBook = book => {
    return Promise.resolve(mockAddBook(book))
}

export const updateBook = book => {
    return Promise.resolve(mockUpdateBook(book))
}

export const deleteBook = book => {
    return Promise.resolve(mockDeleteBook(book))
}

export const getUsers = () => {
    return Promise.resolve(users)
}

export const addUser = user => {
    return Promise.resolve(mockAddUser(user))
}

export const updateUser = user => {
    return Promise.resolve(mockUpdateUser(user))
}

export const deleteUser = user => {
    return Promise.resolve(mockDeleteUser(user))
}

export const getBorrowings = () => {
    return Promise.resolve(borrowings)
}

export const getBorrowedBooksByUser = user => {
    return Promise.resolve(borrowings.filter(b => b.user.id === user.id).map(b => b.book))
}

export const findBorrowing = (book, user) => {
    return Promise.resolve(borrowings.find(b => b.book.id === book.id && b.user.id === user.id))
}

export const addBorrowing = borrowItem => {
    return Promise.resolve(mockBorrow(borrowItem))
}

export const returnBorrowing = borrowItem => {
    return Promise.resolve(mockReturnBorrowing(borrowItem))
}