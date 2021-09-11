<template>
  <div class="maintain-manage mapbox">
    <MMap ref="map"></MMap>
    <div class="top">
      <div class="top-left">
        <el-button size="small">养护管理系统</el-button>
        <el-button size="small">养护作业完成率分析</el-button>
        <el-button size="small">养护作业监督情况</el-button>
        <el-button size="small">养护单位养护绿地分析</el-button>
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
        <p class="title">
          <img src="../assets/icon_maintain_01.png" class="icon-maintain" alt="">
          <span>2021年绿地养护总体情况</span>
        </p>
        <div class="situation-content">
          <p class="tac" style="line-height: 30px;">中心管理绿地养护总面积</p>
          <p class="tac value-s" style="font-size: 25px;">43443</p>
          <div class="level-statistics">
            <div>
              <p><span>⭐️⭐️⭐️</span>特级</p>
              <p class="value-s">30</p>
            </div>
            <div>
              <p><span>⭐️⭐️</span>一级</p>
              <p class="value-s">30</p>
            </div>
            <div>
              <p><span>⭐️</span>二级</p>
              <p class="value-s">30</p>
            </div>
          </div>
        </div>
      </div>
      <div class="maintenance-work">
        <p class="title">
          <span>全区本月养护工作</span>
        </p>
        <div class="echarts-box">
          <div class="coverage-box">
            <div class="coverage"></div>
            <p class="desc">问题覆盖率</p>
          </div>
          <div class="rectification-box">
            <div class="rectification"></div>
            <p class="desc">问题整改率</p>
          </div>
        </div>
      </div>
      <div class="realtime">
        <p class="title">
          <img src="../assets/icon_maintain_01.png" class="icon-maintain" alt="">
          <span>2021年09月10日养护情况</span>
        </p>
        <div class="realtime-content">
          <div style="padding-left: 15px;">
            <p class="image-text-box">
              <img src="../assets/icon_maintain_user.png" class="icon-maintain" alt="">
              <span>今日养护人员</span>
            </p>
            <span class="realtime-content-value" style="margin-left: 40px">2000</span>
          </div>

          <div style="display: flex;justify-content: space-around;">
          	<div>
	            <p class="image-text-box">
	              <img src="../assets/icon_maintain_user.png" class="icon-maintain" alt="">
	              <span>巡查问题</span>
	            </p>
	            <span class="realtime-content-value"  style="margin-left: 40px">20</span>
	          </div>

	          <div>
	          	<p>已处理</p>
	          	<p class="realtime-content-value tac">2件</p>
	          </div>

	          <div>
	          	<p>未处理</p>
	          	<p class="realtime-content-value-non tac">20</p>
	          </div>
          </div>

          <div style="display: flex;justify-content: space-around;">
          	<div>
	            <p class="image-text-box">
	              <img src="../assets/icon_maintain_user.png" class="icon-maintain" alt="">
	              <span>督办案件</span>
	            </p>
	            <span class="realtime-content-value" style="margin-left: 40px">20</span>
	          </div>

	          <div>
	          	<p>已处理</p>
	          	<p class="realtime-content-value tac">2件</p>
	          </div>

	          <div>
	          	<p>未处理</p>
	          	<p class="realtime-content-value-non tac">20</p>
	          </div>
          </div>
        </div>
      </div>
    </div>

    <div class="map-layers">
    	
    </div>
  </div>
</template>

<script>
	import MMap from './m-map.vue'
	import moment from 'moment'
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
				layerConfig
			}
		},
		mounted() {
			this.coverageEchart = echarts.init(document.querySelector('.coverage'));
			this.rectificationEchart = echarts.init(document.querySelector('.rectification'));

			this.coverageEchart.setOption(returnRateOptions({ color: '#8bc4e3', textColor: '#abf04b', value: 30 }))
			this.rectificationEchart.setOption(returnRateOptions({ color: '#ea3323', textColor: '#abf04b', value: 40 }))
		},
		methods: {
			layerConfigBindClick(key, funcName) {
				this.activeMapLayer = key;
				this.$refs.map && this.$refs.map[funcName]();
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
	width: 300px;
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
		padding: 10px;
		border-bottom: 1.5px solid #e89f42;
		font-size: 14px;
	}
	.situation {
		.situation-content {
			.level-statistics {
				display: flex;
				justify-content: space-around;
				div {
					display: flex;
					flex-direction: column;
					align-items: center;
					p {
						&:nth-of-type(2) {
							font-size: 23px;
						}
					}
				}
			}
		}

		.value-s {
			color: #7dfb4c;
		}
	}

	.maintenance-work {
		margin-top: 30px;
		.echarts-box {
			display: flex;
			.rectification, .coverage {
				width: 150px;
				height: 150px;
			}
			.desc {
				text-align: center;
				font-size: 16px;
			}
		}
	}

	.realtime {
		margin-top: 30px;
		.image-text-box {
			display: flex;
			align-items: center;
		}
		.realtime-content {
			padding: 15px 0px;
			.realtime-content-value {
				// text
				color: #abf04b;
			}
			.realtime-content-value-non {
				color: red;
			}
		}
	}
}

.icon-maintain {
	width: 20px;
	height: 20px;
	margin-right: 10px;
}
.tac {
	text-align: center;
}
</style>








