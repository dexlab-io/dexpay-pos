import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';

const Error404 = () => {
  return (
    <Layout>
      <Seo title="POS" description="POS System" />
      <h2 className="title">404</h2>
    </Layout>
  );
};

export default Error404;
