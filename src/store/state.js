// import ServiceProvider from "../services/provider"
// import WalletState from "../models/walletState"
// // import { MarketOrderType } from "../models/marketOrder"
// import { bigIntMax, bigIntMin } from "../utils/common"
// import router from "../router/index"
// import { Vote } from "../models/vote"
// import { CommonProposalType, FrabricProposalType, ThreadProposalType } from "@/models/common.js"

// const wallet = ServiceProvider.wallet()
// // const market = ServiceProvider.market()
// const dao = ServiceProvider.dao()

// function state() {
//   return {
//     user: {
//       wallet: WalletState
//     },
//     platform: {
//       assets: [],
//       proposals: new Map()
//     },
//     interface: {
//       alert: null
//     }
//   }
// }

// /**
//  * Note: 
//  * I haven"t spent too much time figuring out how to pass arguments to Vuex getters, only knowing that it"s not well-supported natively.
//  * So for the first implementation whenever we need to get a subset of data for particular parameters —
//  * — we return a Map from the corresponding getter, so that the consuming part can access the data with one key lookup operation.
//  * 
//  * Pretty suboptimal, but at the time of writing this the bigger picture matters the most!
//  */

// const getters = {
//   userWalletAddress(state) {
//     return state.user.wallet.address
//   },

//   userEthBalance(state) {
//     return state.user.wallet.ethBalance
//   },

//   allAssets(state) {
//     return state.platform.assets
//   },

//   assetsById(state) {
//     var assetMap = new Map()
//     state.platform.assets
//       .forEach(asset => {
//         assetMap.set(asset.id, asset)
//       })

//     return assetMap
//   },

//   assetsAddressById(state) {
//     var assetMap = new Map()
//     state.platform.assets
//       .forEach(asset => {
//         assetMap.set(asset.id, asset.contract)
//       })

//     return assetMap
//   },

//   // marketplaceActiveAssets(state) {
//   //   return state.platform.assets
//   // },

//   ownedAssets(state) {
//     return state.platform.assets
//       .filter(asset => { return asset.owners.get(state.user.wallet.address) })
//   },

//   // TODO: Quick implementation for testing, need something smarter than that
//   bestAssetPrices(state) {
//     var assetPriceMap = new Map()

//     state.platform.assets
//       .forEach(asset => {
//         // let buyPrices = asset.marketOrders
//         //   .filter(o => { return o.orderType == MarketOrderType.Buy })
//         //   .map(o => { return o.price })
//         // let sellPrices = asset.marketOrders
//         //   .filter(o => { return o.orderType == MarketOrderType.Sell })
//         //   .map(o => { return o.price })

//         // const prices = {
//         //   bid: bigIntMax(buyPrices),
//         //   ask: bigIntMin(sellPrices)
//         // }

//         // assetPriceMap.set(asset.id, prices)
//       })

//     console.log("Best asset prices:")
//     console.log(assetPriceMap)

//     return assetPriceMap
//   },

//   assetProposals(state) {
//     return state.platform.proposals
//   },

//   proposalsById(state) {
//     var proposalsMap = new Map()

//     console.log(state.platform.proposals.values())

//     Array.from(state.platform.proposals.values())
//       .flatMap(p => { return p })
//       .forEach(p => { proposalsMap.set(p.id, p) })

//     return proposalsMap
//   },

//   activeAlert(state) {
//     return state.interface.alert
//   }
// }

// const actions = {
//   async syncWallet(context) {
//     const walletState = await wallet.getState()
//     context.commit("setWallet", walletState)
//   },

//   // async refreshOwnedAssetsData(context) {
//   //   let assets = await market.getAssetsOnTheMarket()
//   //   context.commit("setAssets", assets)
//   // },

//   // async refreshMarketplaceData(context) {
//   //   let assets = await market.getAssetsOnTheMarket()
//   //   context.commit("setAssets", assets)
//   // },

//   async swapToAsset(context, params) {
//     const asset = params.asset
//     const amount = params.amount

//     const price = context.getters.bestAssetPrices.get(asset.id).ask
//     params.$toast.info("Confirming transaction...", {
//       duration: false
//     });

//     const status = await market.buy(asset, amount, price);
//     params.$toast.clear();
//     console.log(params, params?.$toast);

