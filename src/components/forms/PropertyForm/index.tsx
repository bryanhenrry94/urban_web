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
import { useUrbanizationApi } from "@/hooks/useUrbanizationApi";
import { useFieldArray } from "react-hook-form";
import { Property } from "@/types/property";
import { AccordionItem } from "@/components/ui/AccordionItem";

const schema = yup
  .object({
    urbanizationId: yup.string().required("La urbanización es requerida"),
    unitType: yup.string().required("El tipo de unidad es requerido"),
    unitNumber: yup.string().required("La unidad es requerida"),
    residents: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required("El nombre es requerido"),
          subname: yup.string().required("El apellido es requerido"),
          identification: yup
            .string()
            .required("La identificación es requerida"),
          email: yup
            .string()
            .email("El email no es válido")
            .required("El email es requerido"),
          phoneNumber: yup.string().optional(),
          emergencyContact: yup.string().optional(),
          notes: yup.string().optional(),
        })
      )
      .required("Los residentes son requeridos"),
    electronicInvoiceEnabled: yup.boolean().default(false),
    ownerBillingInfo: yup
      .object({
        nameOrBusinessName: yup.string().when("$electronicInvoiceEnabled", {
          is: true,
          then: (schema) =>
            schema.required("El nombre o razón social es requerido"),
          otherwise: (schema) => schema.optional(),
        }),
        taxId: yup.string().when("$electronicInvoiceEnabled", {
          is: true,
          then: (schema) => schema.required("El RIF es requerido"),
          otherwise: (schema) => schema.optional(),
        }),
        billingAddress: yup.string().when("$electronicInvoiceEnabled", {
          is: true,
          then: (schema) =>
            schema.required("La dirección de facturación es requerida"),
          otherwise: (schema) => schema.optional(),
        }),
        email: yup
          .string()
          .email("El email no es válido")
          .when("$electronicInvoiceEnabled", {
            is: true,
            then: (schema) => schema.required("El email es requerido"),
            otherwise: (schema) => schema.optional(),
          }),
        phoneNumber: yup.string().when("$electronicInvoiceEnabled", {
          is: true,
          then: (schema) => schema.required("El teléfono es requerido"),
          otherwise: (schema) => schema.optional(),
        }),
      })
      .default({}),
  })
  .test(
    "ownerBillingInfo-required",
    "Los datos de facturación son requeridos si la factura electrónica está habilitada",
    function (value) {
      if (value.electronicInvoiceEnabled) {
        const { ownerBillingInfo } = value;
        return (
          ownerBillingInfo &&
          Object.values(ownerBillingInfo).every((field) => field !== undefined)
        );
      }
      return true;
    }
  );

type FormData = {
  urbanizationId: string;
  unitType: string;
  unitNumber: string;
  electronicInvoiceEnabled: boolean;
  residents: {
    name: string;
    subname: string;
    identification: string;
    email: string;
    phoneNumber?: string;
    emergencyContact?: string;
    notes?: string;
  }[];
  ownerBillingInfo: {
    nameOrBusinessName?: string;
    taxId?: string;
    billingAddress?: string;
    email?: string;
    phoneNumber?: string;
  };
};

