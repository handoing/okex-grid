const { PublicClient } = require('@okfe/okex-node');
const { AuthenticatedClient } = require('@okfe/okex-node');
const { uid } = require('uid');
const { to } = require('./utils');

class OkexApi {
	constructor ({
		apiKey,
		secretKey,
		passphrase,
		apiUri = 'https://www.okex.com',
		timeout = 10000,
		log = function(text) { console.log(text) }
	}) {
		this.pClient = new PublicClient(apiUri, timeout);
		this.authClient = new AuthenticatedClient(apiKey, secretKey, passphrase, apiUri, timeout);
		this.log = log;
	}
	async get_ticker_price (instrument) {
		const [ err, data = {} ] = await to(this.pClient.spot().getSpotTicker(instrument));
		return data.last;
	}
	async buy_limit_msg (instrument /* 币对 */, size /* 购买量 */, price /* 价格 */) {
		const params = this._order(instrument, size, 'buy', price);
		// const [ err, data = {} ] = await to(this.authClient.spot().postOrder(params));
		const data = {
			"client_oid":"oktspot79",
			"error_message": "",
			"error_code": "0",
			"order_id":"2510789768709120",
			"result":true
		};

		if (data.order_id) {
			this.log(`报警：币种为：${instrument}。买单价为：${price}。买单量为：${size}`)
			return data.order_id
		}
		
		this.log(`报警：币种为：${instrument}，买单失败。`);
	}
	async sell_limit_msg (instrument /* 币对 */, size /* 购买量 */, price /* 价格 */) {
		const params = this._order(instrument, size, 'sell', price);
		// const [ err, data = {} ] = await to(this.authClient.spot().postOrder(params));
		const data = {
			"client_oid":"oktspot79",
			"error_message": "",
			"error_code": "0",
			"order_id":"2510789768709120",
			"result":true
		};

		if (data.order_id) {
			this.log(`报警：币种为：${instrument}。卖单价为：${price}。卖单量为：${size}`)
			return data.order_id
		}
		
		this.log(`报警：币种为：${instrument}，卖单失败。`);
	}
	_order (instrument, size, side, price) {
		return {
			instrument_id: instrument,
			client_oid: `a${uid()}`,
			type: 'limit',
			side,
			size,
			price: this._format(price)
		}
	}
	_format (price) {
		return price.toFixed(8)
	}
}

module.exports = OkexApi;