/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/styles/signin.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
import LoginInput from "@/components/inputs/loginInput/index";
import { useState } from "react";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import Router from "next/router";

const initialvalues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};
export default function signin({ providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Địa chỉ Email là bắt buộc.")
      .email("Vui lòng nhập một địa chỉ email hợp lệ."),
    login_password: Yup.string().required("Vui lòng nhập Password."),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Tên bạn là gì ?")
      .min(2, "Tên phải gồm 2 đến 32 kí tự.")
      .max(32, "Tên phải gồm 2 đến 32 kí tự.")
      .matches(/^[aA-zZ]/, "Số và ký tự đặc biệt không được phép"),
    email: Yup.string()
      .required(
        "Bạn sẽ cần điều này khi đăng nhập và nếu bạn cần đặt lại mật khẩu của mình."
      )
      .email("Nhập địa chỉ email hợp lệ"),
    password: Yup.string()
      .required(
        "Nhập tổ hợp của ít nhất sáu số, chữ cái và dấu chấm câu (chẳng hạn như ! và &)."
      )
      .min(6, "Mật khẩu cần ít nhất 6 ký tự.")
      .max(36, "Mật khẩu không thể nhiều hơn 36 kí tự."),
    conf_password: Yup.string()
      .required("Nhập lại mật khẩu của bạn.")
      .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp."),
  });
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };
  const signInHander = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Chúng tôi rất vui khi bạn được tham gia cùng chúng tôi !{" "}
              <Link href="/">Go store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Chào mừng đến với website E-commerce của chúng tôi.</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHander();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input type="hidden" name="csrfToken"
                  defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Quên mật khẩu ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.socials__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img
                          src={`../../images/icons/${provider.name}.png`}
                          alt=""
                        />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>Chào mừng đến với website E-commerce của chúng tôi.</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country="Viet Nam" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const { callbackUrl } = query;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: { providers, csrfToken, callbackUrl },
  };
}
