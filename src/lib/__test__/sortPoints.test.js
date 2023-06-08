// Import the sortPoints function
const sortPoints = require('../sortPoints');

// Write unit tests for sortPoints
describe('sortPoints handles valid cases', () => {
  test('sortPoints correctly handles valid standard input ([{6, 6}, {10, 5}, {362, 2}] --> [{10, 5}, {6, 6}, {362, 2}])', () => {
    const points = [{x: 10, y: 5}, {x: 362, y: 2}, {x: 6, y: 6}];
    const sortedPoints = sortPoints(points);
    expect(sortedPoints).toEqual([{x:6, y: 6}, {x: 10, y: 5}, {x: 362, y: 2}]);
  });

  test('sortPoints Correctly sorts values with misleading Ys ([{3, 4}, {7, 1}, {1, 2}] --> [{1, 2}, {3, 4}, {7, 1}])', () => {
    const points = [{x: 3, y: 4}, {x: 7, y: 1}, {x: 1, y: 2}];
    const sortedPoints = sortPoints(points, 'desc');
    expect(sortedPoints).toEqual([{x: 1, y: 2}, {x: 3, y: 4}, {x: 7, y: 1}]);
  });

  test('sortPoints correctly handles empty input array ([] --> [])', () =>{
    const points = [];
    const sortedPoints = sortPoints(points);
    expect(sortedPoints).toEqual(points);
  });

  test('sortPoints correctly handles negative values ([{-2, 22}, {-14, 6}, {4, 58}, {0, 1}] --> [{-14, 6}, {-2, 22}, {0, 1}, {4, 58}])', () =>{
    const points = [{x: -2, y: 22}, {x: -14, y: 6}, {x: 4, y: 58}, {x: 0, y: 1}];
    const sortedPoints = sortPoints(points);
    expect(sortedPoints).toEqual([{x: -14, y: 6}, {x: -2, y: 22}, {x: 0, y: 1}, {x: 4, y: 58}]);
  });

});

