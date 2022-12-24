import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const { signup, userInfo, addUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, username } = data;

    try {
      if (
        username.length == "" ||
        email.length == "" ||
        password.length == ""
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      setLoading(true);
      await signup(email, password);
      await userInfo(username);
      await addUserInfo(username, email);
      toast.success("Account created successfully");
      setLoading(false);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col  mt-24 items-center justify-center">
        <h1 className="text-2xl text-error font-bold">Sign Up</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="input input-bordered bg-white text-black w-full max-w-xs"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered bg-white text-black w-full max-w-xs"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label className="label">
            <span className="label-text text-white">password</span>
          </label>
          <input
            type="password"
            placeholder="********"
            className="input input-bordered bg-white text-black w-full max-w-xs"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button className="btn btn-primary  mt-4">Sign Up</button>
          <div className="divider">OR</div>
          <button className="btn btn-primary mt-2">Sign Up with Google</button>
          <p className="mt-4">
            Already have an account?{" "}
            <Link className="text-error font-sans" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
