import React from 'react';
import Loadable from 'react-loadable';

export default function withLoadable(loader, loading = <p>loading</p>) {
  return (
    Loadable({
      loader,
      loading,
    })
  );
}
