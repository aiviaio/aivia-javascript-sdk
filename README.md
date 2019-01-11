
# [AIVIA JavaScript SDK](https://aivia.io/)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dshm/aivia-sdk/LICENSE)
[![npm version](https://img.shields.io/npm/v/aivia.svg?style=flat)](https://www.npmjs.com/package/aivia)


## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 10.0 or higher is required.

```bash
  npm install aivia -S
```


## Example

```JavaScript
const AIVIA_SDK = require("aivia"); // es6
const AIVIA_SDK = require("aivia/sdk"); // es5

const ENTRY_POINT = "0x0000000000000000000000000000000000000000" // protocol entry point contract address
const HTTP_PROVIDER = "http://127.0.0.1:8545";
const DEFAULT_GAS_PRICE = 10000000000 // in wei, default value 50000000000 (50 gWei)
const SDK = new AIVIA_SDK(ENTRY_POINT, HTTP_PROVIDER, DEFAULT_GAS_PRICE );
```


## Modules

<dl>
<dt><a href="#module_Asset">Asset</a></dt>
<dd></dd>
<dt><a href="#module_AssetsRegistry">AssetsRegistry</a></dt>
<dd></dd>
<dt><a href="#module_Deploy">Deploy</a></dt>
<dd></dd>
<dt><a href="#module_ERC20">ERC20</a></dt>
<dd></dd>
<dt><a href="#module_Platform">Platform</a></dt>
<dd></dd>
<dt><a href="#module_Buy/Sell">Buy/Sell</a></dt>
<dd></dd>
<dt><a href="#module_Currency">Currency</a></dt>
<dd></dd>
<dt><a href="#module_TPLRegistry">TPLRegistry</a></dt>
<dd></dd>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
</dl>

<a name="module_Asset"></a>

## Asset

* [Asset](#module_Asset)
    * [.getAuditDBAddress(addressOrSymbol)](#module_Asset.getAuditDBAddress) ⇒ <code>AuditDBAddress</code>
    * [.getRPCAddress(addressOrSymbol)](#module_Asset.getRPCAddress) ⇒ <code>RPCAddress</code>
    * [.getRate(addressOrSymbol)](#module_Asset.getRate) ⇒ <code>rate</code>
    * [.updateRate(assetAddress, AUM, checksum, options)](#module_Asset.updateRate) ⇒ <code>event</code>
    * [.NET(addressOrSymbol)](#module_Asset.NET) ⇒ <code>NET</code>
    * [.getInvestors(addressOrSymbol)](#module_Asset.getInvestors) ⇒ <code>investors</code>


* * *

<a name="module_Asset.getAuditDBAddress"></a>

### SDK.asset.getAuditDBAddress(addressOrSymbol) ⇒ <code>AuditDBAddress</code>
returns AuditDB address

**Kind**: static method of [<code>Asset</code>](#module_Asset)  
**Returns**: <code>AuditDBAddress</code> - AuditDB address  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>String</code> \| <code>Address</code> | 


* * *

<a name="module_Asset.getRPCAddress"></a>

### SDK.asset.getRPCAddress(addressOrSymbol) ⇒ <code>RPCAddress</code>
returns asset RPC address

**Kind**: static method of [<code>Asset</code>](#module_Asset)  
**Returns**: <code>RPCAddress</code> - RPC address  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>String</code> \| <code>Address</code> | 


* * *

<a name="module_Asset.getRate"></a>

### SDK.asset.getRate(addressOrSymbol) ⇒ <code>rate</code>
returns asset rate by address or symbol

**Kind**: static method of [<code>Asset</code>](#module_Asset)  
**Returns**: <code>rate</code> - current(last) rate  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>String</code> \| <code>Address</code> | 


* * *

<a name="module_Asset.updateRate"></a>

### SDK.asset.updateRate(assetAddress, AUM, checksum, options) ⇒ <code>event</code>
function to update the price of the asset rate

**Kind**: static method of [<code>Asset</code>](#module_Asset)  
**Returns**: <code>event</code> - transaction event {rate, auditor}  

| Param | Type | Description |
| --- | --- | --- |
| assetAddress | <code>address</code> | asset address |
| AUM | <code>number</code> | project total aum |
| checksum | <code>string</code> | md5 checksum |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| options.gasLimit | <code>number</code> | gas limit |


* * *

<a name="module_Asset.NET"></a>

### SDK.asset.NET(addressOrSymbol) ⇒ <code>NET</code>
returns asset NET by address or symbol

**Kind**: static method of [<code>Asset</code>](#module_Asset)  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>String</code> \| <code>Address</code> | 


* * *

<a name="module_Asset.getInvestors"></a>

### SDK.asset.getInvestors(addressOrSymbol) ⇒ <code>investors</code>
returns asset investors count by address

**Kind**: static method of [<code>Asset</code>](#module_Asset)  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>address</code> | 


* * *

<a name="module_AssetsRegistry"></a>

## AssetsRegistry

* [AssetsRegistry](#module_AssetsRegistry)
    * [.getList()](#module_AssetsRegistry.getList) ⇒ <code>Array.&lt;assetsList&gt;</code>
    * [.getAssetAddress(symbol)](#module_AssetsRegistry.getAssetAddress) ⇒ <code>address</code>
    * [.getAssetSymbol(assetAddress)](#module_AssetsRegistry.getAssetSymbol) ⇒ <code>symbol</code>


* * *

<a name="module_AssetsRegistry.getList"></a>

### SDK.asset.getList() ⇒ <code>Array.&lt;assetsList&gt;</code>
returns assets list array

**Kind**: static method of [<code>AssetsRegistry</code>](#module_AssetsRegistry)  
**Properties**

| Name | Type |
| --- | --- |
| assetsList.item | <code>object</code> | 
| item.symbol | <code>string</code> | 
| item.address | <code>string</code> | 


* * *

<a name="module_AssetsRegistry.getAssetAddress"></a>

### SDK.asset.getAssetAddress(symbol) ⇒ <code>address</code>
returns asset address by symbol

**Kind**: static method of [<code>AssetsRegistry</code>](#module_AssetsRegistry)  
**Returns**: <code>address</code> - asset address  

| Param | Type |
| --- | --- |
| symbol | <code>string</code> | 


* * *

<a name="module_AssetsRegistry.getAssetSymbol"></a>

### SDK.asset.getAssetSymbol(assetAddress) ⇒ <code>symbol</code>
returns asset symbol by address

**Kind**: static method of [<code>AssetsRegistry</code>](#module_AssetsRegistry)  
**Returns**: <code>symbol</code> - asset symbol  

| Param | Type |
| --- | --- |
| assetAddress | <code>address</code> | 


* * *

<a name="module_Deploy"></a>

## Deploy

* * *

<a name="module_Deploy.deploy"></a>

### SDK.project.deploy(type, params, options, callback, estimate) ⇒ <code>components</code>
deploy project

**Kind**: static method of [<code>Deploy</code>](#module_Deploy)  
**Returns**: <code>components</code> - deployed project components  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | project type ID |
| params | <code>object</code> |  |
| params.projectName | <code>string</code> | maximum length 32 characters |
| params.tokenDetails | <code>object</code> | {tokenName, tokenSymbol, initialPrice, maxTokens, maxInvestors} |
| params.tokenDetails.tokenName | <code>string</code> | maximum length 32 characters |
| params.tokenDetails.tokenSymbol | <code>string</code> | maximum length 32 characters |
| params.tokenDetails.initialPrice | <code>number</code> |  |
| params.tokenDetails.maxTokens | <code>number</code> |  |
| params.tokenDetails.maxInvestors | <code>number</code> | maximum number of investors, if equal to "0" then there are no restrictions |
| params.fees | <code>object</code> | {platformFee, entryFee, exitFee} |
| params.fees.platformFee | <code>number</code> | indicate in percent |
| params.fees.entryFee | <code>number</code> | indicate in percent |
| params.fees.exitFee | <code>number</code> | indicate in percent |
| params.custodian | <code>address</code> | custodian wallet address |
| params.permissions | <code>object</code> | {countries, walletTypes, rule} |
| params.permissions.countries | <code>array.&lt;number&gt;</code> |  |
| params.permissions.walletTypes | <code>array.&lt;number&gt;</code> |  |
| params.permissions.rule | <code>boolean</code> |  |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| callback | <code>function</code> | function(hash) |
| estimate | <code>boolean</code> | is need estimate |


* * *

<a name="module_ERC20"></a>

## ERC20

* [ERC20](#module_ERC20)
    * [.getBalance(wallet, [assetAddress])](#module_ERC20.getBalance) ⇒ <code>balance</code>
    * [.totalSupply(assetAddress)](#module_ERC20.totalSupply) ⇒ <code>totalSupply</code>
    * [.allowance(assetAddress, owner, spender)](#module_ERC20.allowance) ⇒ <code>allowance</code>
    * [.approve(assetAddress, spender, value, options, callback, estimate)](#module_ERC20.approve) ⇒ <code>event</code>
    * [.transfer(to, value, assetAddress, options, callback, estimate)](#module_ERC20.transfer) ⇒ <code>event</code>
    * [.transferETH(to, value, options, callback, estimate)](#module_ERC20.transferETH) ⇒ <code>event</code>
    * [.mint(value, to, assetAddress, options, callback, estimate)](#module_ERC20.mint) ⇒ <code>event</code>


* * *

<a name="module_ERC20.getBalance"></a>

### SDK.asset.getBalance(wallet, [assetAddress]) ⇒ <code>balance</code>
returns asset balance by assetAddress or ETH balance

**Kind**: static method of [<code>ERC20</code>](#module_ERC20)  

| Param | Type |
| --- | --- |
| wallet | <code>address</code> | 
| [assetAddress] | <code>Address</code> | 


* * *

<a name="module_ERC20.totalSupply"></a>

### SDK.asset.totalSupply(assetAddress) ⇒ <code>totalSupply</code>
returns asset totalSupply

**Kind**: static method of [<code>ERC20</code>](#module_ERC20)  

| Param | Type |
| --- | --- |
| assetAddress | <code>address</code> | 


* * *

<a name="module_ERC20.allowance"></a>

### SDK.asset.allowance(assetAddress, owner, spender) ⇒ <code>allowance</code>
returns amount approved by owner to spender

**Kind**: static method of [<code>ERC20</code>](#module_ERC20)  

| Param | Type |
| --- | --- |
| assetAddress | <code>address</code> | 
| owner | <code>address</code> | 
| spender | <code>address</code> | 


* * *

<a name="module_ERC20.approve"></a>

### SDK.asset.approve(assetAddress, spender, value, options, callback, estimate) ⇒ <code>event</code>
allows spender to manage a certain amount of assets

**Kind**: static method of [<code>ERC20</code>](#module_ERC20)  
**Returns**: <code>event</code> - transaction event {from, to, value}  

| Param | Type | Description |
| --- | --- | --- |
| assetAddress | <code>address</code> | asset address |
| spender | <code>address</code> | spender wallet address |
| value | <code>number</code> | amount of asset |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| options.gasLimit | <code>number</code> | gas limit |
| callback | <code>function</code> | function(hash) |
| estimate | <code>boolean</code> | is need estimate |


* * *

<a name="module_ERC20.transfer"></a>

### SDK.asset.transfer(to, value, assetAddress, options, callback, estimate) ⇒ <code>event</code>
transfer ERC20 asset value to other address

**Kind**: static method of [<code>ERC20</code>](#module_ERC20)  
**Returns**: <code>event</code> - transaction event {from, to, value}  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>address</code> | wallet address |
| value | <code>number</code> | amount of asset |
| assetAddress | <code>address</code> | asset address |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| options.gasLimit | <code>number</code> | gas limit |
| callback | <code>function</code> | function(hash) |
| estimate | <code>boolean</code> | is need estimate |


* * *

<a name="module_ERC20.transferETH"></a>

### SDK.asset.transferETH(to, value, options, callback, estimate) ⇒ <code>event</code>
transfer ETH value to other address

**Kind**: static method of [<code>ERC20</code>](#module_ERC20)  
**Returns**: <code>event</code> - transaction event {from, to, value}  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>address</code> | wallet address |
| value | <code>number</code> | amount of asset |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| options.gasLimit | <code>number</code> | gas limit |
| callback | <code>function</code> | function(hash) |
| estimate | <code>boolean</code> | is need estimate |


* * *

<a name="module_ERC20.mint"></a>

### SDK.asset.mint(value, to, assetAddress, options, callback, estimate) ⇒ <code>event</code>
mint asset value to other wallet from contract owner

**Kind**: static method of [<code>ERC20</code>](#module_ERC20)  
**Returns**: <code>event</code> - transaction event {from, to, value}  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | amount of asset |
| to | <code>address</code> | wallet address |
| assetAddress | <code>address</code> | asset address |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| options.gasLimit | <code>number</code> | gas limit |
| callback | <code>function</code> | function(hash) |
| estimate | <code>boolean</code> | is need estimate |


* * *

<a name="module_Platform"></a>

## Platform

* [Platform](#module_Platform)
    * [.getPlatformWallet()](#module_Platform.getPlatformWallet) ⇒ <code>address</code>
    * [.getPlatformToken()](#module_Platform.getPlatformToken) ⇒ <code>address</code>


* * *

<a name="module_Platform.getPlatformWallet"></a>

### SDK.platform.getPlatformWallet() ⇒ <code>address</code>
returns platform wallet address

**Kind**: static method of [<code>Platform</code>](#module_Platform)  

* * *

<a name="module_Platform.getPlatformToken"></a>

### SDK.platform.getPlatformToken() ⇒ <code>address</code>
returns platform token address

**Kind**: static method of [<code>Platform</code>](#module_Platform)  

* * *

<a name="module_Buy/Sell"></a>

## Buy/Sell

* [Buy/Sell](#module_Buy/Sell)
    * [.checkBeforeBuy(value, assetAddress, currencyAddress, from)](#module_Buy/Sell.checkBeforeBuy) ⇒ <code>true</code> \| <code>error</code>
    * [.buyAsset(value, assetAddress, currencyAddress, options, callback, estimate)](#module_Buy/Sell.buyAsset) ⇒ <code>event</code>
    * [.checkBeforeSell(value, assetAddress, options)](#module_Buy/Sell.checkBeforeSell) ⇒ <code>true</code> \| <code>error</code>
    * [.sellAsset(value, assetAddress, options, callback, estimate)](#module_Buy/Sell.sellAsset) ⇒ <code>event</code>
    * [.estimate(value, assetAddress, [currencyAddress])](#module_Buy/Sell.estimate) ⇒ <code>estimate</code>


* * *

<a name="module_Buy/Sell.checkBeforeBuy"></a>

### SDK.trade.checkBeforeBuy(value, assetAddress, currencyAddress, from) ⇒ <code>true</code> \| <code>error</code>
the method by which you can first check the parameters before buy

**Kind**: static method of [<code>Buy/Sell</code>](#module_Buy/Sell)  
**Returns**: <code>true</code> \| <code>error</code> - ;  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the amount of the asset that will be exchanged for the assets you want to buy |
| assetAddress | <code>address</code> | asset address that will be bought |
| currencyAddress | <code>address</code> | address of the asset to be sold |
| from | <code>address</code> | wallet address |


* * *

<a name="module_Buy/Sell.buyAsset"></a>

### SDK.trade.buyAsset(value, assetAddress, currencyAddress, options, callback, estimate) ⇒ <code>event</code>
purchase of tokens

**Kind**: static method of [<code>Buy/Sell</code>](#module_Buy/Sell)  
**Returns**: <code>event</code> - transaction event {spend, received, fees: { manager, platform } }  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the amount of the asset that will be exchanged for the assets you want to buy |
| assetAddress | <code>address</code> | asset address that will be bought |
| currencyAddress | <code>address</code> | address of the asset to be sold |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| options.gasLimit | <code>number</code> | gas limit |
| callback | <code>function</code> | function(hash) |
| estimate | <code>boolean</code> | is need estimate |


* * *

<a name="module_Buy/Sell.checkBeforeSell"></a>

### SDK.trade.checkBeforeSell(value, assetAddress, options) ⇒ <code>true</code> \| <code>error</code>
the method by which you can first check the parameters before sell

**Kind**: static method of [<code>Buy/Sell</code>](#module_Buy/Sell)  
**Returns**: <code>true</code> \| <code>error</code> - ;  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the amount of the asset that  will be sold |
| assetAddress | <code>address</code> | asset address that will be sold |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |


* * *

<a name="module_Buy/Sell.sellAsset"></a>

### SDK.trade.sellAsset(value, assetAddress, options, callback, estimate) ⇒ <code>event</code>
sale of tokens

**Kind**: static method of [<code>Buy/Sell</code>](#module_Buy/Sell)  
**Returns**: <code>event</code> - transaction event {spend, received, fees: { manager, platform } }  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the amount of the asset that will be sold |
| assetAddress | <code>address</code> | asset address that will be sold |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| options.gasLimit | <code>number</code> | gas limit |
| callback | <code>function</code> | function(hash) |
| estimate | <code>boolean</code> | is need estimate |


* * *

<a name="module_Buy/Sell.estimate"></a>

### SDK.trade.estimate(value, assetAddress, [currencyAddress]) ⇒ <code>estimate</code>
**Kind**: static method of [<code>Buy/Sell</code>](#module_Buy/Sell)  
**Returns**: <code>estimate</code> - ;  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the amount of the asset |
| assetAddress | <code>address</code> | asset address |
| [currencyAddress] | <code>address</code> | currency address |


* * *

<a name="module_Currency"></a>

## Currency

* [Currency](#module_Currency)
    * [.getList()](#module_Currency.getList) ⇒ <code>Array.&lt;currenciesList&gt;</code>
    * [.getRate(addressOrSymbol)](#module_Currency.getRate) ⇒ <code>rate</code>
    * [.getAddress(symbol)](#module_Currency.getAddress) ⇒ <code>address</code>
    * [.getSymbol(currencyAddress)](#module_Currency.getSymbol) ⇒ <code>symbol</code>


* * *

<a name="module_Currency.getList"></a>

### SDK.platform.currency.getList() ⇒ <code>Array.&lt;currenciesList&gt;</code>
returns platform currencies list

**Kind**: static method of [<code>Currency</code>](#module_Currency)  
**Properties**

| Name | Type |
| --- | --- |
| currenciesList.item | <code>object</code> | 
| item.symbol | <code>string</code> | 
| item.address | <code>string</code> | 
| item.rate | <code>number</code> | 


* * *

<a name="module_Currency.getRate"></a>

### SDK.platform.currency.getRate(addressOrSymbol) ⇒ <code>rate</code>
returns  currency rate by address or symbol

**Kind**: static method of [<code>Currency</code>](#module_Currency)  
**Returns**: <code>rate</code> - - rate of currency  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>string</code> \| <code>address</code> | 


* * *

<a name="module_Currency.getAddress"></a>

### SDK.platform.currency.getAddress(symbol) ⇒ <code>address</code>
returns currency address by symbol

**Kind**: static method of [<code>Currency</code>](#module_Currency)  
**Returns**: <code>address</code> - currency address  

| Param | Type |
| --- | --- |
| symbol | <code>string</code> | 


* * *

<a name="module_Currency.getSymbol"></a>

### SDK.platform.currency.getSymbol(currencyAddress) ⇒ <code>symbol</code>
returns currency symbol by address

**Kind**: static method of [<code>Currency</code>](#module_Currency)  
**Returns**: <code>symbol</code> - currency symbol  

| Param | Type |
| --- | --- |
| currencyAddress | <code>address</code> | 


* * *

<a name="module_TPLRegistry"></a>

## TPLRegistry

* [TPLRegistry](#module_TPLRegistry)
    * [.addUser(userAddress, countryID, walletType, [expirationDate], options, callback, estimate)](#module_TPLRegistry.addUser) ⇒ <code>event</code>
    * [.getUserDetails(userAddress)](#module_TPLRegistry.getUserDetails) ⇒ <code>object</code>
    * [.getUsersList()](#module_TPLRegistry.getUsersList) ⇒ <code>Array.&lt;userList&gt;</code>


* * *

<a name="module_TPLRegistry.addUser"></a>

### SDK.auditor.addUser(userAddress, countryID, walletType, [expirationDate], options, callback, estimate) ⇒ <code>event</code>
add or update user

**Kind**: static method of [<code>TPLRegistry</code>](#module_TPLRegistry)  
**Returns**: <code>event</code> - transaction event {eventName, address}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userAddress | <code>address</code> |  | user wallet address |
| countryID | <code>number</code> |  | county ID |
| walletType | <code>number</code> |  | wallet type ID |
| [expirationDate] | <code>number</code> | <code>0</code> | expiration date |
| options | <code>object</code> |  |  |
| options.address | <code>address</code> |  | wallet address |
| options.privateKey | <code>string</code> |  | private key |
| options.gasPrice | <code>number</code> |  | gas price |
| options.gasLimit | <code>number</code> |  | gas limit |
| callback | <code>function</code> |  | function(hash) |
| estimate | <code>boolean</code> |  | is need estimate |


* * *

<a name="module_TPLRegistry.getUserDetails"></a>

### SDK.auditor.getUserDetails(userAddress) ⇒ <code>object</code>
returns user details by address

**Kind**: static method of [<code>TPLRegistry</code>](#module_TPLRegistry)  
**Returns**: <code>object</code> - userDetails  

| Param | Type |
| --- | --- |
| userAddress | <code>address</code> | 

**Properties**

| Name | Type |
| --- | --- |
| userDetails.address | <code>address</code> | 
| userDetails.country | <code>number</code> | 
| userDetails.walletType | <code>number</code> | 
| userDetails.expirationDate | <code>number</code> | 


* * *

<a name="module_TPLRegistry.getUsersList"></a>

### SDK.auditor.getUsersList() ⇒ <code>Array.&lt;userList&gt;</code>
returns user list list

**Kind**: static method of [<code>TPLRegistry</code>](#module_TPLRegistry)  
**Properties**

| Name | Type |
| --- | --- |
| userList.user | <code>object</code> | 
| user.address | <code>address</code> | 
| user.country | <code>number</code> | 
| user.walletType | <code>number</code> | 
| user.expirationDate | <code>number</code> | 


* * *

<a name="module_utils"></a>

## utils

* [utils](#module_utils)
    * [.toHex(string)](#module_utils.toHex) ⇒ <code>hex</code>
    * [.toWei(value)](#module_utils.toWei) ⇒ <code>value</code>
    * [.fromWei(value)](#module_utils.fromWei) ⇒ <code>value</code>
    * [.isAddress(address)](#module_utils.isAddress) ⇒ <code>boolean</code>
    * [.toUtf8(hex)](#module_utils.toUtf8) ⇒ <code>string</code>
    * [.toFixed(value, [digits])](#module_utils.toFixed) ⇒ <code>value</code>
    * [.numberToHex(value)](#module_utils.numberToHex) ⇒ <code>string</code>


* * *

<a name="module_utils.toHex"></a>

### SDK.utils.toHex(string) ⇒ <code>hex</code>
convert string to hex

**Kind**: static method of [<code>utils</code>](#module_utils)  
**Returns**: <code>hex</code> - the resulting HEX string;  

| Param | Type |
| --- | --- |
| string | <code>string</code> | 


* * *

<a name="module_utils.toWei"></a>

### SDK.utils.toWei(value) ⇒ <code>value</code>
converts any value value into wei

**Kind**: static method of [<code>utils</code>](#module_utils)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 


* * *

<a name="module_utils.fromWei"></a>

### SDK.utils.fromWei(value) ⇒ <code>value</code>
converts any value from wei

**Kind**: static method of [<code>utils</code>](#module_utils)  
**Returns**: <code>value</code> - ;  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 


* * *

<a name="module_utils.isAddress"></a>

### SDK.utils.isAddress(address) ⇒ <code>boolean</code>
check if a given string is a valid Ethereum address

**Kind**: static method of [<code>utils</code>](#module_utils)  
**Returns**: <code>boolean</code> - status;  

| Param | Type |
| --- | --- |
| address | <code>address</code> | 


* * *

<a name="module_utils.toUtf8"></a>

### SDK.utils.toUtf8(hex) ⇒ <code>string</code>
converts any value from hex to string

**Kind**: static method of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - ;  

| Param | Type |
| --- | --- |
| hex | <code>string</code> | 


* * *

<a name="module_utils.toFixed"></a>

### SDK.utils.toFixed(value, [digits]) ⇒ <code>value</code>
formats a number using fixed-point notation

**Kind**: static method of [<code>utils</code>](#module_utils)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  |  |
| [digits] | <code>number</code> | <code>5</code> | digits it's number of digits to appear after the decimal point; |


* * *

<a name="module_utils.numberToHex"></a>

### SDK.utils.numberToHex(value) ⇒ <code>string</code>
covert number to hex

**Kind**: static method of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - number;  

| Param | Type |
| --- | --- |
| value | <code>value</code> | 


* * *

