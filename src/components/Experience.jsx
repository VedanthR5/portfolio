import { SectionWrapper } from "../hoc";
import { experiences } from "../constants";
import WorkList from "./WorkList";

const Experience = () => (
  <>
    <h2 className="section-title">Experience</h2>
    <WorkList entries={experiences} label="Experience, most recent first" />
  </>
);

const WrappedExperience = SectionWrapper(Experience, "experience");
WrappedExperience.displayName = "Experience";

export default WrappedExperience;
