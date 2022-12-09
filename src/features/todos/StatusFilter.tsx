import React from "react";


export type Option = {
    value: string,
    label: string,
    checked: boolean,
}

export type Filter = {
    id: string,
    options: Option[],
}

type Props = {
    filter: Filter,
    clickHandler: (value: string) => void
}


const StatusFilter = ({ filter, clickHandler }: Props) => {
    return (
        <div key={filter.id} className="border-t border-gray-200 px-4 py-6">
            <>
                <div className="space-y-6">
                    {filter.options.map((option, optionId) => (
                        <div key={option.value} className="flex items-center">
                            <button type="button" onClick={() => clickHandler(option.value)}>
                                <input
                                    id={`filter-${filter.id}-${optionId}`}
                                    name={`${filter.id}[]`}
                                    defaultValue={option.value}
                                    type="radio"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor={`filter-${filter.id}-${optionId}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                    {option.label}
                                </label>
                            </button>
                        </div>
                    ))}
                </div>
            </>
        </div>
    )
}

export default StatusFilter