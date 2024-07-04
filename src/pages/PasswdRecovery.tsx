import "../styles/pages/Auth.scss";

interface props {
  request: boolean;
}

export function PasswdRecovery({ request }: props) {
  return (
    <main id="Auth">
      <div id="msg"></div>
      <form>
        <div className="header"></div>
        <h2>{request ? "Recovery Password" : "Change Password"}</h2>
        {!request ? (
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
        ) : (
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
        )}
        <button type="submit">
          Submit
          <div className="left"></div>
          <div className="top"></div>
          <div className="right"></div>
          <div className="bottom"></div>
        </button>
      </form>
    </main>
  );
}
