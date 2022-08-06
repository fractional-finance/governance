import BaseProposal from "./baseProposal";

/**
 * Participant Proposal model.
 * @property {string} id ID of the proposal
 * @property {string} creatorAddress Address of the proposal creator
 * @property {number} startTimestamp Unix timestamp marking the start of the voting window
 * @property {number} endTimestamp Unix timestamp marking the end of the voting window
 * @property {Vote[]} votes Votes posted on the proposal
 * @property {bool} supermajority Signal if the supermagiority is required or not
 * @property {string} description Description of the proposal
 * @property {ParticipantType} participantType Type of participant to propose
 * @property {string} participant Address of the participant to propose
*/

class ParticipantProposal extends BaseProposal{
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

export default {ParticipantProposal}