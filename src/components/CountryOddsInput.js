import React from 'react';

export default function CountryOddsInput(props) {
    const { name, data, setBetTeams } = props;
    function handleClick(event) {
        const teamName = event.target.getAttribute('data-country');
        setBetTeams(teamName, event.target.checked);
    }

    function handleBetInputChange(event) {
        console.log(event.target.value);
    }
    return (
        <>
            <div>
                <label htmlFor={name}>{data.zh_tw}：</label>
                <input
                    className="me-2"
                    id={name}
                    type="text"
                    value={data.odds}
                    readOnly
                    size="10"
                />
                <input
                    type="checkbox"
                    data-country={name}
                    onClick={handleClick}
                ></input>
            </div>
        </>
    );
}
