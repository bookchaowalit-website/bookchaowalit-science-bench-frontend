"use client";

import { useMemo, useState } from "react";

type Experiment = { id: string; name: string; variable: string; unit: string; baseline: number; color: string; note: string };
const experiments: Experiment[] = [
  { id: "light", name: "Light / leaf", variable: "exposure", unit: "hours", baseline: 8, color: "#c8e96a", note: "Observe how the curve changes when the same leaf receives a longer window of light." },
  { id: "water", name: "Water / soil", variable: "moisture", unit: "%", baseline: 54, color: "#76c8d8", note: "Observe the point where additional water stops changing the synthetic response." },
  { id: "heat", name: "Heat / reaction", variable: "temperature", unit: "°C", baseline: 31, color: "#f49b62", note: "Observe the rise, plateau, and fall in a deliberately simplified reaction curve." },
];

export default function Home() {
  const [experimentId, setExperimentId] = useState("light");
  const [value, setValue] = useState(8);
  const [notes, setNotes] = useState<string[]>([]);
  const experiment = experiments.find((item) => item.id === experimentId) ?? experiments[0];
  const curve = useMemo(() => Array.from({ length: 8 }, (_, index) => index * 14 + "," + (118 - Math.max(4, Math.sin((index + value / 12) * 0.9) * 42 + value * 1.3))).join(" "), [value]);
  const chooseExperiment = (id: string) => { const next = experiments.find((item) => item.id === id) ?? experiments[0]; setExperimentId(id); setValue(next.baseline); };
  const record = () => setNotes((current) => [experiment.name + " / " + value + experiment.unit, ...current].slice(0, 4));
  return <main className="bench-page"><div className="bench-shell">
    <header className="bench-header"><div className="bench-brand"><span className="bench-mark">OB</span><span>OBSERVATION / BENCH</span></div><span>NOTEBOOK 01 · SYNTHETIC RUN</span><span className="bench-status">NO SENSOR CONNECTED</span></header>
    <section className="bench-hero"><div><p className="bench-kicker">change one thing / look again</p><h1>Make the<br /><em>variable visible.</em></h1><p className="bench-deck">A small experiment notebook for changing one input, reading a curve, and leaving an observation behind.</p></div><div className="bench-result"><span>READOUT</span><strong>{value} {experiment.unit}</strong><small>{experiment.variable}<br />illustrative response</small></div></section>
    <section className="experiment-tabs" aria-label="Experiments"><div className="section-label"><span>EXPERIMENT SET</span><span>{experiments.length} RUNS</span></div>{experiments.map((item) => <button key={item.id} type="button" className={item.id === experiment.id ? "experiment-tab is-active" : "experiment-tab"} onClick={() => chooseExperiment(item.id)}><i style={{ background: item.color }} /><span>{item.name}</span><small>{item.variable}</small></button>)}</section>
    <section className="bench-workspace"><div className="bench-panel"><div className="panel-top"><span>RUN / {experiment.name}</span><b>{experiment.variable}</b></div><div className="chart"><svg viewBox="0 0 100 130" role="img" aria-label="Synthetic experiment curve"><line x1="0" y1="118" x2="100" y2="118" /><line x1="0" y1="59" x2="100" y2="59" /><polyline points={curve} style={{ stroke: experiment.color }} /></svg><span className="axis-x">TIME →</span><span className="axis-y">RESPONSE</span></div><p className="bench-note">{experiment.note}</p></div><aside className="control-panel"><span>CHANGE THE INPUT</span><strong>{value} {experiment.unit}</strong><input type="range" min="1" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} style={{ accentColor: experiment.color }} /><div className="control-ends"><small>LOW</small><small>HIGH</small></div><button type="button" onClick={record}>Record observation →</button><div className="bench-log"><span>BENCH LOG</span>{notes.length === 0 ? <small>No observations recorded.</small> : notes.map((note) => <p key={note}>{note}</p>)}</div></aside></section>
    <footer className="bench-footer"><span>BOOKCHAOWALIT / OBSERVATION BENCH</span><span>ILLUSTRATIVE MEASUREMENTS · NOT LAB VALIDATION</span></footer>
  </div></main>;
}
