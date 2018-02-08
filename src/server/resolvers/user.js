import bcrypt from 'bcrypt';

import { tryLogin } from '../auth';

export default {
  Query: {
    allUsers: async (parent, args, { User }, info) => {
      const users = await User.find();
      return users.map((user) => {
        user._id = user._id.toString();
        return user;
      });
    },
    getUser: async (parent, { _id }, { User }, info) => await User.findOne({ _id }),
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { User }, info) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await new User({ ...otherArgs, password: hashedPassword }).save();
        
        return {
          ok: true,
          user,
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    login: async (parent, { email, password }, { User, SECRET, SECRET2 }) =>
      tryLogin(email, password, User, SECRET, SECRET2)
  },
};
