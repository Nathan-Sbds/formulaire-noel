import React from "react";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void; //Fonction aapelée quand ca change, logique c'ets son nom
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => (
  <div className="my-4 flex items-center">
    <div
      className={`relative inline-block h-6 w-12 rounded-full transition duration-200 ease-in-out ${
        checked ? "bg-teal-500" : "bg-gray-200"
      }`}
    >
      <label
        className="absolute left-0 h-full w-full cursor-pointer"
        htmlFor={`toggle-${label}`}
      ></label>
      <input
        id={`toggle-${label}`}
        type="checkbox"
        className="hidden" // Caché, mais toujours là; on aime pas les inputs visibles (ca fait film d'horreur un peu la)
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
    <span className="ml-3 text-gray-700">{label}</span>
  </div>
);

export default Toggle;
