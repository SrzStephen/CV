import 'bootstrap/dist/css/bootstrap.css';
import { navigate } from 'gatsby';
import * as React from 'react';
import './../assets/fontawesome/css/all.css';
import { JSX } from 'react';
import { SEO } from "../components/Seo"

export default (): JSX.Element => {
  if (typeof window !== 'undefined') {
    let locale = 'en';
    navigate(`/${locale}/`);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="fas fa-5x fa-spinner fa-spin" style={{ color: 'Red', margin: 'auto 0' }} />
    </div>
  );
};
export const Head = () => (
  <SEO />
)