export default `

  type Employee {
    _id: String!
    name: String!
    projects: [Project!]!
  }
  
  type Query {
    allEmployees: [Employee!]!
  }
  
  type Mutation {
    createEmployee(name: String!): Employee!
  }
  
`;
