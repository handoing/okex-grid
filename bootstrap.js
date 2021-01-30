const { resolve } = require('path');
const OkexGrid = require('./src');

const okexGrid = new OkexGrid({
	user: resolve(__dirname, 'user.json'),
	config: resolve(__dirname, 'config.json')
});

okexGrid.run();