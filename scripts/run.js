// 测试运行
const testRun = async (counter) => {
  console.log('当前counts: ', await counter.getCounts());
  await counter.add();
  console.log('当前counts: ', await counter.getCounts());
  await counter.add();
  console.log('当前counts: ', await counter.getCounts());
}

const main = async () => {
  // Hre => hardhat runtime env
  // hre 使用时不需要导入，如果是ts请添加 // @ts-ignore
  // 请每一步都 await 等待上链!
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  // 还要 await
  await counter.deployed();
  console.log(`服务已运行于 ${counter.address}`);

  // 在此测试运行
  // await testRun(counter)
};

main()
  .then(() => {
    console.log("Success!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });




// Run in Real project 
// import contractABI from "%后端项目地址%/artifacts/contracts/%合约名字%.sol/%合约名字%.json"
// import { ethers } from 'ethers';
const RealTransaction = async () => {
  const element = querySelector("页面上的内容")
  try {
    const { ethereum } = windows
    console.log(ethereum ? "钱包已安装" : "钱包未安装")
    const ExistAccounts = ethereum.request({ method: 'eth_accounts' })
    console.log(ExistAccounts ? "已授权钱包" : "未授权钱包")
    const accounts = ethereum.request({ method: 'eth_requestAccounts' })
    accounts && console.log("Log at : ", accounts[0])
    const contractAddress = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"
    const provider = new ethers.providers.Web3Provider(ethereum)
    const singer = provider.getSinger()
    const Contract = new ethers.Contract(contractAddress, contractABI, singer)
    const transaction = await Contract.add()
    await transaction.wait()
    const counts = await Contract.getCounts()
    element.innerHTML = counts
  } catch (e) {
    console.error(e)
  }
}