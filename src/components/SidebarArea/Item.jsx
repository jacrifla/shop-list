import React, { useState } from "react";
import { toggleCheck } from "../../services/itemListService";

function Item({ id, label, checked }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = async () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);

    try {
      await toggleCheck(id, newCheckedStatus);
    } catch (error) {
      // Volta o estado do checkbox em caso de erro
      setIsChecked((prevChecked) => !prevChecked);
    }
  };

  return (
    <li
      className={`p-2 border rounded bg-white shadow-sm ${
        isChecked ? "line-through" : ""
      }`}
    >
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </li>
  );
}

export default Item;
