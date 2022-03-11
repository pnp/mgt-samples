document.querySelector('mgt-agenda').templateContext = {
    dayFromDateTime: dateTimeString => {
        let date = new Date(dateTimeString);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        let monthIndex = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ' ' + year;
    },

    timeRangeFromEvent: (event, timeFormat) => {
        if (event.isAllDay) {
            return 'ALL DAY';
        }

        let prettyPrintTimeFromDateTime = date => {
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let minutesStr = minutes < 10 ? '0' + minutes : minutes;
            let timeString = hours + ':' + minutesStr;
            if (timeFormat === '12') {
                let ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;

                timeString = hours + ':' + minutesStr + ' ' + ampm;
            }

            return timeString;
        };

        let start = prettyPrintTimeFromDateTime(new Date(event.start.dateTime));
        let end = prettyPrintTimeFromDateTime(new Date(event.end.dateTime));

        return start + ' - ' + end;
    }
};