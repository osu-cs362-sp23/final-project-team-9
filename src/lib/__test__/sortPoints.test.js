// Import the sortPoints function
const sortPoints = require('./src/lib/sortPoints');

// Write unit tests for sortPoints
describe('sortPoints', () => {
  test('should sort an array of points in ascending order', () => {
    const points = [5, 2, 8, 1, 9];
    const sortedPoints = sortPoints(points);
    expect(sortedPoints).toEqual([1, 2, 5, 8, 9]);
  });

  test('should sort an array of points in descending order', () => {
    const points = [5, 2, 8, 1, 9];
    const sortedPoints = sortPoints(points, 'desc');
    expect(sortedPoints).toEqual([9, 8, 5, 2, 1]);
  });

  // Add more test cases to cover different scenarios
});
