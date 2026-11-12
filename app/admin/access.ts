import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../chatgpt-auth";

export async function canReadApplications() {
  const user = await getChatGPTUser();
  const owner = (env as unknown as { ADMIN_EMAIL?: string }).ADMIN_EMAIL;
  return Boolean(user && owner && user.email.toLowerCase() === owner.toLowerCase());
}
