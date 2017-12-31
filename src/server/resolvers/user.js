import bcrypt from 'bcrypt';

export default {
  Query: {
    allUsers: (parent, args, { User }, info) => User.find(),
    getUser: (parent, { _id }, { User }, info) => User.findOne({ _id }),
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { User }, info) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await new User({ ...otherArgs, password: hashedPassword }).save();
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
