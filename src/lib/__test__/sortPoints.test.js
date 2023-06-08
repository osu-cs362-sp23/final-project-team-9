// Import the sortPoints function
const sortPoints = require('../sortPoints');

// Write unit tests for sortPoints
describe('sortPoints handles valid cases', () => {
  // We will put a bunch of valid cases in here
  test('sortPoints returns [{x: 6, y:6}, {x: 10, y: 5}, {x: 362, y: 2}] on input of [{x: 10, y: 5}, {x: 362, y: 2}, {x: 6, y: 6}]', () =>{
    const points = [{x: 10, y: 5}, {x: 362, y: 2}, {x: 6, y: 6}];
    const sortedPoints = sortPoints(points);
    expect(sortedPoints).toEqual([{x:6, y: 6}, {x: 10, y: 5}, {x: 362, y: 2}]);
  });

  test('sortPoints returns [{x: 1, y: 2}, {x: 3, y: 4}, {x: 7, y: 1}] on input of [{x: 3, y: 4}, {x: 7, y: 1}, {x: 1, y: 2}]', () => {
    const points = [{x: 3, y: 4}, {x: 7, y: 1}, {x: 1, y: 2}];
    const sortedPoints = sortPoints(points, 'desc');
    expect(sortedPoints).toEqual([{x: 1, y: 2}, {x: 3, y: 4}, {x: 7, y: 1}]);
  });

  test('sortPoints returns [] on input of []', () =>{
    const points = [];
    const sortedPoints = sortPoints(points);
    expect(sortedPoints).toEqual(points);
  });
});

