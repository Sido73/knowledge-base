import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Alert, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaHeart, FaBook, FaMoneyBillWave, FaStar, FaRegHeart } from 'react-icons/fa'
import CourseCard from '../components/CourseCard/CourseCard'
import { courses } from '../data/courses'

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [favoriteCourses, setFavoriteCourses] = useState([])

  useEffect(() => {
    const loadFavorites = () => {
      const ids = JSON.parse(localStorage.getItem('favorites')) || []
      setFavoriteIds(ids)
      const favCourses = courses.filter(course => ids.includes(course.id))
      setFavoriteCourses(favCourses)
    }
    
    loadFavorites()
    window.addEventListener('storage', loadFavorites)
    return () => window.removeEventListener('storage', loadFavorites)
  }, [])

  const handleClearFavorites = () => {
    if (window.confirm('Видалити всі обрані курси?')) {
      localStorage.removeItem('favorites')
      setFavoriteIds([])
      setFavoriteCourses([])
      window.dispatchEvent(new Event('storage'))
    }
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">
          <FaHeart className="text-danger me-3" />
          Обрані курси
        </h1>
        <p className="lead text-muted">Курси, які ви зберегли для майбутнього вивчення</p>
      </div>
      
      {favoriteCourses.length > 0 && (
        <div className="mb-5 p-4 bg-light rounded-3">
          <Row className="text-center">
            <Col md={4} className="mb-3 mb-md-0">
              <Card className="border-0 bg-transparent">
                <Card.Body>
                  <FaBook size={30} className="text-primary mb-2" />
                  <h3 className="text-primary">{favoriteCourses.length}</h3>
                  <p className="mb-0">Курсів в обраних</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <Card className="border-0 bg-transparent">
                <Card.Body>
                  <FaMoneyBillWave size={30} className="text-success mb-2" />
                  <h3 className="text-success">
                    {favoriteCourses.reduce((sum, course) => sum + course.price, 0)} грн
                  </h3>
                  <p className="mb-0">Загальна вартість</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 bg-transparent">
                <Card.Body>
                  <FaStar size={30} className="text-warning mb-2" />
                  <h3 className="text-warning">
                    {(favoriteCourses.reduce((sum, course) => sum + course.rating, 0) / favoriteCourses.length).toFixed(1)}
                  </h3>
                  <p className="mb-0">Середній рейтинг</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Мої обрані ({favoriteCourses.length})</h3>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" as={Link} to="/courses">
            Знайти ще курси
          </Button>
          {favoriteCourses.length > 0 && (
            <Button variant="outline-danger" onClick={handleClearFavorites}>
              Очистити все
            </Button>
          )}
        </div>
      </div>
      
      {favoriteCourses.length > 0 ? (
        <Row>
          {favoriteCourses.map(course => (
            <Col key={course.id} lg={4} md={6} className="mb-4">
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <FaRegHeart size={80} className="text-muted mb-4 opacity-50" />
          <h4 className="mb-3">У вас поки що немає обраних курсів</h4>
          <p className="text-muted mb-4">
            Додавайте курси в обране, натискаючи на ♥ в картках курсів
          </p>
          <Button variant="primary" size="lg" as={Link} to="/courses" className="px-4">
            Перейти до каталогу
          </Button>
        </div>
      )}
      
      {favoriteCourses.length > 0 && (
        <Alert variant="info" className="mt-5">
          <Alert.Heading>Порада</Alert.Heading>
          <p className="mb-2">
            Обрані курси зберігаються у вашому браузері. 
            Щоб не втратити їх, не очищуйте дані сайту.
          </p>
          <p className="mb-0">
            Плануйте навчання: почніть з 1-2 курсів одночасно.
          </p>
        </Alert>
      )}
    </Container>
  )
}

export default FavoritesPage