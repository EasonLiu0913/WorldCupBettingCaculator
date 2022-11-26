import { useEffect, useState } from 'react';
import './App.css';
import CountryOddsInput from './components/CountryOddsInput';
import BetInput from './components/BetInput';

function App() {
    const [countryData, setCountryData] = useState({
        Brazil: {
            zh_tw: '巴西',
            odds: '2.75',
        },
        France: {
            zh_tw: '法國',
            odds: '6.00',
        },
        Spain: {
            zh_tw: '西班牙',
            odds: '6.00',
        },
        Argentina: {
            zh_tw: '阿根廷',
            odds: '7.25',
        },
        England: {
            zh_tw: '英格蘭',
            odds: '7.50',
        },
        Portugal: {
            zh_tw: '葡萄牙',
            odds: '10.50',
        },
        Netherlands: {
            zh_tw: '荷蘭',
            odds: '12.00',
        },
        Belgium: {
            zh_tw: '比利時',
            odds: '18.00',
        },
        Germany: {
            zh_tw: '德國',
            odds: '22.00',
        },
        Denmark: {
            zh_tw: '丹麥',
            odds: '38.00',
        },
        Uruguay: {
            zh_tw: '烏拉圭',
            odds: '40.00',
        },
        Japan: {
            zh_tw: '日本',
            odds: '65.00',
        },
        Croatia: {
            zh_tw: '克羅埃西亞',
            odds: '75.00',
        },
        Switzerland: {
            zh_tw: '瑞士',
            odds: '75.00',
        },
        Ecuador: {
            zh_tw: '厄瓜多',
            odds: '75.00',
        },
        Mexico: {
            zh_tw: '墨西哥',
            odds: '80.00',
        },
        Serbia: {
            zh_tw: '塞爾維亞',
            odds: '100.00',
        },
        Senegal: {
            zh_tw: '塞內加爾',
            odds: '120.00',
        },
        USA: {
            zh_tw: '美國',
            odds: '150.00',
        },
        Poland: {
            zh_tw: '波蘭',
            odds: '150.00',
        },
        Canada: {
            zh_tw: '加拿大',
            odds: '150.00',
        },
        Morocco: {
            zh_tw: '摩洛哥',
            odds: '150.00',
        },
        'South Korea': {
            zh_tw: '南韓',
            odds: '200.00',
        },
        'Saudi Arabia': {
            zh_tw: '沙烏地阿拉伯',
            odds: '200.00',
        },
        Ghana: {
            zh_tw: '迦納',
            odds: '275.00',
        },
        Iran: {
            zh_tw: '伊朗',
            odds: '275.00',
        },
        Australia: {
            zh_tw: '澳洲',
            odds: '400.00',
        },
        Tunisia: {
            zh_tw: '突尼西亞',
            odds: '400.00',
        },
        Cameroon: {
            zh_tw: '喀麥隆',
            odds: '600.00',
        },
        Wales: {
            zh_tw: '威爾斯',
            odds: '800.00',
        },
        'Costa Rica': {
            zh_tw: '哥斯大黎加',
            odds: '1000.00',
        },
        Qatar: {
            zh_tw: '卡達',
            odds: '',
        },
    });

    const [betTeams, setBetTeams] = useState([]);
    const [betTeamsIndex, setBetTeamsIndex] = useState({});
    const [totalBetAmount, setTotalBetAmount] = useState(0);

    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch('http://localhost:3001/getData');
    //         const json = await res.json();
    //         // console.log('json', json[0].ms[0].cs);
    //         const oddsArray = json[0].ms[0].cs[0];
    //         console.log('oddsArray', oddsArray);

    //         const newDataObj = {};
    //         for (let item of oddsArray) {
    //             console.log('item', item);
    //             newDataObj[item.name[1]] = {
    //                 zh_tw: item.name[0],
    //                 odds: item.o,
    //             };
    //         }

    //         console.log('newDataObj', newDataObj);
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
    }, [betTeams]);

    function handleBetValueChange(newValue) {
        const newBetTeamsData = [...betTeams];
        const teamIndex = betTeamsIndex[newValue.name];
        newBetTeamsData[teamIndex].value = newValue.value;
        setBetTeams(newBetTeamsData);
    }

    function handleCheckbox(teamName, isChecked) {
        console.log(teamName);
        const newTeams = [...betTeams];
        const teamIndex = betTeamsIndex[teamName];

        if (isChecked) {
            newTeams.push({
                teamName,
                value: 1000,
            });
        } else {
            newTeams.splice(teamIndex, 1);
        }

        setBetTeams(newTeams);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-4 text-end" style={{ minWidth: '330px' }}>
                    <h2>各球隊冠軍賠率</h2>
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
                                        betTeams={betTeams}
                                        setBetTeams={(teamName, isChecked) =>
                                            handleCheckbox(teamName, isChecked)
                                        }
                                    />
                                );
                            })}
                    </form>
                </div>
                <div className="col-6 offset-1">
                    <h2>投注金額試算</h2>
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
