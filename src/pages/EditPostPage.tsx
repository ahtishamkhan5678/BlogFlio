import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import Layout from '../components/layout/Layout';
import PostForm from '../components/blog/PostForm';
import { Link } from '../components/navigation/Link';
import { BlogPost } from '../types';

const EditPostPage: React.FC = () => {
  const { state } = useBlog();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  
  // Get post ID from URL
  const postId = window.location.pathname.split('/').pop();
  
  useEffect(() => {
    if (postId) {
      const foundPost = state.posts.find(p => p.id === postId);
      setPost(foundPost);
    }
  }, [postId, state.posts]);
  
  const handleSubmitSuccess = () => {
    // Navigate back to post detail page
    window.history.pushState({}, '', `/post/${postId}`);
    window.dispatchEvent(new CustomEvent('navigate', { detail: `/post/${postId}` }));
  };
  
  if (!post) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Post not found</h2>
          <Link to="/">
            <button className="text-blue-600 hover:text-blue-800">Back to Home</button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to={`/post/${post.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to post
        </Link>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Edit Post</h1>
        
        <PostForm 
          initialValues={post}
          onSubmitSuccess={handleSubmitSuccess} 
        />
      </div>
    </Layout>
  );
};

export default EditPostPage;