import PropTypes from "prop-types";

// Hairline diagrams drawn in the same contour-line language as the hero.
const Pill = ({ x, y, w, text }) => (
  <g>
    <rect className="diagram-node" x={x} y={y} width={w} height={30} rx={15} />
    <text className="diagram-label" x={x + w / 2} y={y + 19} textAnchor="middle">
      {text}
    </text>
  </g>
);

Pill.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

const Arrow = ({ id }) => (
  <defs>
    <marker id={id} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 6 3 0 6z" className="diagram-arrow" />
    </marker>
  </defs>
);

Arrow.propTypes = { id: PropTypes.string.isRequired };

const FuzzLoop = () => (
  <svg viewBox="0 0 420 240" role="img" aria-labelledby="fuzz-title">
    <title id="fuzz-title">
      Fuzzing loop: generate AV1 bitstreams, mutate OBUs, run them through a decoder harness, and
      feed sanitizer results and triage back into generation.
    </title>
    <Arrow id="fuzz-arrow" />
    {[0, 1, 2, 3, 4, 5].map((ring) => (
      <ellipse key={ring} className="diagram-contour" cx={210} cy={122} rx={176 - ring * 15} ry={92 - ring * 9} />
    ))}
    <path className="diagram-edge" d="M168 46 C 250 34, 320 60, 344 100" markerEnd="url(#fuzz-arrow)" />
    <path className="diagram-edge" d="M340 146 C 322 184, 290 198, 262 200" markerEnd="url(#fuzz-arrow)" />
    <path className="diagram-edge" d="M146 200 C 110 200, 90 196, 74 188" markerEnd="url(#fuzz-arrow)" />
    <path className="diagram-edge" d="M50 172 C 34 136, 40 92, 70 64" markerEnd="url(#fuzz-arrow)" />
    <Pill x={60} y={30} w={140} text="Generate bitstreams" />
    <Pill x={290} y={108} w={116} text="Mutate OBUs" />
    <Pill x={148} y={186} w={124} text="Decoder harness" />
    <Pill x={10} y={144} w={104} text="ASan · triage" />
  </svg>
);

const EngineLayers = () => {
  const layers = ["Query optimizer", "Vectorized executors", "B+ tree index", "Buffer pool manager", "Disk"];
  return (
    <svg viewBox="0 0 420 240" role="img" aria-labelledby="db-title">
      <title id="db-title">
        BusTub layers from top to bottom: query optimizer, vectorized executors, B+ tree index,
        buffer pool manager and disk, with concurrency control spanning the stack.
      </title>
      {layers.map((layer, index) => (
        <g key={layer}>
          <rect
            className={index === layers.length - 1 ? "diagram-node is-faint" : "diagram-node"}
            x={50 + index * 10}
            y={18 + index * 42}
            width={270 - index * 20}
            height={30}
            rx={6}
          />
          <text className="diagram-label" x={185} y={37 + index * 42} textAnchor="middle">
            {layer}
          </text>
        </g>
      ))}
      <line className="diagram-edge is-dashed" x1={352} y1={20} x2={352} y2={186} />
      <text className="diagram-label" x={372} y={104} textAnchor="middle" transform="rotate(90 372 104)">
        Concurrency control
      </text>
    </svg>
  );
};

const FlowPipeline = () => {
  const steps = ["PCAP", "Flows", "Fixed-length", "Small CNN"];
  return (
    <svg viewBox="0 0 420 118" role="img" aria-labelledby="flow-title">
      <title id="flow-title">
        Detection pipeline: packet captures become bidirectional flows, then fixed-length inputs to
        a small CNN that labels each flow benign or DDoS.
      </title>
      <Arrow id="flow-arrow" />
      {steps.map((step, index) => (
        <g key={step}>
          <Pill x={8 + index * 103} y={20} w={92} text={step} />
          {index < steps.length - 1 && (
            <line className="diagram-edge" x1={101 + index * 103} y1={35} x2={109 + index * 103} y2={35} markerEnd="url(#flow-arrow)" />
          )}
        </g>
      ))}
      <line className="diagram-edge" x1={363} y1={52} x2={363} y2={74} markerEnd="url(#flow-arrow)" />
      <text className="diagram-label" x={363} y={96} textAnchor="middle">benign or DDoS</text>
    </svg>
  );
};

const diagrams = { fuzz: FuzzLoop, db: EngineLayers, flow: FlowPipeline };

const Diagram = ({ kind }) => {
  const Figure = diagrams[kind];
  return Figure ? <Figure /> : null;
};

Diagram.propTypes = {
  kind: PropTypes.oneOf(Object.keys(diagrams)).isRequired,
};

export default Diagram;
