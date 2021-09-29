import React from 'react';

const List = (props) => {
  const { busRoutes } = props;
  if (!busRoutes || busRoutes.length === 0) return <p>No busRoutes, sorry</p>;
  return (
    <ul>
      <h2 className='list-head'>Available Public busRoutesitories</h2>
      {busRoutes.map((busRoute) => {
        return (
          <li key={busRoute.agency_id} className='list'>
            <span className='busRoute-text'>{busRoute.route_id} </span>
            <span className='busRoute-description'>{busRoute.route_label}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default List;

