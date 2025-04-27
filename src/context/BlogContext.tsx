import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { BlogState, BlogAction, BlogPost } from '../types';
import { blogReducer } from '../reducers/blogReducer';
import { sampleBlogPosts } from '../data/sampleData';

const initialState: BlogState = {
  posts: [],
  categories: ['Technology', 'Travel', 'Food', 'Health', 'Business'],
  isLoading: false,
  error: null,
};

const BlogContext = createContext<{
  state: BlogState;
  dispatch: React.Dispatch<BlogAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Load sample data on initial render
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'SET_POSTS', payload: sampleBlogPosts });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  }, []);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};