//     if (status) {
//       params.$toast.success("Transaction confirmed!");
//     } else {
//       params.$toast.error("Transaction failed. See details in MetaMask.");
//     }
//   },

//   async refreshProposalsDataForAsset(context, params) {
//     // context.dispatch("refreshMarketplaceData")

//     let assetId = params.assetId

//     let assetProposals = await dao.getProposalsForAsset(assetId)

//     console.log("New Proposals")
//     console.log(assetProposals)

//     context.commit("setProposalsForAsset", { assetId: assetId, proposals: assetProposals })
//   },
//   /*
//     AT THE MOMENT THIS IS USING THE ID, BUT WE NEED TO PASS THE ADDRESS TO THE FUNCTION
//     SUGGESTION: GET THE ADDRESS FROM ID IN THE COMPONENT-SPECIFIC PROPOSAL
//   */
//   async createProposal(context, props) {
//     let {assetAddress, proposalType, title, description} = props
  
//     // params.$toast.show("Confirming transaction...", {
//     //   duration: false
//     // });
//     // const x = await dao.vote("0", "0", "Yes");
//     switch (proposalType) {
//     case CommonProposalType.Paper: {
//       await dao.createPaperProposal(assetAddress, title, description)
//     } break;
//     case FrabricProposalType.Participant: {
//       await dao.createParticipantProposal(assetAddress, title, description)
//     } break;
//     default:
//       break;
//     }
//     const status = await dao.createProposal(assetAddress, title, description);

//     // params.$toast.clear();

//     // if (status) {
//     //   params.$toast.success("Transaction confirmed!");
//     //   context.dispatch("refreshProposalsDataForAsset", { assetId: params.assetId })
//     //   router.push("/dao/" + params.assetId + "/proposals")
//     // } else {
//     //   params.$toast.error("Transaction failed. See details in MetaMask.");
//     //   console.log("Transaction failed. See details in MetaMask.")
//     // }
//   },

//   async createParticipantProposal(context, props) {
//     let {particpantType, participant, title, description} = props
//     let asset = "0xa602bA5287Df6f85Fc16F7Fd6D7ea86F6A0F6d32"
//     console.log("context", context)
    
//     // params.$toast.show("Confirming transaction...", {
//     //   duration: false
//     // });
//     // const x = await dao.vote("0", "0", "Yes");
//     console.log("STATE 1", title," ", description, " ", asset);
//     const status = await dao.createParticipantProposal(particpantType, participant, title, description);
//     console.log("STATE 2", title," ", description, " ", asset);
//     console.log(status);
//     // params.$toast.clear();

//     // if (status) {
//     //   params.$toast.success("Transaction confirmed!");
//     //   context.dispatch("refreshProposalsDataForAsset", { assetId: params.assetId })
//     //   router.push("/dao/" + params.assetId + "/proposals")
//     // } else {
//     //   params.$toast.error("Transaction failed. See details in MetaMask.");
//     //   console.log("Transaction failed. See details in MetaMask.")
//     // }
//   },

//   async voteOnProposal(context, params) {
//     let asset = context.getters.assetsById.get(params.assetId)
//     let proposal = context.getters.proposalsById.get(params.proposalId)
//     let voteType = params.voteType

//     params.$toast.show("Confirming transaction...", {
//       duration: false
//     })

//     const status = await dao.vote(asset, proposal, voteType);
//     params.$toast.clear();

//     if (status) {
//       params.$toast.success("Transaction confirmed!");
//       context.dispatch("refreshProposalsDataForAsset", { assetId: params.assetId })
//     } else {
//       params.$toast.error("Transaction failed. See details in MetaMask.");
//     }
//   },
// }

// const mutations = {
//   setWallet(state, wallet) {
//     state.user.wallet = wallet
//   },

//   setEthBalance(state, ethBalance) {
//     state.user.wallet.ethBalance = ethBalance
//   },

//   setAssets(state, assets) {
//     state.platform.assets = assets
//   },

//   setProposalsForAsset(state, { proposals, assetId }) {
//     state.platform.proposals.set(assetId, proposals)
//   },

//   setAlert(state, alert) {
//     state.interface.alert = alert
//   }
// }

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// }