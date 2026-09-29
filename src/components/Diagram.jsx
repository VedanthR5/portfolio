import { useState } from "react";
import PropTypes from "prop-types";

// Figures for opened rows, drawn in the hero's contour-line language. Each one
// explains a mechanism or shows a result; the words stay in HTML so they are
// readable at phone widths, and SVG carries only the shape. They build in once
// when a row opens (see home.css); reduced motion shows them complete.

const Arrow = ({ id }) => (
  <defs>
    <marker id={id} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 6 3 0 6z" className="diagram-arrow" />
    </marker>
  </defs>
);

Arrow.propTypes = { id: PropTypes.string.isRequired };

// AV1Forge: the loop as a contour orbit, with its four stages listed beside it.
// Pointing at a stage in either place highlights it in both.
const fuzzStages = [
  { id: "generate", name: "Generate", text: "Valid AV1 bitstreams through a stable encoder interface", x: 60, y: 30, w: 118 },
  { id: "mutate", name: "Mutate", text: "Mutate each stream down to individual OBUs", x: 292, y: 108, w: 104 },
  { id: "decode", name: "Decode", text: "Run each stream through decoder harnesses", x: 150, y: 186, w: 104 },
  { id: "triage", name: "Triage", text: "AddressSanitizer reports and automated crash triage steer the next round", x: 18, y: 138, w: 96 },
];

const fuzzEdges = [
  "M178 44 C 250 34, 320 62, 342 104",
  "M340 140 C 322 184, 290 198, 256 200",
  "M148 200 C 112 200, 92 194, 78 172",
  "M52 136 C 40 110, 52 80, 80 60",
];

const FuzzLoop = () => {
  const [active, setActive] = useState(null);
  const hover = (id) => ({
    onPointerEnter: () => setActive(id),
    onPointerLeave: () => setActive(null),
  });

  return (
    <div className="fig-fuzz">
      <svg viewBox="0 0 420 240" aria-hidden="true" className="fig-fuzz-orbit">
        <Arrow id="fuzz-arrow" />
        {[0, 1, 2, 3, 4, 5].map((ring) => (
          <ellipse key={ring} className="diagram-contour" cx={210} cy={122} rx={176 - ring * 15} ry={92 - ring * 9} />
        ))}
        {fuzzEdges.map((d, index) => (
          <path
            key={d}
            className="diagram-edge fig-draw"
            style={{ "--step": index }}
            d={d}
            pathLength={1}
            markerEnd="url(#fuzz-arrow)"
          />
        ))}
        {fuzzStages.map((stage, index) => (
          <g
            key={stage.id}
            className={`fig-node${active === stage.id ? " is-active" : ""}`}
            style={{ "--step": index }}
            {...hover(stage.id)}
          >
            <rect className="diagram-node" x={stage.x} y={stage.y} width={stage.w} height={30} rx={15} />
            <text className="diagram-label" x={stage.x + stage.w / 2} y={stage.y + 19} textAnchor="middle">
              {`${index + 1} · ${stage.name}`}
            </text>
          </g>
        ))}
      </svg>
      <ol className="fig-steps">
        {fuzzStages.map((stage, index) => (
          <li
            key={stage.id}
            className={active === stage.id ? "is-active" : undefined}
            style={{ "--step": index }}
            {...hover(stage.id)}
          >
            <span className="fig-step-name">
              <span className="fig-step-index" aria-hidden="true">{index + 1}</span>
              {stage.name}
            </span>
            <span className="fig-step-text">{stage.text}</span>
          </li>
        ))}
      </ol>
      <p className="fig-caption">Four stages, repeated. Agents drive the loop.</p>
    </div>
  );
};

// BusTub: what was built, layer by layer, and where it placed.
const engineLayers = [
  { name: "Query optimizer", note: "custom rewrite rules" },
  { name: "Executors", note: "vectorized" },
  { name: "B+ tree index", note: "" },
  { name: "Buffer pool manager", note: "thread-safe" },
];

const RANKED = 190;
const PLACE = 5;

const EngineStack = () => (
  <div className="fig-engine">
    <div className="fig-stack">
      <ol aria-label="Engine layers, top to bottom">
        {engineLayers.map((layer, index) => (
          <li key={layer.name} style={{ "--step": index }}>
            <span>{layer.name}</span>
            {layer.note && <span className="fig-layer-note">{layer.note}</span>}
          </li>
        ))}
        <li className="is-faint" style={{ "--step": engineLayers.length }}>
          <span>Disk</span>
        </li>
      </ol>
      <p className="fig-band">Concurrency control, across the stack</p>
    </div>

    <figure className="fig-rank">
      <svg viewBox={`0 0 ${RANKED} 14`} preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: RANKED }, (_, index) => (
          <rect
            key={index}
            className={index === PLACE - 1 ? "fig-rank-mark" : "fig-rank-tick"}
            x={index + 0.2}
            y={index === PLACE - 1 ? 0 : 5}
            width={index === PLACE - 1 ? 1.2 : 0.6}
            height={index === PLACE - 1 ? 14 : 9}
          />
        ))}
      </svg>
      <figcaption>
        <strong>5th</strong> of 190+ implementations on the course&apos;s performance benchmark
      </figcaption>
    </figure>
  </div>
);

// DDoS paper: the pipeline as five steps, then the four held-out scores.
const flowSteps = [
  ["Packet captures", "CIC-DDoS2019 PCAPs"],
  ["Bidirectional flows", "extracted with PyShark"],
  ["Fixed length", "normalized per flow"],
  ["Compact CNN", "convolution, dropout, pooling"],
  ["Benign or DDoS", "sigmoid output, one label per flow"],
];

const flowScores = [
  ["Accuracy", 0.9883],
  ["Precision", 0.9864],
  ["Recall", 0.9784],
  ["F1", 0.9824],
];

const FlowPipeline = () => (
  <div className="fig-flow">
    <ol className="fig-pipeline" aria-label="Detection pipeline">
      {flowSteps.map(([name, note], index) => (
        <li key={name} style={{ "--step": index }}>
          <span>{name}</span>
          <span className="fig-layer-note">{note}</span>
        </li>
      ))}
    </ol>
    <figure className="fig-scores">
      <figcaption>Scores on held-out flows (paper, v2). Bars run from 0.95 to 1.</figcaption>
      <dl>
        {flowScores.map(([label, value], index) => (
          <div key={label} style={{ "--step": index }}>
            <dt>{label}</dt>
            <dd>
              <span className="fig-score-value">{value.toFixed(4)}</span>
              {/* The axis starts at 0.95 so differences between scores are visible. */}
              <span className="fig-score-bar" aria-hidden="true">
                <span style={{ "--fill": (value - 0.95) / 0.05 }} />
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  </div>
);

const diagrams = { fuzz: FuzzLoop, db: EngineStack, flow: FlowPipeline };

const Diagram = ({ kind }) => {
  const Figure = diagrams[kind];
  return Figure ? <Figure /> : null;
};

Diagram.propTypes = {
  kind: PropTypes.oneOf(Object.keys(diagrams)).isRequired,
};

export default Diagram;
