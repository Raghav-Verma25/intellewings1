import '../index.css';
export default function Login() {
  return (
    <>
      <form method="post">
        <div>
          <label htmlFor="username">Enter Your Username</label>
          <input type="text" htmlFor="username" />
        </div>

        <div>
          <label htmlFor="username">Enter Your Password</label>
          <input type="password" htmlFor="password" />
        </div>
        <button type="submit">enter!!</button>
      </form>
    </>
  );
}
