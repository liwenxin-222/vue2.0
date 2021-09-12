<template>
  <div class="maintain-manage mapbox">
    <MMap ref="map"></MMap>
    <div class="top">
      <div class="top-left">
        <el-button size="small">监督管理系统</el-button>
        <el-button size="small">近一月问题发生与整改情况</el-button>
        <el-button size="small">问题发生类型分析</el-button>
        <el-button size="small">监督案件处理情况</el-button>
      </div>
      <p>{{ currentTime }}</p>
      <!-- 地图图层配置 -->
      <div class="top-right">
        <span v-for="({ label, key, funcName }) in layerConfig" :key="key" :class="{ active: activeMapLayer === key }"
              @click="layerConfigBindClick(key, funcName)">
          {{ label }}
        </span>
      </div>
    </div>

    <div class="overview">
      <div class="situation">
        <div class="title">
          <img src="../assets/icon_maintain_01.png" class="icon-maintain" alt="">
          <span>今日数据</span>
        </div>
        <div class="situation-content">
          <div class="situationItem">
            <div>市长热线</div>
            <div>接办<span>2</span>件&nbsp;整改<span>2</span>件</div>
          </div>
          <div class="situationItem">
            <div>区网格案件</div>
            <div>接办<span>2</span>件&nbsp;整改<span>2</span>件</div>
          </div>
          <div class="situationItem">
            <div>市局督办</div>
            <div>接办<span>2</span>件&nbsp;整改<span>2</span>件</div>
          </div>
          <div class="situationItem">
            <div>巡查问题</div>
            <div>接办<span>2</span>件&nbsp;整改<span>2</span>件</div>
          </div>
        </div>
        <div class="situation-footer">
          <img src="../assets/icon_maintain_user.png" class="icon-maintain" alt="">
          <span>巡查人员</span>
          <span class="situationUserCount">50人</span>
        </div>
      </div>

      <div class="timeout-work">
        <div class="title">
          <img src="../assets/icon_supervison_01.png" class="icon-maintain" alt="">
          <span>超期问题</span>
        </div>
        <div class="timeout-content">
          <img style="margin-top: 8px" src="../assets/icon_supervison_02.png" class="icon-maintain" alt="">
          <div class="timeout-content-right">
            <div class="timeout-content-right-item">
              <span>超期30天</span>
              <div class="timeout-content-right-progress">
                <span class="progress"></span>
                3个
              </div>
              <span class="timeout-content-detailButton">详情</span>
            </div>
            <div class="timeout-content-right-item">
              <span>超期30天</span>
              <div class="timeout-content-right-progress">
                <span class="progress"></span>
                3个
              </div>
              <span class="timeout-content-detailButton">详情</span>
            </div>
            <div class="timeout-content-right-item">
              <span>超期30天</span>
              <div class="timeout-content-right-progress">
                <span class="progress"></span>
                3个
              </div>
              <span class="timeout-content-detailButton">详情</span>
            </div>
            <div class="timeout-content-right-item">
              <span>超期30天</span>
              <div class="timeout-content-right-progress">
                <span class="progress"></span>
                3个
              </div>
              <span class="timeout-content-detailButton">详情</span>
            </div>
          </div>
        </div>
      </div>
      <div class="reception">
        <div class="title">
          <span style="margin-left: 20px">全区接办问题处理进度</span>
        </div>
        <div class="reception-content">
          <el-steps direction="vertical">
            <el-step title="接办待分发" description="的描述性文字"></el-step>
            <el-step title="养护待派发" description="的描述性文字"></el-step>
            <el-step title="养护待问题" description="的描述性文字"></el-step>
            <el-step title="养护待复核" description="的描述性文字"></el-step>
            <el-step title="监督待复查" description="的描述性文字"></el-step>
            <el-step title="已超期问题" description="的描述性文字"></el-step>
            <el-step title="完结"></el-step>
          </el-steps>
        </div>
      </div>
    </div>

    <div class="map-layers">

    </div>

    <div class="map-legend">
      <div class="map-legend-item">
        <span>待派发</span>
        <span class="color-pane"></span>
      </div>
      <div class="map-legend-item">
        <span>待整改</span>
        <span class="color-pane"></span>
      </div>
      <div class="map-legend-item">
        <span>待复核</span>
        <span class="color-pane"></span>
      </div>
      <div class="map-legend-item">
        <span>待完结</span>
        <span class="color-pane"></span>
      </div>
    </div>
    <el-button type="text" @click="changeTheAnalysisDialogVisible">点击打开 Dialog</el-button>

    <el-dialog
        title="监督案件处理情况"
        :visible.sync="centerDialogVisible"
        width="1100px"
    >
      <div class="TheCaseProcessingModal">
        <div class="TheCaseProcessingItem statu1">
          <div class="TheCaseProcessingItem-top">
            <el-progress color="rgb(1, 167, 240)" type="circle" :percentage="80" stroke-width="12" width="100"></el-progress>
            <div class="TheCaseProcessingItem-top-text">
              <div style="margin-bottom: 8px">接办：120件</div>
              <div style="margin-bottom: 8px">办理：10件</div>
              <div style="margin-bottom: 12px">满意：10件</div>
              <div>满意率：10件</div>
            </div>
          </div>
          <div class="TheCaseProcessingItem-bottem">
            <div class="TheCaseProcessingItem-bottem-title">市长热线</div>
            <el-button size="small">查看详细</el-button>
          </div>
        </div>
        <div class="TheCaseProcessingItem statu2">
          <div class="TheCaseProcessingItem-top">
            <el-progress color="rgb(245, 155, 34)" type="circle" :percentage="80" stroke-width="12" width="100"></el-progress>
            <div class="TheCaseProcessingItem-top-text">
              <div style="margin-bottom: 8px">接办：120件</div>
              <div style="margin-bottom: 8px">整改：10件</div>
              <div style="margin-bottom: 12px">回复：10件</div>
            </div>
          </div>
          <div class="TheCaseProcessingItem-bottem">
            <div class="TheCaseProcessingItem-bottem-title">区网格案件</div>
            <el-button size="small">查看详细</el-button>
          </div>
        </div>
        <div class="TheCaseProcessingItem statu3">
          <div class="TheCaseProcessingItem-top">
            <el-progress color="rgb(75, 122, 2)" type="circle" :percentage="80" stroke-width="12" width="100"></el-progress>
            <div class="TheCaseProcessingItem-top-text">
              <div style="margin-bottom: 8px">接办：120件</div>
              <div style="margin-bottom: 8px">整改：10件</div>
              <div style="margin-bottom: 12px">回复：10件</div>
              <div>满意率：10件</div>
            </div>
          </div>
          <div class="TheCaseProcessingItem-bottem">
            <div class="TheCaseProcessingItem-bottem-title">市局督办</div>
            <el-button size="small">查看详细</el-button>
          </div>
        </div>
        <div class="TheCaseProcessingItem statu4">
          <div class="TheCaseProcessingItem-top">
            <el-progress color="rgb(2, 191, 191)" type="circle" :percentage="80" stroke-width="12" width="100"></el-progress>
            <div class="TheCaseProcessingItem-top-text">
              <div style="margin-bottom: 8px">发现：120件</div>
              <div style="margin-bottom: 8px">整改：10件</div>
              <div>整改率：10件</div>
            </div>
          </div>
          <div class="TheCaseProcessingItem-bottem">
            <div class="TheCaseProcessingItem-bottem-title">巡查问题</div>
            <el-button size="small">查看详细</el-button>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="近一月问题发生与整改情况"
        :visible.sync="improveDialogVisible"
        width="800px"
    >
      <div class="TheImproveDialog">

      </div>
    </el-dialog>
    <el-dialog
        title="问题发生类型分析"
        :visible.sync="analysisDialogVisible"
        width="1100px"
    >
      <div class="TheAnalysisDialog">
        <div class="analysis-left"></div>
        <div class="analysis-right"></div>
      </div>
      <div class="TheAnalysisDialog-title">
        <div class="analysis-title-left">各类问题占比</div>
        <div class="analysis-title-right">各类问题数量</div>
      </div>
    </el-dialog>
    <div class="aabb"></div>
  </div>
