require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.0",
    networks: {
        hardhat: {
            chainId: 1337
        },
        // 添加其他网络配置，如Rinkeby测试网
        // rinkeby: {
        //   url: `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
        //   accounts: [`0x${YOUR_PRIVATE_KEY}`]
        // }
    }
};