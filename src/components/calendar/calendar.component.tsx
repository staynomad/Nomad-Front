import React from "react";
import DayPicker, { Modifier } from "react-day-picker";

interface CalendarProps {
  from: Date;
  handleDayClick: any;
  listingBookedDays: Modifier | Modifier[];
  modifiers: object;
  numberOfMonths: number;
  outOfRange: boolean;
  to: Date;
}

const Calendar = (props: CalendarProps) => {
  const {
    from,
    handleDayClick,
    listingBookedDays,
    modifiers,
    numberOfMonths,
    outOfRange,
    to,
  } = props;

  return (
    <React.Fragment>
      <div>
        {outOfRange ? (
          "Selected day is not available."
        ) : (
          // lessThanFourDays ? (
          //   "Minimum 4 days required"
          // ) :
          <div>
            {!from && !to && "Please select the first day."}
            {from && !to && "Please select the last day."}
            {from &&
              to &&
              `From ${from.toLocaleDateString()} to
          ${to.toLocaleDateString()}`}{" "}
          </div>
        )}
      </div>
      <DayPicker
        className="Selectable"
        selectedDays={[from, { from, to }]}
        modifiers={modifiers}
        numberOfMonths={numberOfMonths ? numberOfMonths : 1}
        onDayClick={handleDayClick}
        disabledDays={listingBookedDays}
      />
    </React.Fragment>
  );
};

export default Calendar;
