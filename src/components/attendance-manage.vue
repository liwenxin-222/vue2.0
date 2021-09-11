<template>
  <div class="mapbox">
    <MMap ref="map"></MMap>


    <div class="top">
      <div class="top-left">
        <el-button size="small">考勤管理系统</el-button>
        <el-button size="small">签到情况统计</el-button>
      </div>

      <p>{{currentTime}}</p>

      <!-- 地图图层配置 -->
      <div class="top-right">
				<span
            v-for="({ label, key, funcName }) in layerConfig"
            :key="key"
            :class="{ active: activeMapLayer === key }"
            @click="layerConfigBindClick(key, funcName)"
        >
					{{label}}
				</span>
      </div>
    </div>

    <div class="overview">

      <div class="situation">
        <div class="title">
          <el-tabs v-model="activeName" @tab-click="handleActiveName">
            <el-tab-pane label="实时监控" name="first">
              <div  class="titleTabsItem">
                <div>
                  <el-input
                      class="searchInput"
                      placeholder="账号、名称、公司名称"
                      v-model="inputCompany"
                      size="mini"
                      clearable>
                  </el-input>
                </div>
                <div class="onlineType">
                  <el-tabs v-model="onlineType" @tab-click="handleOnlineType">
                    <el-tab-pane class="onlineItem" label="全部(3000)" name="all"></el-tab-pane>
                    <el-tab-pane class="onlineItem" label="在线(2800)" name="offline"></el-tab-pane>
                    <el-tab-pane label="离线(200)" name="online"></el-tab-pane>
                  </el-tabs>
                </div>
                <div class="onlineContent">
                  <el-table
                      :data="tableData"
                      border
                      style="width: 100%">
                    <el-table-column
                        prop="user"
                        label="账号"
                        width="115"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="78"

                    >
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="78"

                    >
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态"
                        width="78"

                    >
                    </el-table-column>
                  </el-table>
                </div>
              </div>

            </el-tab-pane>
            <el-tab-pane class="titleTabsItem" label="轨迹查询" name="second">

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import MMap from './m-map.vue'
import moment from 'moment'

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
      activeName: 'first',
      inputCompany: '',
      onlineType: 'all',
      tableData: [{
        user: '18912344321',
        name: '王小虎',
        type: '养护员',
        state: '在线'
      }, {
        user: '18912344321',
        name: '王小虎',
        type: '养护员',
        state: '在线'
      }, {
          user: '18912344321',
          name: '王小虎',
          type: '养护员',
          state: '在线'
        }
      ]
    }
  },
  methods: {
    layerConfigBindClick(key, funcName) {
      this.activeMapLayer = key;
      this.$refs.map && this.$refs.map[funcName]();
    },
    handleActiveName (tab, event) {
      console.log(tab, event);
    },
    handleOnlineType (tab, event) {
      console.log(tab, event);
    },
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

.overview {
  width: 360px;
  background-color: @bgColor;
  height: calc(100% - 50px);
  position: absolute;
  top: 50px;
  left: 0px;
  border-top: 4px solid @sysColor;
  font-size: 13px;

  .title {

    /deep/ .el-tabs__nav {
      width: 100%;
    }

    /deep/ .el-tabs__item {
      width: 50%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      padding: 0;
      font-size: 18px;
      color: @sysColor;

      &.is-active {
        color: #e89f42;
      }
      &:hover {
        color: #e89f42;
      }

    }

    /deep/ .el-tabs__active-bar {
      background-color: #e89f42;
      &:after {
        content: '▲';
        color: #e89f42;
        position: absolute;
        left: 50%;
        top: -14px;
        margin-left: -10px;
      }
    }

    .titleTabsItem {
      padding: 0 4px;

      .searchInput {
        /deep/ .el-input__inner {
          background-color: rgba(74, 163, 164, 0.5);
          color: #FFFFFF;
        }
      }
    }

    .onlineType {
      margin-top: 8px;
      position: relative;
      .onlineItem:after {
        content: '|';
        color: #FFFFFF;
        position: absolute;
        right: 0;
        top: 4px;
      }

      /deep/ .el-tabs__nav {
        background-color: rgba(74, 163, 164, 0.7);
      }


      /deep/ .el-tabs__item {
        width: 33%;
        height: 34px;
        line-height: 34px;
        text-align: center;
        padding: 0;
        font-size: 12px;
        color: #FFFFFF;
        font-weight: 400;

        &:not(:last-child):after {
          content: '|';
          color: #FFFFFF;
          position: absolute;
          right: 0;
          top: 0;
        }

        &.is-active {
          color: #FFFFFF;
        }
        &:hover {
          color: #FFFFFF;
        }

      }
      /deep/ .el-tabs__header {
        margin-bottom: 4px;
      }
      /deep/ .el-tabs__active-bar {
        background-color: #e89f42;
        &:after {
          content: '';
        }
      }
    }

    // TODO 表格透明
    .onlineContent {
      /deep/ .el-table {
        background-color: transparent;
      }
    }
  }


}

</style>








