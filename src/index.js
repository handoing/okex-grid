const { sleep } = require('sleep');
const Trader = require('./trader');
const OkexApi = require('./api');

const breakTime = 30;

class OkexGrid {
	constructor({ user, config, log }) {
		this.trader = new Trader({ user, config });

		this.api = new OkexApi({
			apiKey: this.trader.get('apiKey'),
			secretKey: this.trader.get('secretKey'),
			passphrase: this.trader.get('passphrase'),
			apiUri: this.trader.get('apiUri'),
			timeout: this.trader.get('timeout'),
			log
		})
	}
	async run() {
		const cointype = this.trader.get_cointype();
		let cur_market_price, grid_buy_price, grid_sell_price, quantity, step;
		
		while (true) {
			sleep(2);
			cur_market_price = await this.api.get_ticker_price(cointype);
			grid_buy_price = this.trader.get_buy_price();
			grid_sell_price = this.trader.get_sell_price();
			quantity = this.trader.get_quantity();
			step = this.trader.get_step();

			if (!cur_market_price) {
				console.log(`获取当前市价失败`);
				continue;
			}

			if (grid_buy_price >= cur_market_price) {
				const order_id = await this.api.buy_limit_msg(cointype, quantity, grid_buy_price);
				if (order_id) {
					this.trader.modify_price(grid_buy_price, step + 1);
					sleep(breakTime);
				} else {
					continue;
				}
			} else if (grid_sell_price < cur_market_price) {
				if (step === 0) {
					this.trader.modify_price(grid_sell_price, step);
				} else {
					const order_id = await this.api.sell_limit_msg(cointype, this.trader.get_quantity(false), grid_sell_price);
					if (order_id) {
						this.trader.modify_price(grid_sell_price, step - 1);
						sleep(breakTime);
					} else {
						continue;
					}
				}
			} else {
				console.log(`当前市价：${cur_market_price}。未能满足交易，继续运行`);
			}

		}
	}
}

module.exports = OkexGrid;