"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function LoginUsers() {

    //msg error
    const [msg, setMsg]  = userState(""); 

    //redirecionador
    const navigate = useRouter();

    //Estrutura de dados para armazenar o usuario.
    const [usuario, setUsuario] = useState({
        "email": "",
        "senha": ""
    })
    //função abaixo é responsavel por preencher o estado com o dados do usuario.
    const handleChange = (e) => {
        //desestruturando os inputs do formulario de login para preencher o estado
        const{name,value} = e.target;
        //atualizando o estado
        setUsuario({...usuario, [name]:value});
    }

    //função abaixo é responsavel por validar o login do usuario e retornar um mensagem de sucesso ou erro.
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            //realizando a requisição para o backend;
            const response = await fetch("http://localhost:3000/api/base/base-users",{
                method:"POST",
                header:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringfy(usuario)
            })

            //verificando se a requisição foi bem sucedida
            if(response.ok){
                const data = await response.json();

                //verificando se usuario ja existe

               
                if(data.status){
                    setMsg("Login realizado com sucesso");

                    setTimeout(()=>{
                        setMsg("")
                        navigate.push("/")
                    },5000)
                }else{
                    //caso o login esteja errado, iremos limpar o estado e redirecionar o usuario para a pagina de login do mesmo.
                    setMsg("Login incorreto!")
                    setTimeout(()=> {
                        setMsg("");
                        setUsuario({
                            "email":"",
                            "senha":""
                        });
                        navigate.push("/login")
                    }, 5000)
                }
            }

        } catch (error) {
            //Redirecionando o usuario para a pag de erro
            //iremos redirecionar o usuario para a pag 404
            console.log(error)
            navigate.push("/error");
        }
    }

  return (
    <div>
        <h1>Identificação dos Usuários</h1>
        <h2 className="bg-orange-500 text-4xl">{msg}</h2>

        <div className="forms-login-cad">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>LOGIN</legend>
                    <div>
                        <label htmlFor="idEmail">Email:</label>
                        <input type="email" name="email" id="idEmail" placeholder="Digite seu Email" value={usuario.email}
                        onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="idSenha">Senha:</label>
                        <input type="password" name="senha" id="email" placeholder="Digite sua senha" value={usuario.senha}
                        onChange={handleChange} />
                    </div>
                    <div>
                        <button>Login</button>
                    </div>
                    <div>
                        <p>Se você ainda não tem cadastro conosco. CLIQUE AQUi.</p>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
  )
}
