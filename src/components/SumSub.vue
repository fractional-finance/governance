<template>
<div>
  <div class="container p-5">
    <div class="tag is-info">{{externalUserID}}</div>
    <div class="tag is-info">{{decodedExternalUserID}}</div>
    <div class="control">
      <div class="button" @click="launchWebSdk">KYC</div>
      <div id="sumsub-websdk-container"></div>
    </div>
  </div>  
</div>  
</template>

<script>
import snsWebSdk from '@sumsub/websdk';
import { ethers } from 'ethers';
import axios from 'axios';
import crypto from "crypto"
import * as hashingUtils from "../data/network/storage/ipfs/common"


export default {
  name: "SumSub",
  data() {
    return {
      accessToken: process.env.VUE_APP_SUMSUB_TOKEN,
      newAccessToken: "",
      levelName: 'basic-kyc-level',
      ttlInSecs: 600,
      config: {
        baseUrl: "https://api.sumsub.com"
      }
    }
  },
  computed: {
    externalUserID() {
      const address = "0xe4e1aEF9c352a6A56e39f502612cA88a3441CFA5"
      
      const encoded = ethers.utils.defaultAbiCoder.encode(["address", "string"],[address, process.env.VUE_APP_SUMSUB_SALT])
      const array = ethers.utils.arrayify(encoded)

      console.log(String.fromCodePoint(...array))
      return ethers.utils.id(encoded).toString()
    },
    decodedExternalUserID() {
      // const decoded = ethers.utils.defaultAbiCoder.decode(["address", "string"], bytes)
      // console.log(decoded)
      return "decoded"
    }
  },
  methods: { },
  mounted() { }
}
</script>

<style>

</style>

