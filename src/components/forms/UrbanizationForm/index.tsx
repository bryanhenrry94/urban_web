"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useUrbanizationApi } from "@/hooks/useUrbanizationApi";
import { Urbanization } from "@/types/urbanization";
import { useFieldArray } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";

const schema = yup
  .object({
    name: yup.string().required("Nombre es requerido"),
    address: yup.string().notRequired(),
    services: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required("Nombre del servicio es requerido"),
          frequency: yup.string().required("Frecuencia es requerida"),
          rate: yup
            .number()
            .required("Tarifa es requerida")
            .positive("La tarifa debe ser un número positivo"),
        })
      )
      .notRequired(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const UrbanizationForm: FC<{ id?: string }> = ({ id }) => {
  const { fetchUrbanization, updateUrbanization, saveUrbanization, error } =
    useUrbanizationApi();

  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  useEffect(() => {
    if (error) {
      Swal.fire({ title: "Aviso", text: error, icon: "error" });
    }
  }, [error]);

  const getCompany = useCallback(async () => {
    try {
      if (!id) return;

      const currentUrbanization = await fetchUrbanization(id);

      setModeEdit(true);

      if (currentUrbanization) {
        setValue("name", currentUrbanization.name);
        setValue("address", currentUrbanization.address);
        setValue("services", currentUrbanization.services);
      }
    } catch (error: Error | any) {
      Swal.fire({ title: "Aviso", text: error.message, icon: "error" });
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      getCompany();
    }
  }, [id, getCompany]);

  const onSubmit = async (data: Urbanization) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updateUrbanization(id, data);
      } else {
        // Realiza la solicitud de autenticación a tu API
        await saveUrbanization(data);
      }

      Swal.fire({
        title: "Aviso",
        text: `Urbanización ${modeEdit ? "actualizada" : "guardada"} con éxito`,
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
      router.push("/secure/urbanizations");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Error al guardar la urbanización",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="name" className="font-normal text-md mb-1">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
            placeholder="Nombre"
          />
          <p className="text-red-500 font-normal text-sm mt-1">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="address" className="font-normal text-md mb-1">
            Dirección:
          </label>
          <input
            id="address"
            type="text"
            {...register("address")}
            className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
            placeholder="Dirección"
          />
        </div>

        <div className="flex flex-col w-full lg:w-1/2">
          <label className="font-normal text-md mb-1">Servicios:</label>
          {fields.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-wrap gap-4 mb-4 p-4 border border-gray-200 rounded-md"
            >
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  {...register(`services.${index}.name`)}
                  className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                  placeholder="Nombre del servicio"
                />
                <p className="text-red-500 font-normal text-sm mt-1">
                  {errors.services?.[index]?.name?.message}
                </p>
              </div>
              <div className="grid grid-cols-3 w-full gap-4">
                <div className="flex flex-col w-full">
                  <select
                    {...register(`services.${index}.frequency`)}
                    className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white appearance-none"
                  >
                    <option value="">Selecciona la frecuencia</option>
                    <option value="mensual">Mensual</option>
                    <option value="semanal">Semanal</option>
                    <option value="trimestral">Trimestral</option>
                  </select>
                  <p className="text-red-500 font-normal text-sm mt-1">
                    {errors.services?.[index]?.frequency?.message}
                  </p>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type="number"
                    {...register(`services.${index}.rate`)}
                    className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                    placeholder="Tarifa"
                  />
                  <p className="text-red-500 font-normal text-sm mt-1">
                    {errors.services?.[index]?.rate?.message}
                  </p>
                </div>
                <div className="flex flex-col w-full items-end justify-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-200 flex items-center"
                  >
                    <LuTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ name: "", frequency: "", rate: 0 })}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 flex items-center"
          >
            <LuCirclePlus className="mr-2" />
            Agregar Servicio
          </button>
        </div>
        <div className="flex w-full">
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200"
          >
            {modeEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UrbanizationForm;
