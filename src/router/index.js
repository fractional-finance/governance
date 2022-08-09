import { createRouter, createWebHashHistory } from 'vue-router'
import Voting from '@/components/sections/Voting.vue'
import newPaperProposal from "@/components/proposals/newPaperProposal.vue"
import newParticipantProposal from "@/components/proposals/newParticipantProposal.vue"
import newUpgradeProposal from "@/components/proposals/newUpgradeProposal.vue"
import newTokenAction from "@/components/proposals/newTokenAction.vue"
import vouch from "@/components/proposals/vouch"
export default new createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/frabric"
    },
    {
      path: "/dao/:assetId",
      component: Voting,
      props: {assetId: "0x8C1a3931102f4D65c91f2DDA5166f8970f2760A8"},
      alias: "/frabric",
      children: [
        {
          path: "paperProposal",
          component: newPaperProposal,
          props: {assetId: "dd"}
        },
        {
          path: "participantProposal",
          component: newParticipantProposal,
          props: {assetId: "dd"}
        },
        {
          path: "upgradeProposal",
          component: newUpgradeProposal,
          props: {assetId: "dd"}
        },
        {
          path: "tokenProposal",
          component: newTokenAction,
          props: {assetId: "dd"},
        },
        {
          path: "vouch",
          component: vouch,
          props: {assetId: "dd"}
        }
      ]
    }
  ],
})
