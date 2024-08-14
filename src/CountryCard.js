import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CountryCard = ({ country, onClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={country.flags.png} alt={country.name.official} />
      <Card.Body>
        <Card.Title>{country.name.official}</Card.Title>
        <Button variant="info" onClick={onClick}>
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CountryCard;
