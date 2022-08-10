import BaseProposal from "./proposals/baseProposal";

/**
 * Vote model.
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

export const VoteType = {
  Yes: "Yes",
  No: "No",
  Abstain: "Abstain"
}
