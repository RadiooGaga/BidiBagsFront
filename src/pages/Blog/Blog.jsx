import React from 'react';
import { useApi } from '../../utils/useApi';
import './Blog.css';

export const Blog = () => {
  const { post, loading, error } = useApi({
    endpoint: '/latest-post',
    searchType: 'Blog',
  });

  console.log(post, "DATOS DEL POST");

  if (loading) return <p>Cargando post...</p>;

  if (error) return <p>Hubo un error al cargar el post. Por favor, inténtalo de nuevo.</p>;

  if (!post) {
    return <p>No se encontró ningún post.</p>;
  }

  return (
    <section className='sectionTheBlog' key={post._id}>
        <img className='postImage' src={post.img} alt={post.title} />
        <div className='divTheBlogContent'>
        <h2 className='postTitle'>{post.title}</h2> 
        <p className='postContent'>{post.content}</p>
      </div>
    </section>
  );
};

/*
        <h2 className='postTitle'>{post.title}</h2> */