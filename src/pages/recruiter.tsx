import 'bootstrap/dist/css/bootstrap.css';
import { graphql } from 'gatsby';
import * as React from 'react';
import './../assets/fontawesome/css/all.css';

const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
const Lines = require('./../assets/images/backgrounds/lines.png');
import './../templates/CV.css';
import { getTranslatedLabel, initLocale } from '../translations/provider';
import { Header } from '../components/Header';

interface Props {
  location: any;
  data: any;
  pageContext: any;
}

export default (props: Props) => {
  return (
    <div className="container" style={{ userSelect: 'none' }}>
      <article className="resume-wrapper text-center position-relative">
        <div className="resume-wrapper-inner mx-auto text-start bg-white shadow-lg">
          <Header
            role={props.data.social.nodes[0].frontmatter.role}
            name={props.data.social.nodes[0].frontmatter.name}
            phone={props.data.social.nodes[0].frontmatter.phone}
            email={props.data.social.nodes[0].frontmatter.email}
            location={props.data.social.nodes[0].frontmatter.location}
            socialMedia={{
              github: props.data.social.nodes[0].frontmatter.social.github,
              website: props.data.social.nodes[0].frontmatter.social.website
            }}
          />
          <div className="resume-body p-4" style={{ backgroundImage: `url(${Lines})`, overflow: 'hidden' }}>
            <section className="resume-section summary-section mb-5">
              <h2 className="resume-section-title fw-bold pb-3 mb-3"></h2>
              <div className="resume-position-title-no-link mb-1">
                <p>
                  Hi! Thanks for reaching out.
                  <br />
                  Please excuse the generic response; I find that I get a lot of messages from recruiters trying to fill
                  roles. Please be sure to provide me with the following information.
                </p>
                <ul className="resume-awards-list" style={{ marginLeft: '17px' }}>
                  <li>Industry of your client (e.g. mining, health, education)</li>
                  <li>Technologies that form the clients core tech stack (e.g. Python, Java, Flask, React)</li>
                  <li>Nature of the position (contract or permanent)</li>
                  <li>Length of contract if applicable</li>
                  <li>Job title</li>
                  <li>Location requirements (e.g. full-time WFH, in-office, hybrid)</li>
                  <li>
                    Salary/contract rate range inclusive of superannuation.{' '}
                    <b>Please note that "Negotiable" is not a range</b>.
                  </li>
                </ul>
                Please note: I won't call you for a "quick chat" if you have failed to provide the above information.
                <h2 className="resume-section-title fw-bold pb-3 mb-3"></h2>
                My CV is publicly available at{' '}
                <a
                  className="resume-award-name link-unstyled"
                  href={props.data.social.nodes[0].frontmatter.social.cv}
                >
                  {props.data.social.nodes[0].frontmatter.social.cv.slice(8)}
                </a>
              </div>
            </section>
          </div>
        </div>
      </article>
      <footer className="footer text-center pt-2">
        <small className="copyright">
          Designed with <i className="fas fa-heart" /> by{' '}
          <a href="https://themes.3rdwavemedia.com" target="_blank">
            Xiaoying Riley
          </a>{' '}
          for developers
        </small>
      </footer>
      <footer className="footer text-center pt-2 pb-5">
        <small className="source-code">
          <i className="fab fa-github" />{' '}
          <a
            href="https://github.com/SrzStephen/CV"
            className="link-unstyled"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getTranslatedLabel('SOURCEONGITHUB')}
          </a>
        </small>
      </footer>
    </div>
  );
};

export const query = graphql`
    query {
        social: allMdx(filter: { frontmatter: { kind: { eq: "social" } } }) {
            nodes {
                frontmatter {
                    email
                    name
                    phone
                    role
                    location
                    social {
                        github
                        website
                        cv
                    }
                }
            }
        }
    }
`;
