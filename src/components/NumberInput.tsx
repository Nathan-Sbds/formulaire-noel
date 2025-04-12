import React from "react";

// Les ingrédients pour ce gateau au react :
interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

// Un composant qui fait des maths niveau CP (ajouter/soustraire)
const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 0, // On commence à 0 (logique)
  max = 44, // Et on s'arrête à 100 (parce que c'est joli les ref F1)
}) => (
  <div className="mb-4">
    {label && <label className="mb-1 block text-sm">{label}</label>}
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => value > min && onChange(value - 1)} // Pas en dessous du minimum, hein !
        className="rounded-l-md border border-gray-300 bg-gray-100 px-3 py-1 text-xl font-semibold text-gray-700 hover:bg-gray-200"
      >
        −
      </button>
      <div className="w-12 border-t border-b border-gray-300 py-1 text-center">
        {value}
      </div>
      <button
        type="button"
        onClick={() => value < max && onChange(value + 1)} // Pas au-dessus du max, on reste raisonnable
        className="rounded-r-md border border-gray-300 bg-gray-100 px-3 py-1 text-xl font-semibold text-gray-700 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  </div>
);

export default NumberInput;
