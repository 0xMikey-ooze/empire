import type { Empire } from "@/types/empire";

/** All specifications retrieved from the KJV via the Rhema library.
 *  The dream: Daniel 2:31-35. The interpretation: Daniel 2:36-45. */
export const babylon: Empire = {
  id: "babylon",
  name: "The Empire of Babylon",
  dwelling: "Nebuchadnezzar's Dream Image",
  subtitle: "The great image of Daniel 2",
  description:
    "\"Thou, O king, sawest, and behold a great image. This great image, whose brightness was excellent, stood before thee; and the form thereof was terrible\" (Daniel 2:31). Head of fine gold, breast and arms of silver, belly and thighs of brass, legs of iron, feet part of iron and part of clay — until \"a stone was cut out without hands, which smote the image upon his feet\" (Daniel 2:32-34).",
  modelPath: "/models/babylon.glb",
  tint: "#b08d57",
  camera: { azimuth: -25, elevation: 16, dist: 1.05, targetY: 0.42 },
  facts: [
    { label: "Period", value: "The reign of Nebuchadnezzar, king of Babylon (Daniel 2)", icon: "period" },
    { label: "Region", value: "Babylon — \"Thou art this head of gold\" (Daniel 2:38)", icon: "region" },
    { label: "Materials", value: "Fine gold, silver, brass, iron, iron mixed with miry clay (Daniel 2:32-33)", icon: "materials" },
    { label: "Distinctive feature", value: "\"Whose brightness was excellent... the form thereof was terrible\" (Daniel 2:31)", icon: "feature" },
    { label: "Its end", value: "Smitten on the feet by a stone cut out without hands (Daniel 2:34-35)", icon: "occupants" },
  ],
  hotspots: [
    {
      id: "head",
      title: "The Head of Fine Gold",
      short: "\"Thou art this head of gold\"",
      detail:
        "\"This image's head was of fine gold\" (Daniel 2:32). The interpretation is given to the king himself: \"Thou, O king, art a king of kings: for the God of heaven hath given thee a kingdom, power, and strength, and glory... Thou art this head of gold\" (Daniel 2:37-38).",
      category: "roof",
      anchor: [0.5, 0.97, 0.5],
      snap: "roof",
    },
    {
      id: "breast",
      title: "Breast and Arms of Silver",
      short: "\"After thee shall arise another kingdom\"",
      detail:
        "\"His breast and his arms of silver\" (Daniel 2:32) — \"and after thee shall arise another kingdom inferior to thee\" (Daniel 2:39). Snaddon identifies it: \"The breasts and arms of silver = Medo-Persian Empire\" (The Times of the Gentiles).",
      category: "structure",
      anchor: [0.5, 0.75, 0.5],
      snap: "wall",
    },
    {
      id: "belly",
      title: "Belly and Thighs of Brass",
      short: "\"A third kingdom... over all the earth\"",
      detail:
        "\"His belly and his thighs of brass\" (Daniel 2:32) — \"and another third kingdom of brass, which shall bear rule over all the earth\" (Daniel 2:39).",
      category: "structure",
      anchor: [0.5, 0.55, 0.5],
      snap: "wall",
    },
    {
      id: "legs",
      title: "The Legs of Iron",
      short: "\"The fourth kingdom shall be strong as iron\"",
      detail:
        "\"His legs of iron\" (Daniel 2:33) — \"and the fourth kingdom shall be strong as iron: forasmuch as iron breaketh in pieces and subdueth all things: and as iron that breaketh all these, shall it break in pieces and bruise\" (Daniel 2:40).",
      category: "structure",
      anchor: [0.5, 0.3, 0.5],
      snap: "wall",
    },
    {
      id: "feet",
      title: "Feet of Iron and Clay",
      short: "\"The kingdom shall be divided\"",
      detail:
        "\"His feet part of iron and part of clay\" (Daniel 2:33) — \"the kingdom shall be divided... partly strong, and partly broken... they shall mingle themselves with the seed of men: but they shall not cleave one to another, even as iron is not mixed with clay\" (Daniel 2:41-43). Here the stone struck (2:34).",
      category: "entrance",
      anchor: [0.5, 0.06, 0.55],
      snap: "wall",
    },
  ],
  interior: {
    kicker: "The Dream",
    title: "The Form Thereof Was Terrible",
    cta: "See the Dream",
    text: "\"Thou, O king, sawest, and behold a great image... whose brightness was excellent... and the form thereof was terrible\" (Daniel 2:31). The Aramaic tselem — an image, a figure — descends metal by metal: gold, silver, brass, iron, and at last iron mingled with miry clay (Daniel 2:32-33).",
    image: "/img/babylon/interior.webp",
  },
  floorPlan: {
    kicker: "The Interpretation",
    title: "Four Kingdoms and a Fifth",
    cta: "View the Interpretation",
    text: "\"This is the dream; and we will tell the interpretation thereof before the king\" (Daniel 2:36). Each part of the image is interpreted as a kingdom in succession, until the God of heaven sets up a kingdom which shall never be destroyed (Daniel 2:44).",
    image: "/img/babylon/floor-plan.webp",
    rooms: [
      { name: "Head of fine gold", note: "\"Thou art this head of gold\" — Nebuchadnezzar (Daniel 2:38)" },
      { name: "Breast and arms of silver", note: "\"Another kingdom inferior to thee\" (Daniel 2:39)" },
      { name: "Belly and thighs of brass", note: "\"A third kingdom... over all the earth\" (Daniel 2:39)" },
      { name: "Legs of iron", note: "\"The fourth kingdom... strong as iron\" (Daniel 2:40)" },
      { name: "Feet and toes, iron and clay", note: "\"The kingdom shall be divided\" (Daniel 2:41-42)" },
      { name: "The stone cut out without hands", note: "A kingdom which shall never be destroyed (Daniel 2:44-45)" },
    ],
  },
  artifacts: {
    kicker: "The Parts of the Image",
    title: "Gold, Silver, Brass, Iron, and Clay",
    cta: "Explore the Parts",
    text: "Every element the king saw is named in Daniel 2:32-35, and every one receives its interpretation in verses 36-45.",
    image: "/img/babylon/artifacts.webp",
    items: [
      { name: "The head", purpose: "The first kingdom", material: "Fine gold", context: "\"Thou, O king, art a king of kings... Thou art this head of gold\" (Daniel 2:37-38)." },
      { name: "The breast and arms", purpose: "The second kingdom", material: "Silver", context: "\"After thee shall arise another kingdom inferior to thee\" (Daniel 2:39)." },
      { name: "The belly and thighs", purpose: "The third kingdom", material: "Brass", context: "\"...which shall bear rule over all the earth\" (Daniel 2:39)." },
      { name: "The legs", purpose: "The fourth kingdom", material: "Iron", context: "\"Strong as iron: forasmuch as iron breaketh in pieces and subdueth all things\" (Daniel 2:40)." },
      { name: "The feet and toes", purpose: "The divided kingdom", material: "Iron mixed with miry clay", context: "\"Partly strong, and partly broken... they shall not cleave one to another\" (Daniel 2:42-43)." },
      { name: "The stone", purpose: "The kingdom of the God of heaven", material: "\"Cut out of the mountain without hands\"", context: "\"It shall break in pieces and consume all these kingdoms, and it shall stand for ever\" (Daniel 2:44-45)." },
    ],
  },
  dailyLife: {
    kicker: "The End of the Dream",
    title: "The Stone and the Mountain",
    cta: "See the End",
    text: "\"Thou sawest till that a stone was cut out without hands, which smote the image upon his feet... Then was the iron, the clay, the brass, the silver, and the gold, broken to pieces together, and became like the chaff of the summer threshingfloors... and the stone that smote the image became a great mountain, and filled the whole earth\" (Daniel 2:34-35).",
    image: "/img/babylon/daily-life.webp",
  },
  geography: {
    kicker: "Where It Was Dreamed",
    title: "Babylon, Head of Gold",
    cta: "Explore Map",
    text: "The dream came to Nebuchadnezzar in Babylon, where God had made him \"ruler over them all\" (Daniel 2:38). Vine notes that \"the times of the Gentiles\" — the rule of the Gentiles upon the earth — \"commenced when God took authority and government from the house of David\" (Scripture Truth vol. 17).",
    image: "/img/babylon/map.webp",
    regionLabel: "Babylon — head of gold (Daniel 2:38)",
  },
  lesson: {
    title: "The Great Image and the Stone",
    intro: "The dream of Daniel 2:31-35, its interpretation in 2:36-45, and the library's commentary on the times of the Gentiles.",
    blocks: [
      { heading: "The dream", body: "A great image, its brightness excellent, its form terrible: head of fine gold, breast and arms of silver, belly and thighs of brass, legs of iron, feet part of iron and part of clay (Daniel 2:31-33). No dimensions are given in the chapter; what Scripture specifies is the metals and their descending order." },
      { heading: "The head of gold", body: "\"Thou, O king, art a king of kings: for the God of heaven hath given thee a kingdom, power, and strength, and glory... Thou art this head of gold\" (Daniel 2:37-38). The first of the kingdoms is named in the text itself — Nebuchadnezzar's Babylon." },
      { heading: "The kingdoms that follow", body: "\"After thee shall arise another kingdom inferior to thee, and another third kingdom of brass, which shall bear rule over all the earth. And the fourth kingdom shall be strong as iron\" (Daniel 2:39-40). Snaddon's study identifies the silver with the Medo-Persian empire (The Times of the Gentiles, citing Daniel 2:39)." },
      { heading: "The divided kingdom", body: "\"Whereas thou sawest the feet and toes, part of potters' clay, and part of iron, the kingdom shall be divided... partly strong, and partly broken... they shall mingle themselves with the seed of men: but they shall not cleave one to another\" (Daniel 2:41-43)." },
      { heading: "The stone cut out without hands", body: "\"In the days of these kings shall the God of heaven set up a kingdom, which shall never be destroyed... it shall break in pieces and consume all these kingdoms, and it shall stand for ever\" (Daniel 2:44). Mawson's Scripture Truth study of \"the stone cut out without hands\" contends against reading the stone as any human empire — it is cut out \"without hands.\"" },
      { heading: "The times of the Gentiles", body: "Snaddon: \"The expression 'Times of the Gentiles' covers the period during which Jerusalem is under Gentile domination\" (The Times of the Gentiles). Vine adds that this period \"commenced when God took authority and government from the house of David\" (Scripture Truth vol. 17)." },
    ],
  },
  quiz: [
    {
      q: "Of what was the image's head made?",
      choices: ["Silver", "Brass", "Fine gold", "Iron"],
      answer: 2,
      explanation: "\"This image's head was of fine gold\" (Daniel 2:32).",
    },
    {
      q: "Who is identified as the head of gold?",
      choices: ["Daniel", "Nebuchadnezzar", "Cyrus", "Belshazzar"],
      answer: 1,
      explanation: "\"Thou, O king, art a king of kings... Thou art this head of gold\" (Daniel 2:37-38).",
    },
    {
      q: "What was said of the fourth kingdom?",
      choices: ["It would be the richest", "It would be strong as iron, breaking in pieces all things", "It would rule the sea", "It would rebuild Jerusalem"],
      answer: 1,
      explanation: "\"The fourth kingdom shall be strong as iron: forasmuch as iron breaketh in pieces and subdueth all things\" (Daniel 2:40).",
    },
    {
      q: "Where did the stone strike the image?",
      choices: ["Upon the head", "Upon the breast", "Upon the legs", "Upon the feet of iron and clay"],
      answer: 3,
      explanation: "\"A stone was cut out without hands, which smote the image upon his feet that were of iron and clay\" (Daniel 2:34).",
    },
    {
      q: "What became of the stone that smote the image?",
      choices: ["It crumbled to dust", "It was set in the king's crown", "It became a great mountain and filled the whole earth", "It was cast into the sea"],
      answer: 2,
      explanation: "\"The stone that smote the image became a great mountain, and filled the whole earth\" (Daniel 2:35).",
    },
  ],
  timeline: [
    { era: "The dream", year: "Daniel 2:31", text: "Nebuchadnezzar sees a great image, its brightness excellent, its form terrible." },
    { era: "Head of gold", year: "Daniel 2:37-38", text: "\"Thou art this head of gold\" — the kingdom of Babylon, given by the God of heaven." },
    { era: "Silver and brass", year: "Daniel 2:39", text: "A second kingdom inferior to the first, then a third kingdom of brass bearing rule over all the earth." },
    { era: "Iron, then iron and clay", year: "Daniel 2:40-43", text: "A fourth kingdom strong as iron; at last divided — partly strong, partly broken." },
    { era: "The stone", year: "Daniel 2:44-45", text: "The God of heaven sets up a kingdom which shall never be destroyed; the stone becomes a great mountain and fills the whole earth." },
  ],
  keywords: ["nebuchadnezzar", "babylon", "daniel", "image", "tselem", "gold", "silver", "brass", "iron", "clay", "stone", "mountain", "times of the gentiles", "dream", "kingdoms"],
};
