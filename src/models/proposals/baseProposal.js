/* eslint-disable class-methods-use-this */
import { Model } from "vue-mc"

/**
 * BaseProposal Model
 */
export default class BaseProposal extends Model {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: "",
      thread: [],
      frabric: [],
      creator: "",
      type: null,
      state: [],
      votes: [],
      info: "",
      supermajority: false,
      startTimestamp: null,
      endTimestamp: null,    
    }
  }
}