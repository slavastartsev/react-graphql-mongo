import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Home = ({ data: { allEmployees } }) => (
  allEmployees
    ? allEmployees.map(({ name, project, _id }) => (
      <h1 key={_id}>{name} is working on {project.name}</h1>
    ))
    : <p>No employees found</p>
);

const allEmployees = gql`
  {
    allEmployees {
      _id
      name
      project {
        name
      }
    }
  }
`;

export default graphql(allEmployees)(Home);
