/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AnimatedInput from "../../components/Inputs/AnimatedInput";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.service";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";
import { Modal } from "@mantine/core";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../actions/AuthActions";
import cookie from "react-cookies";
import Register from "../ui/RegisterComponent";
const LoginModal = ({
  isPayment,
  closePayment,
  id,
}: {
  isPayment: boolean;
  closePayment: () => void;
  id: string;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEmailChange = (
    event: React.ChangeEvent<HTMLFormElement>,
  ): any => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (!email || !password) {
      notifications.show({
        title: "Error",
        message: "Email and password are required",
        color: "red",
      });
      setLoading(false);
      return;
    }
    loginService({ email: email, password: password })
      .then((res: any) => {
        notifications.show({
          title: "Success!",
          message: res.data.message,
          color: "green",
        });
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: res.data.data.token,
            user: res.data.data.user,
          },
        });
        if (res.data.data.user.role.includes("USER")) {
          console.log(res.data.data);
          const expires = new Date();
          expires.setDate(Date.now() + 1000 * 2);
          cookie.save("auth_token", res.data.data.token, {
            path: "/",
          });
          cookie.save("auth_USER", res.data.data.user.role, {
            path: "/",
          });
        }
        if (res.data.data.user.role.includes("OWNER")) {
          const expires = new Date();
          expires.setDate(Date.now() + 1000 * 2);
          cookie.save("auth_token", res.data.data.token, {
            path: "/",
          });
          cookie.save("auth_USER", res.data.data.user.role, {
            path: "/",
          });
        }
        navigate(`/booking/place/${id}/checkout`);
      })
      .catch((err) => {
        notifications.show({
          title: "",
          message: err.response?.data?.message ?? err.message,
          color: "red",
        });
      })
      .finally(() => setLoading(false));
  };
  const [activePage, setActivePage] = useState("login");
  return (
    <>
      {isPayment && (
        <div>
          <Modal
            opened={isPayment}
            onClose={closePayment}
            title="Login to continue"
          >
            {activePage === "login" ? (
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col items-start gap-4 my-[3vh]"
              >
                <div className="w-full flex flex-col items-start gap-6">
                  <AnimatedInput
                    label="Email"
                    type="email"
                    handleChange={handleEmailChange}
                    value={email}
                  />
                  <AnimatedInput
                    label="Password"
                    type="password"
                    showEye={true}
                    handleChange={handlePasswordChange}
                    value={password}
                    className=""
                  />
                </div>

                <div className="w-full flex justify-end">
                  <Link
                    to={"/auth/forgot"}
                    className="text-[#FF8682] font-extrabold text-sm"
                  >
                    Forgot Password ?{" "}
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-3 text-center font-bold rounded-md text-white bg-[#699BFE]"
                >
                  {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <ClipLoader size={23} color="black" />
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="w-full flex items-center gap-2 justify-end">
                  <h1 className="text-sm font-extrabold">
                    Don't have an account?
                  </h1>
                  <h1
                    // to={"/auth/register"}
                    onClick={() => setActivePage("register")}
                    className="text-[#FF8682] font-extrabold text-sm cursor-pointer"
                  >
                    {" "}
                    Register
                  </h1>
                </div>
              </form>
            ) : (
              <Register setActivePage={setActivePage} />
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default LoginModal;
