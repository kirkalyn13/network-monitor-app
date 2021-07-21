import { useState, useEffect } from 'react'
import Trend from './Trend'
import axios from 'axios'

const DataDashboard = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false)
    const [xaxis, setXaxis] = useState([])
    const [attachSRs, setAttachSRs] = useState([])
    const [users, setUsers] = useState([])
    const [dlTputs, setDlTputs] = useState([])
    const [latencies, setLatencies] = useState([])


    const refresh = () => {
        setRefreshTrigger(!refreshTrigger)
      }
        useEffect(() => {
          setTimeout(()=>{
            refresh()
          },60000)
          getDataValues()
        },[refreshTrigger])

    const getDataValues = () =>{
        axios.get('http://192.168.100.10:3005/data').then((response)=>{
            setXaxis(response.data.map(value => value.timestamp))
            setAttachSRs(response.data.map(value => value.attachSR))
            setUsers(response.data.map(value => value.users))
            setDlTputs(response.data.map(value => value.dltput))
            setLatencies(response.data.map(value => value.latency))
            
        })
    }
    return (
        <div className="container-dashboard">
            <Trend kpi={"RRC Connected Users"} unit={"users"} metrics={users} xvalues={xaxis} treshold={50}/>
            <Trend kpi={"Attach Success Rate"} unit={"%"} metrics={attachSRs} xvalues={xaxis} treshold={70}/>
            <Trend kpi={"Download Throughput"} unit={"kbps"} metrics={dlTputs} xvalues={xaxis} treshold={10}/>
            <Trend kpi={"Latency"} unit={"ms"} metrics={latencies} xvalues={xaxis} treshold={50}/>
        </div>
    )
}

export default DataDashboard
