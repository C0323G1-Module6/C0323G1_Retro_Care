import "antd/dist/reset.css";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
export function SelectBox({ options, name, onChange }) {
    const [optionSelected, setSelectedOptions] = useState([]);

    const handleChange = (selected) => {
      onChange({ name, category: selected.value });
      //console.log(selected)
      setSelectedOptions(selected);
    };
    return (
        <Select
            options={options}
            isLoading={!options}
            closeMenuOnSelect={true}
            onChange={handleChange}
            value={optionSelected}
            name={name}
        />
    );
}