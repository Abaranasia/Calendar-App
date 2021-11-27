import moment from "moment";

export const preparaEvents = (events = []) => {
    /**
     * Esta función parsea los eventos con fechas de tipo string a fecha real gracias a moment
     * */

    console.log(events)
    return events.map(
        (e) => ({
            ...e,
            start: moment(e.end).toDate(),
            end: moment(e.start).toDate(),
        })
    )



}
