import React from 'react';
import { useApi } from '../../utils/useApi';
import './Blog.css';

export const Blog = () => {
  const { posts, loading, error } = useApi({
    endpoint: '/latest-post',
    searchType: 'Blog',
  });

  // Si está cargando
  if (loading) return <p>Cargando post...</p>;

  // Si hay error
  if (error) return <p>Hubo un error al cargar el post. Por favor, inténtalo de nuevo.</p>;

  // Verifica si 'posts' es un objeto o un array
  if (!posts) {
    return <p>No se encontró ningún post.</p>;
  }

  // Si 'posts' es un array
  if (Array.isArray(posts)) {
    // Si es un array, usamos .map() para recorrerlo
    return (
      <section className='sectionTheBlog'>
        {posts.length === 0 ? (
          <p>No se encontraron posts.</p>
        ) : (
          posts.map((post) => (
            <div className='divTheBlog' key={post._id}>
              <h2 className='postTitle'>{post.title}</h2>
              <div className='divTheImageBlog'>
                <img className='postImage' src={post.img} alt={post.title} />
              </div>
              <p className='postContent'>{post.content}</p>
            </div>
          ))
        )}
      </section>
    );
  }

  // Si 'posts' es un objeto (caso de un único post)
  return (
    <section className='sectionTheBlog'>
      <div className='divTheBlog' key={posts._id}>
        <h2 className='postTitle'>{posts.title}</h2>
        <div className='divTheImageBlog'>
          <img className='postImage' src={posts.img} alt={posts.title} />
        </div>
        <p className='postContent'>{posts.content}</p>
      </div>
    </section>
  );
};
