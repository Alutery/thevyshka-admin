import React, {useEffect} from 'react';

const CategorySelect = ({options, onSelect}) => {
    const handleSelectClick = function (event) {
        const self = event.target;

        if (!self.classList.contains('selected')) {
            onSelect(self.dataset.value);
        }
    };

    const closeDropdown = (event) => {
        const select = document.getElementById('category-select');
        if (!select.contains(event.target)) {
            select.classList.remove('open');
        }
    };

    useEffect(() => {
        window.addEventListener('click', closeDropdown);
        return () => window.removeEventListener('click', closeDropdown);
    }, []);

    return (
        <div className="category-select-wrapper"
             onClick={() => document.getElementById('category-select').classList.toggle('open')}>
            <div className="category-select" id="category-select">
                <div className="category-select__trigger"><span>Список рубрик:</span>
                    <div className="arrow"/>
                </div>
                <div className="category-options" onClick={handleSelectClick}>
                    {
                        options.map(option => (
                            <span
                                key={option.id}
                                className={"category-option"}
                                data-value={option.id}
                            >
                                {option.name}
                            </span>))
                    }
                </div>
            </div>
        </div>
    );
};

export default CategorySelect;