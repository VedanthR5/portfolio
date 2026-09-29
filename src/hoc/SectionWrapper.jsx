import { styles } from "../styles";

// Content renders immediately: no section waits for an intersection observer
// before it becomes visible, so fast scrolls and anchor jumps never land on
// a blank section.
const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section id={idName} className={`${styles.padding} home-section mx-auto w-full max-w-6xl relative z-0`}>
        <Component />
      </section>
    );
  };

export default StarWrapper;
