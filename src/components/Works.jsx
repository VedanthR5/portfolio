import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import WorkList from "./WorkList";

const Works = () => (
  <>
    <div className="section-head">
      <h2 className="section-title">Projects</h2>
      <a className="section-aside-link" href="https://github.com/VedanthR5" target="_blank" rel="noopener noreferrer">
        All code on GitHub
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
    <WorkList entries={projects} label="Selected projects" alsoLabel="Also" />
  </>
);

const WrappedWorks = SectionWrapper(Works, "projects");
WrappedWorks.displayName = "Works";

export default WrappedWorks;
