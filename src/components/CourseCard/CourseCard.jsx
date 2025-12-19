import { Card, Button, Badge } from 'react-bootstrap'
import { FaStar, FaUserGraduate, FaClock, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const CourseCard = ({ course }) => {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  // Перевірка чи курс в обраних
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(favorites.includes(course.id))
  }, [course.id])

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== course.id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    } else {
      favorites.push(course.id)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    
    setIsFavorite(!isFavorite)
    window.dispatchEvent(new Event('storage'))
  }

  const handleDetailsClick = () => {
    navigate(`/course/${course.id}`)
  }

  return (
    <Card className="h-100 shadow-sm card-hover position-relative">
      {/* Кнопка "У обране" */}
      <Button 
        variant={isFavorite ? "danger" : "outline-secondary"}
        className="position-absolute favorite-btn"
        style={{ top: '10px', right: '10px', zIndex: 1, width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}
        onClick={handleFavoriteClick}
        title={isFavorite ? "Видалити з обраних" : "Додати в обране"}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </Button>
      
      <Card.Img 
        variant="top" 
        src={course.image} 
        alt={course.title}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg="primary">{course.category}</Badge>
          <Badge bg={course.level === 'Початковий' ? 'success' : 'warning'}>
            {course.level}
          </Badge>
        </div>
        
        <Card.Title className="mb-2" style={{ fontSize: '1.1rem' }}>
          {course.title}
        </Card.Title>
        
        <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {course.description.substring(0, 80)}...
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
              <FaStar className="text-warning me-1" />
              <span className="fw-bold">{course.rating}</span>
              <span className="text-muted ms-1" style={{ fontSize: '0.8rem' }}>
                ({course.students})
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FaClock className="me-1 text-muted" style={{ fontSize: '0.9rem' }} />
              <small style={{ fontSize: '0.8rem' }}>{course.duration}</small>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <FaUserGraduate className="me-1 text-muted" style={{ fontSize: '0.9rem' }} />
              <small style={{ fontSize: '0.8rem' }}>{course.instructor}</small>
            </div>
            <span className="fw-bold text-primary">{course.price} грн</span>
          </div>
          
          <Button 
            variant="primary" 
            className="w-100"
            onClick={handleDetailsClick}
            size="sm"
          >
            Детальніше
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CourseCard