import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import todos from "~/components/Todo";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type RouterOutputs } from "~/utils/api";
// import { trpc } from "../utils/trpc";

type Todo = RouterOutputs["task"]["getAll"][0];

const Todo = () => {
  const utils = api.useContext();

  const ref = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(true);

  // const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = api.auth.insert.useMutation();

  const sendData = () => {
    console.log("showing value of use Ref:");
    console.log(ref.current?.value);
    void mutateAsync({ email: email, password: password });
  };

  return (
    <div className=" flex flex-col items-center justify-center p-5 sm:w-full">
      <div>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="w-[700px] rounded border  text-black"
          ref={ref}
        />
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          className="w-[700px] rounded border  text-black"
          ref={ref}
        />
        <button
          onClick={sendData}
          className="m-3 rounded-xl bg-green-300 px-3 py-1  font-bold text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Todo;
