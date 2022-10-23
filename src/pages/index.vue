<route>

{
  "meta": {
    "requiresAuth": true,
    "icon": "home",
    "invisible": true,
    "title": "首页"
  }
}

</route>

<template>
  <div class="home">
    <div class="header">
      <span>
        数据展示
      </span>
    </div>
    <div class="content">
      <div class="box">
        <div class="box-1">
          <span class="num">150<span class="unit">条</span></span>
          <span class="today">今日上传</span>
        </div>
        <div class="box-2">
          <span class="num">150<span class="unit">条</span></span>
          <span class="today">已上传</span>
        </div>
        <div class="box-3">
          <span class="num">150<span class="unit">条</span></span>
          <span class="today">今日上传</span>
        </div>
      </div>
    </div>
    <div class="chart">
      <div class="box-1">
        <div id="main">
        </div>
      </div>
      <div class="box-2">
        <div id="main2">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import { echarts } from "echarts";
export default {
  name: "Home",
  data() {

    return {
      ImgObj: []
    }

  },
  components: {
  },
  methods: {
    fillFormData() {
      let formData = new FormData();
      let photo = this.$refs['ref1'].uploadFiles[0];
      if (photo === undefined) {
        this.$message.error("请选择照片");
        // console.log("xuanzewenti ")
        return false;
      }
      if (photo !== undefined) {
        formData.append('file', photo.raw);//根据后端需要的参数进行相应更改，大多是文件格式
      }
      return formData;
    },

    handleAvatarSuccess(res, file) {
      // console.log(this.ImgObj)
      this.imageUrl = ''
      // console.log(URL)
    },
    beforeAvatarUpload(file) {
      // console.log(this.ImgObj)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传的图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitUpload() {
      this.httpRequest()
    },
    httpRequest() {
      let formData = this.fillFormData();
      // console.log("hello")
      // console.log(this.imageUrl)
      // console.log(this.file)
      api.uploadImg(formData).then((data) => {
        // this.$store.commit("setUserInfo", data)
        // console.log(data)
        this.loginSuccessRedirect()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleRemove(file, fileobj) {
      // console.log(file, fileobj);
    },
    handlePreview(file) {
      // console.log(file);
    },
    echartsTwo() {
      // console.log('123')
      var chartDom = document.getElementById('main2');
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };

      myChart.setOption(option);
    }
  },
  mounted() {
    this.echartsTwo()
    var app = {};
    var chartDom = document.getElementById('main');
    var myChart = this.$echarts.init(chartDom);
    var option;
    const posList = [
      'left',
      'right',
      'top',
      'bottom',
      'inside',
      'insideTop',
      'insideLeft',
      'insideRight',
      'insideBottom',
      'insideTopLeft',
      'insideTopRight',
      'insideBottomLeft',
      'insideBottomRight'
    ];
    app.configParameters = {
      rotate: {
        min: -90,
        max: 90
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right'
        }
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom'
        }
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos;
          return map;
        }, {})
      },
      distance: {
        min: 0,
        max: 100
      }
    };
    app.config = {
      rotate: 90,
      align: 'left',
      verticalAlign: 'middle',
      position: 'insideBottom',
      distance: 15,
      onChange: function () {
        const labelOption = {
          rotate: app.config.rotate,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          position: app.config.position,
          distance: app.config.distance
        };
        myChart.setOption({
          series: [
            {
              label: labelOption
            },
            {
              label: labelOption
            },
            {
              label: labelOption
            },
            {
              label: labelOption
            }
          ]
        });
      }
    };
    const labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {}
      }
    };
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['2012', '2013', '2014', '2015', '2016']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Forest',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390]
        },
        {
          name: 'Steppe',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290]
        },
        {
          name: 'Desert',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190]
        },
        {
          name: 'Wetland',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [98, 77, 101, 99, 40]
        }
      ]
    };

    myChart.setOption(option);
  }

}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-wrap: wrap;
  border-radius: 1%;
}

.header {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  font-size: 2rem;
  border-bottom: 1px rgb(236, 241, 246);
  // background: #000;
}

.content {
  width: 100%;
  height: 20%;
  // background: yellow;
  display: flex;
  justify-content: center;

  .box {
    width: 70%;
    height: 100%;
    display: flex;

    // background: #000;
    .box-1,
    .box-2,
    .box-3 {
      width: 33%;
      display: flex;
      flex-wrap: wrap;

      // background: red;
      .num {
        width: 100%;
        height: 80%;
        display: flex;
        font-size: 4rem;
        justify-content: center;
        align-items: center;
        color: rgb(0, 137, 205);

        .unit {
          display: flex;
          align-items: center;
          font-size: 2rem;
          color: rgb(155, 155, 155);
        }
      }

      .today {
        height: 20%;
        width: 100%;
        display: flex;
        color: black;
        font-weight: bold;
        font-size: 1rem;
        // font-size: 4rem;
        justify-content: center;
      }

      // background: #000;
    }

    .box-2 {
      width: 33%;
      // background: red;
    }

    .box-3 {
      width: 33%;
      // background: pink;
    }
  }
}

.chart {
  width: 100%;
  height: 70%;
  background: pink;
  display: flex;

  .box-1 {
    width: 50%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;

    #main {
      // width: 100%;
      // height: 100%;
      width: 600px;
      height: 500px;
      max-width: 600px;
      min-width: 500px;
      max-height: 500px;
      min-height: 400px;
    }
  }

  .box-2 {
    width: 50%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    #main2 {
      width: 600px;
      height: 500px;
      max-width: 600px;
      min-width: 500px;
      max-height: 500px;
      min-height: 400px;
    }
  }

}
</style>
