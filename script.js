const iframe = document.querySelector("#embed-frame");
const figmaOrigin = new URL(iframe.src).origin;

const allowedOrigins = new Set([
  figmaOrigin,
  "https://www.figma.com",
  "https://embed.figma.com"
]);

window.addEventListener("message", (event) => {
  const prototypeEvents = ["MOUSE_PRESS_OR_RELEASE", "PRESENTED_NODE_CHANGED", "INITIAL_LOAD", "NEW_STATE", "REQUEST_CLOSE"];

  if (!allowedOrigins.has(event.origin)) return;
  if (!prototypeEvents.includes(event.data?.type)) return;

  // 
  console.log("FIGMA EVENT:", event.data);

  outputEvent(event);

  if (event.data.type === "INITIAL_LOAD") {
    restartButton.removeAttribute("disabled");
    nextButton.removeAttribute("disabled");
  }

  if (event.data.type === "PRESENTED_NODE_CHANGED") {
    const nodeId = event.data.data.presentedNodeId;
//
  }
});
  eventPre.append(eventText);
  eventsList.prepend(eventPre);
}
