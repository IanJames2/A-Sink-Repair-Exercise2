import { fetchRequests } from "./dataAccess.js" // make sure the requests data has been fetched and set into application state first thing
import { SinkRepair } from "./SinkRepair.js"




const render = () => {
    
    fetchRequests()
    .then(
        () => {
            const mainContainer = document.querySelector("#container")
            mainContainer.innerHTML = SinkRepair()
        }
    )
    .catch(console.log('err'))
}

render()



