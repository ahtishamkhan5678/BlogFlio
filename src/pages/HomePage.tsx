import React from 'react';
import { useBlog } from '../context/BlogContext';
import Layout from '../components/layout/Layout';
import BlogList from '../components/blog/BlogList';

const HomePage: React.FC = () => {
  const { state } = useBlog();
  const { posts, categories, isLoading } = state;

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to BlogFolio</h1>
          <p className="text-xl text-slate-600">
            Discover stories, ideas, and expertise from our writers on various topics.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <BlogList posts={posts} categories={categories} />
        )}
      </div>
    </Layout>
  );
};

export default HomePage;