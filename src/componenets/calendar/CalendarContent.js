import React from 'react';
import axios from 'axios';
import sampleSchedule from '../../resources/data.json';
import './CalendarContent.css';

class CalendarContent extends React.Component {
    state = {
        calColCnt: 7,
        calRowCnt: 5,
        calLength: 35,
        days: [ '일', '월', '화', '수', '목', '금', '토' ],
        isLoading: true,
        schedules: []
    }

    constructor(props) {
        super(props);
    }

    clickDate = () => {
    }

    getSchedules = () => {
        const schedules = sampleSchedule;

        this.setState({ schedules, isLoading: false });
    }

    getSchedule = (dateObj) => {
        return this.state.schedules.map(
            (item, idx) => {
                let ymdArr = item.date.split("-");
                let year = ymdArr[0] * 1;
                let month = ymdArr[1] * 1;
                let date = ymdArr[2] * 1;

                return (
                    (year === dateObj.getFullYear() && month === dateObj.getMonth() + 1 && date === dateObj.getDate()) ? item.event : ""
                );
            }
        )
    }

    renderHeader = () => {
        let headerCells = [];

        this.state.days.forEach(
            (day, idx) => {
                headerCells.push(
                    <th key={idx}>{day}</th>
                );
            }
        )

        return (
            <tr id="c_header">
                {headerCells}
            </tr>
        );
    };

    renderContent = () => {
        console.log("render Content", this.props);
        const today = new Date();
        const dateObj = new Date(this.props.year, this.props.month, 1);
        const strDay = dateObj.getDay();

        let calRows = [];
        let tempDateObj;

        for (let i = 0; i < this.state.calRowCnt; i++) {
            calRows.push(
                <tr id="c_content" key={i}>
                    {
                        Array(7).fill(0).map(
                            (item, idx) => {
                                let cellIdx = this.state.calColCnt * i + idx;
                                let date;

                                if (cellIdx <= strDay) {
                                    tempDateObj = new Date(dateObj.getTime());
                                    tempDateObj.setDate(dateObj.getDate() - (strDay - cellIdx));
                                }
                                else {
                                    tempDateObj.setDate(tempDateObj.getDate() + 1);
                                }

                                
                                date = tempDateObj.getDate();

                                return (
                                    <td key={cellIdx} 
                                        className={(tempDateObj.getFullYear() === today.getFullYear() && tempDateObj.getMonth() === today.getMonth() && tempDateObj.getDate() === today.getDate()) ? "today" : ""}
                                    >
                                        <div className="date" onClick={this.clickDate}>
                                            {date}
                                        </div>              
                                        <div className="schedule">
                                            {this.getSchedule(tempDateObj)}
                                        </div>
                                    </td>
                                );
                            }
                        )
                    }
                </tr>
            );
        }

        return calRows;
    };
    
    componentDidMount() {
        this.getSchedules();
    }

    render() {
        return (
            <div id="calendar_content">
                <table>
                    <tbody>
                        {this.renderHeader()}
                        {this.renderContent()}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default CalendarContent;