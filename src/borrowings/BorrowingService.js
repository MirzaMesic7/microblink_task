import { addBorrowing, returnBorrowing } from "../api/api"

const maxBooksPerUser = 2
const borrowingPeriodInMonths = 1

export const borrow = (book, user) => {
    const borrowItem = {}

    borrowItem.book = book
    borrowItem.user = user
    borrowItem.when = new Date()
    
    const expires = new Date()
    expires.setMonth(expires.getMonth() + borrowingPeriodInMonths)
    
    borrowItem.expires = expires

    return addBorrowing(borrowItem)
}

export const returnBook = borrowingItem => {
    if (borrowingItem.expires < new Date()) {
        alert("Late return! 100kn fee should be charged.")
    }
    return returnBorrowing(borrowingItem)
}

export const canUserBorrow = user => user.borrowed ? user.borrowed < maxBooksPerUser : true

export const canBorrowBook = book => !book.borrowed