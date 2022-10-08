import {Props} from '../../src/components/Project';

const work = "../../src/data/work/en.json"
const projects = "../../src/data/projects/en.json"

interface JsonDoc {
    projects: Props[];
}

function checkdata(url: string, path: string, contains: boolean) {
    cy.visit(url)
    cy.fixture(path).then((data: JsonDoc) => {
        for (const p of data.projects) {
            if (contains) {

                cy.get('[id=ProjectContainer]').should('include.text', p.title)
            } else {
                cy.get('[id=ProjectContainer]').should('not.include.text', p.title)

            }
        }
    })
}


describe("Button related checks", () => {
    it("Check Work", () => {
        checkdata("/", work, true)
        checkdata("/en/work", work, true)
        checkdata("/en/projects", work, false)
    })
    it("Check Projects", () => {
        checkdata("/", projects, false)
        checkdata("/en/work", projects, false)
        checkdata("/en/projects", projects, true)
    })
    it("Check Button", () => {
        for (const page of ["/", "/en/work"]) {
            cy.visit(page)
            cy.get('input').last().check({force: true}).url().should('contain', 'projects')
        }
        cy.visit("/en/work")
        cy.get('input').first().check({force: true}).url().should('contain', 'work')
    })

})