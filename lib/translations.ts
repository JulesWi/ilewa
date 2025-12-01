/**
 * Centralized translations for ILEWA
 * All UI text in English
 */

export const translations = {
  // Navigation
  nav: {
    home: "Home",
    map: "Map",
    dashboard: "Dashboard",
    submitProject: "Submit Project",
    signIn: "Sign In",
    signOut: "Sign Out",
    profile: "Profile",
    settings: "Settings",
  },

  // Authentication
  auth: {
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    signInWithEmail: "Sign in with email",
    signUpWithEmail: "Sign up with email",
    or: "or",
    continue: "Continue",
  },

  // Project Form
  projectForm: {
    title: "Submit a Project",
    name: "Project Name",
    namePlaceholder: "Enter project name",
    category: "Category",
    categoryPlaceholder: "Select a category",
    description: "Description",
    descriptionPlaceholder: "Describe your project...",
    location: "Location",
    locationPlaceholder: "Search for a location...",
    coordinates: "Coordinates",
    latitude: "Latitude",
    longitude: "Longitude",
    repositoryUrl: "Repository URL",
    repositoryUrlPlaceholder: "https://github.com/...",
    date: "Implementation Date",
    datePlaceholder: "Select a date",
    additionalInfo: "Additional Information",
    additionalInfoPlaceholder: "Any other relevant information...",
    submit: "Submit Project",
    submitting: "Submitting...",
    success: "Project submitted successfully!",
    error: "Error submitting project",
    requiredFields: "Required fields",
    selectOnMap: "Select on map",
    searchLocation: "Search location",
  },

  // Categories
  categories: {
    economy: "Economy",
    health: "Health",
    environment: "Environment",
    education: "Education",
    epidemic: "Epidemic",
    other: "Other",
    all: "All Categories",
  },

  // Map
  map: {
    title: "Interactive Map",
    subtitle: "Explore geolocated projects",
    basemap: "Basemap",
    category: "Category",
    filters: "Filters",
    tools: "Tools",
    measure: "Measure",
    distance: "Distance",
    area: "Area",
    perimeter: "Perimeter",
    point: "Point",
    circle: "Circle",
    polygon: "Polygon",
    clear: "Clear",
    legend: "Legend",
    search: "Search",
    noResults: "No results found",
    loading: "Loading...",
  },

  // Dashboard
  dashboard: {
    title: "Dashboard",
    welcome: "Welcome",
    stats: "Statistics",
    projects: "Projects",
    myProjects: "My Projects",
    recentProjects: "Recent Projects",
    analytics: "Analytics",
    activity: "Activity",
    notifications: "Notifications",
    messages: "Messages",
    settings: "Settings",
    totalProjects: "Total Projects",
    activeProjects: "Active Projects",
    pendingProjects: "Pending Projects",
    approvedProjects: "Approved Projects",
    rejectedProjects: "Rejected Projects",
    views: "Views",
    likes: "Likes",
    comments: "Comments",
    contributors: "Contributors",
  },

  // Project Status
  status: {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    draft: "Draft",
    active: "Active",
    archived: "Archived",
  },

  // Actions
  actions: {
    view: "View",
    edit: "Edit",
    delete: "Delete",
    approve: "Approve",
    reject: "Reject",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    open: "Open",
    download: "Download",
    share: "Share",
    like: "Like",
    comment: "Comment",
    reply: "Reply",
    send: "Send",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    export: "Export",
    import: "Import",
    refresh: "Refresh",
  },

  // Time
  time: {
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",
    lastWeek: "Last Week",
    lastMonth: "Last Month",
    lastYear: "Last Year",
    custom: "Custom",
    from: "From",
    to: "To",
  },

  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    ok: "OK",
    back: "Back",
    next: "Next",
    previous: "Previous",
    finish: "Finish",
    skip: "Skip",
    required: "Required",
    optional: "Optional",
    all: "All",
    none: "None",
    other: "Other",
    more: "More",
    less: "Less",
    showMore: "Show More",
    showLess: "Show Less",
  },

  // Errors
  errors: {
    required: "This field is required",
    invalidEmail: "Invalid email address",
    invalidUrl: "Invalid URL",
    passwordTooShort: "Password must be at least 6 characters",
    passwordMismatch: "Passwords do not match",
    networkError: "Network error. Please try again.",
    unauthorized: "Unauthorized. Please sign in.",
    notFound: "Not found",
    serverError: "Server error. Please try again later.",
    unknown: "An unknown error occurred",
  },

  // Success Messages
  success: {
    projectSubmitted: "Project submitted successfully!",
    projectUpdated: "Project updated successfully!",
    projectDeleted: "Project deleted successfully!",
    profileUpdated: "Profile updated successfully!",
    settingsSaved: "Settings saved successfully!",
    messageSent: "Message sent successfully!",
    commentAdded: "Comment added successfully!",
  },
}

// Helper function to get nested translations
export function t(key: string): string {
  const keys = key.split('.')
  let value: any = translations
  
  for (const k of keys) {
    value = value[k]
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
  }
  
  return value
}

export default translations
