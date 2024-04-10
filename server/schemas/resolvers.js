const { User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, contect) => {
            if (context.user) {
                return await User.findOne({ _id: context.user_id })
            }
            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
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

        addUser: async (parent, args) => {
            const user = await Usercreate(args);
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBook: input } }
                );
            }
        },

        removeBook: async (parent, { bookId }, context) => {
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
