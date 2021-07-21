import { useState, useEffect } from 'react'
import Trend from './Trend'
import axios from 'axios'

const SMSDashboard = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false)
    const [xaxis, setXaxis] = useState([])
    const [smsMoSRs, setSmsMoSRs] = useState([])
    const [smsMtSRs, setSmsMtSRs] = useState([])
    const [smsDelays, setSmsDelays] = useState([])


    const refresh = () => {
        setRefreshTrigger(!refreshTrigger)
      }
    useEffect(() => {
      setTimeout(()=>{
        refresh()
      },60000)
      getSMSValues()
    },[refreshTrigger])

    const getSMSValues = () =>{
        axios.get('http://192.168.100.10:3005/sms').then((response)=>{
            setXaxis(response.data.map(value => value.timestamp))
            setSmsMoSRs(response.data.map(value => value.smsMOSR))
            setSmsMtSRs(response.data.map(value => value.smsMTSR))
            setSmsDelays(response.data.map(value => value.smsDelay))
        })
    }
    return (
        <div className="container-dashboard">
            <Trend kpi={"SMS MO Success Rate"} unit={"%"} metrics={smsMoSRs} xvalues={xaxis} treshold={98}/>
            <Trend kpi={"SMS MT Success Rate"} unit={"%"} metrics={smsMtSRs} xvalues={xaxis} treshold={98}/>
            <Trend kpi={"SMS Delay"} unit={"ms"} metrics={smsDelays} xvalues={xaxis} treshold={3000}/>
          </div>
    )
}

export default SMSDashboard
