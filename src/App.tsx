import React from 'react';
import { BlogProvider } from './context/BlogContext';
import { Router } from './components/navigation/Router';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

// Define routes
const routes = [
  { path: '/', component: HomePage, exact: true },
  { path: '/post/', component: PostDetailPage },
  { path: '/create-post', component: CreatePostPage, exact: true },
  { path: '/edit-post/', component: EditPostPage },
];

function App() {
  return (
    <BlogProvider>
      <Router routes={routes} />
    </BlogProvider>
  );
}

export default App;