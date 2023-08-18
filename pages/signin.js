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
const initialvalues = {
  login_email: "",
  login_password: "",
};
export default function signin({ country }) {
  const [user, setUser] = useState(initialvalues);
  const { login_email, login_password } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password."),
  });
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
                  <CircledIconBtn type="submit" text="Sign in"/>
                  <div className={styles.forgot}>
                    <Link href="/forget">Forgot password ?</Link>
                  </div>
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
