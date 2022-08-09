import BaseProposal from "./baseProposal";

/**
 * Paper Proposal model.
*/

export default class PaperProposal extends BaseProposal {
  
  defaults() {
    return {
      id: null,
      frabric: []
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
  //   title,
  //   description
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
  //   this.title = title;
  //   this.description = description;
  // }
}