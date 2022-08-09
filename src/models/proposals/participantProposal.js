import BaseProposal from "./baseProposal";

/**
 * Participant Proposal model.
*/

export default class ParticipantProposal extends BaseProposal {

  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      frabric: [],
      proposer: "",
      participant: "",
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
  //   participantType,
  //   participant
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
  //   this.participantType = participantType;
  //   this.participant = participant;
  // }
}