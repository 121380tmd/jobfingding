<route>
{
  "meta": {
    "requiresAuth": false,
    "invisible": false,
    "title": "404"
  }
}
</route>

<template>
  <div class="http404-container">
    <div class="http404">
      <div class="pic-404">
        <img class="pic-404-parent" src="~@/assets/images/not-found/404_images/404.png" alt="404">
        <img class="pic-404-child left" src="~@/assets/images/not-found/404_images/404-cloud.png" alt="404">
        <img class="pic-404-child mid" src="~@/assets/images/not-found/404_images/404-cloud.png" alt="404">
        <img class="pic-404-child right" src="~@/assets/images/not-found/404_images/404-cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit-oops">
          OOPS!
        </div>
        <div class="bullshit-headline">
          无权限访问或无此页面
        </div>
        <div class="bullshit-info">
          请检查您输入的网址是否正确，请点击以下按钮返回主页
        </div>
        <router-link to="/" class="bullshit-return-home">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "NotFound",
  layout: "layout-blank",
}
</script>

<style lang="less" scoped>
.http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
  .pic-404 {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;
    &-parent {
      width: 100%;
    }
    &-child {
      position: absolute;
      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }
      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }
  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
    &-oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: @primary-color;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &-headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &-info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &-return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: @primary-color;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
