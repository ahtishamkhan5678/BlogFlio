import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';
import { generateId } from '../../utils/helpers';
import { BlogPost, BlogPostInput, ContentSection } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Card, { CardContent, CardFooter } from '../ui/Card';

interface PostFormProps {
  initialValues?: BlogPost;
  onSubmitSuccess?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialValues, onSubmitSuccess }) => {
  const { state, dispatch } = useBlog();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<BlogPostInput>({
    title: initialValues?.title || '',
    content: initialValues?.content || '',
    excerpt: initialValues?.excerpt || '',
    author: initialValues?.author || 'John Doe',
    category: initialValues?.category || state.categories[0],
    imageUrl: initialValues?.imageUrl || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sections: initialValues?.sections || []
  });
  
  const categoryOptions = state.categories.map(category => ({ 
    value: category, 
    label: category 
  }));

  const sectionTypeOptions = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'quote', label: 'Quote' },
    { value: 'highlight', label: 'Highlight' }
  ];

  const styleOptions = [
    { value: 'default', label: 'Default' },
    { value: 'elegant', label: 'Elegant' },
    { value: 'modern', label: 'Modern' },
    { value: 'minimal', label: 'Minimal' }
  ];

  const layoutOptions = [
    { value: 'full', label: 'Full Width' },
    { value: 'left', label: 'Left Aligned' },
    { value: 'right', label: 'Right Aligned' },
    { value: 'center', label: 'Centered' }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        type: 'text',
        content: '',
        style: 'default',
        layout: 'full'
      }]
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (initialValues) {
      const updatedPost: BlogPost = {
        ...formData,
        id: initialValues.id,
        date: initialValues.date,
      };
      
      dispatch({ type: 'UPDATE_POST', payload: updatedPost });
    } else {
      const newPost: BlogPost = {
        ...formData,
        id: generateId(),
        date: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_POST', payload: newPost });
    }
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            error={errors.title}
          />
          
          <TextArea
            label="Excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="A brief summary of your post"
            rows={3}
            error={errors.excerpt}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name"
              error={errors.author}
            />
            
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
            />
          </div>
          
          <Input
            label="Featured Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            error={errors.imageUrl}
          />
          
          {formData.imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-slate-500 mb-2">Featured Image Preview:</p>
              <img 
                src={formData.imageUrl}
                alt="Preview"
                className="h-40 object-cover rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=Image+Not+Found';
                }}
              />
            </div>
          )}

          <div className="border-t border-slate-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Content Sections</h3>
              <Button type="button" onClick={addSection} variant="secondary" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Section
              </Button>
            </div>

            {formData.sections.map((section, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-slate-700">Section {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Select
                    label="Type"
                    value={section.type}
                    onChange={(e) => handleSectionChange(index, 'type', e.target.value)}
                    options={sectionTypeOptions}
                  />
                  
                  <Select
                    label="Style"
                    value={section.style || 'default'}
                    onChange={(e) => handleSectionChange(index, 'style', e.target.value)}
                    options={styleOptions}
                  />
                </div>

                {section.type === 'image' && (
                  <>
                    <Input
                      label="Image URL"
                      value={section.imageUrl || ''}
                      onChange={(e) => handleSectionChange(index, 'imageUrl', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="mb-4"
                    />
                    <Select
                      label="Layout"
                      value={section.layout || 'full'}
                      onChange={(e) => handleSectionChange(index, 'layout', e.target.value)}
                      options={layoutOptions}
                    />
                  </>
                )}

                <TextArea
                  label={section.type === 'image' ? 'Caption' : 'Content'}
                  value={section.content}
                  onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                  placeholder={section.type === 'image' ? 'Image caption' : 'Section content'}
                  rows={section.type === 'image' ? 2 : 4}
                />
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initialValues ? 'Update Post' : 'Create Post'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PostForm;