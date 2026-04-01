import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const alt = "Gautam Sagar | Full Stack Portfolio";
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          padding: "56px",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 18% 20%, rgba(125,249,255,0.18), transparent 22%), radial-gradient(circle at 82% 16%, rgba(255,139,77,0.18), transparent 18%), linear-gradient(160deg, #050816, #0b1530 70%, #151f38)",
          color: "#f5efe6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 18px",
            borderRadius: 999,
            border: "1px solid rgba(46,231,255,0.2)",
            background: "rgba(6, 10, 24, 0.54)",
            fontSize: 24,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          GAUTAM//PORTFOLIO
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 88,
              lineHeight: 0.95,
              letterSpacing: "-0.07em",
              fontWeight: 800,
            }}
          >
            <span>Gautam Sagar.</span>
            <span>Full-stack systems and AI.</span>
          </div>
          <p
            style={{
              width: 760,
              margin: 0,
              color: "#98a6be",
              fontSize: 30,
              lineHeight: 1.4,
            }}
          >
            B.Tech CSE portfolio focused on MERN, Next.js, realtime systems, and practical
            AI-enabled product engineering.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 24,
            color: "#f5efe6",
          }}
        >
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Socket.IO</span>
          <span>LLM APIs</span>
          <span>MERN</span>
        </div>
      </div>
    ),
    size,
  );
}
