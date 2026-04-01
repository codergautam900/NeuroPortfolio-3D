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
            "radial-gradient(circle at 30% 25%, rgba(46,231,255,0.34), transparent 38%), radial-gradient(circle at 70% 72%, rgba(255,79,216,0.24), transparent 28%), linear-gradient(160deg, #02030b, #081220 70%, #11142a)",
          color: "#eff7ff",
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        A
      </div>
    ),
    size,
  );
}
