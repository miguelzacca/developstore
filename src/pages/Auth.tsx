import "../assets/styles/pages/Auth.scss";

interface props {
  login: boolean;
}

export function Auth({ login }: props) {
  return (
    <main id="Auth">
      <div id="msg"></div>
      <form>
        <div className="header"></div>
        <h2>{login ? "Login" : "Register"}</h2>
        {login ? null : (
          <div className="input-container">
            <input type="text" name="name" id="name" placeholder=" " required />
            <label htmlFor="name">Username</label>
          </div>
        )}
        <div className="input-container">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            name="passwd"
            id="passwd"
            placeholder=" "
            required
          />
          <label htmlFor="passwd">Password</label>
        </div>
        <button type="submit">
          Submit
          <div className="left"></div>
          <div className="top"></div>
          <div className="right"></div>
          <div className="bottom"></div>
        </button>
        {login ? (
          <p>
            Forgot password? <a href="passwd-recovery">Recovery password</a>
          </p>
        ) : null}
      </form>
      {login ? (
        <a id="handleAuthPage" href="register">
          Register
        </a>
      ) : (
        <a id="handleAuthPage" href="login">
          Login
        </a>
      )}
    </main>
  );
}
