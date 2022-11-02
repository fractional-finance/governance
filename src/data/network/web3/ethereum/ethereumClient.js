/* eslint-disable max-lines-per-function */
import { createToaster } from "@meforma/vue-toaster";
const {
  getCoinbaseWalletProvider,
  getMetaMaskProvider,
  getLedgerWalletProvider,
} = require("./providers");
import { CoinbaseConnector } from "./walletProviders/CoinbaseConnector.js";
import { MetaMaskConnector } from "./walletProviders/MetaMaskConnector";
import WalletConnect from "@walletconnect/client";
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
      // Create a connector
      const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
      });

      // Check if connection is already established
      if (!connector.connected) {
        // create new session
        connector.createSession();
      }

      // Subscribe to connection events
      connector.on("connect", (error, payload) => {
        if (error) {
          throw error;
        }

        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
      });

      connector.on("session_update", (error, payload) => {
        if (error) {
          throw error;
        }

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
      });

      connector.on("disconnect", (error, payload) => {
        if (error) {
          throw error;
        }

        // Delete connector
      });
    }
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
