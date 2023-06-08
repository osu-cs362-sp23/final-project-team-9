/**
 * @jest-environment jsdom
 */


require("@testing-library/jest-dom/extend-expect")
require("whatwg-fetch")

const fs = require("fs")
const gen = require("../chartBuilder/chartBuilder");
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default
const { fireEvent} = require('@testing-library/dom');



//Src : https://github.com/jestjs/jest/issues/1224

//This gets rid of all data from run to run on the tests

beforeEach( () => {
	const rootElm = document.documentElement;

// Remove attributes on root element
	[...rootElm.attributes].forEach(attr => rootElm.removeAttribute(attr.name));

 // Remove all attributes

	jest.restoreAllMocks()
	jest.clearAllMocks()
});



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
	const addValuesButton = await domTesting.findByRole(document, "button", {name: "+" })
	let xInputElements = await domTesting.findAllByLabelText(document, "X")
	let yInputElements = await domTesting.findAllByLabelText(document, "Y")

	expect(xInputElements.length).toBe(1)
	expect(yInputElements.length).toBe(1)

	await user.click(addValuesButton)

  	xInputElements = await domTesting.findAllByLabelText(document, "X")
  	yInputElements = yInputElements = await domTesting.findAllByLabelText(document, "Y")


	expect(xInputElements.length).toBe(2)
	expect(yInputElements.length).toBe(2)
})


test("Clicking the add values button adds a new pair of input fields should not impact user inputs", async function(){

			initDomFromFiles(
			`${__dirname}/bar.html`,
			`${__dirname}/bar.js`
		)

	const user = userEvent.setup()

	const addValuesButton = await domTesting.findByRole(document, "button", {name: "+" })

	let xInputElements = await domTesting.findAllByLabelText(document, "X")
	let yInputElements = await domTesting.findAllByLabelText(document, "Y")

	const clearBtn = domTesting.getByRole(document, "button", {name: "Clear chart data"})




	await user.type(xInputElements[0], "69")
	await user.type(yInputElements[0], "420")
	expect(xInputElements.length).toBe(1)
	expect(yInputElements.length).toBe(1)

	//Adding new row of input fields
	await user.click(addValuesButton)

  xInputElements = await domTesting.findAllByLabelText(document, "X")
  yInputElements = await domTesting.findAllByLabelText(document, "Y")

  //New input rows have been added
	expect(xInputElements.length).toBe(2)
	expect(yInputElements.length).toBe(2)

	//New row being added should not affect old values
	expect(xInputElements[0].value).toBe("69")
	expect(yInputElements[0].value).toBe("420")


	await user.click(clearBtn)
})

test("Clicking the add values button four times should have 5 total input rows", async function(){

			initDomFromFiles(
			`${__dirname}/bar.html`,
			`${__dirname}/bar.js`
		)

	const user = userEvent.setup()

	const addValuesButton = await domTesting.findByRole(document, "button", {name: "+" })

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

	let xLabel = await domTesting.findByLabelText(document, "X label")
	const yLabel = await domTesting.findByLabelText(document, "Y label")

	const generateButton = domTesting.getByText(document, "Generate chart")

	const spyOn = jest.spyOn(window, 'alert').mockImplementation( () => {});
	const clearBtn = domTesting.getByRole(document, "button", {name: "Clear chart data"})


	await user.type(xLabel, "Pink")
	await user.type(yLabel, "Floyd")
	await user.click(generateButton)


	expect(spyOn).toHaveBeenCalledWith("Error: No data specified!");



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


	const generateButton = domTesting.getByRole(document, "button", {name: "Generate chart"})
	await user.type(yInput, "8")
	await user.type(xInput, "1")

	console.log(`Y value is ${yInput.value}`)
	console.log(`X value is ${xInput.value}`)


	await user.click(generateButton)


	expect(spyOn).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!")


})

