export default function LengthSlider({ length, onChange }) {
  return (
    <>
      <div className="length-row">
        <label htmlFor="lengthSlider">Password length</label>
        <span id="lengthValue">{length}</span>
      </div>
      <input
        type="range"
        id="lengthSlider"
        min="6"
        max="64"
        value={length}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </>
  );
}
