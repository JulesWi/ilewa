"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Define country coordinates for demonstration
const countryCoordinates = {
  US: { lat: 37.0902, lng: -95.7129 },
  GB: { lat: 55.3781, lng: -3.436 },
  FR: { lat: 46.2276, lng: 2.2137 },
  DE: { lat: 51.1657, lng: 10.4515 },
  JP: { lat: 36.2048, lng: 138.2529 },
  BR: { lat: -14.235, lng: -51.9253 },
  IN: { lat: 20.5937, lng: 78.9629 },
  CA: { lat: 56.1304, lng: -106.3468 },
  AU: { lat: -25.2744, lng: 133.7751 },
}

// Define marker colors based on device type
const deviceColors = {
  Desktop: "#4CAF50",
  Mobile: "#2196F3",
  Tablet: "#FF9800",
}

export default function UserActivityMap({ sessions }) {
  const mapRef = useRef(null)
  const leafletMapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      // Initialize map
      leafletMapRef.current = L.map(mapRef.current).setView([20, 0], 2)

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMapRef.current)

      // Add markers for each session
      const markers = L.markerClusterGroup()

      sessions.forEach((session) => {
        const country = session.location.country

        if (countryCoordinates[country]) {
          // Add some randomness to prevent markers from stacking exactly on top of each other
          const lat = countryCoordinates[country].lat + (Math.random() - 0.5) * 5
          const lng = countryCoordinates[country].lng + (Math.random() - 0.5) * 5

          // Create custom icon based on device type
          const deviceColor = deviceColors[session.device.type] || "#9C27B0"
          const icon = L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: ${deviceColor}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [15, 15],
            iconAnchor: [7, 7],
          })

          // Create marker
          const marker = L.marker([lat, lng], { icon })

          // Create popup content
          const popupContent = `
            <div style="font-family: sans-serif; width: 200px;">
              <h3 style="margin: 0 0 5px 0; font-size: 14px;">Session: ${session.session_id}</h3>
              <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>User:</strong> ${session.user_id}</p>
              <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>Device:</strong> ${session.device.type} (${session.device.os})</p>
              <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>Browser:</strong> ${session.device.browser.name} ${session.device.browser.version}</p>
              <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>Events:</strong> ${session.events.length}</p>
              <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>Duration:</strong> ${Math.floor(session.duration_seconds / 60)} min ${Math.floor(session.duration_seconds % 60)} sec</p>
            </div>
          `

          // Bind popup to marker
          marker.bindPopup(popupContent)

          // Add marker to cluster group
          markers.addLayer(marker)
        }
      })

      // Add markers to map
      leafletMapRef.current.addLayer(markers)
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [sessions])

  return <div ref={mapRef} className="h-full w-full" />
}

