/* 环形图 */


/*
	interface params {
		isShowLegend: Boolean 是否显示legend
	}
*/
export const returnPieOptions = function({ seriesName, isShowLegend, data }) {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      show: isShowLegend
    },
    series: [{
      name: seriesName,
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data
    }]
  };
}