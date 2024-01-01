import React from 'react';
import Card from 'react-bootstrap/Card';

const WrapperCard = (props) => (
  <Card>
    {props.header.exist && (
      <Card.Header>
        <i className={props.header.data.iconName} />
        <h4>{props.header.data.title}</h4>
      </Card.Header>
    )}
    {props.children}
  </Card>
);

export default WrapperCard;
