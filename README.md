# okex-grid

针对okex平台的现货网格交易策略量化项目

[binance-quantization](https://github.com/hengxuZ/binance-quantization) nodejs版本

## 开始

1.将项目克隆到本地并进入项目目录
```
git clone https://github.com/handoing/okex-grid
cd okex-grid
```

2.如第一次使用需执行以下命令填写账号配置数据，如已配置可跳到第4步
```
npm install
npm run init
```

3.执行`npm run init`会生成user.json文件，以下为该文件说明
```
{
  "apiKey": "",     <- okex申请的api key
  "secretKey": "",  <- okex申请的secret key
  "passphrase": ""  <- okex申请的api key时所设置的passphrase
}
```

4.交易配置文件config.json需用户自行修改
```
{
  "apiUri": "https://www.okexcn.com",     <- okex api 域名 （国内需使用www.okexcn.com，梯子可不设置该项即为默认www.okex.com）
  "next_buy_price": 135,                  <- 下次开仓价 （你下一仓位买入价）
  "grid_sell_price": 140,                 <- 当前止盈价 （你的当前仓位卖出价）
  "step": 0,                              <- 当前仓位   （0:仓位为空）
  "profit_ratio": 0.1,                    <- 止盈比率   （卖出价调整比率。如：设置为5，当前买入价为100，那么下次卖出价为105）
  "double_throw_ratio": 0.1,              <- 补仓比率   （买入价调整比率。如：设置为5，当前买入价为100，那么下次买入价为95）
  "cointype": "LTC-USDT",                 <- 交易对     （你要进行交易的交易对，请参考okex现货。如：BTC 填入 BTC-USDT）
  "quantity": [0.05, 0.06, 0.07, 0.08]    <- 交易数量    (第一手买入1,第二手买入2...超过第三手以后的仓位均按照最后一位数量(3)买入)
}
```

5.运行`npm start`或`node bootstrap.js`

### 温馨提示

建议使用子账号来进行量化交易

bootstrap.js下的钉钉机器人地址请手动修改~

### 免责申明

本项目不构成投资建议，投资者应独立决策并自行承担风险

币圈有风险，入圈须谨慎。

> 🚫风险提示：防范以“虚拟货币”“区块链”名义进行非法集资的风险。

