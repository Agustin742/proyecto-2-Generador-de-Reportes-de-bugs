import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { BugReport } from "../types";

interface ToneSelectorProps {
  register: UseFormRegister<BugReport>;
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({ register }) => {
  return (
    <div className="mb-4">
      <label htmlFor="tone" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
        Tono de Redacción [cite: 1054]
      </label>
      <select
        id="tone"
        {...register("tone")}
        className="w-full p-2 border rounded-md text-xs bg-white dark:bg-zinc-800 dark:text-white"
      >
        <option value="formal"> Formal [cite: 1054]</option>
        <option value="direct"> Directo [cite: 1054]</option>
        <option value="detailed"> Detallado [cite: 1054]</option>
      </select>
    </div>
  );
};