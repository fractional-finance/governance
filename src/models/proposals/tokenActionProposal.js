import BaseProposal from "./baseProposal";

/**
 * Proposal model.
 * @property {string} id ID of the proposal
 * @property {string} creatorAddress Address of the proposal creator
 * @property {number} startTimestamp Unix timestamp marking the start of the voting window
 * @property {number} endTimestamp Unix timestamp marking the end of the voting window
 * @property {Vote[]} votes Votes posted on the proposal
 * @property {bool} supermajority Signal if the supermagiority is required or not
 * @property {string} description Description of the proposal
 * @property {string} token Name of the thread
 * @property {string} target Symbol of the thread
 * @property {boolean} mint
 * @property {number} price
 * @property {number} amount
*/

class TokenActionProposal extends BaseProposal{
  defaults(){
    return {
      id: null,
      frabric: [],
      thread: [],
      token: "",
      target: "",
      mint: false,
      price: null,
      amount: null
    }
  }
  // constructor(
  //   id,
  //   thread,
  //   frabric,
  //   creator,
  //   type,
  //   state,
  //   votes,
  //   supermajority,
  //   startTimestamp,
  //   endTimestamp,
  //   description,
  //   token,
  //   target,
  //   mint,
  //   price,
  //   amount
  // ) {
  //   super(
  //     id,
  //     thread,
  //     frabric,
  //     creator,
  //     type,
  //     state,
  //     votes,
  //     supermajority,
  //     startTimestamp,
  //     endTimestamp
  //   );
  //   this.description = description;
  //   this.token = token;
  //   this.target = target;
  //   this.mint = mint;
  //   this.price = price;
  //   this.amount = amount;
  // }
}


export default TokenActionProposal