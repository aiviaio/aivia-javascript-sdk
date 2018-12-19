## Modules

<dl>
<dt><a href="#module_Asset">Asset</a></dt>
<dd></dd>
<dt><a href="#module_AssetsRegistry">AssetsRegistry</a></dt>
<dd></dd>
<dt><a href="#module_ERC20">ERC20</a></dt>
<dd></dd>
<dt><a href="#module_DEV">DEV</a></dt>
<dd></dd>
<dt><a href="#module_Buy">Buy</a></dt>
<dd></dd>
<dt><a href="#module_Sell">Sell</a></dt>
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

<a name="module_ERC20"></a>

## ERC20

* [ERC20](#module_ERC20)
    * [.getBalance(wallet, [assetAddress])](#module_ERC20.getBalance) ⇒ <code>balance</code>
    * [.totalSupply(assetAddress)](#module_ERC20.totalSupply) ⇒ <code>totalSupply</code>
    * [.allowance(assetAddress, owner, spender)](#module_ERC20.allowance) ⇒ <code>allowance</code>
    * [.approve(assetAddress, spender, value, options, callback)](#module_ERC20.approve) ⇒ <code>event</code>
    * [.transfer(to, value, assetAddress, options, callback)](#module_ERC20.transfer) ⇒ <code>event</code>
    * [.transferETH(to, value, options, callback)](#module_ERC20.transferETH) ⇒ <code>event</code>


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

### SDK.asset.approve(assetAddress, spender, value, options, callback) ⇒ <code>event</code>
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
| callback | <code>function</code> | function(hash) |


* * *

<a name="module_ERC20.transfer"></a>

### SDK.asset.transfer(to, value, assetAddress, options, callback) ⇒ <code>event</code>
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
| callback | <code>function</code> | function(hash) |


* * *

<a name="module_ERC20.transferETH"></a>

### SDK.asset.transferETH(to, value, options, callback) ⇒ <code>event</code>
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
| callback | <code>function</code> | function(hash) |


* * *

<a name="module_DEV"></a>

## DEV

* * *

<a name="module_DEV.mint"></a>

### SDK.dev.mint(value, to, assetAddress, options, callback) ⇒ <code>event</code>
mint asset value to other wallet from contract owner

**Kind**: static method of [<code>DEV</code>](#module_DEV)  
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
| callback | <code>function</code> | function(hash) |


* * *

<a name="module_Buy"></a>

## Buy

* [Buy](#module_Buy)
    * [.checkBeforeBuy(value, assetAddress, currencyAddress, from)](#module_Buy.checkBeforeBuy) ⇒ <code>true</code> \| <code>error</code>
    * [.buyAsset(value, assetAddress, currencyAddress, options, callback)](#module_Buy.buyAsset) ⇒ <code>event</code>


* * *

<a name="module_Buy.checkBeforeBuy"></a>

### SDK.trade.checkBeforeBuy(value, assetAddress, currencyAddress, from) ⇒ <code>true</code> \| <code>error</code>
the method by which you can first check the parameters before buy

**Kind**: static method of [<code>Buy</code>](#module_Buy)  
**Returns**: <code>true</code> \| <code>error</code> - ;  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the amount of the asset that will be exchanged for the assets you want to buy |
| assetAddress | <code>address</code> | asset address that will be bought |
| currencyAddress | <code>address</code> | address of the asset to be sold |
| from | <code>address</code> | wallet address |


* * *

<a name="module_Buy.buyAsset"></a>

### SDK.trade.buyAsset(value, assetAddress, currencyAddress, options, callback) ⇒ <code>event</code>
purchase of tokens

**Kind**: static method of [<code>Buy</code>](#module_Buy)  
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
| callback | <code>function</code> | function(hash) |


* * *

<a name="module_Sell"></a>

## Sell

* [Sell](#module_Sell)
    * [.checkBeforeSell(value, assetAddress, options)](#module_Sell.checkBeforeSell) ⇒ <code>true</code> \| <code>error</code>
    * [.sellAsset(value, assetAddress, options, callback)](#module_Sell.sellAsset) ⇒ <code>event</code>


* * *

<a name="module_Sell.checkBeforeSell"></a>

### SDK.trade.checkBeforeSell(value, assetAddress, options) ⇒ <code>true</code> \| <code>error</code>
the method by which you can first check the parameters before sell

**Kind**: static method of [<code>Sell</code>](#module_Sell)  
**Returns**: <code>true</code> \| <code>error</code> - ;  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the amount of the asset that  will be sold |
| assetAddress | <code>address</code> | asset address that will be sold |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |


* * *

<a name="module_Sell.sellAsset"></a>

### SDK.trade.sellAsset(value, assetAddress, options, callback) ⇒ <code>event</code>
sale of tokens

**Kind**: static method of [<code>Sell</code>](#module_Sell)  
**Returns**: <code>event</code> - transaction event {spend, received, fees: { manager, platform } }  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the amount of the asset that will be sold |
| assetAddress | <code>address</code> | asset address that will be sold |
| options | <code>object</code> |  |
| options.address | <code>address</code> | wallet address |
| options.privateKey | <code>string</code> | private key |
| options.gasPrice | <code>number</code> | gas price |
| callback | <code>function</code> | function(hash) |


* * *

