const { User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, __, context) => {
            if (!context.user) {
                return User.findOne(context.user_id).populate('savedBooks');
            }
            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Wrong email or password');
            }

            const rightPassword = await user.isCorrectPassword(password);
            if (!rightPassword) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (_, { input }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBook: input } }
                );
            }
        },

        removeBook: async (_, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { bookId: bookId } } }
                );
            }

            throw new AuthenticationError('Log in to remove books from collection');
        },
    },
};

module.exports = resolvers;
