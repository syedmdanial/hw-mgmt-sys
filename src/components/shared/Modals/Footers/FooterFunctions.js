import React from 'react';
import HOC from '../../HOC';
import Loading from '../../Loading/Loading';

export const CloseAndActionFooter = (props) => (
  <HOC>
    <button
      type="button"
      className="btn inverse-btn ml-3"
      onClick={() => props.data.handleCloseModal()}
    >
      <span>Close</span>
    </button>
    <button
      type="submit"
      className="btn main-btn ml-3"
      onClick={(e) => props.data.handleActionButton(e)}
      disabled={props.data.isLoading}
    >
      {props.data.isLoading ? (
        <Loading />
      ) : (
        <span>{props.data.actionTitle}</span>
      )}
    </button>
  </HOC>
);

export const CloseOnlyFooter = (props) => (
  <button
    type="button"
    className="btn inverse-btn ml-3"
    onClick={() => props.data.handleCloseModal()}
  >
    <span>Close</span>
  </button>
);
