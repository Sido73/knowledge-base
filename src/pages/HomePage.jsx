import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { FaRocket, FaUsers, FaCertificate } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard/CourseCard'
import { courses } from '../data/courses'

const HomePage = () => {
  const featuredCourses = courses.slice(0, 4) // Перші 4 курси

  return (
    <div>
      {/* Герой секція */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-5 fw-bold mb-4">
                Навчайтесь онлайн з KnowledgeBase
              </h1>
              <p className="lead mb-4">
                Ваша цифрова база знань для ефективного навчання
              </p>
              <Button variant="light" size="lg" className="fw-bold me-3">
                Почати навчання
              </Button>
              <Button as={Link} to="/courses" variant="outline-light" size="lg">
                Переглянути курси
              </Button>
            </Col>
            <Col md={6} className="text-center d-none d-md-block">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" 
                alt="Навчання" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Переваги */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Чому обирають нас?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <FaRocket size={50} className="text-primary mb-3" />
                <Card.Title>Сучасні технології</Card.Title>
                <Card.Text>
                  Актуальні знання та практичні навички
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <FaUsers size={50} className="text-primary mb-3" />
                <Card.Title>Досвідчені викладачі</Card.Title>
                <Card.Text>
                  Практики з реальним досвідом роботи
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <FaCertificate size={50} className="text-primary mb-3" />
                <Card.Title>Сертифікати</Card.Title>
                <Card.Text>
                  Офіційні документи про завершення
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Популярні курси */}
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Популярні курси</h2>
          <Button as={Link} to="/courses" variant="outline-primary">
            Всі курси
          </Button>
        </div>
        
        <Row>
          {featuredCourses.map(course => (
            <Col key={course.id} lg={3} md={6} className="mb-4">
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default HomePage