test("Trying to generate a chart by supplying x data only, and supplying labels will not generate an error alert", async function(){



	initDomFromFiles(
		`${__dirname}/bar.html`,
		`${__dirname}/bar.js`
	)




	const user = userEvent.setup()

	const spyOn = jest.spyOn(window, 'alert').mockImplementation( () => {});

	let xInput = await domTesting.findAllByLabelText(document, "X");
	let yInput = await domTesting.findAllByLabelText(document, "Y")

	let xLabel = await domTesting.getByRole(document, "textbox", { name: "X label" });
	let yLabel = await domTesting.getByRole(document, "textbox", { name: "Y label" });
	const generateButton = domTesting.getByRole(document, "button", {name: "Generate chart"})


	await user.type(xLabel, "hello")
	await user.type(yLabel, "is there anybody out there?")



	await user.type(xInput[0], "1")
	await user.type(yInput[0], "2")


	await user.click(generateButton)


	expect(spyOn).not.toHaveBeenCalled()




})


test("Pressing the clear button will remove all user-supplied data", async function(){


	initDomFromFiles(
		`${__dirname}/bar.html`,
		`${__dirname}/bar.js`
	)


	const user = userEvent.setup()

	const defaultColor = "#ff4500"

	const colorSelector = await domTesting.findByLabelText(document, "Chart color")

	let xInput = await domTesting.findAllByLabelText(document, "X");
	let yInput = await domTesting.findAllByLabelText(document, "Y");

	let xLabel = await domTesting.findByRole(document, "textbox", { name: "X label" });
	let yLabel = await domTesting.findByRole(document, "textbox", { name: "Y label" });

	const generateButton = domTesting.getByRole(document, "button", {name: "Generate chart"})

	const chartTitle = await domTesting.findByLabelText(document, "Chart title")

	const clearButton = domTesting.getByRole(document, "button", {name: "Clear chart data"})


	await user.click(colorSelector)

	colorSelector.value = "#ff4599"

	fireEvent.change(colorSelector);

	//Making sure the value of color has changed
	expect(colorSelector.value).not.toBe(defaultColor)
	expect(colorSelector.value).toBe("#ff4599")




	while(xLabel.value.length > 0){
		await user.type(xLabel, '{backspace}')
	}

	while(yLabel.value.length > 0){
		await user.type(yLabel, '{backspace}')
	}

	await user.type(xLabel, "hello")
	await user.type(yLabel, "is there anybody out there?")

	await user.type(chartTitle, "Awesome chart")

	expect(xLabel.value).toBe("hello")
	expect(yLabel.value).toBe("is there anybody out there?")

	expect(chartTitle.value).toBe("Awesome chart")


	await user.type(xInput[0], "1")
	await user.type(yInput[0], "2")


	await user.click(generateButton)


	await user.click(clearButton)

	//Color should be the original color now

	expect(colorSelector.value).toBe(defaultColor)

	expect(xLabel.value).toBe("")
	expect(yLabel.value).toBe("")

	//Finding all x and y inputs again
	xInput = await domTesting.findAllByLabelText(document, "X");
	yInput = await domTesting.findAllByLabelText(document, "Y")

	for(let i = 0; i < xInput.length; i++){
		expect(xInput[i].value).toBe("")
		expect(yInput[i].value).toBe("")
	}

	expect(xInput.length).toBe(1)
	expect(yInput.length).toBe(1)

	expect(chartTitle.value).toBe("")

})

