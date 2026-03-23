/**
 * Set custom nameservers at Namecheap (removes Wix / previous DNS host).
 * Usage: node scripts/namecheap-set-nameservers.mjs [domain] [ns1] [ns2] ...
 * Default domain: brodskydivorcelaw.com
 * Default NS: ns1.vercel-dns.com ns2.vercel-dns.com
 *
 * Requires .env: NAMECHEAP_API_KEY, NAMECHEAP_API_USER
 * Optional: NAMECHEAP_CLIENT_IP (if auto-detected IP is rejected)
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

function splitRegisteredDomain(fqdn) {
  const parts = fqdn.toLowerCase().replace(/\.$/, "").split(".");
  if (parts.length < 2) throw new Error(`Invalid domain: ${fqdn}`);
  const tld = parts.pop();
  const sld = parts.join(".");
  return { sld, tld };
}

const env = loadEnv(envPath);
const apiKey = env.NAMECHEAP_API_KEY;
const apiUser = env.NAMECHEAP_API_USER || env.NAMECHEAP_USERNAME;

const args = process.argv.slice(2);
let domain = "brodskydivorcelaw.com";
if (args[0]?.includes(".")) {
  domain = args.shift();
}
const nameservers =
  args.length > 0 ? args : ["ns1.vercel-dns.com", "ns2.vercel-dns.com"];

if (!apiKey || !apiUser) {
  console.error("Set NAMECHEAP_API_KEY and NAMECHEAP_API_USER in .env");
  process.exit(1);
}

let clientIp = env.NAMECHEAP_CLIENT_IP?.trim();
if (!clientIp) {
  const ipRes = await fetch("https://api.ipify.org?format=json");
  const ipJson = await ipRes.json().catch(() => ({}));
  clientIp = ipJson.ip;
}
if (!clientIp || !/^\d{1,3}(\.\d{1,3}){3}$/.test(clientIp)) {
  console.error("Set NAMECHEAP_CLIENT_IP in .env to your whitelisted IPv4.");
  process.exit(1);
}

const { sld, tld } = splitRegisteredDomain(domain);
const nameserversParam = nameservers.join(",");

const params = new URLSearchParams({
  ApiUser: apiUser,
  ApiKey: apiKey,
  UserName: apiUser,
  ClientIp: clientIp,
  Command: "namecheap.domains.dns.setCustom",
  SLD: sld,
  TLD: tld,
  Nameservers: nameserversParam,
});

const url = `https://api.namecheap.com/xml.response?${params}`;
const res = await fetch(url);
const xml = await res.text();

console.log("Domain:", domain);
console.log("Nameservers:", nameservers.join(", "));
console.log("ClientIp:", clientIp);
console.log(xml);

if (!xml.includes('Status="OK"') || xml.includes("Updated=\"false\"")) {
  process.exit(1);
}
