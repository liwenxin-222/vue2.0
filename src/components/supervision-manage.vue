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
      <p>{{currentTime}}</p>
      <!-- 地图图层配置 -->
      <div class="top-right">
        <span v-for="({ label, key, funcName }) in layerConfig" :key="key" :class="{ active: activeMapLayer === key }" @click="layerConfigBindClick(key, funcName)">
          {{label}}
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
    <el-button type="text" @click="changeDialogVisible">点击打开 Dialog</el-button>
    <el-dialog
        title="监督案件处理情况"
        :visible.sync="centerDialogVisible"
        width="1100px"
    >
        <div class="TheCaseProcessingModal">
          <div class="TheCaseProcessingItem">
            <div class="TheCaseProcessingItem-top">
              <el-progress stroke="red" type="circle" :percentage="80" stroke-width="12" width="100"></el-progress>
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
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MMap from './m-map.vue'
import moment from 'moment'
import $ from 'jquery';
import * as echarts from 'echarts'
import { returnRateOptions } from './echarts-func.js'

const layerConfig = [
  { label: '2d地图', key: '2d', funcName: 'setMapLayer2d' },
  { label: '卫星地图', key: 'satellite', funcName: 'setMapLayerSatellite' }
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
      centerDialogVisible: true
    }
  },
  mounted() {

  },
  methods: {
    layerConfigBindClick(key, funcName) {
      this.activeMapLayer = key;
      this.$refs.map && this.$refs.map[funcName]();
    },
    changeDialogVisible() {
      this.centerDialogVisible = true;
    },
    changeCircleColor(className, color) {
      $(className).find('svg').find('path')[1].attr({stroke: color});
    }
  }
}
</script>

<style lang="less" scoped>
@bgColor: rgba(0, 0, 0, 0.7);
@sysColor: #4aa3a4;

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
  background-color: rgba(0,0,0,.8);
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
  background-color: rgba(0,0,0,.7);

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

  .TheCaseProcessingItem {

    width: 210px;

    .TheCaseProcessingItem-top {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .TheCaseProcessingItem-top-text {
        margin-left: 12px;
      }
      /deep/ .el-progress__text {
        font-size: 32px !important;
        color: #7dfb4c;
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
.icon-maintain {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
</style>








