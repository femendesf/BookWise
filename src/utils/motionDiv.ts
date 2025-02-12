export const MotionCard = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: index * 0.2, // Cada card terá um delay incremental
        }
    })
};
