import React, { Component } from 'react';
import Chart from "react-apexcharts";

export class Heatmap extends Component {
  constructor(props) {
    super(props)
    // console.log("In heatmap: ", this.props.data)
  }
    state = {
      series: this.props.data,
        options: {
            chart: {
                height: 350,
                type: 'heatmap',
              },
              yaxis: {
                reversed: true
              },
              dataLabels: {
                enabled: true,
                style: {
                  colors: ['#333']
                },
                formatter: function(val) {
                  return val == 0 ? '' : Math.floor(val) 
                }
              },
              stroke: {
                width: 1
              },
              // title: {
              //   text: 'Resource allocation Heatmap'
              // },
              grid: {
                  position: 'front',
                  show: true,
                  borderColor: '#b3b3b3',
                  xaxis: {
                    lines: {
                        show: true
                    }
                },   
                yaxis: {
                    lines: {
                        show: true
                    }
                },
              },
              plotOptions: {
                heatmap: {
                  shadeIntensity: 0.5,
                  radius: 50,
                  useFillColorAsStroke: true,
                  colorScale: {
                    ranges: [{
                        from: 0.1,
                        to: 30,
                        name: '< 30 Hours',
                        color: '#FFA500'
                      },
                      {
                        from: 30,
                        to: 40,
                        name: '30 - 40 Hours',
                        color: '#66ff66'
                      },
                      {
                        from: 41,
                        to: 60,
                        name: '40+ Hours',
                        color: '#FF4500'
                      },
                    ]
                  }
                }
              }

        }
    }
    render() {
        return (
            <div>
                <Chart 
                    options={this.state.options} 
                    series={this.state.series} 
                    type="heatmap" 
                    // height={350} 
                />
            </div>
        )
    }
}

export default Heatmap