</template>

<script>
import MMap from './m-map.vue'
import moment from 'moment'
import $ from 'jquery';
import * as echarts from 'echarts'
import {returnRateOptions} from './echarts-func.js'

const layerConfig = [
  {label: '2d地图', key: '2d', funcName: 'setMapLayer2d'},
  {label: '卫星地图', key: 'satellite', funcName: 'setMapLayerSatellite'}
]

export default {
  components: {
    MMap
  },
  data() {
    return {
      currentTime: moment().format('YYYY年MM月DD日'),
      activeMapLayer: '2d',
      layerConfig,
      centerDialogVisible: false,
      improveDialogVisible: false,
      analysisDialogVisible: false,
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    layerConfigBindClick(key, funcName) {
      this.activeMapLayer = key;
      this.$refs.map && this.$refs.map[funcName]();
    },
    changeTheCaseProcessingDialogVisible() {
      this.centerDialogVisible = true;
    },
    changeTheImproveDialogVisible() {
      this.improveDialogVisible = true;
    },
    changeTheAnalysisDialogVisible() {
      this.analysisDialogVisible = true;
      this.$nextTick(() => {
        const analysisLeftDom = document.querySelector('.analysis-left');
        const analysisRightDom = document.querySelector('.analysis-right');
        this.analysisLeft = echarts.init(analysisLeftDom);
        this.analysisRight = echarts.init(analysisRightDom);

        const optionLeft = {
          // title: {
          //   text: '各类问题占比',
          //   bottom: 0,
          //   left: 'center',
          //   textStyle: {
          //     color: 'rgb(2, 191, 191)',
          //     fontSize: 24
          //   }
          // },
          // tooltip: {
          //   trigger: 'item',
          //   formatter: '{a} <br/>{b} : {c} ({d}%)'
          // },
          legend: {
            top: 0,
            left: 'center',
            data: ['浇水', '病虫害防治', '施肥', '补植补种', '修剪'],
            // borderColor: '#FFFFFFF',
            // borderWidth: 2,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12
            }
          },
          series: [
            {
              name: '类型',
              type: 'pie',
              radius: ['50%', '70%'],
              left: 'center',
              top: 'center',
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              width: 200,
              height: 200,
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true,
              },
              data: [
                {value: 335, name: '浇水'},
                {value: 310, name: '病虫害防治'},
                {value: 234, name: '施肥'},
                {value: 135, name: '补植补种'},
                {value: 1548, name: '修剪'},
              ]
            }
          ]
        };
        this.analysisLeft.setOption(optionLeft);

        const optionRight = {
          // title: {
          //   text: '各类问题数量',
          //   bottom: 0,
          //   left: 'center',
          //   textStyle: {
          //     color: 'rgb(2, 191, 191)',
          //     fontSize: 24
          //   }
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            top: 0,
            left: 'center',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12
            },
            data: ['2011年', '2012年']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['缺株', '安全', '设施', '修剪', '病虫害', '垃圾']
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
              name: '2012年',
              type: 'bar',
              data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
          ]
        };
        this.analysisRight.setOption(optionRight);

      })
    },
  }
}
</script>

