export default function progressBar(props) {

  const progress = Math.min(props.progress, 100);

  return (
    <div
      style={{
        width: "100vh",
        height: "3rem",
        alignSelf: "normal",
        margin: "3%",
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
          backgroundColor: "#F9F871",
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
        {props.progress >= 50 && props.progress < 100 ? "You're getting close!!!" : ""}
        {props.progress >= 100 ? "TURN YOUR LIGHTS OFF!!!!!" : ""}
      </div>
    </div>
  );
}
