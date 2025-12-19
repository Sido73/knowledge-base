import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Badge, ListGroup, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaStar, FaClock, FaUserGraduate, FaBook, FaCheckCircle } from 'react-icons/fa'
import { courses } from '../data/courses'

const CoursePage = () => {
  const { id } = useParams()
  const courseId = parseInt(id)
  const course = courses.find(c => c.id === courseId) || courses[0]

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Button as={Link} to="/courses" variant="outline-primary" size="sm">
          ← Назад до каталогу
        </Button>
      </div>
      
      <Row className="g-4">
        <Col lg={8}>
          <Badge bg="primary" className="mb-3">{course.category}</Badge>
          <Badge bg="secondary" className="ms-2 mb-3">{course.level}</Badge>
          
          <h1 className="mb-3">{course.title}</h1>
          <p className="lead">{course.description}</p>
          
          <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
            <div className="d-flex align-items-center">
              <FaStar className="text-warning me-2" size={20} />
              <span className="fw-bold me-1">{course.rating}</span>
              <span className="text-muted">({course.students} учнів)</span>
            </div>
            <div className="d-flex align-items-center">
              <FaClock className="me-2" />
              <span>{course.duration}</span>
            </div>
            <div className="d-flex align-items-center">
              <FaUserGraduate className="me-2" />
              <span>{course.instructor}</span>
            </div>
            <div className="d-flex align-items-center">
              <FaBook className="me-2" />
              <span>{course.lessons} уроків</span>
            </div>
          </div>
          
          <h4 className="mb-3">Що ви навчитесь:</h4>
          <ListGroup className="mb-4">
            {course.features.map((feature, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <FaCheckCircle className="text-success me-3" />
                {feature}
              </ListGroup.Item>
            ))}
          </ListGroup>
          
          <h4 className="mb-3">Про курс:</h4>
          <p>
            Цей курс призначений для {course.level.toLowerCase()} рівня та включає {course.lessons} уроків.
            Мова викладання: <strong>{course.language}</strong>. Після завершення курсу ви отримаєте сертифікат.
          </p>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3 className="text-primary display-6 fw-bold">{course.price} грн</h3>
                <p className="text-muted mb-0">Одноразовий платіж</p>
              </div>
              
              <Button variant="primary" size="lg" className="w-100 mb-3 py-3 fw-bold">
                Придбати курс
              </Button>
              
              <Button variant="outline-primary" size="lg" className="w-100 mb-4">
                Додати в обране
              </Button>
              
              <hr className="my-4" />
              
              <h5 className="mb-3">Цей курс включає:</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <FaCheckCircle className="text-success me-2" />
                  Доступ назавжди
                </li>
                <li className="mb-2">
                  <FaCheckCircle className="text-success me-2" />
                  Сертифікат про завершення
                </li>
                <li className="mb-2">
                  <FaCheckCircle className="text-success me-2" />
                  Практичні завдання
                </li>
                <li className="mb-2">
                  <FaCheckCircle className="text-success me-2" />
                  Підтримка викладача
                </li>
                <li>
                  <FaCheckCircle className="text-success me-2" />
                  Доступ з будь-якого пристрою
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CoursePage