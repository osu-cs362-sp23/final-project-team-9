/*
@jest-environment jsdom
*/

// const chartStorage = require("../chartStorage.js")

const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData,
    } = require('../chartStorage.js');
  
    describe('Chart Storage', () => {
        beforeEach(() => {
        window.localStorage.clear();
        });
    
    describe('saveChart', () => {
        test('should save a new chart to localStorage', () => {
            const chart = { title: 'Chart 1', data: [{"x": 1, "y": 2}, {"x": 3, "y": 4}, {"x": 5, "y": 6}] };
    
            saveChart(chart);
    
            const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
            expect(savedCharts).toHaveLength(1);
            expect(savedCharts[0]).toEqual(chart);
        });
  
        test('should overwrite an existing chart in localStorage', () => {
            const chart1 = { title: 'Chart 1', data: [{"x": 1, "y": 2}, {"x": 3, "y": 4}, {"x": 5, "y": 6}]};
            const chart2 = { title: 'Chart 2', data: [{"x": 7, "y": 8}, {"x": 9, "y": 10}, {"x": 11, "y": 12}]  };
            window.localStorage.setItem('savedCharts', JSON.stringify([chart1]));
            saveChart(chart2, 0);
    
            const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
            expect(savedCharts).toHaveLength(1);
            expect(savedCharts[0]).toEqual(chart2);
        });
    });
  
    describe('loadAllSavedCharts', () => {
        test('should load all saved charts from localStorage', () => {
            const chart1 = { title: 'Chart 1', data: [{"x": 1, "y": 2}, {"x": 3, "y": 4}, {"x": 5, "y": 6}] };
            const chart2 = { title: 'Chart 2', data: [{"x": 7, "y": 8}, {"x": 9, "y": 10}, {"x": 11, "y": 12}] };
            window.localStorage.setItem('savedCharts', JSON.stringify([chart1, chart2]));
    
            const loadedCharts = loadAllSavedCharts();
    
            expect(loadedCharts).toHaveLength(2);
            expect(loadedCharts[0]).toEqual(chart1);
            expect(loadedCharts[1]).toEqual(chart2);
        });
  
        test('should return an empty array if no saved charts exist', () => {
            const loadedCharts = loadAllSavedCharts();
    
            expect(loadedCharts).toEqual([]);
        });
    });
  
    describe('loadSavedChart', () => {
        test('should load a specific saved chart from localStorage', () => {
            const chart = { title: 'Chart 1', data: [{"x": 1, "y": 2}, {"x": 3, "y": 4}, {"x": 5, "y": 6}] };
            window.localStorage.setItem('savedCharts', JSON.stringify([chart]));
    
            const loadedChart = loadSavedChart(0);
    
            expect(loadedChart).toEqual(chart);
        });
  
        test('should return an empty object if the saved chart does not exist', () => {
            const loadedChart = loadSavedChart(0);
    
            expect(loadedChart).toEqual({});
        });
    });
  
    describe('updateCurrentChartData', () => {
        test('should update the current chart data in localStorage', () => {
            const currentChartData = { title: 'Chart 1', data: [{"x": 1, "y": 2}, {"x": 3, "y": 4}, {"x": 5, "y": 6}] };
    
            updateCurrentChartData(currentChartData);
    
            const storedData = JSON.parse(window.localStorage.getItem('currentChartData'));
            expect(storedData).toEqual(currentChartData);
        });
    });
  
    describe('loadCurrentChartData', () => {
        test('should load the current chart data from localStorage', () => {
        const currentChartData = { title: 'Chart 1', data: [{"x": 1, "y": 2}, {"x": 3, "y": 4}, {"x": 5, "y": 6}] };
        window.localStorage.setItem('currentChartData', JSON.stringify(currentChartData));
    
        const loadedChartData = loadCurrentChartData();
    
        expect(loadedChartData).toEqual(currentChartData);
        });
    
        test('should return an empty object if no current chart data exists', () => {
        const loadedChartData = loadCurrentChartData();
    
        expect(loadedChartData).toEqual({});
        });
    });
});
  