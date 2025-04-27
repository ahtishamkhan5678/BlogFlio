import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { formatDate } from '../utils/helpers';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import DeleteConfirmation from '../components/blog/DeleteConfirmation';
import ContentSection from '../components/blog/ContentSection';
import { Link } from '../components/navigation/Link';

const PostDetailPage: React.FC = () => {
  const { state, dispatch } = useBlog();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [post, setPost] = useState(null);
  
  // Get post ID from URL
  const postId = window.location.pathname.split('/').pop();
  
  useEffect(() => {
    if (postId) {
      const foundPost = state.posts.find(p => p.id === postId);
      setPost(foundPost);
    }
  }, [postId, state.posts]);
  
  const handleDelete = () => {
    if (post) {
      dispatch({ type: 'DELETE_POST', payload: post.id });
      setShowDeleteConfirmation(false);
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new CustomEvent('navigate', { detail: '/' }));
    }
  };
  
  if (!post) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Post not found</h2>
          <Link to="/">
            <Button variant="primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>
        
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-md">
              {post.category}
            </span>
            <div className="flex space-x-2">
              <Link to={`/edit-post/${post.id}`}>
                <Button variant="secondary" size="sm">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-slate-600 mb-6">
            <span className="font-medium mr-4">{post.author}</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
        
        <div className="mb-8 rounded-lg overflow-hidden aspect-video">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-xl font-medium text-slate-700 mb-6">
            {post.excerpt}
          </p>
          
          {post.sections?.map((section, index) => (
            <ContentSection key={index} section={section} />
          ))}
          
          {!post.sections && post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
      
      {showDeleteConfirmation && (
        <DeleteConfirmation
          title={post.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </Layout>
  );
};

export default PostDetailPage;