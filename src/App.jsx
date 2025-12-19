import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import CoursePage from './pages/CoursePage'
import FavoritesPage from './pages/FavoritesPage'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      
      <main className="min-vh-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CatalogPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
      
      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="mb-3">KnowledgeBase</h5>
              <p className="mb-2">Освітня платформа для сучасного навчання</p>
              <p className="mb-0 text-white-50">
                Ваша цифрова база знань для ефективного навчання
              </p>
            </div>
            
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="mb-3">Навігація</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/" className="text-white-50 text-decoration-none">
                    Головна
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/courses" className="text-white-50 text-decoration-none">
                    Каталог курсів
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/favorites" className="text-white-50 text-decoration-none">
                    Обрані курси
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-white-50 text-decoration-none">
                    Про нас
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-md-4">
              <h5 className="mb-3">Контакти</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="text-white-50">Email:</span>
                  <a href="mailto:info@knowledgebase.ua" className="text-white text-decoration-none ms-2">
                    info@knowledgebase.ua
                  </a>
                </li>
                <li className="mb-2">
                  <span className="text-white-50">Телефон:</span>
                  <a href="tel:+380000000000" className="text-white text-decoration-none ms-2">
                    +380 00 000 0000
                  </a>
                </li>
                <li>
                  <span className="text-white-50">Адреса:</span>
                  <span className="text-white-50 ms-2">м. Запоріжжя, Україна</span>
                </li>
              </ul>
            </div>
          </div>
          
          <hr className="bg-light my-4" />
          
          <div className="text-center">
            <p className="mb-0 text-white-50">
              © {new Date().getFullYear()} KnowledgeBase. Всі права захищені.
            </p>
          </div>
        </Container>
      </footer>
    </Router>
  )
}

export default App