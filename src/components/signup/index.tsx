import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { signupUser } from "../../state-management/signup/action";
import { AppDispatch, RootState } from "../../state-management/store";

const SignUp = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.signup
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    let isValid = true;
    if (!email || !email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError(null);
    }
    if (!password || !password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError(null);
    }
    if (!name || !name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    } else {
      setNameError(null);
    }

    if (isValid) {
      await dispatch(signupUser(name, email, password));
    }
  };

  useEffect(() => {
    if (data != null) {
      if (data.status) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else {
        toast.error(data.message);
      }
    }
    if (error) {
      toast.error(error);
    }
  }, [data, error, navigate]);
console.log("data",data)

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="min-h-[94vh] flex items-center justify-center">
        <div className="max-w-[350px] p-10 w-full shadow-2xl">
          <div>
            <div className="m-auto flex items-center justify-center bg-primary w-14 h-14 rounded-full">
              <LockOutlinedIcon className="text-white" />
            </div>
            <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
              Sign Up
            </h2>
          </div>
          <form className="mt-4 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md flex flex-col gap-y-5">
              <div>
                <input
                  id="name-address"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className={`pl-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    nameError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter User Name"
                  value={name}
                  onChange={handleName}
                />
                {nameError && <p className="text-sm text-red">{nameError}</p>}
              </div>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`pl-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    emailError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmail}
                />
                {emailError && <p className="text-sm text-red">{emailError}</p>}
              </div>
              <div>
                <div className="flex items-center relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className={`pl-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                      passwordError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePassword}
                  />
                  <button
                    className="absolute right-2 z-10"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <VisibilityIcon className="w-5 h-3" />
                    ) : (
                      <VisibilityOffIcon className="w-5 h-3" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red">{passwordError}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSignUp}
              >
                {loading ? (
                  <ClipLoader color="text-primary" size={30} />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
            <div className="flex gap-3 items-center">
              <p>Already have an account?</p>
              <Link
                to={"/"}
                className="flex justify-center font-semibold text-primary hover:underline"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
