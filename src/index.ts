import packageJson from "../package.json";
import "./card";
import "./editor";

console.info(
  `%c AREA-CARD %c ${packageJson.version} `,
  "color: steelblue; background: black; font-weight: bold;",
  "color: white ; background: dimgray; font-weight: bold;"
);

window.addEventListener("error", (e) => {
  if (
    typeof e.message === "string" &&
    e.message.includes("Cannot read properties of null") &&
    e.message.includes("removeEventListener")
  ) {
    e.preventDefault();
    return true;
  }
});

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "area-card-plus",
  name: "Area Card Plus",
  preview: true,
  description: "A custom card to display area information.",
});
