# okex-grid

[binance-quantization](https://github.com/hengxuZ/binance-quantization) nodejs版本

## 开始

1.用户配置文件user.json（需手动创建）
```
{
	"apiKey": "",
	"secretKey": "",
	"passphrase": ""
}
```

2.交易配置文件config.json
```
{
	"next_buy_price": 133.3,
	"grid_sell_price": 133.4,
	"step": 0,
	"profit_ratio": 0.1,
	"double_throw_ratio": 0.1,
	"cointype": "LTC-USDT",
	"quantity": [0.05, 0.06, 0.07, 0.08]
}
```

3.运行`npm start`

