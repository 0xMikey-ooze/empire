import type { Empire } from "@/types/empire";

/** All specifications retrieved from the KJV via the Rhema library.
 *  The vision and reed: Ezekiel 40:1-5. The house: 41:1-4. The outer square:
 *  42:15-20. The glory: 43:1-5. The waters: 47:1. */
export const ezekielTemple: Empire = {
  id: "ezekiel-temple",
  kind: "vision",
  name: "The Coming Glory",
  dwelling: "Ezekiel's Temple",
  subtitle: "The house measured in the visions of God",
  description:
    "\"In the visions of God brought he me into the land of Israel, and set me upon a very high mountain\" (Ezekiel 40:2) — where a man \"whose appearance was like the appearance of brass\" stood in the gate with a line of flax and a measuring reed \"of six cubits long by the cubit and an hand breadth\" (40:3, 5), and measured the house court by court, wall by wall, until \"the glory of the LORD filled the house\" (43:5).",
  modelPath: "/models/ezekiel-temple.glb",
  tint: "#86a0b8",
  camera: { azimuth: -34, elevation: 32, dist: 1.05, targetY: 0.3 },
  facts: [
    { label: "Period", value: "The five and twentieth year of the captivity (Ezekiel 40:1)", icon: "period" },
    { label: "Seen from", value: "\"A very high mountain... in the visions of God\" (Ezekiel 40:2)", icon: "region" },
    { label: "The measure", value: "A reed of six cubits, by the cubit and an hand breadth (Ezekiel 40:5)", icon: "materials" },
    { label: "Dimensions", value: "Temple 40 × 20 cubits; most holy 20 × 20; outer square 500 reeds each side (Ezekiel 41:2-4; 42:16-20)", icon: "feature" },
    { label: "Its crown", value: "\"The glory of the LORD came into the house by the way of the gate... toward the east\" (Ezekiel 43:4)", icon: "occupants" },
  ],
  hotspots: [
    {
      id: "east-gate",
      title: "The East Gate",
      short: "The way the glory returned",
      detail:
        "\"Afterward he brought me to the gate, even the gate that looketh toward the east: and, behold, the glory of the God of Israel came from the way of the east: and his voice was like a noise of many waters: and the earth shined with his glory\" (Ezekiel 43:1-2). Ironside: \"Ezekiel was brought by the man with the measuring rod to the east gate, and there as he looked up he beheld the glory of the God of Israel coming from the way of the sunrising\" (The Coming Glory).",
      category: "entrance",
      anchor: [0.5, 0.3, 0.96],
      snap: "wall",
    },
    {
      id: "wall",
      title: "The Outer Wall",
      short: "One reed broad, one reed high",
      detail:
        "\"And behold a wall on the outside of the house round about... so he measured the breadth of the building, one reed; and the height, one reed\" (Ezekiel 40:5) — the whole precinct measured at five hundred reeds on every side, \"to make a separation between the sanctuary and the profane place\" (42:20).",
      category: "facade",
      anchor: [0.08, 0.25, 0.5],
      snap: "wall",
    },
    {
      id: "temple-house",
      title: "The Temple",
      short: "Forty cubits long, twenty broad",
      detail:
        "\"Afterward he brought me to the temple, and measured the posts, six cubits broad on the one side, and six cubits broad on the other side... and he measured the length thereof, forty cubits: and the breadth, twenty cubits\" (Ezekiel 41:1-2).",
      category: "structure",
      anchor: [0.5, 0.7, 0.5],
      snap: "roof",
    },
    {
      id: "most-holy",
      title: "The Most Holy Place",
      short: "\"This is the most holy place\"",
      detail:
        "\"So he measured the length thereof, twenty cubits; and the breadth, twenty cubits, before the temple: and he said unto me, This is the most holy place\" (Ezekiel 41:4) — the same twenty-cubit square as Solomon's oracle.",
      category: "interior",
      anchor: [0.2, 0.75, 0.5],
      snap: "roof",
    },
    {
      id: "waters",
      title: "The Waters from the Threshold",
      short: "\"Waters issued out from under the threshold... eastward\"",
      detail:
        "\"Afterward he brought me again unto the door of the house; and, behold, waters issued out from under the threshold of the house eastward... and the waters came down from under from the right side of the house, at the south side of the altar\" (Ezekiel 47:1).",
      category: "court",
      anchor: [0.65, 0.15, 0.8],
      snap: "court",
    },
  ],
  interior: {
    kicker: "Interior View",
    title: "Measured Room by Room",
    cta: "Explore Interior",
    text: "The man of brass measured everything before Ezekiel's eyes: posts six cubits broad, a door of ten cubits, the temple forty by twenty, and inmost of all the twenty-cubit square of which he said, \"This is the most holy place\" (Ezekiel 41:1-4). \"Son of man, behold with thine eyes, and hear with thine ears, and set thine heart upon all that I shall shew thee\" (40:4).",
    image: "/img/ezekiel-temple/interior.webp",
  },
  floorPlan: {
    kicker: "Floor Plan",
    title: "The Measured House",
    cta: "View Floor Plan",
    text: "Every figure below is the measuring man's own, recorded by Ezekiel:",
    image: "/img/ezekiel-temple/floor-plan.webp",
    rooms: [
      { name: "The measuring reed", note: "Six cubits, by the cubit and an hand breadth (Ezekiel 40:5)" },
      { name: "The outer wall", note: "One reed broad, one reed high (40:5)" },
      { name: "The east gate", note: "Where the glory entered (43:1-4)" },
      { name: "The temple", note: "40 × 20 cubits; posts 6 cubits (41:1-2)" },
      { name: "The most holy place", note: "20 × 20 cubits (41:4)" },
      { name: "The whole square", note: "500 reeds on each of four sides (42:16-20)" },
      { name: "The threshold", note: "Whence the waters issue eastward (47:1)" },
    ],
  },
  artifacts: {
    kicker: "Instruments of the Vision",
    title: "The Line, the Reed, and the Measures",
    cta: "Explore the Vision",
    text: "The vision's own instruments and landmarks, each named in the text.",
    image: "/img/ezekiel-temple/artifacts.webp",
    items: [
      { name: "The line of flax", purpose: "For the longer measures", material: "Flax", context: "\"A man, whose appearance was like the appearance of brass, with a line of flax in his hand, and a measuring reed\" (Ezekiel 40:3)." },
      { name: "The measuring reed", purpose: "The standard of the whole vision", material: "\"Six cubits long by the cubit and an hand breadth\"", context: "Ezekiel 40:5." },
      { name: "The man of brass", purpose: "The measurer and guide", material: "\"Appearance... like the appearance of brass\"", context: "\"He stood in the gate\" (Ezekiel 40:3)." },
      { name: "The east gate", purpose: "The glory's entrance", material: "—", context: "\"The glory of the LORD came into the house by the way of the gate whose prospect is toward the east\" (Ezekiel 43:4)." },
      { name: "The separating wall", purpose: "Sanctuary from profane", material: "—", context: "\"Five hundred reeds long, and five hundred broad, to make a separation between the sanctuary and the profane place\" (Ezekiel 42:20)." },
      { name: "The issuing waters", purpose: "Life flowing from the house", material: "—", context: "\"Waters issued out from under the threshold of the house eastward\" (Ezekiel 47:1)." },
    ],
  },
  dailyLife: {
    kicker: "Its Meaning",
    title: "The Latter Glory of This House",
    cta: "Discover Its Meaning",
    text: "Ironside connects Haggai's promise to this vision: \"'The latter glory of this house' refers undoubtedly to the millennial splendor of the temple depicted prophetically in Ezekiel 40 to 48\" (Notes on the Prophecy of Haggai). When the measuring was done, \"the spirit took me up, and brought me into the inner court; and, behold, the glory of the LORD filled the house\" (Ezekiel 43:5).",
    image: "/img/ezekiel-temple/daily-life.webp",
  },
  geography: {
    kicker: "Where It Was Seen",
    title: "Upon a Very High Mountain",
    cta: "Explore the Setting",
    text: "\"In the five and twentieth year of our captivity... the hand of the LORD was upon me... In the visions of God brought he me into the land of Israel, and set me upon a very high mountain, by which was as the frame of a city on the south\" (Ezekiel 40:1-2).",
    image: "/img/ezekiel-temple/map.webp",
    regionLabel: "The land of Israel, seen from captivity (Ezekiel 40:1-2)",
  },
  lesson: {
    title: "Ezekiel's Temple — The House Measured",
    intro: "The vision of Ezekiel 40-48 in the passages retrieved for this exhibit, with the library's commentary.",
    blocks: [
      { heading: "The setting", body: "The twenty-fifth year of the captivity, the fourteenth after the city was smitten (Ezekiel 40:1) — Jerusalem in ruins, and the prophet shown a measured house from \"a very high mountain\" (40:2)." },
      { heading: "The measurer", body: "\"A man, whose appearance was like the appearance of brass, with a line of flax in his hand, and a measuring reed... Son of man, behold with thine eyes... declare all that thou seest to the house of Israel\" (Ezekiel 40:3-4)." },
      { heading: "The standard", body: "The reed is defined before anything is measured: \"six cubits long by the cubit and an hand breadth\" (Ezekiel 40:5) — a long cubit, so every figure in the vision is exact and none is left to guess." },
      { heading: "The house", body: "Posts six cubits broad, the temple forty cubits by twenty, and the inner square of twenty by twenty: \"This is the most holy place\" (Ezekiel 41:1-4). The whole precinct: five hundred reeds on each side, walled \"to make a separation between the sanctuary and the profane place\" (42:16-20)." },
      { heading: "The glory returns", body: "The same glory Ezekiel had seen depart now returns \"from the way of the east... and the glory of the LORD filled the house\" (Ezekiel 43:2-5). Ironside titles the whole section \"The Coming Glory\" (on chapters 40-48)." },
      { heading: "The library's reading", body: "Ironside, on Haggai 2: \"'The latter glory of this house' refers undoubtedly to the millennial splendor of the temple depicted prophetically in Ezekiel 40 to 48\" — a house yet future, whose threshold will send out living waters (Ezekiel 47:1)." },
    ],
  },
  quiz: [
    {
      q: "How long was the measuring reed?",
      choices: ["Three cubits", "Six cubits, by the cubit and an hand breadth", "Ten cubits", "Twelve cubits"],
      answer: 1,
      explanation: "\"...in the man's hand a measuring reed of six cubits long by the cubit and an hand breadth\" (Ezekiel 40:5).",
    },
    {
      q: "What did the man measuring the house look like?",
      choices: ["Like gold", "Like fire", "Like the appearance of brass", "Like a cloud"],
      answer: 2,
      explanation: "\"...behold, there was a man, whose appearance was like the appearance of brass\" (Ezekiel 40:3).",
    },
    {
      q: "What were the dimensions of the most holy place?",
      choices: ["40 × 20 cubits", "20 × 20 cubits", "10 × 10 cubits", "60 × 20 cubits"],
      answer: 1,
      explanation: "\"So he measured the length thereof, twenty cubits; and the breadth, twenty cubits... This is the most holy place\" (Ezekiel 41:4).",
    },
    {
      q: "By which gate did the glory of the LORD enter the house?",
      choices: ["The north gate", "The south gate", "The west gate", "The east gate"],
      answer: 3,
      explanation: "\"The glory of the LORD came into the house by the way of the gate whose prospect is toward the east\" (Ezekiel 43:4).",
    },
    {
      q: "What was the measure of the whole outer square?",
      choices: ["100 reeds per side", "500 reeds per side", "1,000 cubits per side", "144 cubits per side"],
      answer: 1,
      explanation: "\"He measured it by the four sides: it had a wall round about, five hundred reeds long, and five hundred broad\" (Ezekiel 42:20).",
    },
  ],
  timeline: [
    { era: "The vision opens", year: "Ezekiel 40:1-2", text: "The twenty-fifth year of the captivity; the prophet set upon a very high mountain in the visions of God." },
    { era: "The measurer", year: "Ezekiel 40:3-5", text: "The man of brass with line of flax and measuring reed; the wall one reed broad, one reed high." },
    { era: "The house measured", year: "Ezekiel 41:1-4", text: "The temple forty by twenty cubits; the most holy place twenty by twenty." },
    { era: "The whole square", year: "Ezekiel 42:15-20", text: "Five hundred reeds on each of four sides — the sanctuary separated from the profane." },
    { era: "The glory returns", year: "Ezekiel 43:1-5", text: "The glory of the God of Israel comes from the way of the east; the glory of the LORD fills the house." },
  ],
  keywords: ["ezekiel", "temple", "vision", "measuring reed", "man of brass", "east gate", "glory", "most holy place", "five hundred reeds", "millennial temple", "waters", "chebar", "coming glory"],
};
