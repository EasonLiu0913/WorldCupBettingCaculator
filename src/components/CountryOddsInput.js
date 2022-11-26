import React from 'react';

export default function CountryOddsInput(props) {
    const { name, data, setBetTeams, countryData } = props;
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
                <label htmlFor={name}>
                    <span>{data.zh_tw}</span>
                    <img
                        className="mx-2"
                        src={`https://countryflagsapi.com/png/${
                            name === 'South Korea'
                                ? 'The Republic Of Korea'
                                : name
                        }`}
                        alt=""
                        style={{ width: '30px' }}
                    />
                </label>

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
                    data-ischecked={countryData[name].isChecked}
                    checked={countryData[name].isChecked}
                    onChange={handleClick}
                ></input>
            </div>
        </>
    );
}
