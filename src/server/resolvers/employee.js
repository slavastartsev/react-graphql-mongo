export default {
  Query: {
    allEmployees: async (parent, args, { Employee }, info) => {
      const employees = await Employee.find();
      return employees.map((employee) => {
        employee._id = employee._id.toString();
        return employee;
      });
    },
  },
  Mutation: {
    createEmployee: async (parent, args, context, info) => {
      const employee = await new context.Employee(args).save();
      employee._id = employee._id.toString();
      return employee;
    },
  },
  Employee: {
    projects: async ({ projects }, args, { Project }, info) => (
      await Project.find({ _id: { $in: projects } })
    ),
  },
};
