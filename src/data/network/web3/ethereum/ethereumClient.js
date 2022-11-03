/* eslint-disable max-lines-per-function */
import { createToaster } from "@meforma/vue-toaster";
const {
  getCoinbaseWalletProvider,
  getMetaMaskProvider,
  getLedgerWalletProvider,
  getWalletConnectProvider
} = require("./providers");
import { CoinbaseConnector } from "./walletProviders/CoinbaseConnector.js";
import { MetaMaskConnector } from "./walletProviders/MetaMaskConnector";
import { WalletConnectConnector } from "./walletProviders/WalletConnectConnector"
import QRCodeModal from "@walletconnect/qrcode-modal";
import { toHex } from "@/utils/common.js";
import { ERROR } from "../../../../services/errors/index.js";
import {NETWORK} from "../../../../services/constants"

require("dotenv").config();
const { ethers } = require("ethers");
const { CoinbaseWalletSDK } = require("@coinbase/wallet-sdk");
/**
 * @property {ethers.JsonRpcSigner} walletProvider
 * @property {ethers.JsonRpcSigner} walletSigner
 */
/**
 * @NOTE Need to implent whatchers for chianID, chain-changes and switchToNetwork
 */

class EthereumClient {
  _connector = 0;
  
  constructor() {}

  /* --- Blockchain state --- */

  /**
   * Get current block number.
   */
  async getBlockNumber() {
    const number = await this.readProvider.getBlockNumber();
  }

  changeAccount = new Event('accountChange', this.walletProvider?.on('accountsChanged', async (account) => {
    console.log("AccountsChanged ", account)
  }))

  /* --- Wallet access --- */

  async syncWallet(wallet) {
    // Using in-browser wallet to access wallet state and sign transactions
    console.log("WALLET_PROVIDER 2:", wallet);
    if (wallet == "metamask") {
      try {
        
        const metamask = getMetaMaskProvider();
        if(metamask.chainId !== ethers.utils.hexValue(NETWORK.id)) {
          const toast = createToaster({});
          toast.error(`Please connect to ${NETWORK.name} Network`, {
            position: "top",
          });
          return false
        }
        
        this.walletProvider = metamask;
        this._connector = new MetaMaskConnector(metamask);
        this.account = await this._connector.getAddress();
        await this._connector.getChainId()
        metamask.on("accountsChanged", (log, event) => {
          window.location.reload()
        })
        metamask.on("chainChanged", (log, event) => { 
          window.location.reload()
        })
        console.log("CHAIN_ID___", this._connector.chainId)
        this.walletSigner = await this._connector.getSigner(
          this._connector.chainId
        );
        return true;
      } catch (error) {
        console.log(error);
        const toast = createToaster({});
        toast.error("Something went wrong connecting to Metamask", {
          position: "top",
        });
        return false;
      }
    }
    if (wallet == "coinbase") {
      try {
        const coinbase = getCoinbaseWalletProvider();
        this.walletProvider = coinbase;
        const connector = new CoinbaseConnector(coinbase);
        this.account = await connector.getAddress();
        this.walletSigner = await connector.getSigner(
          await connector.getChainId()
        );
        return;
      } catch (error) {
        console.log(error);
        const toast = createToaster({});
        toast.error("Something went wrong connecting to Coinbase", {
          position: "top",
        });
        return;
      }
    }
    if(wallet == "ledger") {
      const ledger = await getLedgerWalletProvider(); 
    }
    if(wallet == "walletConnect") {
      // Create connector
      const provider = getWalletConnectProvider()
      await provider.enable();
      this.walletProvider = new ethers.providers.Web3Provider(provider)
      this._connector = new WalletConnectConnector(provider);
      this.account = await this._connector.getAddress();
      await this._connector.getChainId()
    }

    // Subscribe to accounts change
    this.walletProvider.on("accountsChanged", (log, event) => {
      window.location.reload()
    })

    // Subscribe to chainId change
    this.walletProvider.on("chainChanged",  (log, event) => {
      window.location.reload()
    });

    // Subscribe to session disconnection
    this.walletProvider.on("disconnect",  (log, event) => {
      window.location.reload()
    });
  }

  getChainId() {
    return this._connector.chainId
  }

  switchNetwork = async (network) => {
    try {
      await this.walletProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(this.chainId || NETWORK.id) }],
      });
    } catch (error) {
      this.error = error;
    }
  };

  async getWalletAddress() {
    return await this.walletSigner.getAddress();
  }
  async getWalletEthBalance() {
    return (await this.walletSigner.getBalance()).toString();
  }

  /**
   * @ToDo Implement coinbase Signature
   */
  async getSignature(domain, types, data) {
    return await this.walletSigner._signTypedData(domain, types, data);
  }

  /* --- Contract access --- */

  /**
   * Initialize contract.
   * @param {string} address Contract address
   * @param {string} abi Contract ABI
   * @returns Read-only contract instance
   */
  getContract(address, abi) {
    return new ethers.Contract(
      address,
      abi,
      this.walletSigner || this.walletProvider
    );
  }

  /**
   * Get a copy of the contract where signable transactions can be executed.
   * @param {ethers.Contract} contract Contract
   * @returns {ethers.Contract} Contract instance with signer (wallet) connected to it
   */
  getMutableContract(contract) {
    return contract.connect(this.walletSigner);
  }
}

export default EthereumClient;
