export const INITIAL_REPORTS = [
  {
    id: "WM-2026-8492",
    location: "Connaught Place & Central Market, New Delhi",
    lat: 28.6315,
    lng: 77.2167,
    category: "Dumpster Overflow",
    severity: "High",
    status: "Dispatched", // Registered, Assigned, Dispatched, Resolved
    timestamp: "2026-10-06 09:30 AM",
    description: "Commercial waste bin overflowing near outer circle market. Organic waste causing foul odor.",
    reporter: "Rahul Sharma",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    updates: [
      { time: "09:30 AM", note: "Report submitted by citizen via EcoBot AI" },
      { time: "09:45 AM", note: "Assigned to Municipal Sanitation Unit #4 (Central Delhi Sector)" },
      { time: "10:15 AM", note: "Heavy waste collection truck dispatched to location" }
    ]
  },
  {
    id: "WM-2026-7310",
    location: "Dadar Market & West Station Road, Mumbai",
    lat: 19.0178,
    lng: 72.8478,
    category: "Illegal Dumping",
    severity: "Medium",
    status: "Assigned",
    timestamp: "2026-10-06 10:15 AM",
    description: "Broken wooden crates and discarded plastic packaging deposited on sidewalk.",
    reporter: "Priya Patel",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80",
    updates: [
      { time: "10:15 AM", note: "Report logged with high priority" },
      { time: "10:30 AM", note: "BMC Sanitation Inspector assigned for site inspection" }
    ]
  },
  {
    id: "WM-2026-6129",
    location: "Electronic City & Silk Board Flyover, Bengaluru",
    lat: 12.9172,
    lng: 77.6228,
    category: "E-Waste / Batteries",
    severity: "Low",
    status: "Resolved",
    timestamp: "2026-10-05 02:20 PM",
    description: "Discarded computer monitors and battery components left near IT park gate.",
    reporter: "Ananya Rao",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
    updates: [
      { time: "02:20 PM", note: "Report logged" },
      { time: "03:10 PM", note: "Specialized E-Waste collection van collected items" },
      { time: "04:30 PM", note: "Site cleaned and verified. Ticket closed." }
    ]
  },
  {
    id: "WM-2026-5041",
    location: "T. Nagar Commercial Hub, Chennai",
    lat: 13.0418,
    lng: 80.2341,
    category: "Hazardous / Chemical",
    severity: "High",
    status: "Registered",
    timestamp: "2026-10-06 11:20 AM",
    description: "Unattended solvent cans and industrial dye waste containers near market lane.",
    reporter: "Karthik V.",
    image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80",
    updates: [
      { time: "11:20 AM", note: "Urgent HazMat containment ticket created" }
    ]
  }
];

export const WASTE_GUIDES = [
  {
    id: 1,
    category: "Plastic & Dry Recyclables",
    binColor: "Blue Bin",
    binHex: "#2563eb",
    icon: "♻️",
    items: ["Plastic Bottles (PET)", "Milk & Juice Cartons", "Clean Metal Cans", "Cardboard & Paper"],
    instructions: "Rinse containers before disposal. Flatten cardboard boxes to save space."
  },
  {
    id: 2,
    category: "Organic & Kitchen Waste",
    binColor: "Green Bin",
    binHex: "#16a34a",
    icon: "🍏",
    items: ["Food Scraps & Fruit Peels", "Coffee Grounds & Tea Bags", "Garden Leaves & Weeds", "Soiled Paper Towels"],
    instructions: "Dispose in biodegradable bags or loose. Do not include plastic wrappers."
  },
  {
    id: 3,
    category: "Electronic Waste (E-Waste)",
    binColor: "Red Container",
    binHex: "#dc2626",
    icon: "💻",
    items: ["Old Smartphones & Cables", "Lithium Batteries", "Circuit Boards", "Computers & TV Screens"],
    instructions: "Do NOT mix with general trash. Drop off at designated municipal e-waste hubs."
  },
  {
    id: 4,
    category: "Hazardous & Chemicals",
    binColor: "Yellow Warning Bin",
    binHex: "#d97706",
    icon: "⚠️",
    items: ["Paint Thinner & Solvents", "Motor Oils", "Pesticides & Spray Cans", "Fluorescent Light Tubes"],
    instructions: "Keep in original sealed containers. Request specialized HazMat pickup."
  },
  {
    id: 5,
    category: "Bio-Medical & Sanitary",
    binColor: "Purple Biohazard",
    binHex: "#9333ea",
    icon: "🩺",
    items: ["Used Masks & Gloves", "Expired Medications", "Bandages & Syringes"],
    instructions: "Seal in leak-proof double bags. Label clearly before bin disposal."
  },
  {
    id: 6,
    category: "Non-Recyclable Residual Waste",
    binColor: "Black / Grey Bin",
    binHex: "#475569",
    icon: "🗑️",
    items: ["Styrofoam Packaging", "Broken Ceramics & Glass", "Vacuum Cleaner Dust", "Non-recyclable Wrappers"],
    instructions: "General landfill waste. Ensure bags are securely tied to avoid littering."
  }
];

export const CHAT_SUGGESTIONS = [
  {
    id: "ewaste_sol",
    title: "⚡ E-Waste Management Solutions",
    desc: "How to safely dispose of old phones, batteries, and recover precious metals easily.",
    actionText: "What are the best solutions for E-Waste management?"
  },
  {
    id: "normal_sol",
    title: "🌿 Normal Household Waste Solutions",
    desc: "Learn 30-day home composting, 4-bin sorting, and zero-waste life hacks.",
    actionText: "Give me easy solutions for normal household waste and composting."
  },
  {
    id: "video_sol",
    title: "🎥 Solution Videos & Visual Infographics",
    desc: "Watch live animated waste sorting guides and step-by-step visual diagrams.",
    actionText: "Show me waste management solution videos and visual infographics."
  },
  {
    id: "report",
    title: "🚨 Report Waste Incident",
    desc: "Spotted illegal garbage or overflowing bin in your street? Log a report now.",
    actionText: "Report waste issue"
  }
];
