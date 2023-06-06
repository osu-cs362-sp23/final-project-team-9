/**
 * @jest-environment jsdom
 */

const fs = require("fs")
function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

test("Sanity check", async function()
	{
		expect(2).toBe(2)
	}
)
