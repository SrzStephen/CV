const sites = ['/en/work', '/en/projects'];

describe('Included links', () => {
  it('check all links don\'t 404', () => {
      for (const p of sites) {
        cy.visit(p);
        cy.get('a').each(page => {
          if (page.prop('href').startsWith('http')) {
            // Cypress is being weird when I try to use href instead
            // 3rdwavemedia keeps 500ing which results in a broken build for me
            // would prefer to keep attribution footer as is, so skip any links that has Xiaoyings name on them
            // BHP also seems to from githubs IP range.
            if (!page.contents().text().includes('Xiaoying Riley') || !page.prop('href').includes('bhp.com')) {
              cy.request(page.prop('href')).should('have.property', 'status', 200);
            }
          }
        });
      }
    }
  );
});