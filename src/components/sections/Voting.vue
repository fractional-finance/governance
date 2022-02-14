<template>
  <div v-if="asset" class="container p-5 is-dark">
    <div class="columns is-centered" v-if="proposals">
      <ul class="column is-half mt-5 mb-5 mr-1 ml-1">
        <li>
          <div class="panel mt-2 mb-2 p-4">
            <a href="javascript:void(0)" @click="createProposal"
              ><strong>Create a new proposal...</strong></a
            >
          </div>
        </li>
        <li v-for="proposal in proposals" :key="proposal.id">
          <ProposalListItem :assetId="assetId" :proposal="proposal" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.content.is-vcentered {
  display: flex;
  flex-wrap: wrap;
  align-content: center; /* used this for multiple child */
}
</style>

<script>
import { toFixedNumber } from "../../utils/common"
import { mapGetters, mapActions } from "vuex"
import ProposalListItem from "../views/voting/ProposalListItem.vue"

export default {
  name: "Voting",
  props: {
    assetId: {
      type: String,
      required: true,
    },
  },
  components: {
    ProposalListItem,
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
      return this.asset.owners.get(this.walletAddress) ?? 0
    },

    asset() {
      return this.assetMap.get(this.assetId)
    },

    proposals() {
      return this.assetProposalMap.get(this.assetId)
    },

    timestamp() {
      return Math.floor(Date.now() / 1000)
    },

    openProposalCount() {
      return this.asset.proposals.filter((p) => {
        return p.endTimestamp > this.timestamp
      }).length
    },

    orderToString() {
      return toFixedNumber(this.orderToValue)
    },

    orderFromString() {
      return toFixedNumber(this.orderFromValue)
    },

    askPrice() {
      var askETH = this.assetPrices.get(this.asset.id).ask
      if (askETH) {
        askETH = askETH.toString() / Math.pow(10, 18)
      } else {
        askETH = 0.0
      }
      return askETH
    },
    askPriceString() {
      return toFixedNumber(this.askPrice)
    },
  },
  methods: {
    ...mapActions({
      refresh: "refreshProposalsDataForAsset",
      syncWallet: "syncWallet",
      swap: "swapToAsset",
    }),

    goBack() {
      this.$router.back()
    },

    createProposal() {
      this.$router.push(`/dao/${this.assetId}/proposals/create`)
    },
    isNumber(evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    /* eslint-disable indent */
    orderInputUpdated(index, event) {
      switch (index) {
        case 0:
          this.orderFromValue = event.target.value
          console.log("eth field value", event.target.value)
          this.orderToValue = this.convertToShares(
            this.orderFromValue
          ).toString()
          break
        case 1:
          this.orderToValue = event.target.value
          console.log("shares field value", event.target.value)
          this.orderFromValue = this.convertToETH(this.orderToValue).toString()
          break
        default:
          break
      }
    },
    convertToETH(shares) {
      console.log(this.askPrice)
      return shares * this.askPrice
    },
    convertToShares(eth) {
      return eth / this.askPrice
    },
    async performSwap() {
      await this.swap({
        asset: this.asset,
        amount: this.orderToValue,
        $toast: this.$toast,
      })
      this.orderFromValue = 0
      this.orderToValue = 0
    },
  },
  data() {
    return {
      numberFormat: new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 3,
      }),
      orderFromValue: "",
      orderToValue: "",
    }
  },
  mounted() {
    this.refresh({ assetId: this.assetId })
    this.syncWallet()
  },
}
</script>
