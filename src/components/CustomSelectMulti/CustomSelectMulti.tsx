import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

import ArrowDropDownIcon from "../../assets/select-arrow.svg?react";
import CustomCheckboxImage from "../../assets/customCheckbox.svg";

// Option type definition
interface Option {
  name: string;
  id: number;
}

// Custom arrow icon
const CustomArrow = styled(({ className }: { className: string }) => (
  <div className={className}>
    <ArrowDropDownIcon />
  </div>
))(() => ({
  position: "absolute",
  top: "15px",
  right: "10px",
  width: "18px",
  height: "18px",
  background: "white",
  transform: "rotate(0deg)",
  transition: "transform 0.2s ease-in-out",
  "&.MuiSelect-iconOpen": {
    transform: "rotate(180deg)",
  },
}));

// Custom checkbox
const CustomCheckbox = ({ checked }: { checked: boolean }) => (
  <div
    style={{
      border: "1px solid rgba(0, 0, 0, 0.3)",
      borderRadius: "4px",
      width: "20px",
      height: "20px",
    }}
  >
    <img
      src={CustomCheckboxImage}
      alt="checkbox"
      style={{
        width: "20px",
        height: "20px",
        opacity: checked ? 1 : 0,
        marginRight: "8px",
      }}
    />
  </div>
);

// Dropdown height styling
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectCheckmarksProps {
  options: Option[];
  onChange: (values: string[]) => void;
  defaultValue: string;
  label?:string;
  editable?:boolean
  value: string[];                     // <-- required  
}

export default function MultipleSelectCheckmarks({
  options,
  onChange,
  defaultValue,

}: MultipleSelectCheckmarksProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    defaultValue ? [defaultValue] : []
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;

    const newValue = typeof value === "string" ? value.split(",") : value;
    setSelectedValues(newValue);
    onChange(newValue);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={
          <OutlinedInput
            sx={{
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#35cdfd",
              },
              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: "#35cdfd",
              },
            }}
          />
        }
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        IconComponent={CustomArrow}
      >
        {options.length === 0 ? (
          <MenuItem disabled>No options available</MenuItem>
        ) : (
          options.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              <CustomCheckbox checked={selectedValues.includes(item.name)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
