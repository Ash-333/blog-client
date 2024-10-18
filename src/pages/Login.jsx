import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser, setAuthToken } from "../api/api"; // Assuming loginUser and setAuthToken are API utility functions
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice"; // Import the addUser action from userSlice

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validation schema for form inputs
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);

      // Send login request
      const response = await loginUser(values); // loginUser API should return token and user data
      const { token, user } = response.data;
      // Dispatch the user data to Redux
      dispatch(
        addUser({
          id: user.id,
          username: user.username,
          token,
        })
      );

      // Set the token in the localStorage/sessionStorage (persistent login)
      setAuthToken(token);
      localStorage.setItem("jwtToken", token); // You can also use sessionStorage if needed

      // Reset the form and navigate to the home page
      formik.resetForm();
      setSubmitting(false);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setSubmitting(false);
    }
  };

  // Formik setup for managing form state and validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-8 text-center">Welcome Back</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email input field */}
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

          {/* Password input field */}
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

          {/* Submit button */}
          <button
            className="text-white font-semibold bg-black p-2 rounded-md w-full"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Register link */}
        <h1 className="text-black mt-4">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-blue-500">Register here</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
