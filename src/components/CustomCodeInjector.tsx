import { useCustomCode } from "@/hooks/useCustomCode";

/**
 * Component that injects custom HTML, CSS, and JavaScript code
 * from the admin settings into the page head and body.
 * 
 * This component doesn't render anything visible - it just
 * handles the code injection side effects.
 */
const CustomCodeInjector = () => {
  useCustomCode();
  return null;
};

export default CustomCodeInjector;
