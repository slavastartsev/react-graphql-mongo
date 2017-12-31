export default `
  
  type Project {
    _id: String!
    name: String!
    owner: Employee!
  }
  
  type Query {
    allProjects: [Project!]!
  }
  
  type Mutation {
    createProject(name: String!, owner: String!): Project!
  }
  
`;
