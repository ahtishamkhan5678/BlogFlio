import { BlogPost } from '../types';

export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development in 2025.',
    content: 'Web development continues to evolve at a rapid pace. From WebAssembly to Edge Computing, developers have more tools than ever to create fast, responsive, and feature-rich applications. This post explores the most significant trends that will shape the future of web development in the coming years.',
    author: 'Jane Cooper',
    category: 'Technology',
    date: new Date(2025, 2, 10).toISOString(),
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sections: [
      {
        type: 'text',
        content: 'Web development continues to evolve at a rapid pace. From WebAssembly to Edge Computing, developers have more tools than ever to create fast, responsive, and feature-rich applications.',
        style: 'modern'
      },
      {
        type: 'image',
        content: 'Edge Computing Infrastructure',
        imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        layout: 'right'
      },
      {
        type: 'text',
        content: 'Edge computing brings computation and data storage closer to the location where it is needed, improving response times and saving bandwidth.',
        style: 'elegant'
      },
      {
        type: 'quote',
        content: 'The future of web development lies in creating seamless, performant experiences that feel native to any device.'
      },
      {
        type: 'image',
        content: 'Modern Development Tools',
        imageUrl: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        layout: 'full'
      },
      {
        type: 'highlight',
        content: 'WebAssembly is revolutionizing what\'s possible in the browser, enabling high-performance applications that were previously only possible in native environments.'
      }
    ]
  },
  {
    id: '2',
    title: 'Sustainable Travel: Exploring Without Harming',
    excerpt: 'How to enjoy traveling the world while minimizing your environmental impact.',
    content: 'As tourism continues to grow globally, so does its environmental impact. This post discusses practical ways to explore the world while reducing your carbon footprint, supporting local communities, and preserving natural habitats.',
    author: 'Alex Morgan',
    category: 'Travel',
    date: new Date(2025, 2, 8).toISOString(),
    imageUrl: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Plant-Based Diet: A Comprehensive Guide',
    excerpt: 'Everything you need to know about transitioning to and maintaining a healthy plant-based diet.',
    content: 'Plant-based diets have gained immense popularity for their health and environmental benefits. This comprehensive guide covers everything from nutrition basics to meal planning, addressing common concerns about protein intake and offering practical tips for a successful transition.',
    author: 'Sam Wilson',
    category: 'Health',
    date: new Date(2025, 2, 5).toISOString(),
    imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'AI in Business: Practical Applications',
    excerpt: 'How businesses of all sizes can leverage artificial intelligence to improve operations and drive growth.',
    content: 'Artificial intelligence is no longer just for tech giants. This post explores practical applications of AI for businesses of all sizes, from customer service chatbots to predictive analytics and process automation. Learn how these technologies can improve efficiency, reduce costs, and create new opportunities.',
    author: 'Taylor Reed',
    category: 'Business',
    date: new Date(2025, 2, 1).toISOString(),
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];