import MapWrapper from "@/components/map/map-wrapper"
import NavigationHeader from "@/components/layout/navigation-header"

export default function PublicMapPage() {
  return (
    <div className="relative h-screen">
      <NavigationHeader />
      <MapWrapper />
    </div>
  )
}
