import BaseProposal from "./proposals/baseProposal";

/**
 * Vote model.
 * @property {string} proposalID ID of the proposal this vote belongs to
 * @property {string} voterAddress Address of the voter
 * @property {number} count Voting power of the voter
 */

export class Vote extends BaseProposal {

  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      voter: "",
      voteDirection: [],
      count: null
    }
  }

  // constructor(
  //   proposalID,
  //   voterAddress,
  //   type,
  //   count
  // ) {
  //   this.proposalID = proposalID
  //   this.voterAddress = voterAddress
  //   this.type = type
  //   this.count = count
  // }
}

const VoteType = {
  Yes: "Yes",
  No: "No",
  Abstain: "Abstain"
}

export { VoteType }