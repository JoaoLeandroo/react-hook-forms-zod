"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nome: z
    .string()
    .min(4, "Insira um nome válido, com no mínimo 4 caracteres"),

  email: z.string().nonempty("Informe um email válido"),

  password: z
    .string()
    .min(6, "Voce precisa informar uma senha com no mínimo 6 caracteres")
});

type CreateUseFormDate = z.infer<typeof schema>;
const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUseFormDate>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<CreateUseFormDate> = (data) => console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 rounded-lg bg-zinc-700 flex flex-col gap-3 w-[500px] overflow-hidden"
      >
        <div className="flex flex-col text-left">
          <label>Nome Completo</label>
          <input
            className=" placeholder:text-sm px-3 outline-none h-11 rounded-lg focus:border-2 border-white shadow-lg"
            type="text"
            placeholder="Seu nome completo..."
            {...register("nome")}
          />
          {errors.nome && (
            <span className="text-red-500 text-xs mt-1 ml-2">
              {errors.nome.message}
            </span>
          )}
        </div>
        <div className="flex flex-col text-left">
          <label>Email</label>
          <input
            className=" placeholder:text-sm px-3 outline-none h-11 rounded-lg focus:border-2 border-white shadow-lg"
            type="email"
            placeholder="Informe seu email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 ml-2">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col text-left">
          <label>Senha</label>
          <input
            className=" placeholder:text-sm px-3 outline-none h-11 rounded-lg focus:border-2 border-white shadow-lg"
            type="password"
            placeholder="Digite uma senha"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1 ml-2">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="h-11 bg-zinc-600 hover:bg-zinc-500 transition duration-300 mt-3 rounded-lg"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
