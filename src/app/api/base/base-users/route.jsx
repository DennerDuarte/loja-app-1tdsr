import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const file = await fs.readFile(
  process.cwd() + "/src/app/api/base/data.json",
  "utf8"
);

export async function GET() {
  //parseando a base de dados dos usuarios
  const body = JSON.parse(file);

  //retornando um status
  return NextResponse.json(body);
}

export async function POST(request, response) {
  //RECEBENDO OS DADOS ENVIADOS NA REQUISIÇÃO
  const usuario = await request.json();

  const body = await JSON.parse(file);

  for (let x = 0; x < body.usuario.length; x++) {
    const u = body.usuario[x];

    if (u.email == usuario.email && u.senha == usuario.senha) {
      //RETORNO DA REQUISIÇÃO
      return NextResponse.json({ status: "ok" });
    }
  }

  //RETORNO DA REQUISIÇÃO ERROR  
  return NextResponse.json({ status: "error" });
}
