// Mock data for user activity dashboard

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  lastActive: string
}

export interface Session {
  id: string
  userId: string
  startTime: string
  endTime: string
  duration: number
  device: string
  browser: string
  location: {
    country: string
    city: string
    lat: number
    lng: number
  }
  pages: Array<{
    path: string
    timestamp: string
    duration: number
  }>
  actions: Array<{
    type: string
    target: string
    timestamp: string
  }>
}

export interface MockData {
  users: User[]
  sessions: Session[]
}

const mockData: MockData = {
  users: [
    {
      id: "1",
      name: "Alice Dupont",
      email: "alice@example.com",
      role: "admin",
      lastActive: "2024-12-01T10:30:00Z"
    },
    {
      id: "2",
      name: "Bob Martin",
      email: "bob@example.com",
      role: "user",
      lastActive: "2024-12-01T09:15:00Z"
    },
    {
      id: "3",
      name: "Claire Bernard",
      email: "claire@example.com",
      role: "user",
      lastActive: "2024-11-30T18:45:00Z"
    }
  ],
  sessions: [
    {
      id: "s1",
      userId: "1",
      startTime: "2024-12-01T10:00:00Z",
      endTime: "2024-12-01T10:30:00Z",
      duration: 1800,
      device: "desktop",
      browser: "Chrome",
      location: {
        country: "France",
        city: "Paris",
        lat: 48.8566,
        lng: 2.3522
      },
      pages: [
        { path: "/", timestamp: "2024-12-01T10:00:00Z", duration: 300 },
        { path: "/dashboard", timestamp: "2024-12-01T10:05:00Z", duration: 600 },
        { path: "/map", timestamp: "2024-12-01T10:15:00Z", duration: 900 }
      ],
      actions: [
        { type: "click", target: "button-login", timestamp: "2024-12-01T10:01:00Z" },
        { type: "search", target: "project-search", timestamp: "2024-12-01T10:16:00Z" },
        { type: "submit", target: "project-form", timestamp: "2024-12-01T10:25:00Z" }
      ]
    },
    {
      id: "s2",
      userId: "2",
      startTime: "2024-12-01T09:00:00Z",
      endTime: "2024-12-01T09:15:00Z",
      duration: 900,
      device: "mobile",
      browser: "Safari",
      location: {
        country: "Bénin",
        city: "Cotonou",
        lat: 6.3703,
        lng: 2.3912
      },
      pages: [
        { path: "/", timestamp: "2024-12-01T09:00:00Z", duration: 200 },
        { path: "/map", timestamp: "2024-12-01T09:05:00Z", duration: 700 }
      ],
      actions: [
        { type: "click", target: "map-marker", timestamp: "2024-12-01T09:07:00Z" },
        { type: "zoom", target: "map-zoom-in", timestamp: "2024-12-01T09:10:00Z" }
      ]
    },
    {
      id: "s3",
      userId: "3",
      startTime: "2024-11-30T18:30:00Z",
      endTime: "2024-11-30T18:45:00Z",
      duration: 900,
      device: "tablet",
      browser: "Firefox",
      location: {
        country: "Sénégal",
        city: "Dakar",
        lat: 14.6928,
        lng: -17.4467
      },
      pages: [
        { path: "/", timestamp: "2024-11-30T18:30:00Z", duration: 400 },
        { path: "/dashboard", timestamp: "2024-11-30T18:37:00Z", duration: 500 }
      ],
      actions: [
        { type: "click", target: "nav-dashboard", timestamp: "2024-11-30T18:36:00Z" },
        { type: "filter", target: "category-filter", timestamp: "2024-11-30T18:40:00Z" }
      ]
    }
  ]
}

export default mockData
