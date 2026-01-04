// tslint:disable: jsx-no-lambda
import { graphql, navigate } from 'gatsby';
import * as React from 'react';
import { CertificationList } from './../components/CertificationList';
import { EducationList } from './../components/EducationList';
import { Header } from './../components/Header';
import { Project, Props as ProjectProps } from './../components/Project';
import { ResumeSkillList } from './../components/ResumeSkillList';
import { TabSelector } from './../components/TabSelector';
import { getTranslatedLabel, initLocale } from './../translations/provider';
import './CV.css';

const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
const Lines = require('./../assets/images/backgrounds/lines.png');

let scrollTo = 0;

interface Props {
  location: any;
  data: any;
  pageContext: any;
}

const scrollToY = () => {
  if (window && scrollTo !== 0) {
    window.scrollTo(0, scrollTo);
  }
};

const saveScrollPosition = () => {
  if (document) {
    scrollTo = document.documentElement.scrollTop;
  }
};

export default (props: Props) => {
  initLocale(props.pageContext.locale);

  const isWorkSelected = () => {
    return (
      (!props.location.pathname.includes('work') && !props.location.pathname.includes('proj')) ||
      props.location.pathname.includes('work')
    );
  };

  const projectIcon = (): string => {
    return isWorkSelected() ? 'fa fa-folder' : 'fa fa-folder-open';
  };

  const [selectedItem, setSelectedItem] = React.useState(isWorkSelected() ? 0 : 1);
  const [items, setItems] = React.useState([
    {
      name: getTranslatedLabel('WORK_XP'),
      path: 'work',
      checked: isWorkSelected(),
      icon: 'fas fa-briefcase',
    },
    {
      name: 'Projects',
      path: 'projects',
      checked: props.location.pathname.includes('proj'),
      icon: projectIcon(),
    },
  ]);

  React.useEffect(() => {
    scrollToY();
  }, [props.location.pathname]);

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
              website: props.data.social.nodes[0].frontmatter.social.website,
            }}
          />
          <div className="resume-body p-4" style={{ backgroundImage: `url(${Lines})`, overflow: 'hidden' }}>
            <section className="resume-section summary-section mb-5">
              <h2 className="resume-section-title text-uppercase fw-bold pb-3 mb-3">
                {getTranslatedLabel('CAREER_SUMMARY')}
              </h2>
              <div className="resume-section-content">{htmlToReactParser.parse(props.data.summary.html)}</div>
            </section>

            <div className="row">
              <div className="col-lg-9">
                <TabSelector
                  items={items}
                  onClick={(index) => {
                    saveScrollPosition();
                    setSelectedItem(index);
                    navigate(`/${props.pageContext.locale}/${items[index].path}`);
                  }}
                />
                <div className="mb-3" />
                {items[0].checked && (
                  <section className="resume-section experience-section mb-5">
                    <div className="resume-section-content">
                      <div className="resume-timeline position-relative">
                        {props.data.work.nodes[0].frontmatter.projects.map((project: ProjectProps, index: number) => (
                          <Project key={index} {...project} />
                        ))}
                      </div>
                    </div>
                  </section>
                )}
                {items[1].checked && (
                  <section className="resume-section experience-section mb-5">
                    <div className="resume-section-content">
                      <div className="resume-timeline position-relative">
                        {props.data.projects.nodes[0].frontmatter.projects.map(
                          (project: ProjectProps, index: number) => (
                            <Project key={index} {...project} />
                          )
                        )}
                      </div>
                    </div>
                    <div className="my-5 text-center">
                      <div>{getTranslatedLabel('MORE_PROJECTS')}</div>
                      <a
                        href="https://github.com/SrzStephen/?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-unstyled"
                      >
                        https://github.com/SrzStephen/?tab=repositories
                      </a>
                    </div>
                  </section>
                )}
              </div>
              <div className="col-lg-3" style={{ marginTop: '40px' }}>
                <section className="resume-section skills-section mb-5">
                  <h2 className="resume-section-title text-uppercase fw-bold pb-3 mb-3">
                    {getTranslatedLabel('SKILLS')}
                  </h2>
                  <div className="resume-section-content">
                    <ResumeSkillList
                      skills={props.data.skills.nodes[0].frontmatter.languages}
                      title={'Programming Languages'}
                    />
                    <ResumeSkillList
                      skills={props.data.skills.nodes[0].frontmatter.tools}
                      title={'Tools and Platforms'}
                    />
                  </div>
                </section>
                <section className="resume-section education-section mb-5">
                  <h2 className="resume-section-title text-uppercase fw-bold pb-3 mb-3">
                    {getTranslatedLabel('EDUCATION')}
                  </h2>
                  <div className="resume-section-content">
                    <EducationList educations={props.data.educations.nodes[0].frontmatter.educations} />
                  </div>
                </section>
                <section className="resume-section reference-section mb-5">
                  <h2 className="resume-section-title text-uppercase fw-bold pb-3 mb-3">
                    {getTranslatedLabel('CERTIFICATIONS')}
                  </h2>
                  <div className="resume-section-content">
                    <CertificationList certifications={props.data.certs.nodes[0].frontmatter.certs} />
                  </div>
                </section>
              </div>
            </div>
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
  query ($locale: String!) {
    summary: markdownRemark(frontmatter: { locale: { eq: $locale }, name: { eq: "summary" } }) {
      html
      frontmatter {
        locale
        name
      }
    }
    certs: allMdx(filter: { frontmatter: { kind: { eq: "certs" }, locale: { eq: $locale } } }) {
      nodes {
        frontmatter {
          certs {
            title
            validity
            cert_id
            cert_url
            sort_date
            show
            end_date
          }
        }
      }
    }
    projects: allMdx(filter: { frontmatter: { kind: { eq: "projects" }, locale: { eq: $locale } } }) {
      nodes {
        frontmatter {
          projects {
            title
            company
            description
            from
            role
            url
            to
            technologies
            achievements
            location
          }
        }
      }
    }
    work: allMdx(filter: { frontmatter: { kind: { eq: "work" }, locale: { eq: $locale } } }) {
      nodes {
        frontmatter {
          projects {
            title
            company
            description
            from
            role
            to
            technologies
            achievements
            location
          }
        }
      }
    }
    skills: allMdx(filter: { frontmatter: { kind: { eq: "skills" } } }) {
      nodes {
        frontmatter {
          languages {
            name
          }
          tools {
            name
          }
        }
      }
    }
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
          }
        }
      }
    }
    educations: allMdx(filter: { frontmatter: { kind: { eq: "educations" }, locale: { eq: $locale } } }) {
      nodes {
        frontmatter {
          educations {
            from
            title
            to
            uni
          }
        }
      }
    }
  }
`;
