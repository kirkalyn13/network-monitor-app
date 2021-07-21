import React from 'react'

const criticalStyles = {
    backgroundColor: "#F44336",
    color: "#FFA000"
}

const OutageTable = ({outages}) => {
    return (
        <div className="container-outage-table">
            <table>
                <thead>
                    <tr>
                        <th>TIMESTAMP</th>
                        <th>LINK</th>
                        <th>SEVERITY</th>
                    </tr>
                </thead>
                {outages.map(values => {
                    return(<tbody>
                    <tr>
                        <td className={values.severity === "Critical" ? "td-critical" : null}>{values.timestamp}</td>
                        <td className={values.severity === "Critical" ? "td-critical" : null}>{values.link}</td>
                        <td className={values.severity === "Critical" ? "td-critical" : null}>{values.severity}</td>
                    </tr>
                </tbody>)})}
                
            </table>
        </div>
    )
}

export default OutageTable
