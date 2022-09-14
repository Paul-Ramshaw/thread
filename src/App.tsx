import './App.css';
import ArticleList from './components/ArticleList';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Message from './components/Message';
import Article from './components/Article';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route
            path="*"
            element={
              <Message message="Sorry... there's nothing to see here." />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
