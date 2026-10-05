import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#2B37DE" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <rect width="64" height="64" fill="#2B37DE" />
          <rect x="19.6" y="14.9" width="8.4" height="34.9" rx="1.6" fill="#F1EFEA" />
          <path d="M28 27.8 42.4 14.9h9.7L35.7 32.3l16.4 17.5h-9.7L28 36.8z" fill="#F1EFEA" />
          <rect x="6.7" y="23" width="8.9" height="3.8" rx="1.9" fill="#EC7454" />
          <rect x="4.2" y="30.4" width="11.4" height="3.8" rx="1.9" fill="#EC7454" />
          <rect x="6.7" y="37.8" width="8.9" height="3.8" rx="1.9" fill="#EC7454" />
        </svg>
      </div>
    ),
    size,
  );
}
