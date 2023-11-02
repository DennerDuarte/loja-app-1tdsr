
export default function LoginUsers() {
  return (
    <div>
        <h1>Identificação dos Usuários</h1>

        <div>
            <form>
                <fieldset>
                    <legend>LOGIN</legend>
                    <div>
                        <label htmlFor="idEmail">Email:</label>
                        <input type="email" name="email" id="idEmail" placeholder="Digite seu Email" value=""
                        onChange="" required/>
                    </div>
                    <div>
                        <label htmlFor="idSenha">Senha:</label>
                        <input type="password" name="senha" id="email" placeholder="Digite sua senha" value=""
                        onChange="" required/>
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
