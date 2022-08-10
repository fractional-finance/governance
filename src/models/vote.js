/* eslint-disable class-methods-use-this */
import { Collection, Model } from "vue-mc";
import { ethers } from "ethers";

/**
 * Vote model.
 */

export class Vote extends Model {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: "",
      voter: "",
      voteDirection: "",
      count: 0,
    }
  }

  mutations() {
    return {
      id: String,
      voter: String,
      voteDirection: String,
      count: (count) => ethers.utils.parseEther(count),
    }
  }
}


export class Votes extends Collection {
  model() {
    return Vote;
  }
}

export const VoteType = {
  Yes: "Yes",
  No: "No",
  Abstain: "Abstain"
}