"use client";

// External packages.
import ReactSelect from "react-select";

interface SelectProps {
  value?: Record<string, any>;
  label: string;
  options: Record<string, any>[];
  disabled?: boolean;
  onChange?: (value: Record<string, any>) => void;
}

const Select: React.FC<SelectProps> = ({
  value,
  label,
  options,
  disabled,
  onChange,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          classNames={{ control: () => "text-sm" }}
        />
      </div>
    </div>
  );
};

export default Select;
