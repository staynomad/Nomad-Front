export const stateOptions = [
    {
        label: "Alabama",
        value: "AL",
    },
    {
        label: "Alaska",
        value: "AK",
    },
    {
        label: "American Samoa",
        value: "AS",
    },
    {
        label: "Arizona",
        value: "AZ",
    },
    {
        label: "Arkansas",
        value: "AR",
    },
    {
        label: "California",
        value: "CA",
    },
    {
        label: "Colorado",
        value: "CO",
    },
    {
        label: "Connecticut",
        value: "CT",
    },
    {
        label: "Delaware",
        value: "DE",
    },
    {
        label: "District Of Columbia",
        value: "DC",
    },
    {
        label: "Federated States Of Micronesia",
        value: "FM",
    },
    {
        label: "Florida",
        value: "FL",
    },
    {
        label: "Georgia",
        value: "GA",
    },
    {
        label: "Guam",
        value: "GU",
    },
    {
        label: "Hawaii",
        value: "HI",
    },
    {
        label: "Idaho",
        value: "ID",
    },
    {
        label: "Illinois",
        value: "IL",
    },
    {
        label: "Indiana",
        value: "IN",
    },
    {
        label: "Iowa",
        value: "IA",
    },
    {
        label: "Kansas",
        value: "KS",
    },
    {
        label: "Kentucky",
        value: "KY",
    },
    {
        label: "Louisiana",
        value: "LA",
    },
    {
        label: "Maine",
        value: "ME",
    },
    {
        label: "Marshall Islands",
        value: "MH",
    },
    {
        label: "Maryland",
        value: "MD",
    },
    {
        label: "Massachusetts",
        value: "MA",
    },
    {
        label: "Michigan",
        value: "MI",
    },
    {
        label: "Minnesota",
        value: "MN",
    },
    {
        label: "Mississippi",
        value: "MS",
    },
    {
        label: "Missouri",
        value: "MO",
    },
    {
        label: "Montana",
        value: "MT",
    },
    {
        label: "Nebraska",
        value: "NE",
    },
    {
        label: "Nevada",
        value: "NV",
    },
    {
        label: "New Hampshire",
        value: "NH",
    },
    {
        label: "New Jersey",
        value: "NJ",
    },
    {
        label: "New Mexico",
        value: "NM",
    },
    {
        label: "New York",
        value: "NY",
    },
    {
        label: "North Carolina",
        value: "NC",
    },
    {
        label: "North Dakota",
        value: "ND",
    },
    {
        label: "Northern Mariana Islands",
        value: "MP",
    },
    {
        label: "Ohio",
        value: "OH",
    },
    {
        label: "Oklahoma",
        value: "OK",
    },
    {
        label: "Oregon",
        value: "OR",
    },
    {
        label: "Palau",
        value: "PW",
    },
    {
        label: "Pennsylvania",
        value: "PA",
    },
    {
        label: "Puerto Rico",
        value: "PR",
    },
    {
        label: "Rhode Island",
        value: "RI",
    },
    {
        label: "South Carolina",
        value: "SC",
    },
    {
        label: "South Dakota",
        value: "SD",
    },
    {
        label: "Tennessee",
        value: "TN",
    },
    {
        label: "Texas",
        value: "TX",
    },
    {
        label: "Utah",
        value: "UT",
    },
    {
        label: "Vermont",
        value: "VT",
    },
    {
        label: "Virgin Islands",
        value: "VI",
    },
    {
        label: "Virginia",
        value: "VA",
    },
    {
        label: "Washington",
        value: "WA",
    },
    {
        label: "West Virginia",
        value: "WV",
    },
    {
        label: "Wisconsin",
        value: "WI",
    },
    {
        label: "Wyoming",
        value: "WY",
    },
];

export const stateStyles = {
    container: (provided) => ({
        ...provided,
        width: "80%",
        outline: "none",
        border: "2px solid rgb(210 210 210 / 47%)",
        borderRadius: 10,
        cursor: "pointer",
        height: 32,
    }),
    control: (provided, state) => ({
        ...provided,
        border: "none",
        boxShadow: state.isFocused ? "0 0 0 2px #00b183" : "none",
        borderRadius: 10,
        background: "transparent",
        minHeight: "100%",
        height: "100%",
        alignItems: "flex-start",
        ":hover": {
            borderColor: "transparent",
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        minHeight: "100%",
        height: "100%",
        cursor: "pointer",
        padding: 0,
        border: "none",
    }),
    placeholder: (provided) => ({
        ...provided,
        fontFamily: "sans-serif",
        color: "#9CAAB5",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        paddingLeft: 15,
        fontSize: 16,
        margin: 0,
    }),
    option: (provided, state) => ({
        ...provided,
        width: "100%",
        fontFamily: "sans-serif",
        cursor: "pointer",
        background: state.isSelected ? "#00b183" : "white",
        ":hover": {
            background: state.isSelected ? "#00b183" : "#E6F9F2",
        },
    }),
    input: (provided) => ({
        ...provided,
        position: "absolute",
        paddingLeft: 13,
        fontSize: 16,
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "sans-serif",
        paddingLeft: 15,
        margin: 0,
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: "100%",
        padding: 0,
        cursor: "pointer",
    }),
};
