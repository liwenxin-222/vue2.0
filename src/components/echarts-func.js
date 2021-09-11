/* 环形图 */


/*
	interface params {
		isShowLegend: Boolean 是否显示legend
	}
*/
export const returnRateOptions = function({ color, textColor = color, value = 0 }) {
  return {
    title: [{
      text: `${value}%`,
      left: 'center',
      top: 'center',
      fontSize: 50,
      textStyle: {
        fontSize: 20,
        color: textColor
      }
    }],
    series: [{
      // name: seriesName,
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: value, itemStyle: { color } },
        { value: 100 - value, itemStyle: { color: '#dddddd' } }
      ]
    }]
  };
}