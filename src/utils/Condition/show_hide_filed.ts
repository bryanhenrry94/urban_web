// voy a crear una interfaz para poder usarla en el archivo de configuracion de los campos
export interface condition {
  if: string;
  state:
    | "equals"
    | "not_equals"
    | "contains"
    | "not_contains"
    | "starts_with"
    | "ends_with"
    | "not_starts_with"
    | "not_ends_with"
    | "is_empty"
    | "is_not_empty";
  target: "value" | "another_field";
  value: string;
}

export interface rules_match {
  rules_match: "any" | "all";
}

export interface Doit {
  do: "show" | "hide" | "multiple_hide" | "multiple_show";
  FIELD: string[];
}

// dame un json que contenga un array de condiciones y un array de acciones a realizar
export const actionJson = {
  conditions: [
    {
      if: "field1",
      state: "equals",
      target: "value",
      value: "value1",
    },
    {
      if: "field2",
      state: "not_equals",
      target: "another_field",
      value: "field3",
    },
  ],
  rules_match: "any",
  actions: [
    {
      do: "show",
      FIELD: ["field4"],
    },
    {
      do: "hide",
      FIELD: ["field5"],
    },
  ],
};
