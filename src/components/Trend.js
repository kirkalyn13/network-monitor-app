import ReactApexChart from 'react-apexcharts'

const Trend = ({kpi, unit, metrics, xvalues, treshold}) => {
    const series = [{
        name: `${kpi}`,
        data: metrics
      }]
      const options = {
        chart: {
          height: 350,
          type: 'area',
          colors: '#4CAF50',
        },
        annotations: {
          yaxis: [
            {
              y: treshold,
              borderColor: '#FFA000',
              label: {
                borderColor: '#FFA000',
                style: {
                  color: '#fff',
                  background: '#FFA000'
                },
                text: 'Treshold'
              }
            }
          ]
        },
        dataLabels: {
          enabled: false
        },
        grid:{
          borderColor: '#455A64'
        },
        yaxis:{
          labels:{
            style:{
              colors: ["#FFFFFF"]
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        legend:{
          labels:{
            colors: ["#FFFFFF"]
          }
        },
        xaxis: {
          type: 'datetime',
          categories: xvalues,
          labels: {
            style: {
              colors: ["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"]
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return  val + ` ${unit}`
            }
          }
        },
      }
    return (
        <div className="graph">
            <h2>{kpi}</h2>
            <ReactApexChart options={options} series={series} type="area" height={300} />
        </div>
    )
}

export default Trend