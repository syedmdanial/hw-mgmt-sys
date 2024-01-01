import React from 'react';
import { useHistory } from 'react-router-dom';

const Page404 = () => {
  const history = useHistory();
  return (
    <div className="Page404">
      <div className="page-content text-center">
        <h4 className="mt-2">Oops, We think you're lost</h4>
        <p>We can't find the page that you're looking for...</p>
        <button className="main-btn" onClick={() => history.goBack()}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default Page404;
