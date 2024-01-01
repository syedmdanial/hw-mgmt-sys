import React from 'react';
import ModalTitle from 'react-bootstrap/ModalTitle';

export const TitleOnlyHeader = (props) => (
  <ModalTitle>{props.data.title}</ModalTitle>
);

export const TitleAndCloseHeader = (props) => (
  <div className="TitleAndCloseHeader">
    <ModalTitle>{props.data.title}</ModalTitle>
    <i className="bx bx-x" onClick={() => props.data.handleCloseModal()} />
  </div>
);
