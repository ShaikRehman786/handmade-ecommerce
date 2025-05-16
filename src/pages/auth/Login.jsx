
const Login = () => {
  return (
    <div>
        <form>
            <h2>Login</h2>
            <input type='email' placeholder="Enter Your Email" className="" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </form>
    </div>
  )
}

export default Login