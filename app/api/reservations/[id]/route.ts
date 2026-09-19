import { db } from "@/lib/db"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const allowed = ["name", "phone", "date", "time", "party_size", "status"]
  const fields = Object.keys(body).filter(k => allowed.includes(k))
  if (fields.length === 0) return Response.json({ error: "No valid fields" }, { status: 400 })
  const sets = fields.map(k => k + "=?").join(", ")
  await db.execute({ sql: `UPDATE reservations SET ${sets} WHERE id=?`, args: [...fields.map(k => body[k]), id] })
  const { rows } = await db.execute({ sql: "SELECT id,name,phone,date,time,party_size,status FROM reservations WHERE id=?", args: [id] })
  return Response.json(rows[0] ?? null)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await db.execute({ sql: "UPDATE reservations SET status='cancelled' WHERE id=?", args: [id] })
  return Response.json({ ok: true })
}
