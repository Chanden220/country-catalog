import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryCard from './CountryCard';
import CountryModal from './CountryModal';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const rowsPerPage = 25;

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      });
  }, []);

  const fuse = new Fuse(countries, {
    keys: ['name.official'],
    includeScore: true,
  });

  const fuzzySearch = query => {
    return fuse.search(query).map(result => result.item);
  };

  const filteredCountries = search ? fuzzySearch(search) : countries;

  const sortedCountries = filteredCountries.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.official.localeCompare(b.name.official);
    } else {
      return b.name.official.localeCompare(a.name.official);
    }
  });

  const paginatedCountries = sortedCountries.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearchChange = e => setSearch(e.target.value);
  const handleSortChange = order => setSortOrder(order);
  const handlePageChange = page => setCurrentPage(page);
  const handleShowModal = country => {
    setSelectedCountry(country);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <Form.Group className="mt-4">
        <Form.Control
          type="text"
          placeholder="Search by Country Name"
          value={search}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <Button style={{ margin: '1%' }} onClick={() => handleSortChange('asc')}>
        Sort Ascending
      </Button>
      <Button onClick={() => handleSortChange('desc')}>
        Sort Descending
      </Button>

      <Row>
        {paginatedCountries.map(country => (
          <Col key={country.cca2} md={4} className="mb-4">
            <CountryCard country={country} onClick={() => handleShowModal(country)} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center">
        {Array.from({ length: Math.ceil(filteredCountries.length / rowsPerPage) }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 ${i + 1 === currentPage ? 'active' : ''}`}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <CountryModal country={selectedCountry} show={showModal} onClose={handleCloseModal} />
    </Container>
  );
};

export default App;
