export class BodyError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function readJson(request: Request, limit = 4096): Promise<unknown> {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new BodyError(415, "Неверный формат запроса.");
  if (Number(request.headers.get("content-length") || 0) > limit) throw new BodyError(413, "Запрос слишком большой.");
  const reader = request.body?.getReader();
  if (!reader) throw new BodyError(400, "Пустой запрос.");
  const chunks: Uint8Array[] = []; let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) { await reader.cancel(); throw new BodyError(413, "Запрос слишком большой."); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); }
  catch { throw new BodyError(400, "Не удалось прочитать запрос."); }
}
