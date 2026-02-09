import { useFavicon } from "@/hooks/useFavicon";

/**
 * Component that manages the site favicon from admin settings.
 * This component doesn't render anything visible - it just
 * handles the favicon management side effects.
 */
const FaviconManager = () => {
  useFavicon();
  return null;
};

export default FaviconManager;
