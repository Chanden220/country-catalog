import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CountryModal = ({ country, show, onClose }) => {
  if (!country) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{country.name.official}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={country.flags.png} alt={country.name.official} className="img-fluid mb-3" />
        <p><strong>2-character Country Code:</strong> {country.cca2}</p>
        <p><strong>3-character Country Code:</strong> {country.cca3}</p>
        <p><strong>Native Country Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A'}</p>
        <p><strong>Alternative Country Name:</strong> {country.altSpellings.join(', ')}</p>
        <p><strong>Country Calling Codes:</strong> {country.idd.root}{country.idd.suffixes.join(', ')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CountryModal;
