import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactApexChart from 'react-apexcharts'
import OutageTable from './OutageTable'

const nullOutages = {
  timestamp: "",
  severity: "",
  link: ""
}
const nullPie = [0,0,0,0]
const Outages = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false)
    const [outages, setOutages] = useState([nullOutages])
    const [pieValues, setPieValues] = useState([nullPie])

    const refresh = () => {
      setRefreshTrigger(!refreshTrigger)
    }

    useEffect(() => {
      getOutages()
      setTimeout(()=>{
        refresh()
      },60000)
    },[refreshTrigger])

    useEffect(()=>{
      setTimeout(()=>{
        getPieValues()
      },200)
    },[outages])

    const getOutages = () => {
      axios.get('http://192.168.100.10:3005/outages').then((response)=>{
        setOutages(response.data.map(values => 
          ({timestamp: values.timestamp, 
            severity: values.severity, 
            link: values.link})
        ))})}

    const getPieValues = ()=>{
      const total = outages.length
      /*const warnings = Math.round(((outages.filter(filtered => filtered.severity === "Warning")).length/total)*100)
      const minors = Math.round(((outages.filter(filtered => filtered.severity === "Minor")).length/total)*100)
      const majors = Math.round(((outages.filter(filtered => filtered.severity === "Major")).length/total)*100)
      const criticals = Math.round(((outages.filter(filtered => filtered.severity === "Critical")).length/total)*100)*/
      const warnings = (outages.filter(filtered => filtered.severity === "Warning")).length
      const minors = (outages.filter(filtered => filtered.severity === "Minor")).length
      const majors = (outages.filter(filtered => filtered.severity === "Major")).length
      const criticals = (outages.filter(filtered => filtered.severity === "Critical")).length
      setPieValues([warnings,minors,majors,criticals])
    }  

    const series = pieValues
    const options = {
    chart: {
      type: 'donut',
    },
    plotOptions:{
      pie:{
        donut:{
          labels:{
            show:true,
            name:{
              show: true,
            },
            value:{
              show: true,
              color: '#FFFFFF'
            },
            total:{
              show: true,
              color: '#FFFFFF'
            }
          }
        },
      },
    },
    stroke:{
      colors:['#000']
     },
    labels: ['Warning','Minor','Major','Critical'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
          height: 300
        },
      }
    }],
    legend: {
        position: 'bottom',
        labels:{
          colors: ["#FFFFFF"]
        }
      },
    tooltip: {
        y: {
          formatter: function (val) {
            return  val + " Links"
          }
        }
      }
  }
    return (
        <div className="container-outages">
            <div className="outage-summary">
                <h2>Outage Summary</h2>
                <ReactApexChart options={options} series={series} type="donut" height={300}/>
            </div>
            <OutageTable outages={outages}/>
        </div>
    )
}

export default Outages
