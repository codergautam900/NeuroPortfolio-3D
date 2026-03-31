import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "18px",
          background:
            "radial-gradient(circle at 30% 25%, rgba(125,249,255,0.28), transparent 38%), linear-gradient(160deg, #050816, #0b1530 70%, #171f38)",
          color: "#f5efe6",
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        N
      </div>
    ),
    size,
  );
}
