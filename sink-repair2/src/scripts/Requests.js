import { deleteRequest, getRequests } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});

export const Requests = () => {
  const requests = getRequests(); // grab the local state of the requests data

  let html = `
        <ul class = "requestClass">
            ${requests
              .map(
                (request) => `
                <li class="requestClass_bullet">
                    <input type="radio" value=request--${request.id} name="request"> 
                    ${request.description}
                    ${request.address}
                    ${request.budget}
                    ${request.neededBy}
                    <button class="request__delete"
                            id="request--${request.id}"
                            style="margin: 1rem 0 2rem 2rem;
                            padding: 0.5rem;
                            background-color: #0d023f;
                            color: lightgoldenrodyellow;
                            font-size: 1rem;">
                        Delete
                    </button>
                </li>`
              )
              .join("")}
        </ul>`;

  return html;
};
