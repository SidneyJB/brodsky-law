import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import site from "@/content/site.json";

export const runtime = "nodejs";
export const alt = "Brodsky Law PLLC — Jonah Brodsky, Managing Attorney";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * LinkedIn / social previews use og:image, not the in-page <Image>.
 * The hero photo file is unchanged; here we clip to the upper ~2/3 of the
 * portrait (tall img + overflow hidden + top anchoring).
 */
export default async function OpenGraphImage() {
  const file = await readFile(join(process.cwd(), "public", "jonah-brodsky.jpg"));
  const src = `data:image/jpeg;base64,${file.toString("base64")}`;
  const { openGraphTitle, openGraphDescription, openGraphSiteName } = site.layout;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "#f7f7f5",
        }}
      >
        <div
          style={{
            width: 520,
            height: 630,
            display: "flex",
            overflow: "hidden",
            alignItems: "flex-start",
            justifyContent: "center",
            background: "#e8e6e1",
          }}
        >
          {/* Height 150% of frame → parent clips bottom third of the rendered portrait */}
          <img
            src={src}
            alt=""
            width={520}
            height={945}
            style={{
              width: 520,
              height: 945,
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 56px",
            gap: 20,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8a8a8a",
            }}
          >
            {openGraphSiteName}
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 400,
              lineHeight: 1.12,
              color: "#1a1a1a",
              fontFamily: "serif",
            }}
          >
            {openGraphTitle}
          </span>
          <span
            style={{
              fontSize: 22,
              lineHeight: 1.45,
              color: "#4a4a4a",
              maxWidth: 560,
            }}
          >
            {openGraphDescription}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
