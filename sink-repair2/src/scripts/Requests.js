import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data

    let html = `
        <ul class = "requestClass">
            ${
                requests.map((request) => `
                <li class="requestClass_bullet">
                    <input type="radio" value=request--${request.id} name="request"> 
                    ${request.description}
                    ${request.address}
                    ${request.budget}
                    ${request.neededBy}
                </li>`
                ).join("")}
        </ul>`
    

    return html
}