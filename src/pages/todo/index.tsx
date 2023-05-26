import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import todos from "~/components/todos";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type RouterOutputs } from "~/utils/api";
// import { trpc } from "../utils/trpc";

type Todo = RouterOutputs["todo"]["getAll"][0];

const Todo = () => {
  const utils = api.useContext();

  const ref = useRef<HTMLInputElement>(null);
  const [sentence, setSentence] = useState("");
  const [state, setState] = useState(true);
  const { data: list } = api.todo.getAll.useQuery();
  // const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = api.todo.insert.useMutation({
    onSuccess(input) {
      void utils.todo.getAll.invalidate();
    },
  });

  const sendData = () => {
    console.log("showing value of use Ref:");
    console.log(ref.current?.value);
    void mutateAsync({ text: ref.current?.value }, {});
  };

  return (
    <div className=" flex flex-col items-center justify-center p-5 sm:w-full">
      <div>
        <input
          type="text"
          onChange={(e) => setSentence(e.target.value)}
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

      <div>
        {list?.map((el) => (
          <div key={el.id} id={el.id} className="m-1 bg-gray-800 ">
            <input
              type="checkbox"
              name={el.id}
              value={el.todo}
              className="line-through"
              onClick={() => {
                document.getElementById(el.id).style.textDecoration =
                  "line-through";
                console.log();
              }}
            ></input>
            {el.todo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;