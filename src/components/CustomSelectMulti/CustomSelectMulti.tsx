import * as React from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

import ArrowDropDownIcon from "../../assets/select-arrow.svg?react";
import CustomCheckboxImage from "../../assets/custom-checkbox.svg";

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

const CustomArrow = styled(({ className }: { className: string }) => (
  <div
    className={className}
    style={{ background: "white", top: "15px", right: "10px", height: "18px" }}
  >
    <ArrowDropDownIcon />
  </div>
))(() => ({
  transform: "rotate(0deg)",
  transition: "transform 0.2s ease-in-out",
  "&.MuiSelect-iconOpen": {
    transform: "rotate(180deg)",
  },
}));

interface MultipleSelectCheckmarksProps {
  options: Option[];
  onChange: (values: string[]) => void;
  defaultValue: string;
}

const CustomCheckbox = ({ checked }: { checked: boolean }) => (
  <div
    style={{
      border: "1px solid rgba(0, 0, 0, 0.3)",
      borderRadius: " 4px",
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

export default function MultipleSelectCheckmarks({
  options,
  onChange,
  defaultValue,
}: MultipleSelectCheckmarksProps) {
  const [companyType, setCompanyType] = React.useState<string[]>([
    defaultValue,
  ]);

  const handleChange = (event: SelectChangeEvent<typeof companyType>) => {
    const {
      target: { value },
    } = event;

    onChange(value as string[]);
    setCompanyType(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={companyType}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#35cdfd;",
                },
                "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#35cdfd;",
                },
              }}
            />
          }
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          IconComponent={CustomArrow}
        >
          {options
            .map((item) => item.name)
            .map((name) => (
              <MenuItem key={name} value={name}>
                <CustomCheckbox checked={companyType.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
