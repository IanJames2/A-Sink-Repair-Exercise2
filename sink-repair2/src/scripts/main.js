import { fetchRequests } from "./dataAccess.js" // make sure the requests data has been fetched and set into application state first thing
import { SinkRepair } from "./SinkRepair.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    
    fetchRequests()
    .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
    .catch(console.log('err, or delete'))
}

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

render()




