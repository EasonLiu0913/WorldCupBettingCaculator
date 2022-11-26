import React, { useState } from 'react';
import PropTypes from 'prop-types';

function BetInput(props) {
    const { name, dataCountry, value, setValue, totalBetAmount } = props;

    function handleClick(e) {
        switch (e.target.innerHTML) {
            case '-':
                setValue({ name, value: value - 100 });
                break;
            case '+':
                setValue({ name, value: value + 100 });
                break;
            default:
                break;
        }
    }

    return (
        <tr>
            <td className="m-0 country-odds">
                <p>{dataCountry.zh_tw}</p>
                <p className="mb-0">
                    {' '}
                    <span className="d-none d-sm-inline">賠率:</span>{' '}
                    {dataCountry.odds}
                </p>
            </td>

            <td>
                <p>投注金額</p>
                <button
                    className="bet-button px-2 py-0 border mx-2"
                    onClick={(e) => handleClick(e)}
                >
                    -
                </button>
                <input
                    className="bet-amount-input border"
                    type="text"
                    size="5"
                    value={value}
                    data-country={name}
                    readOnly
                />
                <button
                    className="bet-button px-2 py-0 border mx-2"
                    onClick={(e) => handleClick(e)}
                >
                    +
                </button>
            </td>

            <td>
                <p>獎金：</p>
                <span className="winnings">${value * dataCountry.odds}</span>
            </td>

            <td>
                <p>賺/賠：</p>
                <span className="winlose">
                    {value * dataCountry.odds - totalBetAmount}
                </span>
            </td>
        </tr>
    );
}

BetInput.propTypes = {};

export default BetInput;
