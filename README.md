# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
🤔 这是一个 Web3 智能合约学习项目
-- 内容来自CodingStartup学习笔记 
> https://b23.tv/BV1ES4y1r7DL
> https://b23.tv/BV1eS4y1B7VF


# 👋Hello-web3
##  环境准备
1. node环境
2. solidity 语言支持（只是补全与语法高亮，编译由hardhat库完成）
3. 安装一个钱包（浏览器插件，例如MetaMask）

## 初始化项目
1. 安装hardhat
`npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox`
2. 如果是ts项目，还需要
`npm install --save-dev typescript ts-node`
3. 运行hardhat初始化项目
`npx hardhat init`

## 编写合约
在`contracts/合约名字.sol`中编写一个constract。
在`scripts/run.js`中创建合约。

## 编译
`npx hardhat compile scripts/run.js`
OR 
`npx hardhat run scripts/run.js`
run 将执行该合约，但是未能链接到后端，多次运行显示的地址是一致的。

## 部署
在另一个terminal中，运行以下命令在本地开启一个虚拟后端
`npx harhat node`
控制台将回显20个测试钱包与密码。 
该钱包在区块链中也合法，请勿用于真实环境。
 输出如下：
> Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
> Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

## 执行
`npx hardhat run scripts/run.js --network localhost`
此时链接到本地后端，每次部署address都将不同，
并且会花费一定Gas。
试着启用run.js 中的 testRun()，将看到counts变化。

# 💾测试

## 添加钱包
如果你是第一次接触web3，你需要先：
1. 浏览器安装一个钱包
2. 创建一个账户并设置密码（并不重要）
3. 导入钱包（输入上面提供的钱包之一的private key（此时是真实环境！请不要往里购买货币）

## 链接到本地环境
1. 找到 添加网络>网络>测试环境
2. 选择localhost
3. 将ChainID设置位为 31337 （不要问为什么）
4. 检查刚才的测试钱包，如果有10000个ETH就成功了

## 测试
1. 在run中使用contract中不带view修饰的函数
2. 检查钱包货币的变化
3. 检查运行后端的控制台输出

# 💻应用

## 安装
接下来在真实前端中使用contract中的函数而部署run.js中
首先你需要在**前端项目**中安装ethers
`npm install ethers`

## API
首先
```javascript
import { ethers } from 'ethers';
```
你可以用到以下函数

1. 检查windows中是否被注入 ethereum 来判断浏览器是否已经安装钱包
```javascript
const { ethereum } = windows
console.log( ethereum ? "钱包已安装" : "钱包未安装" )
```

2. 检查是否授权钱包
```javascript
const accounts = ethereum.request({ method: 'eth_accounts' })
console.log( accounts ? "已授权钱包" : "未授权钱包" )
// **注意这里返回的钱包地址是数组**
```

3. 申请授权钱包
```javascript
const accounts = ethereum.request({ method: 'eth_requestAccounts' })
accounts && console.log(accounts[0])
// **注意这里返回的钱包地址是数组**
```
4. 执行contract
```javascript
// 0. 执行合约前，需要准备以下内容
// 签约内容，当后端部署时可以从控制台回显中复制
const contractAddress = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707",
// 建议编译后直接复制到前端项目中
import contractABI from "%后端项目地址%/artifacts/contracts/%合约名字%.sol/%合约名字%.json"

// 1. 获取合约提供方
const provider = new ethers.providers.Web3Provider(ethereum)

// 2. 获取签名方
const singer = provider.getSinger()

// 3. 创建合约
const Contract = new ethers.Contract(
    contractAddress,    // 签约内容
    contractABI,    // 合约ABI
    singer  //签名方
)

// 4. 交易（要await两次！）
const transaction = await Contract.add()
await transaction.wait()

// 5. 当然还要重新获取数据更新页面
const counts = await Contract.getCounts()
// counts 是一个BigNumber， 可以通过toNumber()函数转换为number

// 6. 注意安全！你应该在每次交易前检查钱包，并将相关代码包裹在try&catch中
try {
    // Contract
} catch(e) {
    console.error(e)
}
```
## 常见问题
1. 第二次部署交易时，会遇到Nonce to high报错
解决方法：打开钱包>设置>高级>重置钱包
**该操作并不会影响你的资产**




# 🔗上链！
## 第三方服务
1. 找到一个第三方服务用于部署你的合约
2. 注册时选择想要上链的网络
3. 登录后获取API key

## 更改后端
1. 找到后端项目的hardhat.config.js，添加如下代码(仅做示例，建议查阅官方文档)
```javascript
module.export = {
    solidity: "__soliity的版本号__",
    network: {
        hardhat: {},
        __网络名称__: {
            // 相关配置(仅做示例，建议查阅官方文档)
            url:"https://www.#.com/#",
            // 请使用.env等方法传入，注意私钥安全
            account:[PRIVATE_KEY,...]
        }
    }
}
```
2. 不要忘记切换钱包所在的网络检查余额，执行
(记得注释掉相关测试运行，否则将消耗一定真实货币)
`npx hardhat run scripts/run.js --network %你选择的网络%`
这里的network参数将在Hre中作为上链的目的网络

## 更改前端
1. 在代码中替换合约的地址
2. 将钱包切换到你选择的网络
3. 调用测试







