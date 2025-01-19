"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { LuTrash } from "react-icons/lu";
import { LuCirclePlus } from "react-icons/lu";

import { usePropertyApi } from "@/hooks/usePropertyApi";
import { useResidentApi } from "@/hooks/useResidentApi";
import { useUrbanizationApi } from "@/hooks/useUrbanizationApi";
import { useFieldArray } from "react-hook-form";
import { Property } from "@/types/property";

const schema = yup
  .object({
    urbanizationId: yup.string().required("La urbanizacion es requerida"),
    unitType: yup.string().required("El tipo de unidad es requerido"),
    unitNumber: yup.string().required("La unidad es requerida"),
    residents: yup.array().of(
      yup.object({
        residentId: yup.string().required("El residente es requerido"),
      })
    ),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const PropertyForm: FC<{ id?: string }> = ({ id }) => {
  const { saveProperty, updateProperty, fetchProperty } = usePropertyApi();
  const { urbanizations, fetchUrbanizations } = useUrbanizationApi();
  const { residents, fetchResidents } = useResidentApi();

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
    name: "residents",
  });

  const loadData = useCallback(async () => {
    try {
      if (!id) return;
      const currentProperty = await fetchProperty(id);

      setModeEdit(true);

      if (currentProperty) {
        setValue("urbanizationId", currentProperty?.urbanizationId);
        setValue("unitType", currentProperty.unitType);
        setValue("unitNumber", currentProperty.unitNumber);
        setValue("residents", currentProperty.residents);
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  }, [id, setValue]);

  const loadUrbanizations = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      await fetchUrbanizations();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const loadResidents = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      await fetchResidents();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  useEffect(() => {
    loadUrbanizations();
    loadResidents();
  }, []);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, loadData]);

  const onSubmit = async (data: Property) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updateProperty(id, data);
      } else {
        // Realiza la solicitud de autenticación a tu API
        await saveProperty(data);
      }

      Swal.fire({
        title: "Aviso",
        text: "Registro actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
      router.push("/secure/properties");
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

  const unitTypes = [
    "house",
    "apartment",
    "studio",
    "duplex",
    "townhouse",
    "penthouse",
    "villa",
    "flat",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-2 p-4 border-b-2">
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="urbanizationId" className="font-normal text-md mb-1">
            Urbanización:
          </label>
          <select
            id="urbanizationId"
            {...register("urbanizationId")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="">Seleccione una urbanizacion</option>
            {urbanizations &&
              urbanizations.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.urbanizationId?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="unitType" className="font-normal text-md mb-1">
            Tipo Unidad:
          </label>
          <select
            id="unitType"
            {...register("unitType")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            {unitTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.unitType?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="unitNumber" className="font-normal text-md mb-1">
            Número de la propiedad:
          </label>
          <input
            id="unitNumber"
            type="text"
            {...register("unitNumber")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Número de la propiedad"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.unitNumber?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="residents" className="font-normal text-md mb-1">
            Residentes:
          </label>
          {fields.map((resident, index) => (
            <div
              key={resident.id}
              className="flex flex-wrap gap-4 mb-4 p-4 border border-gray-200 rounded-md"
            >
              <div className="flex flex-col w-full">
                <select
                  {...register(`residents.${index}.residentId`)}
                  className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white appearance-none"
                >
                  {residents && (
                    <>
                      <option value="">Selecciona un residente</option>
                      {residents.map((person) => (
                        <option key={person._id} value={person._id}>
                          {person.email}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <p className="text-red-500 font-normal text-sm mt-1">
                  {errors.residents?.[index]?.residentId?.message}
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
          ))}
          <button
            type="button"
            onClick={() => append({ residentId: "" })}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 flex items-center"
          >
            <LuCirclePlus className="mr-2" />
            Agregar Residente
          </button>
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

export default PropertyForm;
