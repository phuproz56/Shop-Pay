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
import { getProviders, signIn } from "next-auth/react";
const initialvalues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
};
export default function signin({ providers }) {
  console.log(providers);
  const [user, setUser] = useState(initialvalues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
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
    name: Yup.string().required('Tên bạn là gì ?')
    .min(2,'Tên phải gồm 2 đến 32 kí tự.')
    .max(32, 'Tên phải gồm 2 đến 32 kí tự.')
    .matches(/^[aA-zZ]/, 'Số và ký tự đặc biệt không được phép'),
    email: Yup.string().required('Bạn sẽ cần điều này khi đăng nhập và nếu bạn cần đặt lại mật khẩu của mình.').email("Nhập địa chỉ email hợp lệ"),
    password: Yup.string().required('Nhập tổ hợp của ít nhất sáu số, chữ cái và dấu chấm câu (chẳng hạn như ! và &).').
    min(6, 'Password cần ít nhất 6 ký tự.').max(36, 'Password không thể nhiều hơn 36 kí tự.'),
    conf_password: Yup.string().required('Nhập lại Password của bạn.').oneOf([Yup.ref("password")], "Password không phù hợp."),
  })
  return (
    <>
      <Header country />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
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
                  <div className={styles.forgot}>
                    <Link href="/forget">Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
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
          </div>
        </div>
      </div>
      <Footer country="Viet Nam" />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
