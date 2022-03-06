const { User, Thought } = require("../models");

// const resolvers = {
//     Query: {
//       thoughts: async () => {
//         return Thought.find().sort({ createdAt: -1 });
//       }
//     }
//   };

const resolvers = {
  Query: {
    // finding thoughts with or without username (optional)
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // finding a single thought by Id
    thought: async (parent, { _id }) => {
        return Thought.findOne({_id});
    },

    // get all users 
    users: async () => {
        return User.find()
        .select('__v -password')
        .populate('friends')
        .populate('thoughts');
    },

    // get all users
    users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('friends')
          .populate('thoughts');
      },

      // get a user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('friends')
          .populate('thoughts');
      },

  },
};


// place this inside of the `Query` nested object right after `thoughts` 

module.exports = resolvers;
