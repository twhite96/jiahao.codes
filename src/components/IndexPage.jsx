import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Bio from './Bio';

const PostLink = styled(Link)`
  display: inline-block;
  width: 100%;
  background-image: none;
  border-bottom: 1px solid #eee;
  padding-left: 1rem;
  padding-right: 1rem;

  &:hover {
    background-color: #f8f8f7;
  }
`;

const PostTitle = styled.h3`
  margin-top: 1rem;
`;

const PostDate = styled.small`
  display: block;
  margin-bottom: 0.5rem;
  opacity: 0.8;
`;

export default function IndexPage({ posts }) {
  return (
    <div>
      <Bio />
      <div>
        {posts.map(({ title, path, date, excerpt }) => (
          <PostLink key={path} to={path}>
            <PostTitle>{title}</PostTitle>
            <PostDate>{date}</PostDate>
            <p dangerouslySetInnerHTML={{ __html: excerpt }} />
          </PostLink>
        ))}
      </div>
    </div>
  );
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};