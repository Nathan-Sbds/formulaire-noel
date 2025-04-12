import * as yup from "yup";

// Schéma de validation pour le formulaire (parce qu'on aime les règles dans la vie)
const schema = yup.object().shape({
  isActive: yup.boolean(),
  startDate: yup.date().nullable(), // Date de début (peut être null parce que la vie est pleine de surprises)
  endDate: yup
    .date()
    .nullable()
    .when("startDate", (startDate: any, schema: any) =>
      startDate && startDate[0]
        ? schema.min(
            startDate[0],
            "La date de fin doit être postérieure à la date de début", // Bah ouais logique...
          )
        : schema,
    ),
  adultCount: yup.number().min(1, "Au moins 1 adulte requis"), // Pas de groupe sans adulte sinon c'est le chaos
  adultNames: yup.array().of(yup.string()),
  hasChildren: yup.boolean(),
  childrenCount: yup.number().when("hasChildren", {
    is: true,
    then: (schema: any) => schema.min(0), // Si enfants, alors au moins 0 (logique quoi)
  }),
  message: yup.string(),
});

export default schema;
