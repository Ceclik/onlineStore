import React, {useContext, useEffect, useState} from "react";
import {Dropdown, FormControl} from "react-bootstrap";
import {searchProducersByName} from "../../http/productAPI";
import {debounce} from "lodash";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ProducerDropdown = observer(({onSelect}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [producers, setProducers] = useState([]);
    const [filteredProducers, setFilteredProducers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedProducer, setSelectedProducer] = useState(null);

    const fetchProducers = debounce(async (query) => {
        if (query.trim() === "") {
            setProducers([]);
            return;
        }

        try {
            const result = await searchProducersByName(query);
            setProducers(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error("Ошибка загрузки производителей:", error);
            setProducers([]);
        }
    }, 300);

    useEffect(() => {
        fetchProducers(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        setFilteredProducers(
            Array.isArray(producers)
                ? producers.filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                : []
        );
    }, [producers, searchTerm]);

    const handleSelect = (producer) => {
        setSelectedProducer(producer);
        onSelect(producer);
        setIsDropdownOpen(false);
    };

    return (
        <Dropdown className={"mt-2 mb-2"} show={isDropdownOpen} onToggle={(isOpen) => setIsDropdownOpen(isOpen)}>
            <Dropdown.Toggle variant="secondary">
                {selectedProducer ? selectedProducer.name : 'Выберите производителя'}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight: "200px", overflowY: "auto"}}>
                <FormControl
                    autoFocus
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                />
                {filteredProducers.length > 0 ? (
                    filteredProducers.map((producer) => (
                        <Dropdown.Item key={producer.id} onClick={() => handleSelect(producer)}>
                            {producer.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>Ничего не найдено</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default ProducerDropdown;
