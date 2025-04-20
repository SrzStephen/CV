const sites = ['/en/work', '/en/projects','recruiter'];

describe('Included links', () => {
  it('check all links don\'t 404', () => {
      for (const p of sites) {
        cy.visit(p);
        cy.get('a').each(page => {
          // I have other a links on the page, only show http(s)
          if (page.prop('href').startsWith('http')) {
            // Two websites seem to be inconsistent with their 404 pages, so we'll just skip them for now.'
            if (!page.contents().text().includes('Xiaoying Riley') && !page.prop('href').includes('bhp.com'))
            {
              cy.request(page.prop('href')).should('have.property', 'status', 200);
            }
          }
        });
      }
    }
  );
});