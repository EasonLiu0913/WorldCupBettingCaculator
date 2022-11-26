import { useEffect, useState } from 'react';
import './App.css';
import CountryOddsInput from './components/CountryOddsInput';
import BetInput from './components/BetInput';
// betTeams.length > 0 && JSON.stringify(betTeams[0].isChecked);
function App() {
    const [countryData, setCountryData] = useState({
        Brazil: {
            zh_tw: '巴西',
            odds: '2.75',
            isChecked: false,
        },
        France: {
            zh_tw: '法國',
            odds: '6.00',
            isChecked: false,
        },
        Spain: {
            zh_tw: '西班牙',
            odds: '6.00',
            isChecked: false,
        },
        Argentina: {
            zh_tw: '阿根廷',
            odds: '7.25',
            isChecked: false,
        },
        England: {
            zh_tw: '英格蘭',
            odds: '7.50',
            isChecked: false,
        },
        Portugal: {
            zh_tw: '葡萄牙',
            odds: '10.50',
            isChecked: false,
        },
        Netherlands: {
            zh_tw: '荷蘭',
            odds: '12.00',
            isChecked: false,
        },
        Belgium: {
            zh_tw: '比利時',
            odds: '18.00',
            isChecked: false,
        },
        Germany: {
            zh_tw: '德國',
            odds: '22.00',
            isChecked: false,
        },
        Denmark: {
            zh_tw: '丹麥',
            odds: '38.00',
            isChecked: false,
        },
        Uruguay: {
            zh_tw: '烏拉圭',
            odds: '40.00',
            isChecked: false,
        },
        Japan: {
            zh_tw: '日本',
            odds: '65.00',
            isChecked: false,
        },
        Croatia: {
            zh_tw: '克羅埃西亞',
            odds: '75.00',
            isChecked: false,
        },
        Switzerland: {
            zh_tw: '瑞士',
            odds: '75.00',
            isChecked: false,
        },
        Ecuador: {
            zh_tw: '厄瓜多',
            odds: '75.00',
            isChecked: false,
        },
        Mexico: {
            zh_tw: '墨西哥',
            odds: '80.00',
            isChecked: false,
        },
        Serbia: {
            zh_tw: '塞爾維亞',
            odds: '100.00',
            isChecked: false,
        },
        Senegal: {
            zh_tw: '塞內加爾',
            odds: '120.00',
            isChecked: false,
        },
        USA: {
            zh_tw: '美國',
            odds: '150.00',
            isChecked: false,
        },
        Poland: {
            zh_tw: '波蘭',
            odds: '150.00',
            isChecked: false,
        },
        Canada: {
            zh_tw: '加拿大',
            odds: '150.00',
            isChecked: false,
        },
        Morocco: {
            zh_tw: '摩洛哥',
            odds: '150.00',
            isChecked: false,
        },
        'South Korea': {
            zh_tw: '南韓',
            odds: '200.00',
            isChecked: false,
        },
        'Saudi Arabia': {
            zh_tw: '沙烏地阿拉伯',
            odds: '200.00',
            isChecked: false,
        },
        Ghana: {
            zh_tw: '迦納',
            odds: '275.00',
            isChecked: false,
        },
        Iran: {
            zh_tw: '伊朗',
            odds: '275.00',
            isChecked: false,
        },
        Australia: {
            zh_tw: '澳洲',
            odds: '400.00',
            isChecked: false,
        },
        Tunisia: {
            zh_tw: '突尼西亞',
            odds: '400.00',
            isChecked: false,
        },
        Cameroon: {
            zh_tw: '喀麥隆',
            odds: '600.00',
            isChecked: false,
        },
        Wales: {
            zh_tw: '威爾斯',
            odds: '800.00',
            isChecked: false,
        },
        'Costa Rica': {
            zh_tw: '哥斯大黎加',
            odds: '1000.00',
            isChecked: false,
        },
        Qatar: {
            zh_tw: '卡達',
            odds: '',
            isChecked: false,
        },
    });

    const [betTeams, setBetTeams] = useState([]);
    const [betTeamsIndex, setBetTeamsIndex] = useState({});
    const [totalBetAmount, setTotalBetAmount] = useState(0);

    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch('http://localhost:3001/getData');
    //         const json = await res.json();
    //         const oddsArray = json[0].ms[0].cs[0];

    //         const newDataObj = {};
    //         for (let item of oddsArray) {
    //             console.log('item', item);
    //             newDataObj[item.name[1]] = {
    //                 zh_tw: item.name[0],
    //                 odds: item.o,
    //             };
    //         }
    //         setCountryData(newDataObj);
    //     }

    //     fetchData();
    //     return;
    // }, []);

    useEffect(() => {
        let newTotal = 0;
        const newBetTeamsIndex = { ...betTeamsIndex };
        betTeams.map((item, index) => {
            newBetTeamsIndex[item.teamName] = index;
            newTotal += +item.value;
        });
        setBetTeamsIndex(newBetTeamsIndex);
        setTotalBetAmount(newTotal);

        // console.log('isChecked', betTeams);
    }, [betTeams]);

    function handleBetValueChange(newValue) {
        const newBetTeamsData = [...betTeams];
        const teamIndex = betTeamsIndex[newValue.name];
        newBetTeamsData[teamIndex].value = newValue.value;
        setBetTeams(newBetTeamsData);
    }

    function handleCheckbox(teamName, isChecked) {
        const newTeams = [...betTeams];
        const teamIndex = betTeamsIndex[teamName];

        if (isChecked) {
            newTeams.push({
                teamName,
                value: 1000,
            });
            const newCountryData = { ...countryData };
            newCountryData[teamName].isChecked = true;
            setCountryData(newCountryData);
        } else {
            newTeams.splice(teamIndex, 1);

            const newCountryData = { ...countryData };
            newCountryData[teamName].isChecked = false;
            setCountryData(newCountryData);
        }

        setBetTeams(newTeams);
    }

    function handleBalance() {
        if (betTeams.length < 1) return;
        let totalAmount = 0;
        const bonusArray = [];
        const newBetTeams = [...betTeams];

        newBetTeams.forEach((item, index) => {
            bonusArray.push([
                item.teamName,
                countryData[item.teamName].odds * item.value,
                item.value,
                countryData[item.teamName].odds,
            ]);
            totalAmount += +item.value;
        });

        let tempTotalAmount = totalAmount;
        const minAmountTeams = [];
        let isNotTurnover = true;
        let isAddMinAmountTeams = false;
        function checkBalance() {
            let countryIndex = null;
            let countryValue = null;

            bonusArray.sort(function (a, b) {
                return b[1] - a[1];
            });

            if (bonusArray[0][2] === 150) {
                minAmountTeams.push(bonusArray.shift());
            }

            if (+totalAmount > +bonusArray[bonusArray.length - 1][1]) {
                if (isNotTurnover && bonusArray.length > 1) {
                    if (
                        bonusArray[0][2] > 150 &&
                        bonusArray[0][2] * bonusArray[0][3] - totalAmount >
                            50 * bonusArray[0][3]
                    ) {
                        bonusArray[0][2] = bonusArray[0][2] - 50;
                        bonusArray[0][1] = bonusArray[0][2] * bonusArray[0][3];
                        tempTotalAmount -= 50;
                        countryIndex = betTeamsIndex[bonusArray[0][0]];
                        countryValue = bonusArray[0][2];
                    } else {
                        minAmountTeams.push(bonusArray.shift());
                        isAddMinAmountTeams = true;
                    }
                } else {
                    isNotTurnover = !isNotTurnover;
                    bonusArray[bonusArray.length - 1][2] =
                        bonusArray[bonusArray.length - 1][2] + 50;
                    bonusArray[bonusArray.length - 1][1] =
                        bonusArray[bonusArray.length - 1][2] *
                        bonusArray[bonusArray.length - 1][3];
                    tempTotalAmount += 50;

                    countryIndex =
                        betTeamsIndex[bonusArray[bonusArray.length - 1][0]];
                    countryValue = bonusArray[bonusArray.length - 1][2];
                }
                if (isAddMinAmountTeams) {
                    isNotTurnover = false;
                    isAddMinAmountTeams = !isAddMinAmountTeams;
                }

                if (countryIndex != null) {
                    const newBetTeams = [...betTeams];
                    newBetTeams[countryIndex].value = countryValue;
                    setBetTeams(newBetTeams);
                }

                if (
                    (bonusArray.length === 1 && bonusArray[0][2] > 5000) ||
                    +totalAmount < +bonusArray[bonusArray.length - 1][1]
                ) {
                    alert('已盡力平衡投注金額');
                    return;
                }

                setTimeout(() => {
                    checkBalance();
                }, 50);
            } else {
                alert('賺賠金額已平衡');
            }
        }

        checkBalance();
    }

    function handleReset() {
        let newTotal = 0;
        const tempBetTeams = [...betTeams];
        tempBetTeams.forEach((item, index) => {
            item.value = 1000;
            newTotal += +item.value;
        });
        setBetTeams(tempBetTeams);
        setTotalBetAmount(newTotal);
    }

    function handleDel(countryName) {
        const newTeams = [...betTeams];
        const teamIndex = betTeamsIndex[countryName];
        newTeams.splice(teamIndex, 1);
        setBetTeams(newTeams);

        const newCountryData = { ...countryData };
        newCountryData[countryName].isChecked = false;
        setCountryData(newCountryData);
    }
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div
                    className="country-odds-area col-4 text-end mb-5"
                    style={{ minWidth: '330px' }}
                >
                    <h2 className="pe-4 pe-md-0">各球隊冠軍賠率</h2>
                    <div
                        className="text-end"
                        style={{ margin: '0 -12px 10px 0' }}
                    >
                        打勾選隊
                    </div>
                    <form id="worldcupOdds" action="">
                        {Object.entries(countryData).length > 0 &&
                            Object.entries(countryData).map((item) => {
                                return (
                                    <CountryOddsInput
                                        key={item[0]}
                                        name={item[0]}
                                        data={item[1]}
                                        countryData={countryData}
                                        betTeams={betTeams}
                                        setBetTeams={(teamName, isChecked) =>
                                            handleCheckbox(teamName, isChecked)
                                        }
                                    />
                                );
                            })}
                    </form>
                </div>
                <div className="col-12 col-md-6 offset-md-1">
                    <div className="d-flex">
                        <h2>投注金額試算</h2>{' '}
                        <button
                            href="#"
                            className="btn btn-outline-danger ms-3 mb-4"
                            onClick={handleBalance}
                        >
                            自動賺賠平衡
                        </button>
                        <button
                            href="#"
                            className="btn btn-outline-success ms-3 mb-4"
                            onClick={handleReset}
                        >
                            重置金額
                        </button>
                    </div>
                    <table id="betting" className="table table-bordered">
                        <tbody>
                            {betTeams &&
                                betTeams.length > 0 &&
                                betTeams.map((item) => (
                                    <BetInput
                                        key={item.teamName}
                                        name={item.teamName}
                                        value={item.value}
                                        setValue={(newValue) =>
                                            handleBetValueChange(newValue)
                                        }
                                        dataCountry={countryData[item.teamName]}
                                        totalBetAmount={totalBetAmount}
                                        delBetTeams={(countryName) =>
                                            handleDel(countryName)
                                        }
                                    />
                                ))}
                        </tbody>
                    </table>
                    <div>
                        <p>
                            總投入金額：
                            <span id="totalAmount">{totalBetAmount}</span>
                        </p>
                        <p>
                            投資期望值：<span id="expectationValue">0</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
