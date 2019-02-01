import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Test = () => {
  return (
    <Layout>
      <Seo title="Test page" description="A Test page" />
      <div className="section">
        <div className="container">
          <h2 className="title">Test page</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Test;
