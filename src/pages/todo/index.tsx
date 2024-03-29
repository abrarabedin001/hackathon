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

  const { data: session } = useSession();

  const ref = useRef<HTMLInputElement>(null);
  const [sentence, setSentence] = useState("");
  const [state, setState] = useState(true);
  const { data: list } = api.task.getFromSingleUser.useQuery({
    userid: session?.user.id,
  });
  const assignUser = api.userteam.findUser.useQuery({
    email: "ahmad.abrar.abedin@g.bracu.ac.bd",
  }).data?.id;

  // const queryClient = useQueryClient();
  const { mutateAsync: mutate2 } = api.team.insert.useMutation();
  const { mutateAsync: mutate1, isLoading } = api.task.insert.useMutation({
    onSuccess(input) {
      void utils.task.getAll.invalidate();
    },
  });
  const { mutateAsync: mutate3 } = api.task.assignUser.useMutation({
    onSuccess(input) {
      void utils.task.getAll.invalidate();
    },
  });
  const { mutateAsync: mutate4 } = api.userteam.addUser.useMutation({
    onSuccess(input) {
      void utils.task.getAll.invalidate();
    },
  });
  const { mutateAsync: mutate5 } = api.userteam.updateUserTeam.useMutation({
    onSuccess(input) {
      void utils.task.getAll.invalidate();
    },
  });
  // const { mutateAsync: mutate6 } = api.team.insert.useMutation({
  //   onSuccess(input) {
  //     void utils.task.getAll.invalidate();
  //   },
  // });

  const sendData = () => {
    void mutate2({ name: "testLimit", creatorid: session?.user.id });
    // void mutate1({
    //   userId: session?.user.id,
    //   // isCompleted: false,
    //   name: "ami bhat khai 2 3 4",
    //   teamId: "cli4rvecl0005vjx0mgf2plfd",
    //   priority: "HIGH",
    //   // dueDate: new Date(),
    // });
    // void mutate3({
    //   taskid: "cli62mpdk000tvj24lylqpsu3",

    //   // isCompleted: false,
    //   assignedTo: "cli41mcnj0000vjpgoi73so5a",
    //   // teamId: "cli4rvecl0005vjx0mgf2plfd",
    //   // priority: "HIGH",
    //   // dueDate: new Date(),
    // });
    // void mutate4({
    //   userId: assignUser,

    //   // isCompleted: false,
    //   teamId: "asdfasdgasdg",
    //   // teamId: "cli4rvecl0005vjx0mgf2plfd",
    //   // priority: "HIGH",
    //   // dueDate: new Date(),
    // });
    // void mutate5({
    //   userId: assignUser,

    //   // isCompleted: false,
    //   teamId: "asdfasdgasdg",

    //   permissions: "ADMIN",
    //   inviteAccepted: "ACCEPTED",

    //   // teamId: "cli4rvecl0005vjx0mgf2plfd",
    //   // priority: "HIGH",
    //   // dueDate: new Date(),
    // });
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
              value={el.name}
              className="line-through"
              onClick={() => {
                document.getElementById(el.id).style.textDecoration =
                  "line-through";
              }}
            ></input>
            {el.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
