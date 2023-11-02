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

const handleLogin = async (email,senha) => {

  const body = await JSON.parse(file);

  //sistema de validação de login retornando um usuario valido ou undefined
  const usuarioValidado = body.usuario.find((user) => user.email == email && user.senha == senha);
  


  return usuarioValidado;
}

export async function POST(request, response) {
  //RECEBENDO OS DADOS ENVIADOS NA REQUISIÇÃO
  const {email, senha} = await request.json();

  //validando o login
  const uv = await handleLogin(email,senha);

  if (uv){
    return NextResponse.json({"status": true});
  }

  //RETORNO DA REQUISIÇÃO ERROR  
  return NextResponse.json({ "status": false });

}
