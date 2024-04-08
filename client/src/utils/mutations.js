import { gql } from '@apollo/client'

//logs user in
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token 
        user {
            _id
            username
        }
    }
}`;

//adds new user
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token 
        user {
            _id
            username
        }
    }
}`;

//saves book
export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
        token 
        user {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
}`;

//removes book
export const REMOVE_BOOK = gql`
mutation removeBook($bookData: String!) {
    removeBook(bookId: $bookId) {
        token 
        user {
            _id
            username
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
}`;
