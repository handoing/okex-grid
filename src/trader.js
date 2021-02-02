const nconf = require('nconf');
const defaultConfig = require('./defaultConfig');

class Trader {
	constructor ({ user, config }) {
		nconf.file('user', user);
		nconf.file('config', config);
		nconf.defaults(defaultConfig);
	}
	get (key) {
		return nconf.get(key);
	}
	get_cointype () {
		return nconf.get('cointype');
	}
	get_buy_price () {
		return Number(nconf.get('next_buy_price'));
	}
	get_sell_price () {
		return Number(nconf.get('grid_sell_price'));
	}
	get_quantity (exchange_method = true) {
		let cur_step = exchange_method ? nconf.get('step') : nconf.get('step') - 1;
		let quantity_arr = nconf.get('quantity');
    let quantity;
		if (cur_step < quantity_arr.length) {
			quantity = quantity_arr[cur_step]
		} else {
			quantity = quantity_arr[quantity_arr.length - 1]
		}
		return quantity;
	}
	get_step () {
		return Number(nconf.get('step'));
	}
	modify_price (deal_price, step) {
		console.log('开始修改补仓价和网格价');
		nconf.set('next_buy_price', (deal_price * (1 - nconf.get('double_throw_ratio') / 100)).toFixed(2));
		nconf.set('grid_sell_price', (deal_price * (1 + nconf.get('profit_ratio') / 100)).toFixed(2));
		nconf.set('step', step);
		console.log(`修改后的补仓价格为：${nconf.get('next_buy_price')}。修改后的网格价格为：${nconf.get('grid_sell_price')}`);
	}
}

module.exports = Trader;