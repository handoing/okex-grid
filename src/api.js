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
		const [ err, data = {} ] = await to(this.authClient.spot().postOrder(params));

		if (data.order_id && data.order_id !== -1) {
			this.log(`报警：币种为：${instrument}。\n买单价为：${price}。买单量为：${size}。\nclient_oid：${data.client_oid}。\norder_id：${data.order_id}。\nerror_message：${data.error_message}`)
			return data.order_id
		}
		
		this.log(`报警：币种为：${instrument}，买单失败。\nclient_oid：${data.client_oid}。\norder_id：${data.order_id}。\nerror_code：${data.error_code}。\nerror_message：${data.error_message}`);
	}
	async sell_limit_msg (instrument /* 币对 */, size /* 购买量 */, price /* 价格 */) {
		const params = this._order(instrument, size, 'sell', price);
		const [ err, data = {} ] = await to(this.authClient.spot().postOrder(params));

		if (data.order_id && data.order_id !== -1) {
			this.log(`报警：币种为：${instrument}。\n卖单价为：${price}。\n卖单量为：${size}。\nclient_oid：${data.client_oid}。\norder_id：${data.order_id}。\nerror_code：${data.error_code}。\nerror_message：${data.error_message}`)
			return data.order_id
		}
		
		this.log(`报警：币种为：${instrument}，卖单失败。\nclient_oid：${data.client_oid}。\norder_id：${data.order_id}。\nerror_code：${data.error_code}。\nerror_message：${data.error_message}`);
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