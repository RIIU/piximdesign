import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_IMAGE } from "@/lib/seo";

// Shared social preview card (Facebook, LinkedIn, WhatsApp, X) for every page
export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

const SERVICES_LINE = "Logos · Packaging · Social Media · Video · Websites · Ads · SEO";
const BADGES = ["Dhaka, Bangladesh", "Clients worldwide", "Prices in BDT & USD"];

export default async function Image() {
  const [agency, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/agency.otf")),
    readFile(join(process.cwd(), "public/images/logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #081330 0%, #0C1E4E 60%, #102766 100%)",
          fontFamily: "Agency",
          color: "#F8FAFC",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,133,0,0.45) 0%, rgba(255,133,0,0) 70%)",
          }}
        />

        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", padding: "16px 26px", borderRadius: 20, background: "#FFFFFF" }}>
            <img src={logoSrc} alt="" width={282} height={90} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, display: "flex", flexDirection: "column" }}>
            <span>Branding & Digital</span>
            <span style={{ color: "#FFA133" }}>Design Studio</span>
          </div>
          <div style={{ marginTop: 22, fontSize: 34, color: "#CBD5E1" }}>{SERVICES_LINE}</div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {BADGES.map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 9999,
                border: "2px solid rgba(255,133,0,0.45)",
                background: "rgba(255,133,0,0.12)",
                color: "#FFA133",
                fontSize: 28,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Agency", data: agency, style: "normal", weight: 800 }],
    }
  );
}
