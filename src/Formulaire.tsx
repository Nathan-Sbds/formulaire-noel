import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./components/validationSchema";
import Toggle from "./components/Toggle";
import NumberInput from "./components/NumberInput";

// Interface pour les valeurs du formulaire (ça aide à pas se tromper)
interface FormValues {
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  adultCount: number;
  adultNames: string[];
  hasChildren: boolean;
  childrenCount: number;
  message: string;
}

const Formulaire: React.FC = () => {
  const minDate = new Date("2025-12-15");
  const maxDate = new Date("2026-01-15");

  // Quelques états pour gérer les données dynamiques
  const [isActive, setIsActive] = useState<boolean>(false);
  const [adultCount, setAdultCount] = useState<number>(2);
  const [adultNames, setAdultNames] = useState<string[]>(Array(2).fill(""));
  const [hasChildren, setHasChildren] = useState<boolean>(false);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema), // Validation avec Yup (la vie est plus belle avec des règles ou pas ?)
    mode: "onBlur", // Validation au blur (parce que c'est plus sympa de pas avoir trop de rouge)
    defaultValues: {
      isActive: false,
      startDate: minDate,
      endDate: maxDate,
      adultCount: 2,
      adultNames: ["", ""],
      hasChildren: false,
      childrenCount: 0,
      message: "",
    },
  });

  // Mise à jour des noms d'adultes quand le nombre change
  useEffect(() => {
    const newAdultNames =
      adultCount > adultNames.length
        ? [...adultNames, ...Array(adultCount - adultNames.length).fill("")]
        : adultNames.slice(0, adultCount);
    setAdultNames(newAdultNames);
    setValue("adultNames", newAdultNames);
  }, [adultCount, adultNames, setValue]);

  const onSubmit = (data: FormValues) => {
    console.log("Données du formulaire:", data);
  };

  const formatDateForInput = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate(),
    ).padStart(2, "0")}`;

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toggle
          label="Je viens pour noël !"
          checked={isActive}
          onChange={() => {
            setIsActive(!isActive); // Inverse l'état
            setValue("isActive", !isActive); // Met à jour le formulaire
          }}
        />
        {isActive && (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm">De :</label>
                <input
                  type="date"
                  {...register("startDate")}
                  min={formatDateForInput(minDate)}
                  max={formatDateForInput(maxDate)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">à :</label>
                <input
                  type="date"
                  {...register("endDate")}
                  min={formatDateForInput(minDate)}
                  max={formatDateForInput(maxDate)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.endDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.endDate.message}{" "}
                    {/* Affiche une erreur si la date est invalide, c'est mieux */}
                  </p>
                )}
              </div>
            </div>

            <NumberInput
              label="Nombre d'adultes :"
              value={adultCount}
              onChange={(val) => {
                setAdultCount(val); // Met à jour le nombre d'adultes
                setValue("adultCount", val); // Met à jour le formulaire
              }}
              min={1} // Minimum 1 adulte (ça parrait logique ^^)
              max={10} // Maximum 10 adultes (pour pas que ça parte en cacahuète ^^)
            />

            <div className="mb-4 grid grid-cols-2 gap-4">
              {adultNames.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Prénom n°${index + 1}`} // Placeholder pour le prénom (c'est son nom, pas un numéro de série !)
                  {...register(`adultNames.${index}` as const)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  onChange={(e) => {
                    const newNames = [...adultNames];
                    newNames[index] = e.target.value;
                    setAdultNames(newNames);
                  }}
                />
              ))}
            </div>

            <Toggle
              label="J'ai des pitchounes !" // Tout ca pour les enfants, de vrais petits monstres
              checked={hasChildren}
              onChange={() => {
                setHasChildren(!hasChildren);
                setValue("hasChildren", !hasChildren);
              }}
            />
            {hasChildren && (
              <NumberInput
                label="Nombre d'enfants :"
                value={childrenCount}
                onChange={(val) => {
                  setChildrenCount(val);
                  setValue("childrenCount", val);
                }}
                min={0} // Minimum 0 enfant (ca parrait logique ^^)
                max={10} // Maximum 10 enfants (parce que bon on va pas faire une crèche non plus ^^)
              />
            )}

            <div className="mb-4">
              <label className="mb-2 block">
                Tu vois quelque chose à ajouter ? {/* Dis moi tes secrets ^^ */}
              </label>
              <textarea
                {...register("message")}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                rows={4}
                placeholder="Écris ici 😊"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
              >
                Confirmer les dates et les participants{" "}
                {/* On valide tout ca et c'ets parti pour la fête ! */}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Formulaire;
