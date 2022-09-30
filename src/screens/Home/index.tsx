import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import HomeStyles from "./Home.module.scss";

const Home = () => {
  const inputValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    validationSchema: inputValidationSchema,
    initialValues: {
      top: "",
      bottom: "",
      left: "",
      right: "",
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          top: "",
          bottom: "",
          left: "",
          right: "",
        };
        // setUpdating(true);
        // setError("");
        // const resp = await login({ variables: payload });

        // if (
        //   resp &&
        //   resp.data &&
        //   resp.data.login &&
        //   resp.data.login.status === 200
        // ) {
        //   localStorage.setItem("token", resp.data.login.token);
        //   navigate("./dashboard");
        // }

        // if (
        //   resp &&
        //   resp.data &&
        //   resp.data.login &&
        //   resp.data.login.status === 400
        // ) {
        //   setError(resp.data.login.message);
        //   return;
        // }
      } catch (err) {
        // setUpdating(false);
        // const e = err as any;
        // if (e && e.graphQLErrors && e.graphQLErrors.length > 0) {
        //   setError(e.graphQLErrors[0].message);
        // } else {
        //   setError("Something went wrong");
        //   Toast.error("Something went wrong");
        // }
      }
    },
  });

  return (
    <div className={HomeStyles.home}>
      <div className={HomeStyles.home_content}>
        <div className={HomeStyles.home_content_children}>
          <div className={HomeStyles.home_content_children_logo}>
            .Pinpoint.
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className={HomeStyles.home_content_children_form}
          >
            <Input
              type="text"
              name="left"
              placeholder="Left longitude"
              value={formik.values.left}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.left}
              autoComplete="off"
            />
            {/* LEFT is the longitude of the left (westernmost) side of the bounding
            box. BOTTOM is the latitude of the bottom (southernmost) side of the
            bounding box. RIGHT is the longitude of the right (easternmost) side
            of the bounding box. TOP is the latitude of the top (northernmost)
            side of the bounding box. */}
            <Input
              type="text"
              name="right"
              placeholder="Right longitude"
              value={formik.values.right}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.right}
              autoComplete="off"
            />
            <Input
              type="text"
              name="top"
              placeholder="Top latitude"
              value={formik.values.top}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.top}
              autoComplete="off"
            />
            <Input
              type="text"
              name="bottom"
              placeholder="Bottom latitude"
              value={formik.values.bottom}
              containerClass={HomeStyles.home_content_children_form_input}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.bottom}
              autoComplete="off"
            />
            <Button
              className={HomeStyles.home_content_children_form_btn}
              title="Login"
              color="primary"
              type="submit"
              // isLoading={updating}
              disabled={formik.isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
