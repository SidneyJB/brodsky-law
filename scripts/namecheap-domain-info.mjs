/**
 * Fetch domain info via Namecheap API (namecheap.domains.getInfo).
 * Requires in .env: NAMECHEAP_API_KEY, NAMECHEAP_API_USER (your Namecheap username).
 * ClientIp is your current public IPv4 — it must be whitelisted in Namecheap (Profile → Tools → API Access).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env");

function loadEnv(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

const env = loadEnv(envPath);
const apiKey = env.NAMECHEAP_API_KEY;
const apiUser = env.NAMECHEAP_API_USER || env.NAMECHEAP_USERNAME;
const domain = process.argv[2] || "brodskydivorcelaw.com";

if (!apiKey || !apiUser) {
  console.error(
    "Missing NAMECHEAP_API_KEY or NAMECHEAP_API_USER in .env.\n" +
      "Add: NAMECHEAP_API_USER=<your Namecheap login username> (same account as the API key)."
  );
  process.exit(1);
}

const ipRes = await fetch("https://api.ipify.org?format=json");
const ipJson = await ipRes.json().catch(() => ({}));
const clientIp = ipJson.ip;
if (!clientIp || !/^\d{1,3}(\.\d{1,3}){3}$/.test(clientIp)) {
  console.error("Could not get public IPv4. Namecheap requires ClientIp (IPv4 only).");
  process.exit(1);
}

const params = new URLSearchParams({
  ApiUser: apiUser,
  ApiKey: apiKey,
  UserName: apiUser,
  ClientIp: clientIp,
  Command: "namecheap.domains.getinfo",
  DomainName: domain,
});

const url = `https://api.namecheap.com/xml.response?${params}`;
const res = await fetch(url);
const xml = await res.text();

console.log("ClientIp used:", clientIp, "(must be whitelisted in Namecheap)\n");
console.log(xml);

if (!xml.includes('Status="OK"') && xml.includes("ApiResponse")) {
  process.exit(1);
}
