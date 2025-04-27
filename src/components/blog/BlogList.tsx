import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BlogPost } from '../../types';
import BlogCard from './BlogCard';
import Select from '../ui/Select';
import Input from '../ui/Input';

interface BlogListProps {
  posts: BlogPost[];
  categories: string[];
}

const BlogList: React.FC<BlogListProps> = ({ posts, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(category => ({ value: category, label: category })),
  ];

  // Filter posts based on category and search term
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchTerm
      ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Filter by Category"
          />
        </div>
        <div className="md:w-2/3">
          <div className="relative">
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              label="Search"
              className="pl-10"
            />
            <Search className="absolute left-3 top-[38px] h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-slate-700">No posts found</h3>
          <p className="text-slate-500 mt-2">Try changing your search criteria or check back later.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;