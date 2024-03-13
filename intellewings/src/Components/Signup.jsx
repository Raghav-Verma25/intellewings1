import '../index.css';
export default function Signup() {
  return (
    <>
      <div>
        <form method="post">
          <div>
            <label htmlFor="username">Enter Your Username</label>
            <input type="text" htmlFor="username" />
          </div>

          <div>
            <label htmlFor="name">Enter Your name</label>
            <input type="text" htmlFor="name" />
          </div>

          <div>
            <label htmlFor="username">Enter Your Password</label>
            <input type="password" htmlFor="password" />
          </div>
          <button type="submit">enter!!</button>
        </form>
      </div>
    </>
  );
}
