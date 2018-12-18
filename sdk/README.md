<a name="module_asset"></a>

## asset

* [asset](#module_asset)
    * [.getAuditDBAddress(addressOrSymbol)](#module_asset.getAuditDBAddress) ⇒ <code>AuditDBAddress</code>
    * [.getRPCAddress(addressOrSymbol)](#module_asset.getRPCAddress) ⇒ <code>RPCAddress</code>
    * [.getRate(addressOrSymbol)](#module_asset.getRate) ⇒ <code>rate</code>
    * [.updateRate(assetAddress, AUM, checksum, options)](#module_asset.updateRate) ⇒ <code>event</code>


* * *

<a name="module_asset.getAuditDBAddress"></a>

### SDK.asset.getAuditDBAddress(addressOrSymbol) ⇒ <code>AuditDBAddress</code>
returns AuditDB address

**Kind**: static method of [<code>asset</code>](#module_asset)  
**Returns**: <code>AuditDBAddress</code> - AuditDB address  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>String</code> \| <code>Address</code> | 


* * *

<a name="module_asset.getRPCAddress"></a>

### SDK.asset.getRPCAddress(addressOrSymbol) ⇒ <code>RPCAddress</code>
returns asset RPC address

**Kind**: static method of [<code>asset</code>](#module_asset)  
**Returns**: <code>RPCAddress</code> - RPC address  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>String</code> \| <code>Address</code> | 


* * *

<a name="module_asset.getRate"></a>

### SDK.asset.getRate(addressOrSymbol) ⇒ <code>rate</code>
returns asset rate by address or symbol

**Kind**: static method of [<code>asset</code>](#module_asset)  
**Returns**: <code>rate</code> - current(last) rate  

| Param | Type |
| --- | --- |
| addressOrSymbol | <code>String</code> \| <code>Address</code> | 


* * *

<a name="module_asset.updateRate"></a>

### SDK.asset.updateRate(assetAddress, AUM, checksum, options) ⇒ <code>event</code>
function to update the price of the asset rate

**Kind**: static method of [<code>asset</code>](#module_asset)  
**Returns**: <code>event</code> - event transactions {rate, auditor}  

| Param | Type | Description |
| --- | --- | --- |
| assetAddress | <code>Address</code> | asset address |
| AUM | <code>Number</code> | project total aum |
| checksum | <code>String</code> | md5 checksum |
| options | <code>Object</code> |  |
| options.address | <code>Address</code> | wallet address |
| options.privateKey | <code>String</code> | private key |
| options.gasPrice | <code>Number</code> | gas price |


* * *