<style lang="less" scoped>
@bgColor: rgba(0, 0, 0, 0.7);
@sysColor: #4aa3a4;


@status1: rgb(1, 167, 240);
@status2: rgb(245, 155, 34);
@status3: rgb(75, 122, 2);
@status4: rgb(2, 191, 191);

.mapbox {
  position: relative;
  width: 100%;
  height: 100vh;
  color: @sysColor;
}

.top {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
  color: @sysColor;
  background-color: @bgColor;

  .top-left {
    flex: 1;
  }

  .top-right {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    color: white;

    > span {
      cursor: pointer;

      &.active {
        color: @sysColor;
      }

      &:nth-of-type(2) {
        margin-left: 7px;
      }
    }
  }
}

.maintain-manage {
  .map-layers {
    position: absolute;
    top: 50px;
    right: 0px;
    height: 300px;
    width: 200px;
    box-sizing: border-box;
    background-color: @bgColor;
    border-top: 4px solid @sysColor;
  }
}

.overview {
  width: 360px;
  background-color: @bgColor;
  height: calc(100% - 50px);
  box-sizing: border-box;
  position: absolute;
  top: 50px;
  left: 0px;
  border-top: 4px solid @sysColor;
  font-size: 13px;

  .title {
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1.5px solid #e89f42;
    font-size: 16px;
    height: 42px;
  }

  .situation {
    color: #7dfb4c;
    font-size: 13px;
    height: 195px;

    .title {
      color: @sysColor;
    }

    .situation-content {
      display: flex;
      flex-wrap: wrap;

      .situationItem {
        flex: 40%;
        padding: 4px;
      }

    }

    .situation-footer {
      display: flex;
      align-items: center;
      padding: 4px;

      .situationUserCount {
        margin-left: 32px;
      }
    }

  }

  .timeout-work {
    color: #e89f42;
    font-size: 14px;
    height: 185px;

    .timeout-content {
      display: flex;
      padding: 16px;

      .timeout-content-right {
        flex: 1;

        .timeout-content-right-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }

        .timeout-content-right-progress {
          flex: 1;
          margin: 0 16px;
          display: flex;
          align-items: center;
          font-size: 18px;

          .progress {
            width: 50%;
            background-color: red;
            border-radius: 8px;
            display: inline-block;
            height: 16px;
            margin-right: 4px;
          }
        }

        .timeout-content-detailButton {
          cursor: pointer;
          color: @sysColor;
        }
      }
    }
  }

  .reception {
    .title {
      color: @sysColor;
    }

    .reception-content {
      height: 300px;
      padding: 16px 20px;

      /deep/ .el-step__title.is-wait {
        color: @sysColor;
      }

      /deep/ .el-step__description.is-wait {
        color: @sysColor;
      }
    }
  }

}

