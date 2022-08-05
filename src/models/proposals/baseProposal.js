// /**
//  * Proposal model.
//  * @property {string} id ID of the proposal
//  * @property {string} creatorAddress Address of the proposal creator
//  * @property {number} startTimestamp Unix timestamp marking the start of the voting window
//  * @property {number} endTimestamp Unix timestamp marking the end of the voting window
//  * @property {Vote[]} votes Votes posted on the proposal
//  * @property {bool} supermajority signals if the supermagiority is required or not
//  */
// /*
// id: ID!
// thread: Thread
// frabric: Frabric
// creator: Bytes!
// type: Int!
// state: ProposalState!
// votes: [Vote!]!
// info: Bytes!
// supermajority: Boolean!
// startTimestamp: Int!
// endTimestamp: Int!
// */
// class BaseProposal {
//   constructor(
//     id,
//     creatorAddress,
//     startTimestamp,
//     endTimestamp,
//     votes,
//     supermajority
//   ) {
//     this.id = id
//     this.creatorAddress = creatorAddress
//     this.startTimestamp = startTimestamp
//     this.endTimestamp = endTimestamp
//     this.votes = votes
//     this.supermajority = supermajority
//   }
// }

// export default { BaseProposal }

import { Model, Collection } from 'vue-mc'
import { VoteDirection } from '../common.js'

/**
 * BaseProposal Model
 */
class BaseProposal extends Model {

  // Default attributes that define the "empty" state.
  default() {
    return {
      id: '',
      creatorAddress: '',
      startTimestamp: null,
      endTimestamp: null,
      votes: VoteDirection.Abstain,
      supermajority: false,
    }
  }

  // Attribute mutations.
  mutations() {
    return {
      id: String,
      creatorAddress: String,
      startTimestamp: Number(id) || null,
      endTimestamp: Number(id) || null,
      //missing votes (not sure how to make this model representation)
      supermajority: Boolean,
    }
  }

  // Attribute validation.
  validation() {
    return {
      id: string.and(required),
      creatorAddress: string.and(required),
      startTimestamp: integer.and(min(1)).or(equal(null)),
      endTimestamp: integer.and(min(1)).or(equal(null)),
      //missing votes (not sure how to make this model representation)
      supermajority: boolean,
    }
  }

  // Route configuration. ( How does this route config relates with the main routing? )
  // routes() {
  //   return {
  //     fetch: '',
  //     save: '',
  //   }
  // }
}

export default { BaseProposal }