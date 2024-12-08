import React from 'react';
import { useApi } from '../../utils/useApi';
import StyledBlogPage from '../../StyledComponents/StyledBlogPage';
const { SectionTheBlog, PostImage, DivTheBlogContent, PostTitle, PostContent } = StyledBlogPage;

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
    <SectionTheBlog key={post._id}>
        <PostImage src={post.img} alt={post.title} />
        <DivTheBlogContent>
        <PostTitle>{post.title}</PostTitle> 
        <PostContent>{post.content}</PostContent>
      </DivTheBlogContent>
    </SectionTheBlog>
  );
};

