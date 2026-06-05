export default function CommitGraph() {
  return (
    <svg
      width="320"
      height="180"
      viewBox="0 0 320 180"
      className="text-blue-400"
    >
      {/* Lines */}
      <line x1="40" y1="40" x2="120" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="120" y1="40" x2="120" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="120" y1="90" x2="200" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="200" y1="90" x2="200" y2="140" stroke="currentColor" strokeWidth="2" />
      <line x1="200" y1="140" x2="280" y2="140" stroke="currentColor" strokeWidth="2" />
      <line x1="200" y1="140" x2="280" y2="140" stroke="currentColor" strokeWidth="2" />

      {/* Nodes */}
      <circle cx="40" cy="40" r="8" fill="currentColor" />
      <circle cx="120" cy="40" r="8" fill="currentColor" />
      <circle cx="120" cy="90" r="8" fill="currentColor" />
      <circle cx="200" cy="90" r="8" fill="currentColor" />
      <circle cx="200" cy="140" r="8" fill="currentColor" />
      <circle cx="280" cy="140" r="8" fill="currentColor" />
    </svg>
  );
}