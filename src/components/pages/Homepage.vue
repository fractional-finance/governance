<template>
  <div v-if="assetId" class="container p-5 is-dark">
    <StackNavigationBar @onBack="goBack" :address="assetId" />
    <p>
      Welcome to the living charter and Operating Agreement of 12321 DAO LLC (DBA WeavrDAO). </p>
    <p>
      Please take a look at the <a href="https://bafybeidibuergjupi4aa44imcokjkv3vlsmkv3wok7uza65j4nqvjtep7e.ipfs.w3s.link/ipfs/bafybeidibuergjupi4aa44imcokjkv3vlsmkv3wok7uza65j4nqvjtep7e/12321%20DAO%20LLC%20Operating%20Agreement_redacted.pdf">
      Initial Operating Agreement</a>, <a href="https://bafybeihqk7gdugpbvzaivp6dvedp7puoer6xzhnftzqseg6njlcsvj6f6i.ipfs.w3s.link/ipfs/bafybeihqk7gdugpbvzaivp6dvedp7puoer6xzhnftzqseg6njlcsvj6f6i/12321_DAO_LLC_Formation_Declaration_redacted.pdf">
      Initial Director Resolutions </a>,
      and the <a href="https://bafybeidetmv6dqrgljhuk4wvgl3gonsgyftehl2hhz6kyzqvgvkpq7e47i.ipfs.w3s.link/ipfs/bafybeidetmv6dqrgljhuk4wvgl3gonsgyftehl2hhz6kyzqvgvkpq7e47i/12321%20DAO%20LLC%20Certificate%20of%20Formation_redacted.pdf">
      Certificate of Formation </a> for more information.
    </p>
      <ProposalList
        :proposals="resolutions"
        :assetId="assetId"
        :proposalStatus="`Passed Resolutions`"/>
      <router-view :assetId="assetId"></router-view>
  </div>
</template>

<style scoped>

.container {
  min-height: calc(100vh - 230px);
}
.content.is-vcentered {
  display: flex;
  flex-wrap: wrap;
  align-content: center; /* used this for multiple child */
}

.columns {
   /* Bulma uses negative margin and ruins alignment  */
  margin-left: unset !important;
  margin-right: unset !important;
  margin-top: 1.5rem;
  gap: 1.5rem;
}
</style>

<script>
import { toFixedNumber } from "../../utils/common";
import { mapGetters, mapActions } from "vuex";
import StackNavigationBar from "../layout/navigation/StackNavigationBar.vue";
import ProposalList from "../proposals/ProposalList.vue";
import { getResult, isResolution } from "../../data/helpers";
import { PASSED } from "@/models/common";

export default {
  name: "Voting",
  props: {
    assetId: {
      type: String,
      required: true,
    },
  },
  components: {
    StackNavigationBar,
    ProposalList,
},
  computed: {
    ...mapGetters({
      assetMap: "assetsById",
      assetProposalMap: "assetProposals",
      ethBalance: "userEthBalance",
      walletAddress: "userWalletAddress",
      assetPrices: "bestAssetPrices",
    }),

    shareBalance() {
      return this.asset.owners.get(this.walletAddress) ?? 0;
    },

    asset() {
      return this.assetMap.get(this.assetId);
    },

    proposals() {
      return this.assetProposalMap;
    },

    timestamp() {
      return Math.floor(Date.now() / 1000);
    },

    openProposalCount() {
      return this.asset.proposals.filter((p) => {
        return p.endTimestamp > this.timestamp;
      }).length;
    },

    orderToString() {
      return toFixedNumber(this.orderToValue);
    },

    orderFromString() {
      return toFixedNumber(this.orderFromValue);
    },

    askPrice() {
      var askETH = this.assetPrices.get(this.asset.id).ask;
      if (askETH) {
        askETH = askETH.toString() / Math.pow(10, 18);
      } else {
        askETH = 0.0;
      }
      return askETH;
    },
  
    askPriceString() {
      return toFixedNumber(this.askPrice);
    },

    activeProposals() {
      return this.assetProposalMap.filter((proposal) => {
        const endTime = new Date(proposal.endTimestamp * 1000);
        const currentTime = new Date();
        return currentTime < endTime;
      });
    },

    pastProposals() {
      return this.assetProposalMap.filter((proposal) => {
        const endTime = new Date(proposal.endTimestamp * 1000);
        const currentTime = new Date();
        return currentTime > endTime;
      });
    },

    resolutions() {
      return this.assetProposalMap.filter((proposal) => {
        const endTime = new Date(proposal.endTimestamp * 1000);
        const currentTime = new Date();
        const hasEnded =  currentTime > endTime;
        return (isResolution(proposal) && hasEnded && getResult(proposal) === PASSED.Yes);
      })
    },

  },

  methods: {
    ...mapActions({
      refresh: "refreshProposalsDataForAsset",
      syncWallet: "syncWallet",
      swap: "swapToAsset",
    }),

    goBack() {
      this.$router.back();
    },

    createProposal() {
      this.$router.push(`/dao/${this.assetId}/paperProposal`);
    },
  
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    /* eslint-disable indent */
    orderInputUpdated(index, event) {
      switch (index) {
        case 0:
          this.orderFromValue = event.target.value;
          this.orderToValue = this.convertToShares(
            this.orderFromValue
          ).toString();
          break;
        case 1:
          this.orderToValue = event.target.value;
          this.orderFromValue = this.convertToETH(this.orderToValue).toString();
          break;
        default:
          break;
      }
    },
  
    convertToETH(shares) {
      return shares * this.askPrice;
    },
  
    convertToShares(eth) {
      return eth / this.askPrice;
    },
  
    async performSwap() {
      await this.swap({
        asset: this.asset,
        amount: this.orderToValue,
        $toast: this.$toast,
      });
      this.orderFromValue = 0;
      this.orderToValue = 0;
    },
  },

  data() {
    return {
      numberFormat: new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 3,
      }),
      orderFromValue: "",
      orderToValue: "",
      proposalsList: this.proposals,
    };
  },

  mounted() {
    this.refresh({ assetId: this.assetId });
  },
};
</script>