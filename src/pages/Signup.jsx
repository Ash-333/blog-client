import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Form submit handler
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      setSubmitting(true);
      const response = await registerUser(values);
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      formik.resetForm();
      setSubmitting(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-8 text-center">Sign Up</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              Name
            </label>
            <input
              className="border p-2 rounded-md w-full outline-none"
              type="text"
              id="username"
              name="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              className="border p-2 rounded-md w-full outline-none"
              type="email"
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              className="border p-2 rounded-md w-full outline-none"
              type="password"
              id="password"
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              className="border p-2 rounded-md w-full outline-none"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            className="text-white font-semibold bg-black p-2 rounded-md w-full"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        <h1 className="text-black mt-4">
          Alreay have an account?{" "}
          <Link to={"/"}>
            <span className="text-blue-500">Login here</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Signup;