const PropertyForm: FC<{ id?: string }> = ({ id }) => {
  const { saveProperty, updateProperty, fetchProperty } = usePropertyApi();
  const { urbanizations, fetchUrbanizations } = useUrbanizationApi();

  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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

        setValue(
          "ownerBillingInfo.nameOrBusinessName",
          currentProperty.ownerBillingInfo?.nameOrBusinessName
        );
        setValue(
          "ownerBillingInfo.taxId",
          currentProperty.ownerBillingInfo?.taxId
        );
        setValue(
          "ownerBillingInfo.billingAddress",
          currentProperty.ownerBillingInfo?.billingAddress
        );
        setValue(
          "ownerBillingInfo.email",
          currentProperty.ownerBillingInfo?.email
        );
        setValue(
          "ownerBillingInfo.phoneNumber",
          currentProperty.ownerBillingInfo?.phoneNumber
        );
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

  useEffect(() => {
    loadUrbanizations();
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
    { key: "house", value: "Casa" },
    { key: "apartment", value: "Apartamento" },
    { key: "studio", value: "Estudio" },
    { key: "duplex", value: "Dúplex" },
    { key: "townhouse", value: "Casa adosada" },
    { key: "penthouse", value: "Ático" },
    { key: "villa", value: "Villa" },
    { key: "flat", value: "Piso" },
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
              <option key={type.key} value={type.key}>
                {type.value}
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
        <div className="w-full bg-white shadow-md rounded-lg">
          <AccordionItem title="Residentes">
            <div className="flex flex-col w-full lg:w-1/2">
              {fields.map((resident, index) => (
                <div
                  key={resident.id}
                  className="flex flex-wrap gap-4 mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex flex-col w-full">
                    <label htmlFor="name" className="font-normal text-md mb-1">
                      Nombre del residente:
                    </label>
                    <input
                      type="text"
                      {...register(`residents.${index}.name`)}
                      className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                      placeholder="Nombre"
                    />
                    <p className="text-red-500 font-normal text-sm mt-1">
                      {errors.residents?.[index]?.name?.message}
                    </p>
                    <label
                      htmlFor="subname"
                      className="font-normal text-md mb-1"
                    >
                      Apellidos del residente:
                    </label>
                    <input
                      type="text"
                      {...register(`residents.${index}.subname`)}
                      className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                      placeholder="Apellido"
                    />
                    <p className="text-red-500 font-normal text-sm mt-1">
                      {errors.residents?.[index]?.subname?.message}
                    </p>
                    <label
                      htmlFor="identification"
                      className="font-normal text-md mb-1"
                    >
                      Identificación del residente:
                    </label>
                    <input
                      type="text"
                      {...register(`residents.${index}.identification`)}
                      className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                      placeholder="Identificación"
                    />
                    <p className="text-red-500 font-normal text-sm mt-1">
                      {errors.residents?.[index]?.identification?.message}
                    </p>
                    <label htmlFor="email" className="font-normal text-md mb-1">
                      Correo del residente:
                    </label>
                    <input
                      type="email"
                      {...register(`residents.${index}.email`)}
                      className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                      placeholder="Email"
                    />
                    <p className="text-red-500 font-normal text-sm mt-1">
                      {errors.residents?.[index]?.email?.message}
                    </p>
                    <label
                      htmlFor="phoneNumber"
                      className="font-normal text-md mb-1"
                    >
                      Teléfono del residente:
                    </label>
                    <input
                      type="text"
                      {...register(`residents.${index}.phoneNumber`)}
                      className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                      placeholder="Teléfono"
                    />
                    <p className="text-red-500 font-normal text-sm mt-1">
                      {errors.residents?.[index]?.phoneNumber?.message}
                    </p>
                    <label
                      htmlFor="emergencyContact"
                      className="font-normal text-md mb-1"
                    >
                      Contacto de emergencia:
                    </label>
                    <input
                      type="text"
                      {...register(`residents.${index}.emergencyContact`)}
                      className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                      placeholder="Contacto de emergencia"
                    />
                    <p className="text-red-500 font-normal text-sm mt-1">
                      {errors.residents?.[index]?.emergencyContact?.message}
                    </p>
                    <label htmlFor="notes" className="font-normal text-md mb-1">
                      Notas:
                    </label>
                    <textarea
                      {...register(`residents.${index}.notes`)}
                      className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
                      placeholder="Notas"
                    />
                    <p className="text-red-500 font-normal text-sm mt-1">
                      {errors.residents?.[index]?.notes?.message}
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
                onClick={() =>
                  append({
                    name: "",
                    subname: "",
                    identification: "",
                    email: "",
                    phoneNumber: "",
                    emergencyContact: "",
                    notes: "",
                  })
                }
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 flex items-center"
              >
                <LuCirclePlus className="mr-2" />
                Agregar Residente
              </button>
            </div>
          </AccordionItem>
          <AccordionItem title="Facturación">
            <p>Listado de facturas</p>
          </AccordionItem>
          <AccordionItem title="Información de facturación">
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="flex items-center mb-1">
                <input
                  id="electronicInvoiceEnabled"
                  type="checkbox"
                  {...register("electronicInvoiceEnabled")}
                  className="mr-2"
                />
                <label
                  htmlFor="electronicInvoiceEnabled"
                  className="font-normal text-md"
                >
                  Factura electrónica
                </label>
              </div>
            </div>
            {watch("electronicInvoiceEnabled") && (
              <div>
                <div className="flex flex-col w-full lg:w-1/2">
                  <label
                    htmlFor="nameOrBusinessName"
                    className="font-normal text-md mb-1"
                  >
                    Nombre o razón social:
                  </label>
                  <input
                    id="nameOrBusinessName"
                    type="text"
                    {...register("ownerBillingInfo.nameOrBusinessName")}
                    className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
                    placeholder="Nombre o razón social"
                  />
                  <p className="text-red-500 font-normal text-sm mb-2">
                    {errors.ownerBillingInfo?.nameOrBusinessName?.message}
                  </p>
                </div>

                <div className="flex flex-col w-full lg:w-1/2">
                  <label htmlFor="taxId" className="font-normal text-md mb-1">
                    ID Fiscal:
                  </label>
                  <input
                    id="taxId"
                    type="text"
                    {...register("ownerBillingInfo.taxId")}
                    className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
                    placeholder="ID Fiscal"
                  />
                  <p className="text-red-500 font-normal text-sm mb-2">
                    {errors.ownerBillingInfo?.taxId?.message}
                  </p>
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                  <label
                    htmlFor="billingAddress"
                    className="font-normal text-md mb-1"
                  >
                    Dirección de facturación:
                  </label>
                  <input
                    id="billingAddress"
                    type="text"
                    {...register("ownerBillingInfo.billingAddress")}
                    className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
                    placeholder="Dirección de facturación"
                  />
                  <p className="text-red-500 font-normal text-sm mb-2">
                    {errors.ownerBillingInfo?.billingAddress?.message}
                  </p>
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                  <label htmlFor="email" className="font-normal text-md mb-1">
                    Correo electrónico:
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("ownerBillingInfo.email")}
                    className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
                    placeholder="Correo electrónico"
                  />
                  <p className="text-red-500 font-normal text-sm mb-2">
                    {errors.ownerBillingInfo?.email?.message}
                  </p>
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                  <label
                    htmlFor="phoneNumber"
                    className="font-normal text-md mb-1"
                  >
                    Teléfono:
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    {...register("ownerBillingInfo.phoneNumber")}
                    className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
                    placeholder="Teléfono"
                  />
                  <p className="text-red-500 font-normal text-sm mb-2">
                    {errors.ownerBillingInfo?.phoneNumber?.message}
                  </p>
                </div>
              </div>
            )}
          </AccordionItem>
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
