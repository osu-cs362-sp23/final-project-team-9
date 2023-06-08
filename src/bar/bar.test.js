/**
 * @jest-environment jsdom
 */


require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const { screen, fireEvent} = require('@testing-library/dom');

// const chartBuilder = require("../chartBuilder/chartBuilder.js")

const {getByTestId} = require('@testing-library/dom')

let currentChartData;


//Src : https://github.com/jestjs/jest/issues/1224
beforeEach(() => {
	const rootElm = document.documentElement;

// Remove attributes on root element
	[...rootElm.attributes].forEach(attr => rootElm.removeAttribute(attr.name));

	jest.restoreAllMocks()
	jest.clearAllMocks()
});


require("whatwg-fetch")

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
//
//
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

	xInput.value = ""
	yInput.value = ""
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

test("Trying to generate a chart without supplying any data or labels will generate an error alert", async function(){

			initDomFromFiles(
			`${__dirname}/bar.html`,
			`${__dirname}/bar.js`
		)

	const user = userEvent.setup()

	let xInputElements = await domTesting.findByLabelText(document, "X");
	let yInputElements = await domTesting.findByLabelText(document, "Y")
  	let  xLabel = domTesting.findByLabelText(document, "X label")
  	const yLabel = domTesting.findByLabelText(document, "Y label")

	const generateButton = domTesting.getByText(document, "Generate chart")


	window.alert = jest.fn();

	await user.click(generateButton)

	expect(window.alert).toHaveBeenCalledWith("Error: No data specified!")

})



test("Trying to generate a chart without supplying any data, but supplying labels will generate an error alert", async function(){

	initDomFromFiles(
		`${__dirname}/bar.html`,
		`${__dirname}/bar.js`
	)

	const user = userEvent.setup()

	let xInputElements = await domTesting.findByLabelText(document, "X");
	let yInputElements = await domTesting.findByLabelText(document, "Y")
	let xLabel = await domTesting.findByLabelText(document, "X label")
	const yLabel = await domTesting.findByLabelText(document, "Y label")

	const generateButton = domTesting.getByText(document, "Generate chart")
	const spyOn = jest.spyOn(window, 'alert').mockImplementation( () => {});


	await user.type(xLabel, "Pink")
	await user.type(yLabel, "Floyd")
	await user.click(generateButton)


	expect(spyOn).toHaveBeenCalledWith("Error: No data specified!");
	// spyOn.mockRestore();
	// jest.restoreAllMocks()

	const clearBtn = domTesting.getByRole(document, "button", {name: "Clear chart data"})

	await user.click(clearBtn)



})


test("Trying to generate a chart by supplying x and y data, but not supplying labels will generate an error alert", async function(){



	initDomFromFiles(
		`${__dirname}/bar.html`,
		`${__dirname}/bar.js`
	)




	const user = userEvent.setup()

	const spyOn = jest.spyOn(window, 'alert').mockImplementation( () => {});


let xInput = await domTesting.findByLabelText(document, "X");
let yInput = await domTesting.findByLabelText(document, "Y")



	let xLabel = await domTesting.getByRole(document, "textbox", { name: "X label" });
	let yLabel = await domTesting.getByRole(document, "textbox", { name: "Y label" });

	// xLabel.value = ""
	// yLabel.value = ""


	const generateButton = domTesting.getByRole(document, "button", {name: "Generate chart"})
	await user.type(yInput, "8")
	await user.type(xInput, "1")

	console.log(`Y value is ${yInput.value}`)
	console.log(`X value is ${xInput.value}`)


	await user.click(generateButton)




	// await user.type(xLabel, "hey")
	// await user.type(yLabel, "you")





	// //


	expect(spyOn).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!")



})



