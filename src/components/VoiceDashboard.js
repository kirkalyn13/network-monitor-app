import { useState, useEffect } from 'react'
import Trend from './Trend'
import axios from 'axios'

const VoiceDashboard = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false)
    const [xaxis, setXaxis] = useState([])
    const [callSRs, setCallSRs] = useState([])
    const [callDRs, setCallDRs] = useState([])
    const [callDelays, setCallDelays] = useState([])


    const refresh = () => {
        setRefreshTrigger(!refreshTrigger)
      }
        useEffect(() => {
          setTimeout(()=>{
            refresh()
          },60000)
          getVoiceValues()
        },[refreshTrigger])

    const getVoiceValues = () =>{
        axios.get('http://192.168.100.10:3005/voice').then((response)=>{
            setXaxis(response.data.map(value => value.timestamp))
            setCallSRs(response.data.map(value => value.callSR))
            setCallDRs(response.data.map(value => value.callDR))
            setCallDelays(response.data.map(value => value.callDelay))
        })
    }
    return (
        <div className="container-dashboard">
            <Trend kpi={"Call Success Rate"} unit={"%"} metrics={callSRs} xvalues={xaxis} treshold={90}/>
            <Trend kpi={"Call Drop Rate"} unit={"%"} metrics={callDRs} xvalues={xaxis} treshold={2}/>
            <Trend kpi={"E2E Call Connection Delay"} unit={"ms"} metrics={callDelays} xvalues={xaxis} treshold={5000}/>
        </div>
    )
}

export default VoiceDashboard
