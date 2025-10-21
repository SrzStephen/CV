type ProjectLike = { title: string };

type PageData = {
  result: {
    data: {
      projects: {
        nodes: Array<{
          frontmatter: { projects: ProjectLike[] };
        }>;
      };
      work: {
        nodes: Array<{
          frontmatter: { projects: ProjectLike[] };
        }>;
      };
    };
  };
};

function loadTitlesFromPageData() {
  // Use Gatsby page-data for the English locale which already contains MDX frontmatter
  return cy.request<PageData>('/page-data/en/page-data.json').then((resp) => {
    const body = resp.body;
    const workTitles = body.result.data.work.nodes[0].frontmatter.projects.map((p) => p.title);
    const projectTitles = body.result.data.projects.nodes[0].frontmatter.projects.map((p) => p.title);
    return { workTitles, projectTitles } as const;
  });
}

function checkData(url: string, titles: string[], contains: boolean) {
  cy.visit(url);
  for (const title of titles) {
    if (contains) {
      cy.get('[id=ProjectContainer]').should('include.text', title);
    } else {
      cy.get('[id=ProjectContainer]').should('not.include.text', title);
    }
  }
}

describe('Button related checks', () => {
  it('Check Work', () => {
    loadTitlesFromPageData().then(({ workTitles }) => {
      checkData('/', workTitles, true);
      checkData('/en/work', workTitles, true);
      checkData('/en/projects', workTitles, false);
    });
  });

  it('Check Projects', () => {
    loadTitlesFromPageData().then(({ projectTitles }) => {
      checkData('/', projectTitles, false);
      checkData('/en/work', projectTitles, false);
      checkData('/en/projects', projectTitles, true);
    });
  });

  it('Check recruiter page', () => {
    cy.request('/recruiter').should('have.property', 'status', 200);
  });
});
