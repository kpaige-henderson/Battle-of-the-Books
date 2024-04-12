import { gql } from '@apollo/client';

export const getMe = gql`
    query me {
        me {
            _id
            username
            email
            bookcount
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;