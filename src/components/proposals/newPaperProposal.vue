<template>
<div class="container p-5">
  <div class="tag has-background-mediumBlue has-text-white mb-5 is-medium">New Paper Proposal</div>
  <!-- PAPER PROPOSAL FORM -->
  <div class="field">
    <label class="label">Title</label>
    <div class="control">
      <input class="input" v-model="title" type="text" placeholder="Enter title here">
    </div>
  </div>
  
  <div class="field">
    <label class="label">Description</label>
    <div class="control">
      <textarea class="textarea" v-model="description" placeholder="Enter description here"></textarea>
    </div>
  </div>

  <div class="is-flex is-justify-content-space-between mt-5">
    <button @click="publish" class="button has-background-mint has-text-white has-text-weight-bold">Submit Proposal</button>
    <button @click="onCancel" class="button has-background-red has-text-white has-text-weight-bold">Cancel</button>
  </div>
  <!-- End Form -->
</div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CommonProposalType } from "@/models/common.js"
export default {

  name: "newPaperProposal",
  props: {
    assetId: {
      type: String,
      required: true,
    }
  },
  data(){
    return {
      title: "",
      description: "",
      proposalType: CommonProposalType.Paper
    }
  },
  computed: {
    ...mapGetters({
      assetMap: "assetsById",
    }),
    
    asset() {
      return this.assetMap.get(this.assetId);
    },
  },
  methods: {
    ...mapActions({
      refresh: "refreshProposalsDataForAsset",
      syncWallet: "syncWallet",
      createPaperProposal: "createPaperProposal",
    }),
    async publish() {
      console.dir(this.trigger);
      if (this.title.length < 1 || this.description.length < 1) {
        return;
      }
      
      const assetAddr = this.assetId;
      console.log("ADD:" + assetAddr)
      const title = this.title;
      const description = this.description;
      const proposalType = this.proposalType
      
      await this.createPaperProposal({assetAddr, proposalType, title, description});
    },
    onCancel() {
      this.$router.push("/frabric");
    }
  },
  mounted() {
    this.refresh({ assetId: this.assetId });
    this.syncWallet();
  },
}
</script>
