import { motion } from "framer-motion";

const HorizontalCollapse = ({
  isOpen,
  getDisclosureProps,
  hidden,
  setHidden,
  children,
}) => {
  return (
    <motion.div
      {...getDisclosureProps()}
      hidden={hidden}
      initial={false}
      onAnimationStart={() => {
        setHidden(false);
      }}
      onAnimationComplete={() => {
        setHidden(!isOpen);
      }}
      animate={{
        width: isOpen ? "100%" : "0%",
        transition: { duration: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default HorizontalCollapse;
