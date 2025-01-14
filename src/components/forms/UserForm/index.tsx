"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { APICompany, User } from "@/types";
import { saveUser, updateUser, fetchUser } from "@/services/userService";
import { fetchCompanies } from "@/services/companyService";

const schema = yup
  .object({
    email: yup.string().required("El email es requerido"),
    name: yup.string().required("El nombre es requerido"),
    password: yup.string().required("La contraseña es requerida"),
    role: yup.string().required("El rol es requerido"),
    status: yup.string().required("El estado es requerido"),
    companyId: yup.string().required("La empresa es requerida"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const UserForm: FC<{ id?: string }> = ({ id }) => {
  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);

  const [companies, setCompanies] = useState<APICompany[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const loadUser = useCallback(async () => {
    try {
      if (!id) return;
      const res = await fetchUser(id);
      const { data } = res;

      setModeEdit(true);

      setValue("email", data.email);
      setValue("name", data.name);
      setValue("role", data.role);
      setValue("status", data.status);
      setValue("companyId", data.companyId);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  }, [id, setValue]);

  const loadCompanies = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      const res = await fetchCompanies();

      const { data } = res;
      setCompanies(data);
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id, loadUser]);

  const onSubmit = async (data: User) => {
    try {
      if (modeEdit) {
        if (!id) return;
        const response = await updateUser(id, data);

        if (response && response.data) {
          Swal.fire({
            title: "Aviso",
            text: "Registro actualizado correctamente",
            icon: "success",
            confirmButtonColor: "#22C55E",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Aviso",
            text: response?.error || "Error al guardar el usuario",
            icon: "error",
            confirmButtonColor: "#22C55E",
            confirmButtonText: "Ok",
          });
        }
      } else {
        // Realiza la solicitud de autenticación a tu API
        const response = await saveUser(data);

        if (response && response.data) {
          router.push("/secure/users");
        } else {
          Swal.fire({
            title: "Aviso",
            text: response?.error || "Error al guardar el usuario",
            icon: "error",
            confirmButtonColor: "#22C55E",
            confirmButtonText: "Ok",
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Error al guardar el usuario",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-2 p-4 border-b-2">
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="companyId" className="font-normal text-md mb-1">
            Empresa:
          </label>
          <select
            id="companyId"
            {...register("companyId")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="">Seleccione una empresa</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.companyId?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="email" className="font-normal text-md mb-1">
            Correo:
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Correo"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.email?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="name" className="font-normal text-md mb-1">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Nombre"
            disabled={modeEdit ? true : false}
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="password" className="font-normal text-md mb-1">
            Contraseña:
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Contraseña"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="role" className="font-normal text-md mb-1">
            Rol:
          </label>
          <select
            id="role"
            {...register("role")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="User">Usuario</option>
            <option value="Admin">Administrador</option>
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.role?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="status" className="font-normal text-md mb-1">
            Estado:
          </label>
          <select
            id="status"
            {...register("status")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="Active">Activo</option>
            <option value="Inactive">Inactivo</option>
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.status?.message}
          </p>
        </div>
        <div className="flex w-full">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            {modeEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
