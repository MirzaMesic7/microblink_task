class Id {
    id = 0
   
    get() {
        this.id++
        return this.id
    }
}

const id = new Id()

export let books = [
    {
        id: id.get(),
        title: "Bajke",
        author: "Braća Grimm",
        borrowed: true
    },
    {
        id: id.get(),
        title: "Bijeli jelen",
        author: "Vladimir Nazor"
    },
    {
        id: id.get(),
        title: "Miš",
        author: "Božidar Prosenjak"
    },
    {
        id: id.get(),
        title: "Tajna malog brata",
        author: "Hrvoje Kovačević"
    }
]

export const mockAddBook = book => {
    book.id = id.get()
    books.push(book)

    return book
}

export const mockUpdateBook = newBook => {
    let book = books.find(b => b.id === newBook.id)
    
    book.title = newBook.title
    book.author = newBook.author

    return book
}

export const mockDeleteBook = selectedBook => {
    if(selectedBook.borrowed){
       return {books, borrowed: true}
    } else {
        books = books.filter(b => b.id !== selectedBook.id)
        return books
    } 
}

export let users = [
    {
        id: id.get(),
        firstName: "Ante",
        lastName: "Antić",
        dateOfBirth: new Date(2000, 11, 2),
        borrowed: 1
    },
    {
        id: id.get(),
        firstName: "Ana",
        lastName: "Anić",
        dateOfBirth: new Date(1993, 1, 22)
    },
    {
        id: id.get(),
        firstName: "Ivo",
        lastName: "Ivić",
        dateOfBirth: new Date(2005, 3, 3)
    }
]

export const mockAddUser = user => {
    user.id = id.get()
    users.push(user)

    return user
}

export const mockUpdateUser = newUser => {
    let user = users.find(b => b.id === newUser.id)
    
    user.firstName = newUser.firstName
    user.lastName = newUser.lastName
    user.dateOfBirth = newUser.dateOfBirth

    return user
}

export const mockDeleteUser = selectedUser => {
    if(selectedUser.borrowed){
       return {users, borrowed: true}
    } else {
        users = users.filter(b => b.id !== selectedUser.id)
        return users
    } 
}

export let borrowings = [{
    id: id.get(),
    book: books[0],
    user: users[0],
    when: new Date(2020, 1, 10),
    expires: new Date(2020, 2, 10)
}]

export const mockBorrow = borrowItem => {
    borrowItem.id = id.get()
    borrowings.push(borrowItem)

    borrowItem.book.borrowed = true

    if (borrowItem.user.borrowed) {
        borrowItem.user.borrowed++
    }
    else {
        borrowItem.user.borrowed = 1
    }

    return borrowItem
}

export const mockReturnBorrowing = borrowItem => {
    borrowItem.book.borrowed = false
    borrowItem.user.borrowed--
    borrowings = borrowings.filter(b => b.id !== borrowItem.id)
}