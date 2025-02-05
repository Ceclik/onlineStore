import React, {useEffect, useState} from "react";
import {Dropdown, FormControl} from "react-bootstrap";
import {searchTypesByName} from "../../http/productAPI";
import {debounce} from "lodash";
import {observer} from "mobx-react-lite";

const TypeDropdown = observer(({onSelect}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [Types, setTypes] = useState([]);
    const [filteredTypes, setFilteredTypes] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const fetchTypes = debounce(async (query) => {
        if (query.trim() === "") {
            setTypes([]);
            return;
        }

        try {
            const result = await searchTypesByName(query);
            setTypes(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error("Ошибка загрузки типов:", error);
            setTypes([]);
        }
    }, 300);

    useEffect(() => {
        fetchTypes(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        setFilteredTypes(
            Array.isArray(Types)
                ? Types.filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                : []
        );
    }, [Types, searchTerm]);

    const handleSelect = (type) => {
        setSelectedType(type);
        onSelect(type);
        setIsDropdownOpen(false);
    };

    return (
        <Dropdown className={"mt-2 mb-2"} show={isDropdownOpen} onToggle={(isOpen) => setIsDropdownOpen(isOpen)}>
            <Dropdown.Toggle variant="secondary">
                {selectedType ? selectedType.name : 'Выберите тип'}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight: "200px", overflowY: "auto"}}>
                <FormControl
                    autoFocus
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                />
                {filteredTypes.length > 0 ? (
                    filteredTypes.map((type) => (
                        <Dropdown.Item key={type.id} onClick={() => handleSelect(type)}>
                            {type.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>Ничего не найдено</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default TypeDropdown;
