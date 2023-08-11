import { useNavigate } from "react-router-dom";

function Login() {
  const navHome = useNavigate();
  const navDashboard = useNavigate();
  function navigateHome() {
    navHome("/home");
  }
  function navigateDashboard() {
    navDashboard("/dashboard");
  }
  return (
    <form>
      <label for="fname">نام خوانوادگی:</label>
      <br />
      <input
        type="text"
        id="fname"
        name="fname"
        className="border-2 border-rose-600 "
      />
      <br />
      <button className="border border-red-400 m-3" onClick={navigateDashboard}>
        ورود
      </button>
      <button onClick={navigateHome}>بازگشت به سایت</button>
    </form>
  );
}
export default Login;
