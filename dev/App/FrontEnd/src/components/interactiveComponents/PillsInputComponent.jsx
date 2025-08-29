import React, { useState } from 'react';
import {
    PillsInput,
    Pill,
    Combobox,
    Group,
    useCombobox,
    CheckIcon,
} from '@mantine/core';
import PropTypes from 'prop-types';



const PillsInputComponent = ({ value = [], onChange, options = [] }) => {

    // use options instead of hardcoded list
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState('');

    const handleSelect = (val) => {
        const updated = value.includes(val)
            ? value.filter((v) => v !== val)
            : [...value, val];
        onChange(updated);
        setSearch('');
        combobox.closeDropdown();
    };

    const handleRemove = (val) => {
        onChange(value.filter((v) => v !== val));
    };

    const pills = value.map((item) => (
        <Pill key={item} withRemoveButton onRemove={() => handleRemove(item)}>
            {item}
        </Pill>
    ));

    const filteredOptions = options
        .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
        .map((item) => (
            <Combobox.Option
                value={item}
                key={item}
                active={value.includes(item)}

            >
                <Group gap="sm">
                    {value.includes(item) ? <CheckIcon size={12} /> : null}
                    <span>{item}</span>
                </Group>
            </Combobox.Option>
        ));

    return (
        <div className="w-full text-white">

            <label className="block mb-2 font-medium">Stat Boost</label>
            <p className="text-sm text-gray-400 mb-2">
                Which trait will this quest strengthen?
            </p>
            <Combobox store={combobox} onOptionSubmit={handleSelect}>
                <Combobox.DropdownTarget
                    styles={{
                        root: {
                            backgroundColor: 'red',
                            border: "0.25px solid red",
                            overFlow: 'scroll',
                            maxHeight: "50px"
                        }
                    }}>
                    <PillsInput
                        styles={{
                            field: {
                                maxHeight: '10px'
                            },
                            input: {
                                backgroundColor: '#00000050',
                                border: "0.25px solid #228be650"
                            },
                            dropdown: {
                                backgroundColor: 'red',
                                border: "0.25px solid #228be650",
                                overFlow: 'scroll',
                                maxHeight: "50px"
                            },
                        }}
                        onClick={() => combobox.openDropdown()}>
                        <Pill.Group>
                            {pills}
                            <Combobox.EventsTarget>
                                <PillsInput.Field
                                    value={search}
                                    onFocus={() => combobox.openDropdown()}
                                    onBlur={() => combobox.closeDropdown()}
                                    placeholder="Search traits"
                                    onChange={(event) => {
                                        combobox.updateSelectedOptionIndex();
                                        setSearch(event.currentTarget.value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === 'Backspace' &&
                                            search.length === 0 &&
                                            value.length > 0
                                        ) {
                                            event.preventDefault();
                                            handleRemove(value[value.length - 1]);
                                        }
                                    }}
                                />
                            </Combobox.EventsTarget>
                        </Pill.Group>
                    </PillsInput>
                </Combobox.DropdownTarget>

                <Combobox.Dropdown
                    style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    <Combobox.Options>
                        {filteredOptions.length > 0 ? filteredOptions : <Combobox.Empty>Nothing found...</Combobox.Empty>}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </div>
    );
};


PillsInputComponent.propTypes = {
    value: PropTypes.array,
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};

export default PillsInputComponent;
