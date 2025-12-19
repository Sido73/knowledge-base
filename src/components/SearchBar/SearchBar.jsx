import { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { FaSearch, FaTimes } from 'react-icons/fa'

const SearchBar = ({ onSearch, placeholder = "Пошук курсів..." }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <Form onSubmit={handleSubmit} className="search-bar-form mb-4">
      <InputGroup className="shadow-sm rounded">
        <InputGroup.Text className="bg-white border-end-0">
          <FaSearch className="text-muted" />
        </InputGroup.Text>
        
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Пошук курсів"
          className="border-start-0 border-end-0"
        />
        
        {query && (
          <Button 
            variant="outline-secondary" 
            onClick={handleClear}
            className="border-start-0"
            title="Очистити пошук"
          >
            <FaTimes />
          </Button>
        )}
        
        <Button 
          variant="primary" 
          type="submit"
          disabled={!query.trim()}
          className="px-4"
        >
          Пошук
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBar