/**
 * 作者：Hyhello
 * 时间：2022-07-01
 * 描述：echarts配置
 */
import { toFixed, random, rangeArr } from '@hyhello/utils';

// 订单达成情况
export const reachFn = () => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#051a49',
      borderColor: '#0f78d6',
      borderWidth: 1,
      textStyle: {
        color: '#f5f6f8',
        fontSize: 14,
        fontWeight: 400,
        padding: 10,
        fontFamily: 'PingFang SC-Regular, PingFang SC'
      },
      axisPointer: {
        type: 'cross',
        label: {
          margin: 10,
          formatter(params) {
            if (params.axisDimension === 'x') return params.value;
            if (params.axisDimension === 'y' && params.axisIndex === 1) return toFixed(params.value, 2) + ' %';
            return toFixed(params.value, 2);
          }
        },
        crossStyle: {
          color: '#cccccc',
          opacity: 0.5
        }
      },
      extraCssText: 'border-radius: 3px;'
    },
    legend: {
      type: 'plain',
      top: 20,
      itemGap: 50,
      textStyle: {
        color: '#f5f6f8',
        fontSize: 14,
        fontWeight: 400,
        padding: 10,
        fontFamily: 'PingFang SC-Regular, PingFang SC'
      },
      data: ['达成率', '完成数', '计划数']
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '13%',
      top: '20%'
    },
    xAxis: [
      {
        type: 'category',
        data: rangeArr(29).map((item, index) => {
          if (index < 21) return '5.' + (10 + index + 1);
          return '6.' + (index - 20);
        }),
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#d3d7df',
          fontSize: 10,
          fontWeight: 400,
          margin: 15,
          fontFamily: 'PingFang SC-Regular, PingFang SC'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#6d7994'
          }
        },
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value}',
          color: '#dee1e7',
          fontSize: 10,
          fontWeight: 400,
          margin: 15,
          fontFamily: 'PingFang SC-Regular, PingFang SC'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#828da4'
          }
        },
        splitLine: {
          show: false
        }
      },
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value} %',
          color: '#dee1e7',
          fontSize: 10,
          fontWeight: 400,
          margin: 15,
          fontFamily: 'PingFang SC-Regular, PingFang SC'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#828da4'
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '达成率',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        color: '#1395FF',
        lineStyle: {
          color: '#1395FF'
        },
        tooltip: {
          valueFormatter(val) {
            return val + '%';
          }
        },
        data: rangeArr(29).map((item) => toFixed(random(80, 98)))
      },
      {
        name: '完成数',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00FDDF' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#2D90FC' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          borderRadius: [2, 2, 0, 0]
        },
        data: rangeArr(29, 40)
      },
      {
        name: '计划数',
        type: 'bar',
        barWidth: 10,
        barGap: '100%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#FFC400' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#FF7738' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          borderRadius: [2, 2, 0, 0]
        },
        data: rangeArr(29, 50)
      }
    ]
  };
};

// 不合格率指标
export const unqualifiedFn = (value, text) => {
  const max = 100;
  return {
    angleAxis: {
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      min: 0,
      max: 132,
      startAngle: 225
    },
    radiusAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      data: ['a', 'b', 'c'],
      z: 10
    },
    polar: {
      radius: '94%' // 调半径
    },
    series: [
      {
        type: 'bar',
        data: [0, 0, (value / 100) * 100],
        z: 1,
        coordinateSystem: 'polar',
        barMaxWidth: 8,
        roundCap: true,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#1395FF' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#24DEFF' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        barGap: '-100%'
      },
      {
        type: 'bar',
        data: [0, 0, 100],
        z: 0,
        silent: true,
        coordinateSystem: 'polar',
        barMaxWidth: 8,
        name: 'C',
        roundCap: true,
        color: '#134988',
        barGap: '-100%'
      },
      {
        type: 'gauge',
        radius: '75%',
        splitNumber: 6,
        max: max,
        detail: {
          show: true,
          offsetCenter: ['0%', '0%'],
          formatter(val) {
            const list = [];
            list.push(`{title|${text}}`);
            list.push(`{val|${val.toFixed(0) + '%'}}`);
            return list.join('\n');
          },
          rich: {
            title: {
              fontSize: 12,
              color: '#c4daee',
              fontWeight: 400,
              padding: [12, 0],
              fontFamily: 'PingFang SC-Semibold, PingFang SC'
            },
            val: {
              fontSize: 30,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: '#def0ff',
              fontFamily: 'YouSheBiaoTiHei-Regular, YouSheBiaoTiHei'
            }
          }
        },
        axisLine: {
          // 坐标轴线
          lineStyle: {
            opacity: 0 // 刻度背景宽度
          }
        },
        data: [(value / 100) * 100],
        splitLine: {
          length: 0, // 长刻度节点线长度
          lineStyle: {
            width: 0,
            color: '#fff'
          } // 刻度节点线
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        }
      }
    ],
    tooltip: {
      show: false
    }
  };
};

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;

  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.05 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.05 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? 1 : -1;
    }
  };
}

// 质量问题分布
export const qualityFn = (pieData = []) => {
  if (!pieData.length) return {};
  const internalDiameterRatio = 0.56;
  const series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  const k =
    typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    const seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    };

    if (typeof pieData[i].itemStyle !== 'undefined') {
      const itemStyle = {};

      if (typeof pieData[i].itemStyle.color !== 'undefined') {
        itemStyle.color = pieData[i].itemStyle.color;
        itemStyle.opacity = pieData[i].itemStyle.opacity;
      }
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      true,
      false,
      0.12
    );

    startValue = endValue;

    legendData.push(series[i].name);
  }

  // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false
    },
    clockwise: false,
    itemStyle: {
      opacity: 0
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 1.4
      },
      x: function (u, v) {
        return Math.sin(v) * Math.sin(u) + Math.sin(u);
      },
      y: function (u, v) {
        return Math.sin(v) * Math.cos(u) + Math.cos(u);
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? 0.1 : -0.1;
      }
    }
  });

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  return {
    backgroundColor: 'transparent',
    legend: {
      show: false,
      data: legendData
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      boxHeight: 13,
      left: '0',
      top: '-8%',
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 25,
        distance: 175,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: true
      }
    },
    series: series
  };
};
