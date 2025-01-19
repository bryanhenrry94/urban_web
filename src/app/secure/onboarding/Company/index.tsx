"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Company } from "@/types";
import { useCompanyApi } from "@/hooks/useCompanyApi";

const schema = yup
  .object({
    identification: yup.string().required("Identificación es requerido"),
    name: yup.string().required("Nombre es requerido"),
    email: yup.string().email().required("Correo es requerido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CompanyOnboardingForm: FC<{ id?: string }> = ({ id }) => {
  const { fetchCompany, updateCompany, saveCompany } = useCompanyApi();
  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const getCompany = useCallback(async () => {
    try {
      if (!id) return;

      const res = await fetchCompany(id);

      const { data } = res;

      setModeEdit(true);

      setValue("identification", data.identification);
      setValue("name", data.name);
      setValue("email", data.email);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      getCompany();
    }
  }, [id, getCompany]);

  const onSubmit = async (data: Company) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updateCompany(id, data);
      } else {
        // Realiza la solicitud de autenticación a tu API
        await saveCompany(data);
      }

      Swal.fire({
        title: "Aviso",
        text: `Registro ${modeEdit ? "actualizado" : "grabado"} correctamente`,
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });

      router.push("/secure/companies");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Error al guardar la empresa",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="signup-form space-y-2 w-full rounded-lg"
    >
      <label htmlFor="name" className="block">
        Nombre:
      </label>
      <input
        id="name"
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        {...register("name", { required: "Nombre es requerido" })}
        placeholder="Nombre de la urbanización"
      />
      <p className="text-red-500 font-normal text-sm mb-2">
        {errors.name?.message}
      </p>
      <label htmlFor="identification" className="block">
        Identificación:
      </label>
      <input
        {...register("identification")}
        type="identification"
        className="w-full rounded-lg border-gray-200 border-2 p-2 mb-2 text-gray-500"
        placeholder="Identificación de la empresa"
      />
      <p className="text-red-500 font-normal text-sm mb-2">
        {errors.identification?.message}
      </p>
      <label htmlFor="email" className="block">
        Correo:
      </label>
      <input
        {...register("email")}
        type="email"
        className="w-full rounded-lg border-gray-200 border-2 p-2 mb-2 text-gray-500"
        placeholder="Email"
      />
      <p className="text-red-500 font-normal text-sm mb-2">
        {errors.email?.message}
      </p>
    </form>
  );
};

export default CompanyOnboardingForm;
