import React from 'react';
import { Link } from 'react-router-dom';
import { PageNotFoundContainer } from '../../styles/library';

const PageNotFound = () => {
  return (
      <>
      <PageNotFoundContainer>
          <Link className="goback__text" to="/" > ⬅ 🚀 Go Back</Link>
      </PageNotFoundContainer>
      </>
  );
};

export default PageNotFound;
