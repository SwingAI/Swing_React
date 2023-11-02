import React, { useMemo } from "react";
import { flexRender } from "@tanstack/react-table";

export default function UsersTableHeader({ header }) {
    const sortedUniqueValues = useMemo(
        () => Array.from(header.column.getFacetedUniqueValues().keys()).sort(),
        [header.column]
    );

    const onFilterChange = (value) => {
        if (value === "null") {
            header.column.setFilterValue(null);
        } else {
            header.column.setFilterValue(value);
        }
    };
  
    return (
        <th 
            key={header.id} 
            style={{ width: header.getSize() }} 
            onClick={header.column.getToggleSortingHandler()}
        >
            { header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
            )}

            { header.column.getCanFilter() 
                ? (
                    <select
                        onChange={({ currentTarget: { value } }) => onFilterChange(value)}
                    >
                        <option value="null">선택 안함</option>
                        {sortedUniqueValues.map((value) => (
                            <option key={value}>{value}</option>
                        ))}
                    </select>
                ) : null}
        </th>
        
    );
  }