import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const alt = "Cinematic Portfolio";
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
            border: "1px solid rgba(148,163,184,0.24)",
            background: "rgba(10, 18, 36, 0.5)",
            fontSize: 24,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          NEXUS//PORTFOLIO
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
            <span>Cinematic interfaces.</span>
            <span>Real engineering depth.</span>
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
            3D-first Next.js portfolio with premium motion, strong visual hierarchy, and
            a full-stack contact layer.
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
          <span>Next.js 16</span>
          <span>React 19</span>
          <span>R3F</span>
          <span>Framer Motion</span>
          <span>Zod</span>
        </div>
      </div>
    ),
    size,
  );
}
