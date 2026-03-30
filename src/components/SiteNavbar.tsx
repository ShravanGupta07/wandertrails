import { useLocation } from "react-router-dom";
import PillNav from "./PillNav";
export default function SiteNavbar() {
  const location = useLocation();

  return (
    <PillNav
      logo="/logo.png"
      logoAlt="WanderTrails Logo"
      items={[
        { label: 'Home', href: '/' },
        { label: 'Destinations', href: '/destinations' },
        { label: 'Trail Scout', href: '/planner' },
        { label: 'Contact', href: '/contact' }
      ]}
      activeHref={location.pathname}
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="hsla(230, 25%, 7%, 0.75)"
      pillColor="rgba(255, 255, 255, 0.05)"
      pillTextColor="hsl(210, 20%, 92%)"
      hoveredPillTextColor="hsl(174, 85%, 48%)"
      onMobileMenuClick={() => {}}
      initialLoadAnimation={false}
    />
  );
}
