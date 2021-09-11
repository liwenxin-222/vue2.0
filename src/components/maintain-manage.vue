<template>
	<div class="mapbox">
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
				layerConfig
			}
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

.overview {
	width: 300px;
	background-color: @bgColor;
	height: calc(100% - 50px);
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
	}
}

.icon-maintain {
	width: 20px;
	height: 20px;
}
.tac {
	text-align: center;
}
</style>








