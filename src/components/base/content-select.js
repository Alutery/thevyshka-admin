import React, {useEffect} from 'react';

const ContentSelect = ({options, onChangeSelect, current}) => {
    const handleSelectClick = function (event) {
        const self = event.target;

        if (!self.classList.contains('selected')) {
            onChangeSelect(self.dataset.value);
        }
    };

    const closeDropdown = (event) => {
        const select = document.querySelector('.custom-select');
        if (!select.contains(event.target)) {
            select.classList.remove('open');
        }
    };

    useEffect(() => {
        window.addEventListener('click', closeDropdown);
        return () => window.removeEventListener('click', closeDropdown);
    }, []);

    return (
        <div className="custom-select-wrapper"
             onClick={() => document.querySelector('.custom-select').classList.toggle('open')}>
            <div className="custom-select">
                <div className="custom-select__trigger"><span>{options.find(option => option.value === current).name}</span>
                    <div className="arrow"/>
                </div>
                <div className="custom-options" onClick={handleSelectClick}>
                    {
                        options.map(option => (
                            <span
                                key={option.key}
                                className={option.value === current ? "custom-option selected" : "custom-option"}
                                data-value={option.value}>
                                {option.name}
                            </span>))
                    }
                </div>
            </div>
        </div>
    );
};

export default ContentSelect;