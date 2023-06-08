// Import the sortPoints function
const sortPoints = require('../sortPoints');

// Write unit tests for sortPoints
describe('sortPoints', () => {
  test('sortPoints1', () => {
    const points = [{x: 10, y: 5}, {x: 6, y: 6}]
    const sortedPoints = sortPoints(points)
    expect(sortedPoints).toEqual([{x: 6, y: 6},{x: 10, y: 5}])
  });

  test('should sort an array of points in descending order', () => {
    const points = [{x: 1, y: 2}, {x: 3, y: 4}]
    const sortedPoints = sortPoints(points, 'desc');
    expect(sortedPoints).toEqual([{x: 1, y: 2}, {x: 3, y: 4}]);
  });

  // Add more test cases to cover different scenarios
});
