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
                {dataCountry.zh_tw}, 賠率:{dataCountry.odds}
            </td>

            <td>
                <label>投注金額</label>
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
                獎金：
                <span className="winnings">${value * dataCountry.odds}</span>
            </td>

            <td>
                賺/賠：
                <span className="winlose">
                    {value * dataCountry.odds - totalBetAmount}
                </span>
            </td>
        </tr>
    );
}

BetInput.propTypes = {};

export default BetInput;
