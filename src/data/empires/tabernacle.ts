import type { Empire } from "@/types/empire";

/** All specifications retrieved from the KJV via the Rhema library.
 *  Curtains and boards: Exodus 26. Court and brazen altar: Exodus 27.
 *  Furniture: Exodus 25:23-31; 30:1-6, 17-21. Glory: Exodus 40:33-38. */
export const tabernacle: Empire = {
  id: "tabernacle",
  name: "The Camp of Israel",
  dwelling: "The Tabernacle",
  subtitle: "The house of God in the wilderness",
  description:
    "\"And let them make me a sanctuary; that I may dwell among them\" (Exodus 25:8). A tent of ten curtains of fine twined linen, blue, purple and scarlet with cherubim of cunning work, on boards of shittim wood ten cubits high in sockets of silver, within a court an hundred cubits by fifty (Exodus 26:1, 15-16; 27:18) — the mishkan, God's dwelling in the midst of the camp.",
  modelPath: "/models/tabernacle.glb",
  tint: "#a58a5a",
  camera: { azimuth: -34, elevation: 32, dist: 1.05, targetY: 0.3 },
  facts: [
    { label: "Period", value: "Made at Sinai; carried \"throughout all their journeys\" (Exodus 40:38)", icon: "period" },
    { label: "Region", value: "The wilderness — the cloud by day, fire by night (Exodus 40:38)", icon: "region" },
    { label: "Materials", value: "Shittim boards, silver sockets, gold, brass, fine twined linen, goats' hair (Exodus 26)", icon: "materials" },
    { label: "Dimensions", value: "Boards 10 × 1½ cubits; curtains 28 × 4; court 100 × 50 × 5 (Exodus 26:2, 16; 27:18)", icon: "feature" },
    { label: "Purpose", value: "\"Let them make me a sanctuary; that I may dwell among them\" (Exodus 25:8)", icon: "occupants" },
  ],
  hotspots: [
    {
      id: "curtains",
      title: "The Ten Curtains",
      short: "Fine twined linen with cherubim of cunning work",
      detail:
        "\"Thou shalt make the tabernacle with ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work\" — each 28 by 4 cubits, coupled five and five with fifty loops of blue and fifty taches of gold, \"and it shall be one tabernacle\" (Exodus 26:1-6). Over them, eleven curtains of goats' hair, each 30 by 4 cubits, for a covering (26:7-8).",
      category: "roof",
      anchor: [0.35, 0.95, 0.5],
      snap: "roof",
    },
    {
      id: "boards",
      title: "The Boards and Silver Sockets",
      short: "Shittim wood standing up, 10 × 1½ cubits",
      detail:
        "\"Thou shalt make boards for the tabernacle of shittim wood standing up. Ten cubits shall be the length of a board, and a cubit and a half shall be the breadth\" — twenty boards on the south, twenty on the north, six westward, each with two tenons resting in two sockets of silver (Exodus 26:15-22).",
      category: "structure",
      anchor: [0.25, 0.5, 0.3],
      snap: "wall",
    },
    {
      id: "gate",
      title: "The Gate of the Court",
      short: "A hanging of twenty cubits, wrought with needlework",
      detail:
        "\"And for the gate of the court shall be an hanging of twenty cubits, of blue, and purple, and scarlet, and fine twined linen, wrought with needlework: and their pillars shall be four\" (Exodus 27:16) — the one way in through hangings of fine twined linen five cubits high (27:18).",
      category: "entrance",
      anchor: [0.5, 0.3, 0.97],
      snap: "wall",
    },
    {
      id: "brazen-altar",
      title: "The Brazen Altar",
      short: "Five cubits foursquare, three cubits high",
      detail:
        "\"Thou shalt make an altar of shittim wood, five cubits long, and five cubits broad; the altar shall be foursquare: and the height thereof shall be three cubits\" — horns on its four corners, overlaid with brass, with a grate of network of brass, hollow with boards (Exodus 27:1-8). It stood in the court, first past the gate.",
      category: "court",
      anchor: [0.6, 0.2, 0.75],
      snap: "court",
    },
    {
      id: "veil",
      title: "The Veil",
      short: "Dividing the holy place and the most holy",
      detail:
        "\"Thou shalt make a vail of blue, and purple, and scarlet, and fine twined linen of cunning work: with cherubims shall it be made... and the vail shall divide unto you between the holy place and the most holy\" (Exodus 26:31, 33) — hung on four pillars of shittim wood overlaid with gold, upon four sockets of silver, with the ark of the testimony within.",
      category: "interior",
      anchor: [0.2, 0.6, 0.5],
      snap: "roof",
    },
  ],
  interior: {
    kicker: "Interior View",
    title: "The Holy Place",
    cta: "Explore Interior",
    text: "\"Thou shalt set the table without the vail, and the candlestick over against the table on the side of the tabernacle toward the south: and thou shalt put the table on the north side\" (Exodus 26:35). Before the veil stood the golden altar of incense, \"where I will meet with thee\" (Exodus 30:6); beyond it, the ark and the mercy seat in the most holy place (26:34).",
    image: "/img/tabernacle/interior.webp",
  },
  floorPlan: {
    kicker: "Floor Plan",
    title: "Court, Holy Place, and Most Holy",
    cta: "View Floor Plan",
    text: "The court ran an hundred cubits by fifty, its hangings five cubits high on pillars of brass filleted with silver (Exodus 27:9-18). Within stood the tent itself: the holy place with table, candlestick and golden altar, and past the veil the most holy with the ark (Exodus 26:33-35).",
    image: "/img/tabernacle/floor-plan.webp",
    rooms: [
      { name: "The court", note: "100 × 50 cubits, hangings 5 high (Exodus 27:18)" },
      { name: "The gate", note: "Hanging of 20 cubits, needlework (Exodus 27:16)" },
      { name: "Brazen altar", note: "5 × 5 × 3 cubits (Exodus 27:1)" },
      { name: "The laver", note: "Between the tent and the altar (Exodus 30:18)" },
      { name: "Holy place", note: "Table north, candlestick south (Exodus 26:35)" },
      { name: "Altar of incense", note: "Before the veil (Exodus 30:6)" },
      { name: "The veil", note: "Divides holy from most holy (Exodus 26:33)" },
      { name: "Most holy place", note: "The ark and mercy seat (Exodus 26:34)" },
    ],
  },
  artifacts: {
    kicker: "The Vessels",
    title: "Furniture of the Sanctuary",
    cta: "Explore the Vessels",
    text: "Each vessel was made to the pattern shewed in the mount (Exodus 25:9): brass in the court, gold within the tent.",
    image: "/img/tabernacle/artifacts.webp",
    items: [
      { name: "The brazen altar", purpose: "Burnt offering at the door", material: "Shittim wood overlaid with brass", context: "\"Five cubits long, and five cubits broad... the height thereof shall be three cubits\" with horns of the same (Exodus 27:1-2)." },
      { name: "The laver", purpose: "Washing of hands and feet", material: "Brass", context: "\"Thou shalt put it between the tabernacle of the congregation and the altar... Aaron and his sons shall wash their hands and their feet thereat... that they die not\" (Exodus 30:18-20)." },
      { name: "The table of shewbread", purpose: "\"Shewbread before me alway\"", material: "Shittim wood, pure gold, crown of gold", context: "\"Two cubits shall be the length thereof, and a cubit the breadth thereof, and a cubit and a half the height thereof\" (Exodus 25:23, 30)." },
      { name: "The candlestick", purpose: "Light in the holy place", material: "Pure gold, of beaten work", context: "\"His shaft, and his branches, his bowls, his knops, and his flowers, shall be of the same\" (Exodus 25:31)." },
      { name: "The altar of incense", purpose: "To burn incense before the veil", material: "Shittim wood overlaid with pure gold", context: "\"A cubit shall be the length thereof, and a cubit the breadth thereof; foursquare shall it be: and two cubits shall be the height thereof\" (Exodus 30:2), set \"before the vail that is by the ark of the testimony\" (30:6)." },
      { name: "The veil", purpose: "Dividing holy place from most holy", material: "Blue, purple, scarlet, fine twined linen, cherubim", context: "Hung on four gold-overlaid pillars in silver sockets (Exodus 26:31-33)." },
    ],
  },
  dailyLife: {
    kicker: "Its Service",
    title: "The Glory and the Journeys",
    cta: "Discover Its Service",
    text: "\"So Moses finished the work. Then a cloud covered the tent of the congregation, and the glory of the LORD filled the tabernacle\" (Exodus 40:33-34). \"When the cloud was taken up from over the tabernacle, the children of Israel went onward in all their journeys: but if the cloud were not taken up, then they journeyed not\" (40:36-37).",
    image: "/img/tabernacle/daily-life.webp",
  },
  geography: {
    kicker: "Where It Journeyed",
    title: "Through the Wilderness",
    cta: "Explore Map",
    text: "\"For the cloud of the LORD was upon the tabernacle by day, and fire was on it by night, in the sight of all the house of Israel, throughout all their journeys\" (Exodus 40:38). From Sinai onward, the house of God moved with the camp of Israel.",
    image: "/img/tabernacle/map.webp",
    regionLabel: "Sinai and the wilderness journeys (Exodus 40:36-38)",
  },
  lesson: {
    title: "The Tabernacle — God Dwelling Among His People",
    intro: "The specification of Exodus 25-30 and 40, with the library's commentary on its meaning.",
    blocks: [
      { heading: "The purpose", body: "\"And let them make me a sanctuary; that I may dwell among them. According to all that I shew thee, after the pattern of the tabernacle... even so shall ye make it\" (Exodus 25:8-9). The Hebrew mishkan is \"a residence... specifically, the Tabernacle (properly, its wooden walls)\" — a dwelling place." },
      { heading: "The curtains", body: "Ten curtains of fine twined linen, blue, purple and scarlet, with cherubim of cunning work, each 28 by 4 cubits, joined by fifty loops of blue and fifty taches of gold into \"one tabernacle\" (Exodus 26:1-6); over them eleven goats'-hair curtains of 30 by 4 cubits (26:7-8). A Scripture Truth writer notes the goats'-hair tent \"was a size larger... so that the goat's hair curtains made a complete covering.\"" },
      { heading: "The boards", body: "Forty-eight boards of shittim wood standing up, each ten cubits by a cubit and a half — twenty south, twenty north, six westward — every board with two tenons set in two sockets of silver (Exodus 26:15-22)." },
      { heading: "The court", body: "Hangings of fine twined linen an hundred cubits on the south and north, fifty on the west and east, five cubits high, on pillars of brass filleted with silver; the gate a twenty-cubit hanging of blue, purple and scarlet wrought with needlework (Exodus 27:9-18)." },
      { heading: "The library's commentary", body: "Gaebelein: \"While the tabernacle is a type of the heavenly places (Heb. 9:23) it is also a type of Christ, who tabernacled among men. The wonderful foreshadowings we find here down to the minutest details is an evidence of inspiration\" (The Book of Exodus). A. J. Pollock's Lessons from the Tabernacle sets beside it John 2:21 — \"He spoke of the temple of His body.\"" },
      { heading: "The glory", body: "\"So Moses finished the work. Then a cloud covered the tent of the congregation, and the glory of the LORD filled the tabernacle. And Moses was not able to enter\" (Exodus 40:33-35). The cloud governed every journey of the camp (40:36-38)." },
    ],
  },
  quiz: [
    {
      q: "What were the dimensions of one tabernacle board?",
      choices: ["5 × 1 cubits", "10 × 1½ cubits", "10 × 2 cubits", "28 × 4 cubits"],
      answer: 1,
      explanation: "\"Ten cubits shall be the length of a board, and a cubit and a half shall be the breadth of one board\" (Exodus 26:16).",
    },
    {
      q: "What were the dimensions of the court?",
      choices: ["100 × 50 cubits", "60 × 20 cubits", "50 × 50 cubits", "300 × 50 cubits"],
      answer: 0,
      explanation: "\"The length of the court shall be an hundred cubits, and the breadth fifty every where, and the height five cubits\" (Exodus 27:18).",
    },
    {
      q: "What did the veil divide?",
      choices: ["The court from the camp", "The holy place from the most holy", "The altar from the laver", "The north side from the south"],
      answer: 1,
      explanation: "\"The vail shall divide unto you between the holy place and the most holy\" (Exodus 26:33).",
    },
    {
      q: "Where did the laver stand?",
      choices: ["Inside the most holy place", "At the gate of the court", "Between the tabernacle and the altar", "Before the veil"],
      answer: 2,
      explanation: "\"Thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein\" (Exodus 30:18).",
    },
    {
      q: "When did Israel journey onward?",
      choices: ["Every morning", "When the trumpets sounded", "When the cloud was taken up from over the tabernacle", "At Moses' command alone"],
      answer: 2,
      explanation: "\"When the cloud was taken up from over the tabernacle, the children of Israel went onward in all their journeys\" (Exodus 40:36).",
    },
  ],
  timeline: [
    { era: "The pattern", year: "Exodus 25:8-9", text: "\"Let them make me a sanctuary; that I may dwell among them\" — all after the pattern shewed to Moses in the mount." },
    { era: "The tent", year: "Exodus 26", text: "Ten curtains of fine twined linen with cherubim; eleven of goats' hair; forty-eight boards of shittim wood in silver sockets; the veil on four golden pillars." },
    { era: "The court", year: "Exodus 27:9-18", text: "Hangings of fine twined linen, 100 × 50 cubits, five high; the brazen altar within; the gate of needlework, twenty cubits." },
    { era: "The work finished", year: "Exodus 40:33-35", text: "Moses finishes the work; the cloud covers the tent, and the glory of the LORD fills the tabernacle." },
    { era: "The journeys", year: "Exodus 40:36-38", text: "The cloud by day and fire by night govern every journey of the house of Israel." },
  ],
  keywords: ["tabernacle", "mishkan", "sanctuary", "wilderness", "curtains", "boards", "silver sockets", "veil", "brazen altar", "laver", "candlestick", "shewbread", "sinai", "cloud", "glory"],
};
