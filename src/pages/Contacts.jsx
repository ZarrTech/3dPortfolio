import { Suspense, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Loader, Alert } from "../components";
import { Fox } from "../models";
import useAlert from "../hooks/useAlert";

function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isloading, setIsloading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const { showAlert, hideAlert, alert } = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,

        {
          from_name: form.name,
          to_name: "Zarr",
          from_email: form.email,
          to_email: "zarusprosper@gmail.com",
          message: form.message,
        },

        import.meta.env.VITE_APP_EMAILJS_PUBLIC_ID
      )
      .then(() => {
        setIsloading(false);
        showAlert({
          show: true,
          text: "Message sent successfully!😃",
          type: "success",
        });

        setTimeout(() => {
          hideAlert();
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, [3000]);
      })
      .catch((err) => {
        setIsloading(false);
        showAlert({
          show: true,
          text: "I didn't receive your message😢",
          type: "danger",
        });
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = (e) => {
    setCurrentAnimation("walk");
  };
  const handleBlur = (e) => {
    setCurrentAnimation("idle");
  };
  return (
    <section className=" relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
      <div className=" flex-1 min-w-[50%] flex flex-col ">
        <h1 className="head-text">Get in touch</h1>
        <form
          className=" w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              className="input"
              placeholder="john"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              placeholder="john@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="message">
            Your Message
            <textarea
              name="message"
              rows={3}
              id="message"
              className="textarea"
              placeholder="let me know how i can help you"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            disabled={isloading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isloading ? "sending..." : "send message"}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
export default Contacts;


