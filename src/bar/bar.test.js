/**
 * @jest-environment jsdom
 */
 

const { screen } = require('@testing-library/dom');

const chartBuilder = require("../chartBuilder/chartBuilder.js")

const {getByTestId} = require('@testing-library/dom')


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

test("Clicking the add values button adds a new pair of input fields", async function(){

			initDomFromFiles(
			`${__dirname}/bar.html`,
			`${__dirname}/bar.js`
		)

	const user = userEvent.setup()

	const addValuesButton = document.getElementById("add-values-btn")
	
	
	let xInputElements = document.querySelectorAll('.x-value');
	let yInputElements = document.querySelectorAll('.x-value');

	expect(xInputElements.length).toBe(1)
	expect(yInputElements.length).toBe(1)
	
	await user.click(addValuesButton)

  xInputElements = document.querySelectorAll('.x-value');
  yInputElements = document.querySelectorAll('.x-value');
  


	expect(xInputElements.length).toBe(2)
	expect(yInputElements.length).toBe(2)
})


test("Clicking the add values button adds a new pair of input fields should not impact user inputs", async function(){

			initDomFromFiles(
			`${__dirname}/bar.html`,
			`${__dirname}/bar.js`
		)

	const user = userEvent.setup()

	const addValuesButton = document.getElementById("add-values-btn")
	const xInput = document.getElementById("x-label-input")
	const yInput = document.getElementById("y-label-input")
	
	let xInputElements = document.querySelectorAll('.x-value');
	let yInputElements = document.querySelectorAll('.y-value');
	

	
	await user.type(xInput, "69")
	await user.type(yInput, "420")
	expect(xInputElements.length).toBe(1)
	expect(yInputElements.length).toBe(1)
	
	//Adding new row of input fields
	await user.click(addValuesButton)

  xInputElements = document.querySelectorAll('.x-value');
  yInputElements = document.querySelectorAll('.x-value');

  //New input rows have been added
	expect(xInputElements.length).toBe(2)
	expect(yInputElements.length).toBe(2)
	
	//New row being added should not affect old values
	expect(xInput.value).toBe("69")
	expect(yInput.value).toBe("420")
})

test("Clicking the add values button four times should have 5 total input rows", async function(){

			initDomFromFiles(
			`${__dirname}/bar.html`,
			`${__dirname}/bar.js`
		)

	const user = userEvent.setup()

	const addValuesButton = document.getElementById("add-values-btn")
	
	let xInputElements = await domTesting.findAllByLabelText(document, "X");
	let yInputElements = await domTesting.findAllByLabelText(document, "Y")

	expect(xInputElements).toHaveLength(1)
	expect(yInputElements).toHaveLength(1)

	for(let i = 0; i < 4; i++){
	  await user.click(addValuesButton)}

	xInputElements = await domTesting.findAllByLabelText(document, "X");
	yInputElements = await domTesting.findAllByLabelText(document, "Y")

	expect(xInputElements).toHaveLength(5)
	expect(yInputElements).toHaveLength(5)
})

// test("Trying to generate a charge without supplying an X value will fail", async function(){
//
// 			initDomFromFiles(
// 			`${__dirname}/bar.html`,
// 			`${__dirname}/bar.js`
// 		)
//
// 	const user = userEvent.setup()
//
// 	const addValuesButton = document.getElementById("add-values-btn")
//   const xInput = document.getElementsByClassName('x-label-input')[0];
//   const yInput = document.getElementsByClassName('y-value-input')[0];
//   const xLabel = document.getElementsByClassName('x-label')
//   const yLabel = document.getElementsByClassName('y-label')
// 	const generateButton = getByTestId(document, 'generate-chart-btn');
//
// 	let xInputElements = document.querySelectorAll('.x-value');
// 	let yInputElements = document.querySelectorAll('.y-value');
//
// 	const fuckyou = domTesting.getByLabelText(document, 'X ')
//
// 	await user.type(fuckyou, "1234")
//
//
//
//
//
//
// })

