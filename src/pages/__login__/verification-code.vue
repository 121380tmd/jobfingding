<template>
  <div>
    <GbRequest :api-method="getCode">
      <template #dataScope="{data, loading}">
        {{data}}
        {{loading}}
        <img :src="data.image" alt="验证码">
      </template>
    </GbRequest>
  </div>
</template>

<script>
import GbRequest from "@/components/gb-request"
import api from "@/api"
export default {
  name: "VerificationCode",
  components: { GbRequest },
  props: {
    captchaCode: {
      type: String
    },
    captchaId: {
      type: String
    },
  },
  data() {
    return {
      getCode: api.getCode
    }
  }
}
</script>

<style lang="less" scoped>

</style>
