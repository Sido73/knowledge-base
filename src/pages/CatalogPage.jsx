import { useState, useMemo } from 'react'
import { Container, Row, Col, Button, Badge } from 'react-bootstrap'
import SearchBar from '../components/SearchBar/SearchBar'
import CourseCard from '../components/CourseCard/CourseCard'
import { courses, categories } from '../data/courses'

const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Всі')
  const [searchQuery, setSearchQuery] = useState('')

  // Функція для обробки пошуку
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Фільтрація курсів
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesCategory = selectedCategory === 'Всі' || course.category === selectedCategory
      const matchesSearch = searchQuery === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">📚 Каталог курсів</h1>
        <p className="lead text-muted">Знайдіть ідеальний курс для вашого розвитку</p>
      </div>
      
      {/* Пошукова панель */}
      <div className="mb-5">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Введіть назву курсу, тему чи викладача..."
        />
      </div>
      
      {/* Фільтри категорій */}
      <div className="mb-5">
        <h5 className="mb-3">Категорії:</h5>
        <div className="d-flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "outline-primary"}
              onClick={() => {
                setSelectedCategory(category)
                setSearchQuery('') // Очистити пошук при зміні категорії
              }}
              className="rounded-pill"
              size="sm"
            >
              {category}
              {category !== 'Всі' && (
                <Badge bg="light" text="dark" className="ms-2">
                  {courses.filter(c => c.category === category).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Результати пошуку */}
      <div className="mb-4">
        <h4>
          {searchQuery ? (
            <>Результати пошуку для "<strong>{searchQuery}</strong>"</>
          ) : selectedCategory === 'Всі' ? (
            <>Всі курси <Badge bg="secondary">{filteredCourses.length}</Badge></>
          ) : (
            <>{selectedCategory} <Badge bg="secondary">{filteredCourses.length}</Badge></>
          )}
        </h4>
      </div>
      
      {/* Список курсів */}
      <Row>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <Col key={course.id} lg={4} md={6} className="mb-4">
              <CourseCard course={course} />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <div className="empty-state">
              <h4 className="mb-3">😔 Курси не знайдені</h4>
              <p className="text-muted mb-4">
                {searchQuery 
                  ? `За запитом "${searchQuery}" нічого не знайдено`
                  : `У категорії "${selectedCategory}" ще немає курсів`
                }
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <Button 
                  variant="outline-primary" 
                  onClick={() => {
                    setSelectedCategory('Всі')
                    setSearchQuery('')
                  }}
                >
                  Показати всі курси
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setSearchQuery('')}
                  disabled={!searchQuery}
                >
                  Очистити пошук
                </Button>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default CatalogPage