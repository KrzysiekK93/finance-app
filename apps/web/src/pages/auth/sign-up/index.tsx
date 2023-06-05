import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";

type Inputs = {
  password: string;
  email: string;
  emailVerified: string;
  name?: string;
};

const schema = z.object({
  email: z.string({ required_error: "Email is required!" }),
  password: z.string({ required_error: "Password is required!" }),
  emailVerified: z.string({ required_error: "Email is required!" }),
  name: z.string(),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const mutation = api.auth.signUp.useMutation();
  console.log("### mutation", mutation);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("### data", data);
    mutation.mutate(data);
  };

  return (
    <main className="flex h-screen flex-col content-center items-center justify-center text-white ">
      <div className="align-center container mt-12 flex flex-col items-center gap-4 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Sign up
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col"
        >
          {/* register your input into the hook by invoking the "register" function */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your name</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>Name</span>
              <input
                type="text"
                placeholder="Type input"
                className="input input-bordered"
                {...register("name")}
              />
            </label>
            {errors.email && (
              <div className="alert alert-error mt-4 shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{errors.email.message}</span>
                </div>
              </div>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>Email</span>
              <input
                type="text"
                placeholder="Type input"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && (
              <div className="alert alert-error mt-4 shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{errors.email.message}</span>
                </div>
              </div>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Confirmed Email</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>Confirmed Email</span>
              <input
                type="text"
                placeholder="Type input"
                className="input input-bordered"
                {...register("emailVerified", { required: true })}
              />
            </label>
            {errors.emailVerified && (
              <div className="alert alert-error mt-4 shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{errors.emailVerified.message}</span>
                </div>
              </div>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <label className="input-group input-group-vertical">
              <span>Password</span>
              <input
                type="password"
                placeholder="Type password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && (
              <div className="alert alert-error mt-4 shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{errors.password.message}</span>
                </div>
              </div>
            )}
          </div>

          <input
            type="submit"
            value="Sign up"
            className="btn btn-active btn-accent mb-4 mt-4 flex w-4/12 self-center"
          />
        </form>
      </div>
    </main>
  );
}
