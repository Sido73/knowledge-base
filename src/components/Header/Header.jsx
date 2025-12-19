import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaHeart } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const Header = () => {
  const [favoritesCount, setFavoritesCount] = useState(0)

  // Підрахунок обраних курсів
  useEffect(() => {
    const updateFavoritesCount = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      setFavoritesCount(favorites.length)
    }
    
    updateFavoritesCount()
    
    // Оновлювати при змінах в LocalStorage
    window.addEventListener('storage', updateFavoritesCount)
    
    return () => {
      window.removeEventListener('storage', updateFavoritesCount)
    }
  }, [])

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaGraduationCap className="me-2" size={30} />
          <span className="fw-bold">KnowledgeBase</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Головна</Nav.Link>
            <Nav.Link as={Link} to="/courses">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="position-relative">
              <FaHeart className="me-1" />
              Обрані
              {favoritesCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.6rem', minWidth: '18px' }}
                >
                  {favoritesCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Button variant="outline-light" className="me-2">
              Вхід
            </Button>
            <Button variant="primary">
              Реєстрація
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header