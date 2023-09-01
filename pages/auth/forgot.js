/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Header from "@/components/header";
import styles from "../../styles/forgot.module.scss";
import Footer from "@/components/footer";
import Link from "next/link";
import { Form, Formik } from "formik";
import LoginInput from "@/components/inputs/loginInput/index";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import { BiLeftArrowAlt } from "react-icons/bi";
import * as Yup from "yup";
import { useState } from "react";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import axios from "axios";

export default function forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "Bạn sẽ cần điều này khi đăng nhập và nếu bạn cần đặt lại mật khẩu của mình."
      )
      .email("Nhập địa chỉ email hợp lệ"),
  });
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}

      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Bạn quên mật khẩu ? <Link href="/">Đăng nhập</Link>
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Gửi" />
                {success && <span className={styles.success}>{success}</span>}
                {error && <span className={styles.error}>{error}</span>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="" />
    </>
  );
}
