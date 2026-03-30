export const MOCK_NOTIFICATIONS = [
  { id: 1, type: "accepted", content: "Volunteer accepted task: Food Drive", read: false, time: "2m ago" },
  { id: 2, type: "arrived", content: "Volunteer arrived at location: Downtown Shelter", read: true, time: "1h ago" },
  { id: 3, type: "completed", content: "Task completed: Medical Supplies Delivery", read: false, time: "2h ago" },
  { id: 4, type: "delayed", content: "1 task delayed: Senior Care Visit", read: true, time: "1d ago" },
];

export const MOCK_TASKS = [
  {
    id: "TSK-001",
    title: "Food Drive Distribution",
    description: "Distribute food packages to the homeless in the downtown area.",
    location: "Downtown Shelter",
    peopleNeeded: 5,
    urgency: "urgent", 
    skills: ["Logistics", "Heavy Lifting"],
    deadline: "2026-03-29",
    priorityScore: 95,
    status: "Active", 
    assignedVolunteer: null,
    progress: 10,
    lastUpdated: "2026-03-28T10:00:00Z"
  },
  {
    id: "TSK-002",
    title: "Medical Supplies Delivery",
    description: "Deliver essential medical supplies to the east clinic.",
    location: "East Clinic",
    peopleNeeded: 2,
    urgency: "progress",
    skills: ["Driving", "First Aid"],
    deadline: "2026-03-28",
    priorityScore: 80,
    status: "Assigned",
    assignedVolunteer: "Alex Johnson",
    progress: 60,
    lastUpdated: "2026-03-28T11:30:00Z"
  },
  {
    id: "TSK-003",
    title: "Senior Care Visit",
    description: "Weekly wellness check for elderly residents.",
    location: "Sunrise Community",
    peopleNeeded: 3,
    urgency: "pending",
    skills: ["Empathy", "Healthcare"],
    deadline: "2026-03-30",
    priorityScore: 40,
    status: "Pending",
    assignedVolunteer: null,
    progress: 0,
    lastUpdated: "2026-03-27T08:00:00Z"
  },
  {
    id: "TSK-004",
    title: "Clean Water Awareness",
    description: "Educational campaign in the suburban neighborhood.",
    location: "Suburban Hub",
    peopleNeeded: 4,
    urgency: "completed",
    skills: ["Communication", "Education"],
    deadline: "2026-03-25",
    priorityScore: 50,
    status: "Completed",
    assignedVolunteer: "Sarah Lee",
    progress: 100,
    lastUpdated: "2026-03-25T16:00:00Z"
  }
];

export const MOCK_ANALYTICS = {
  tasksOverTime: [
    { name: "Mon", tasks: 12 },
    { name: "Tue", tasks: 19 },
    { name: "Wed", tasks: 15 },
    { name: "Thu", tasks: 22 },
    { name: "Fri", tasks: 28 },
    { name: "Sat", tasks: 35 },
    { name: "Sun", tasks: 10 }
  ],
  completionRate: [
    { name: "Completed", value: 75, fill: "#22c55e" },
    { name: "Delayed", value: 10, fill: "#ef4444" },
    { name: "Pending", value: 15, fill: "#94a3b8" }
  ],
  priorityDist: [
    { name: "Urgent", value: 40, fill: "#ef4444" },
    { name: "Normal", value: 45, fill: "#0ea5e9" },
    { name: "Low", value: 15, fill: "#94a3b8" }
  ]
};

export const MOCK_VOLUNTEERS = [
  { id: "V-001", name: "Alex Johnson", rating: 4.8, status: "Busy" },
  { id: "V-002", name: "Sarah Lee", rating: 4.9, status: "Available" },
  { id: "V-003", name: "Mike Chen", rating: 4.5, status: "Offline" },
];
