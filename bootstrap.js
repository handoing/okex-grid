const { resolve } = require('path');
const axios = require('axios');
const OkexGrid = require('./src');

function sendDD(content) {
  // 钉钉机器人hook
	const url = 'https://oapi.dingtalk.com/robot/send?access_token=d2c4f05b48ca1fa74d4b6b1d8d9f647644de2f129658719003e695affdc84c09';
	axios.post(url, {
		msgtype: "text",
		text: { content }
	})
}

const okexGrid = new OkexGrid({
	user: resolve(__dirname, 'user.json'),
	config: resolve(__dirname, 'config.json'),
	log: sendDD
});

okexGrid.run();