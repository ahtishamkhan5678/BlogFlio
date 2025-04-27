import React from 'react';
import { Clock } from 'lucide-react';
import { BlogPost } from '../../types';
import { formatDate, truncateText } from '../../utils/helpers';
import Card, { CardContent } from '../ui/Card';
import { Link } from '../navigation/Link';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="block transition-transform hover:-translate-y-1 focus:outline-none">
      <Card className="h-full">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 bg-white text-xs font-medium uppercase tracking-wider text-slate-700 px-3 py-1 rounded-tr-md">
            {post.category}
          </div>
        </div>
        <CardContent>
          <h3 className="text-xl font-semibold text-slate-800 mb-2 line-clamp-2 hover:text-blue-600">
            {post.title}
          </h3>
          <p className="text-slate-600 mb-4 line-clamp-3">
            {truncateText(post.excerpt, 120)}
          </p>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{post.author}</span>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;