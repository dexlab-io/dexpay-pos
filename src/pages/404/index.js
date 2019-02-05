import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';

const Error404 = () => {
  return (
    <Layout>
      <Seo title="POS" description="POS System" />
      <div className="section">
        <div className="container">
          <h2 className="title">404</h2>
          <p>The page you are looking for, could not be found.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Error404;
