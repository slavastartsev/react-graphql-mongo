export default {
  Query: {
    allProjects: async (parent, args, { Project }, info) => {
      const projects = await Project.find();
      return projects.map((project) => {
        project._id = project._id.toString();
        return project;
      });
    },
  },
  Mutation: {
    createProject: async (parent, args, { Project, Employee }, info) => {
      const project = await new Project(args).save();
      project._id = project._id.toString();
      const { owner, _id } = project
      await Employee.findByIdAndUpdate(owner, { $push: { projects: _id } });
      return project;
    },
  },
  Project: {
    owner: async ({ owner }, args, { Employee }, info) => await Employee.findOne({ _id: owner }),
  },
};
