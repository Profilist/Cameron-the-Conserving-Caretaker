export default function progressBar(props) {

  const progress = Math.min(props.progress, 100);

  const getColor = (progress) => {
    if (progress <= 50) {
      const mix = progress / 50;
      return `rgb(${249 * (1 - mix) + 223 * mix}, ${248 * (1 - mix) + 159 * mix}, ${113 * (1 - mix) + 31 * mix})`; 
    } else {
      const mix = (progress - 50) / 50;
      return `rgb(${255 * (1 - mix) + 255 * mix}, ${165 * (1 - mix)}, 0)`; 
    }
  };

  const barColor = getColor(progress);

  return (
    <div
      style={{
        width: "100vh",
        height: "3rem",
        alignSelf: "normal",
        borderRadius: "20px",
        backgroundColor: "#605B7B",
        position: "relative",
        top: "20vh",
      }}
    >
      <div
        className="progress-bar"
        style={{
          width: `${progress}vh`,
          background: barColor,
          height: "100%",
          alignItems: "normal",
          borderRadius: "20px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          color: "#132436",
          lineHeight: "2.5",
          position: "relative",
        }}
      >
        {props.progress >= 50 && props.progress < 100 ? "Remember to save energy!" : ""}
        {props.progress >= 100 ? `TURN YOUR ${props.appliance} OFF!` : ""}
      </div>
    </div>
  );
}
