import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PostForm from '../components/blog/PostForm';
import { Link } from '../components/navigation/Link';

const CreatePostPage: React.FC = () => {
  const handleSubmitSuccess = () => {
    // Navigate to home page
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new CustomEvent('navigate', { detail: '/' }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Create New Post</h1>
        
        <PostForm onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </Layout>
  );
};

export default CreatePostPage;