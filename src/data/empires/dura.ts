import type { Empire } from "@/types/empire";

/** All specifications retrieved from the KJV via the Rhema library.
 *  The image: Daniel 3:1-6. The furnace and the fourth man: 3:19-25. */
export const dura: Empire = {
  id: "dura",
  name: "The Plain of Dura",
  dwelling: "The Image of Gold",
  subtitle: "Threescore cubits high, six cubits broad",
  description:
    "\"Nebuchadnezzar the king made an image of gold, whose height was threescore cubits, and the breadth thereof six cubits: he set it up in the plain of Dura, in the province of Babylon\" (Daniel 3:1) — a colossus ten times taller than broad, with a herald, a furnace, and three men who would not bow.",
  modelPath: "/models/dura.glb",
  tint: "#b8860b",
  camera: { azimuth: -25, elevation: 14, dist: 1.05, targetY: 0.4 },
  facts: [
    { label: "Period", value: "The reign of Nebuchadnezzar, king of Babylon (Daniel 3)", icon: "period" },
    { label: "Region", value: "The plain of Dura, in the province of Babylon (Daniel 3:1)", icon: "region" },
    { label: "Material", value: "Gold (Daniel 3:1)", icon: "materials" },
    { label: "Dimensions", value: "60 cubits high, 6 cubits broad — ten to one (Daniel 3:1)", icon: "feature" },
    { label: "Its demand", value: "\"Ye fall down and worship the golden image\" — or the burning fiery furnace (Daniel 3:5-6)", icon: "occupants" },
  ],
  hotspots: [
    {
      id: "image",
      title: "The Image of Gold",
      short: "Sixty cubits by six — ten times taller than broad",
      detail:
        "\"Nebuchadnezzar the king made an image of gold, whose height was threescore cubits, and the breadth thereof six cubits\" (Daniel 3:1). Unlike the dream image of chapter 2 with its descending metals, this one was gold from head to foot — the king's answer, in gold alone, to the vision that made him only the head.",
      category: "structure",
      anchor: [0.5, 0.85, 0.5],
      snap: "roof",
    },
    {
      id: "plain",
      title: "The Plain of Dura",
      short: "Where all the rulers were gathered",
      detail:
        "\"He set it up in the plain of Dura, in the province of Babylon. Then Nebuchadnezzar the king sent to gather together the princes, the governors, and the captains, the judges, the treasurers, the counsellors, the sheriffs, and all the rulers of the provinces, to come to the dedication of the image\" (Daniel 3:1-2).",
      category: "court",
      anchor: [0.5, 0.08, 0.75],
      snap: "court",
    },
    {
      id: "herald",
      title: "The Herald's Cry",
      short: "\"To you it is commanded, O people, nations, and languages\"",
      detail:
        "\"That at what time ye hear the sound of the cornet, flute, harp, sackbut, psaltery, dulcimer, and all kinds of musick, ye fall down and worship the golden image that Nebuchadnezzar the king hath set up: and whoso falleth not down and worshippeth shall the same hour be cast into the midst of a burning fiery furnace\" (Daniel 3:4-6).",
      category: "entrance",
      anchor: [0.3, 0.15, 0.8],
      snap: "court",
    },
    {
      id: "furnace",
      title: "The Burning Fiery Furnace",
      short: "\"One seven times more than it was wont to be heated\"",
      detail:
        "\"He spake, and commanded that they should heat the furnace one seven times more than it was wont to be heated\" (Daniel 3:19) — so hot that \"the flame of the fire slew those men that took up Shadrach, Meshach, and Abed-nego\" (3:22).",
      category: "facade",
      anchor: [0.85, 0.2, 0.6],
      snap: "wall",
    },
    {
      id: "fourth-man",
      title: "The Fourth Man",
      short: "\"Like the Son of God\"",
      detail:
        "\"Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the form of the fourth is like the Son of God\" (Daniel 3:25). The three who would not bow to the sixty-cubit image walked unhurt where their binders died.",
      category: "interior",
      anchor: [0.85, 0.35, 0.6],
      snap: "wall",
    },
  ],
  interior: {
    kicker: "The Dedication",
    title: "All the Rulers Bowed — Save Three",
    cta: "See the Dedication",
    text: "\"Then the princes, the governors, and captains, the judges, the treasurers, the counsellors, the sheriffs, and all the rulers of the provinces, were gathered together unto the dedication of the image... and they stood before the image that Nebuchadnezzar had set up\" (Daniel 3:3) — awaiting the sound of the cornet, flute, harp, sackbut, psaltery and dulcimer (3:5).",
    image: "/img/dura/interior.webp",
  },
  floorPlan: {
    kicker: "The Record",
    title: "The Image and Its Hour",
    cta: "View the Record",
    text: "Daniel 3's own inventory of the scene:",
    image: "/img/dura/floor-plan.webp",
    rooms: [
      { name: "The image", note: "Gold, 60 cubits high, 6 broad (Daniel 3:1)" },
      { name: "The plain of Dura", note: "In the province of Babylon (3:1)" },
      { name: "The rulers assembled", note: "Princes to sheriffs, all the provinces (3:2-3)" },
      { name: "The herald", note: "\"To you it is commanded\" (3:4)" },
      { name: "The six instruments", note: "Cornet, flute, harp, sackbut, psaltery, dulcimer (3:5)" },
      { name: "The furnace", note: "Heated seven times more (3:19)" },
      { name: "The fourth man", note: "\"Like the Son of God\" (3:25)" },
    ],
  },
  artifacts: {
    kicker: "The Instruments and the Fire",
    title: "What Sounded and What Burned",
    cta: "Explore the Scene",
    text: "Every object of the chapter's drama, as the text names it.",
    image: "/img/dura/artifacts.webp",
    items: [
      { name: "The golden image", purpose: "The king's demanded worship", material: "Gold", context: "\"Whose height was threescore cubits, and the breadth thereof six cubits\" (Daniel 3:1)." },
      { name: "The six instruments", purpose: "The signal to bow", material: "—", context: "\"The sound of the cornet, flute, harp, sackbut, psaltery, dulcimer, and all kinds of musick\" (Daniel 3:5)." },
      { name: "The furnace", purpose: "The penalty for refusing", material: "—", context: "\"Heated one seven times more than it was wont to be heated\" (Daniel 3:19)." },
      { name: "The bonds", purpose: "What the three were cast in", material: "\"Their coats, their hosen, and their hats\"", context: "\"These three men... fell down bound into the midst of the burning fiery furnace\" (Daniel 3:21, 23)." },
      { name: "The fire's only victims", purpose: "Witness of its heat", material: "—", context: "\"The flame of the fire slew those men that took up Shadrach, Meshach, and Abed-nego\" (Daniel 3:22)." },
      { name: "The fourth form", purpose: "The companion in the fire", material: "—", context: "\"The form of the fourth is like the Son of God\" (Daniel 3:25)." },
    ],
  },
  dailyLife: {
    kicker: "The Deliverance",
    title: "Four Men Loose, Walking in the Fire",
    cta: "See the Deliverance",
    text: "\"Then Nebuchadnezzar the king was astonied, and rose up in haste... Did not we cast three men bound into the midst of the fire?... Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the form of the fourth is like the Son of God\" (Daniel 3:24-25).",
    image: "/img/dura/daily-life.webp",
  },
  geography: {
    kicker: "Where It Stood",
    title: "The Province of Babylon",
    cta: "Explore the Plain",
    text: "\"He set it up in the plain of Dura, in the province of Babylon\" (Daniel 3:1) — level ground for a sixty-cubit colossus, and for every ruler of the provinces to stand before it at once (3:2-3).",
    image: "/img/dura/map.webp",
    regionLabel: "The plain of Dura, province of Babylon (Daniel 3:1)",
  },
  lesson: {
    title: "The Image of Gold on the Plain of Dura",
    intro: "Daniel 3 in the passages retrieved for this exhibit.",
    blocks: [
      { heading: "The image", body: "Sixty cubits high, six broad, all gold (Daniel 3:1). After the dream of chapter 2 had named him only the head of gold, the king raised a form that was gold from head to foot — Scripture gives its measurements and lets the contrast speak." },
      { heading: "The summons", body: "Princes, governors, captains, judges, treasurers, counsellors, sheriffs — \"all the rulers of the provinces\" — gathered to the dedication (Daniel 3:2-3), with six named instruments for the signal and a furnace for the penalty (3:5-6)." },
      { heading: "The refusal", body: "Three men would not bow. The king, \"full of fury,\" had the furnace heated \"one seven times more than it was wont to be heated,\" and his mightiest men bound them in their garments and cast them in (Daniel 3:19-21)." },
      { heading: "The fire's witness", body: "The furnace was hot enough to slay the men who carried them (Daniel 3:22) — the text's own proof that what followed was no trick of a cool flame." },
      { heading: "The fourth man", body: "\"Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the form of the fourth is like the Son of God\" (Daniel 3:25). The king who demanded worship of gold saw a form he could only describe in those words." },
      { heading: "Set beside chapter 2", body: "This exhibit stands beside Daniel's Prophetic Vision in the atlas: there, an image of many metals ends smitten by the stone; here, an image of one metal ends witnessing a deliverance its own furnace could not prevent." },
    ],
  },
  quiz: [
    {
      q: "What were the image's dimensions?",
      choices: ["60 × 6 cubits", "30 × 6 cubits", "60 × 10 cubits", "100 × 10 cubits"],
      answer: 0,
      explanation: "\"...whose height was threescore cubits, and the breadth thereof six cubits\" (Daniel 3:1).",
    },
    {
      q: "Where was it set up?",
      choices: ["In the temple of Bel", "In the plain of Dura, in the province of Babylon", "On the palace roof", "By the river Chebar"],
      answer: 1,
      explanation: "\"He set it up in the plain of Dura, in the province of Babylon\" (Daniel 3:1).",
    },
    {
      q: "What was the signal to fall down and worship?",
      choices: ["A trumpet from the palace", "The herald's third cry", "The sound of the cornet, flute, harp, sackbut, psaltery, dulcimer, and all kinds of musick", "The lighting of the furnace"],
      answer: 2,
      explanation: "Daniel 3:5.",
    },
    {
      q: "How much hotter was the furnace made?",
      choices: ["Twice", "Three times", "Seven times more than it was wont", "It was cooled"],
      answer: 2,
      explanation: "\"...heat the furnace one seven times more than it was wont to be heated\" (Daniel 3:19).",
    },
    {
      q: "What did the king say of the fourth man in the fire?",
      choices: ["\"He is a spirit\"", "\"His form is like the Son of God\"", "\"He is Daniel\"", "\"He is an angel of fire\""],
      answer: 1,
      explanation: "\"...and the form of the fourth is like the Son of God\" (Daniel 3:25).",
    },
  ],
  timeline: [
    { era: "The image raised", year: "Daniel 3:1", text: "An image of gold, sixty cubits by six, set up in the plain of Dura." },
    { era: "The dedication", year: "Daniel 3:2-6", text: "All the rulers of the provinces gathered; the herald's command; the furnace threatened." },
    { era: "The refusal", year: "Daniel 3:19-21", text: "The furnace heated seven times more; Shadrach, Meshach and Abed-nego bound and cast in." },
    { era: "The fire's proof", year: "Daniel 3:22-23", text: "The flame slays the men who carried them; the three fall down bound into the midst." },
    { era: "The fourth man", year: "Daniel 3:24-25", text: "Four men loose, walking in the fire, unhurt — \"and the form of the fourth is like the Son of God.\"" },
  ],
  keywords: ["dura", "image of gold", "nebuchadnezzar", "shadrach", "meshach", "abednego", "fiery furnace", "fourth man", "son of god", "sixty cubits", "daniel 3", "babylon", "worship"],
};
