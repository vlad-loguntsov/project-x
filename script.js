// Minimal Figma Embed API host script (no extras)

const iframe = document.querySelector("#embed-frame");
if (!iframe) {
  throw new Error('Iframe with id="embed-frame" not found');
}

// Use the iframe origin (embed.figma.com) as the target for outgoing postMessage
const figmaOrigin = new URL(iframe.src).origin;

// Figma may send messages from either embed.figma.com or www.figma.com
const allowedOrigins = new Set([
  "https://embed.figma.com",
  "https://www.figma.com",
  figmaOrigin,
]);

// Only keep the events we care about
const prototypeEvents = new Set([
  "INITIAL_LOAD",
  "PRESENTED_NODE_CHANGED",
]);

// Optional: buttons (only if they exist in your HTML)
const restartButton = document.querySelector("#restart");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");

// Outgoing control messages (work only if Embed API is enabled + origins allowed)
function postToFigma(type) {
  if (!iframe.contentWindow) return;
  iframe.contentWindow.postMessage({ type }, figmaOrigin);
}

restartButton?.addEventListener("click", () => postToFigma("RESTART"));
nextButton?.addEventListener("click", () => postToFigma("NAVIGATE_FORWARD"));
prevButton?.addEventListener("click", () => postToFigma("NAVIGATE_BACKWARD"));

// Incoming messages from Figma
window.addEventListener("message", (event) => {
  if (!allowedOrigins.has(event.origin)) return;

  const msgType = event.data?.type;
  if (!prototypeEvents.has(msgType)) return;

  console.log("FIGMA EVENT:", event.data);

  if (msgType === "PRESENTED_NODE_CHANGED") {
    const nodeId = event.data?.data?.presentedNodeId;
    console.log("PRESENTED NODE ID:", nodeId);
  }
});

}