.map-legend {
  position: absolute;
  bottom: 32px;
  left: calc(50% - 166px);
  width: 380px;
  padding: 16px 24px;
  background-color: rgba(0, 0, 0, .8);
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .map-legend-item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .color-pane {
    display: block;
    width: 20px;
    height: 20px;
    background-color: blue;
    margin-left: 20px;
  }
}

/deep/ .el-dialog {
  background-color: rgba(0, 0, 0, .7);

  .el-dialog__header {
    border-bottom: 1px solid #e89f42;
    padding: 10px 20px;

    .el-dialog__title {
      color: @sysColor;
      font-size: 14px;
    }

    .el-dialog__headerbtn {
      top: 10px;
    }

    .el-dialog__close {
      font-size: 24px;
    }
  }
}

.TheCaseProcessingModal {
  padding: 50px 32px;
  color: #7dfb4c;
  display: flex;
  justify-content: space-between;

  .TheCaseProcessingItem {

    &.statu1 {
      /deep/ .el-progress__text {
        font-size: 25px !important;
        color: @status1;
      }
    }
    &.statu2 {
      /deep/ .el-progress__text {
        font-size: 25px !important;
        color: @status2;
      }
    }
    &.statu3 {
      /deep/ .el-progress__text {
        font-size: 25px !important;
        color: @status3;
      }
    }
    &.statu4 {
      /deep/ .el-progress__text {
        font-size: 25px !important;
        color: @status4;
      }
    }


    width: 210px;

    .TheCaseProcessingItem-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 100px;

      .TheCaseProcessingItem-top-text {
        margin-left: 12px;
      }

    }

    .TheCaseProcessingItem-bottem {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 24px;

      padding: 0 8px;

      .TheCaseProcessingItem-bottem-title {
        font-size: 20px;
        margin-right: 12px;
      }

    }

  }

}

.TheAnalysisDialog {
  padding: 0 48px;
  display: flex;

  .analysis-left {
    width: 300px;
    height: 300px;
  }
  .analysis-right {
    width: 700px;
    height: 300px;
  }
}
.TheAnalysisDialog-title {
  color: rgb(2, 191, 191);
  font-size: 24px;
  padding: 0 48px;
  display: flex;

  .analysis-title-left {
    width: 300px;
    text-align: center;
  }
  .analysis-title-right {
    width: 700px;
    text-align: center;
  }

}

.icon-maintain {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
</style>








