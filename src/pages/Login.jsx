import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      if (email.length == "" || password.length == "") {
        toast.error("Please fill all the fields");
        return;
      }
      await login(email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password or email");
      }
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col  mt-24 items-center justify-center">
        <h1 className="text-2xl text-info font-bold">Login</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered bg-white w-full max-w-xs"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label className="label">
            <span className="label-text text-white">password</span>
          </label>
          <input
            type="password"
            placeholder="********"
            className="input input-bordered bg-white w-full max-w-xs"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button className="btn btn-primary mt-4">Sign In</button>
          <div className="divider">OR</div>
          <button className="btn btn-primary mt-2">Sign In with Google</button>
        </div>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link className="text-error font-sans" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
