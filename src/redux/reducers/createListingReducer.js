import { NEW_LISTING } from "./createListingTypes";
///location: {street: "",city: "",state: "",country: "",zipcode: "",aptnum: ""}
const initialLocation = {
  title: "",
  location: {
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    aptnum: "",
  },
  description: "",
  details: {
    beds: "",
    baths: "",
    maxpeople: "",
  },
  price: "",
  photos: { pictures: [], temp_image_url: [] },
  rules: "",
  dates: {
    start_date: null,
    end_date: null,
    today: new Date(),
  },
  amenities: [],
};
export default function (state = initialLocation, action) {
  switch (action.type) {
    case NEW_LISTING:
      const name = action.payload.name;
      const value = action.payload.value;
      return {
        ...state,
        [name]: value,
      };
    default:
      return state;
  }
}