test("Pressing the clear button will remove all user-supplied data, even if the user has supplied multiple rows of data", async function(){




	initDomFromFiles(
		`${__dirname}/bar.html`,
		`${__dirname}/bar.js`
	)


	const user = userEvent.setup()

	const defaultColor = "#ff4500"

	const colorSelector = await domTesting.findByLabelText(document, "Chart color")


	let xInput;
	let yInput;

	const chartTitle = await domTesting.findByLabelText(document, "Chart title")


	let xLabel = await domTesting.findByRole(document, "textbox", { name: "X label" });
	let yLabel = await domTesting.findByRole(document, "textbox", { name: "Y label" });

	const generateButton = domTesting.getByRole(document, "button", {name: "Generate chart"})
	const clearButton = domTesting.getByRole(document, "button", {name: "Clear chart data"})
	const addValuesButton = document.getElementById("add-values-btn")




	await user.click(colorSelector)

	colorSelector.value = "#ff4599"

	await fireEvent.change(colorSelector);

	//Making sure the value of color has changed
	expect(colorSelector.value).not.toBe(defaultColor)
	expect(colorSelector.value).toBe("#ff4599")





	while(xLabel.value.length > 0){
		await user.type(xLabel, '{backspace}')
	}

	while(yLabel.value.length > 0){
		await user.type(yLabel, '{backspace}')
	}

	await user.type(xLabel, "hello")
	await user.type(yLabel, "is there anybody out there?")

	await user.type(chartTitle, "Awesome chart")

	expect(xLabel.value).toBe("hello")
	expect(yLabel.value).toBe("is there anybody out there?")

	expect(chartTitle.value).toBe("Awesome chart")


	for(let i = 0; i < 10; i++){
		await user.click(addValuesButton)
	}
	xInput = await domTesting.findAllByLabelText(document, "X");
	yInput = await domTesting.findAllByLabelText(document, "Y");

	expect(xInput.length).toBe(11)
	expect(yInput.length).toBe(11)

	for(let i = 0; i < 11; i++){
		await user.type(xInput[i], "420")
		await user.type(yInput[i], "69")

	}

	//Asserting values were properly typed before clearing

	for(let i = 0; i < 11; i++){
		expect(xInput[i].value).toBe("420")
		expect(yInput[i].value).toBe("69")
	}


	await user.click(generateButton)


	await user.click(clearButton)

	//Color should be the original color now

	expect(colorSelector.value).toBe(defaultColor)

	expect(xLabel.value).toBe("")
	expect(yLabel.value).toBe("")

	//Finding all x and y inputs again
	xInput = await domTesting.findAllByLabelText(document, "X");
	yInput = await domTesting.findAllByLabelText(document, "Y")

	for(let i = 0; i < xInput.length; i++){
		expect(xInput[i].value).toBe("")
		expect(yInput[i].value).toBe("")
	}

	expect(xInput.length).toBe(1)
	expect(yInput.length).toBe(1)

	expect(chartTitle.value).toBe("")

})

jest.mock("../lib/generateChartImg", function () {
	return jest.fn().mockResolvedValue("https://google.com/pigeon.png" );
});


test("Data is being correctly sent to generateImage", async function() {

	const generateChartImg = require("../lib/generateChartImg");

	initDomFromFiles(
		`${__dirname}/bar.html`,
		`${__dirname}/bar.js`
	)


	const user = userEvent.setup()


	let xInput = await domTesting.findAllByLabelText(document, "X");
	let yInput = await domTesting.findAllByLabelText(document, "Y");

	let xLabel = await domTesting.findByRole(document, "textbox", { name: "X label" });
	let yLabel = await domTesting.findByRole(document, "textbox", { name: "Y label" });
	const chartTitle = await domTesting.findByLabelText(document, "Chart title")

	const colorSelector = await domTesting.findByLabelText(document, "Chart color")

	const generateButton = await domTesting.findByRole(document, "button", {name: "Generate chart"})



	await user.type(xInput[0], "1")
	await user.type(yInput[0], "2")
	await user.type(xLabel, "go")
	await user.type(yLabel, "fish")
	await user.type(chartTitle, "Awesome chart")



	await user.click(colorSelector)

	colorSelector.value = "#ff9909"

	await fireEvent.change(colorSelector);




	await user.click(generateButton)





	expect(generateChartImg).toHaveBeenCalledWith("bar", [{"x": `${xInput[0].value}`, "y": `${yInput[0].value}`}],
		xLabel.value, yLabel.value, chartTitle.value, colorSelector.value)

})


