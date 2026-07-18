export const faultPartsMap = {
    
  // --- FAULTS REQUIRING MOTOR TO BE PULLED UP ---

  "Winding burnout": {
    requiresPullingVehicle: true,
    parts: ["Copper winding wire spool", "Insulation paper", "Varnish"],
    tools: ["Motor pulling machine/Crane", "Winding machine", "Multimeter", "Heating lamp"],
    estimatedTime: "2 hours (On-field rewind)",
    cost: "₹2500-₹4000"
  },
  "Impeller damage": {
    requiresPullingVehicle: true,
    parts: ["Replacement Impeller (4/6 inch)", "Shaft seal", "O-ring set"],
    tools: ["Motor pulling machine/Crane", "Spanner set", "Bearing puller"],
    estimatedTime: "1.5 hours",
    cost: "₹800-₹2000"
  },
  "Bearing seizure": {
    requiresPullingVehicle: true,
    parts: ["Steel ball bearings", "Waterproof grease", "Shaft seal"],
    tools: ["Motor pulling machine/Crane", "Bearing puller", "Hammer & chisel"],
    estimatedTime: "1.5 hours",
    cost: "₹500-₹1200"
  },
  "Shaft breakage": {
    requiresPullingVehicle: true,
    parts: ["Steel rotor shaft", "Coupling joint"],
    tools: ["Motor pulling machine/Crane", "Portable welding kit", "Grinder"],
    estimatedTime: "2 hours",
    cost: "₹1500-₹3000"
  },
  "Seal failure": {
    requiresPullingVehicle: true,
    parts: ["Mechanical seal set", "Rubber gaskets"],
    tools: ["Motor pulling machine/Crane", "Allen keys", "Sealant"],
    estimatedTime: "1 hour",
    cost: "₹300-₹800"
  },
  "Water logging": {
    requiresPullingVehicle: true,
    parts: ["Waterproof resin", "New housing bolts"],
    tools: ["Motor pulling machine/Crane", "Air blower", "Insulation tester"],
    estimatedTime: "2 hours",
    cost: "₹1000-₹2000"
  },
  "Suction pipe blockage": {
    requiresPullingVehicle: true,
    parts: ["Replacement foot valve", "Filter mesh"],
    tools: ["Motor pulling machine/Crane", "Heavy pipe wrenches", "Plumbing tape"],
    estimatedTime: "1 hour",
    cost: "₹400-₹900"
  },

  // --- SURFACE LEVEL FAULTS (NO PULLING VEHICLE NEEDED) ---

  "Capacitor failure": {
    requiresPullingVehicle: false,
    parts: ["25MFD / 50MFD start/run capacitor", "Terminal connectors"],
    tools: ["Multimeter", "Screwdriver set", "Wire strippers"],
    estimatedTime: "30 minutes",
    cost: "₹200-₹500"
  },
  "Starter panel fault": {
    requiresPullingVehicle: false,
    parts: ["Contactor coil", "Relay switch", "Push buttons"],
    tools: ["Multimeter", "Electrical toolkit"],
    estimatedTime: "45 minutes",
    cost: "₹500-₹1500"
  },
  "Voltage fluctuation damage": {
    requiresPullingVehicle: false,
    parts: ["MCB breaker", "Voltage stabilizer relay"],
    tools: ["Multimeter", "Phase tester"],
    estimatedTime: "45 minutes",
    cost: "₹600-₹1200"
  },
  "Overheating": {
    requiresPullingVehicle: false, 
    parts: ["Thermal overload relay", "Cooling fan (if monoblock)"],
    tools: ["Infrared thermometer", "Screwdriver set"],
    estimatedTime: "1 hour",
    cost: "₹400-₹1000"
  },
  "Cable fault": {
    requiresPullingVehicle: false, 
    parts: ["Waterproof joint kit", "3-core copper cable"],
    tools: ["Wire strippers", "Crimping tool", "Heat gun"],
    estimatedTime: "1 hour",
    cost: "₹300-₹800"
  }
};