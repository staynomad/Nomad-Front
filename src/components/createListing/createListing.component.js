import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker, { DateUtils } from "react-day-picker";
import { Helmet } from "react-helmet-async";
import { NavLink, withRouter } from "react-router-dom";
import Select from "react-select";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { importCalendar } from "../../redux/actions/calendarSyncActions";
import {
  setLoadingTrue,
  setLoadingFalse,
} from "../../redux/actions/loadingActions";
import { createNewListing } from "../../redux/actions/createListingActions";
import { stateStyles, stateOptions } from "./stateDropdown";
import "./createListing.css";

const options = [
  "TV",
  "Kitchen",
  "Wifi",
  "Heating",
  "Pool",
  "Towels",
  "Hair dryer",
];

class CreateListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attemptSubmit: false,
      importDone: false,
      importLoading: false,
      isCompleted: false,
      isDraft: false,
      isReviewingListing: false,
      form: {
        test: false,
        charLeft: {
          description: 5000,
          title: 100,
        },
        title: "",
        location: {
          address: "",
          street: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
          aptnum: "",
          coordinates: {
            lat: null,
            lng: null,
          },
        },
        description: "",
        details: {
          beds: "",
          baths: "",
          maxpeople: "",
        },
        price: "",
        photos: {
          image_files: [],
          pictures: {},
        },
        rules: "",
        calendarURL: "",
        dateInit: {
          date_range: {
            from: null,
            to: null,
          },
          today: new Date(),
        },
        dates: {
          start_date: null,
          end_date: null,
          today: new Date(),
        },
        displayImport: false,
        amenityCheckboxDisabled: false,
        amenities: [],
        prevAmenities: [],
      },
      isFieldValid: {
        title: false,
        street: false,
        city: false,
        country: false,
        zipcode: false,
        aptnum: false,
        description: false,
        beds: false,
        baths: false,
        maxpeople: false,
        price: false,
        rules: false,
        invalidPhotoType: false,
        invalidDate: false,
      },
    };

    this.deletePhoto = this.deletePhoto.bind(this);
    this.handleCalendarSubmit = this.handleCalendarSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleImportToggle = this.handleImportToggle.bind(this);
    this.handlePriceRound = this.handlePriceRound.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.onPhotoClick = this.onPhotoClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.userSession) {
      alert("Please log in to create a listing.");
      return this.props.history.push("/login");
    }
    if (this.props.userSession.isHost === false) {
      alert("Please create a host account to create a listing.");
      return this.props.history.push("/");
    }
    if (this.props.userSession.isVerified === false) {
      alert("Please verify your account before creating a listing.");
      return this.props.history.push("/accountVerification/send");
    }
    if (!this.props.userSession.user.stripeId) {
      alert("You must connect a Stripe account to create a listing. Go to Payouts under Account for more.");
      return this.props.history.push("/MyAccount");
    }
  }

  currentImagesList() {
    const photoList = Object.keys(this.state.form.photos.pictures);
    return photoList.map((image) => {
      return (
        <div key={image} className="single-img-container">
          <img
            className="create-listing-image"
            style={{ maxHeight: 200, maxwidth: 200 }}
            id="target"
            src={this.state.form.photos.pictures[image]}
            alt=" "
          />
          <input
            type="button"
            value="X"
            onClick={this.deletePhoto}
            className="delete-btn"
            title={image}
          />
        </div>
      );
    });
  }

  deletePhoto(e) {
    let name = e.target.title;
    let tempFiles = this.state.form.photos.image_files;
    let tempPhotos = this.state.form.photos.pictures;
    const i = tempFiles.findIndex((n) => n.name === name);
    tempFiles.splice(i, 1);
    delete tempPhotos[name];

    this.setState({
      form: {
        ...this.state.form,
        photos: {
          ...this.state.form.photos,
          pictures: tempPhotos,
          image_files: tempFiles,
        },
      },
    });
  }

  handleChange(e) {
    const { name, value } = e.target;

    /* Handle change for title */
    if (name === "title" || name === "description") {
      const maxLength = name === "title" ? 100 : 5000;
      const titleRemainingChars = maxLength - value.length;
      if (titleRemainingChars >= 0) {
        this.setState({
          form: {
            ...this.state.form,
            charLeft: {
              [name]: titleRemainingChars,
            },
            [name]: value,
          },
        });
      }
    }

    /* Handle change for location */
    if (Object.keys(this.state.form.location).includes(name)) {
      if (isNaN(value) && name === "zipcode") {
        console.log("invalid input");
      } else {
        this.setState({
          form: {
            ...this.state.form,
            location: {
              ...this.state.form.location,
              [name]: value,
            },
          },
        });
      }
    }

    /* Handle changes for details */
    if (Object.keys(this.state.form.details).includes(name)) {
      if (!isNaN(value) && value < 100 && value >= 0) {
        this.setState({
          form: {
            ...this.state.form,
            details: {
              ...this.state.form.details,
              [name]: Math.round(parseInt(value)),
            },
          },
        });
      } else {
        /* Clear input if it is not valid */
        this.setState({
          form: {
            ...this.state.form,
            details: {
              ...this.state.form.details,
              [name]: "",
            },
          },
        });
      }
    }

    /* Handle price changes */
    if (name === "price") {
      if (!isNaN(value) && value < 1000) {
        this.setState({
          form: {
            ...this.state.form,
            [name]: value,
          },
        });
      }
    }

    /* Handle amenity changes */
    let amenitySet = new Set(this.state.form.amenities);
    if (e.target.className === "No Amenities") {
      if (!this.state.form.amenityCheckboxDisabled) {
        this.setState({
          form: {
            ...this.state.form,
            amenityCheckboxDisabled: true,
            amenities: [],
            prevAmenities: Array.from(amenitySet),
          },
        });
      } else {
        this.setState({
          form: {
            ...this.state.form,
            amenityCheckboxDisabled: false,
            amenities: this.state.form.prevAmenities,
            prevAmenities: [],
          },
        });
      }
    } else if (options.includes(name)) {
      if (!this.state.form.amenities.includes(name)) amenitySet.add(name);
      else amenitySet.delete(name);

      this.setState({
        form: {
          ...this.state.form,
          amenities: Array.from(amenitySet),
        },
      });
    }

    if (name === "Calendar") {
      this.setState({
        form: {
          ...this.state.form,
          calendarURL: e.target.value,
        },
      });
    }

    let isFormValid = true;

    while (isFormValid) {
      /* Check if title and description are not empty */
      /* Check if valid zipCode */
      if (!/^\d{5}(-\d{4})?$/.test(this.state.form.location.zipcode)) {
        this.setState({ isCompleted: false });
        isFormValid = false;
      }
      /* Check if beds, baths, and maxpeople are 0 or more and less than 99 */
      /* Check if price is under $1000 */

      /* After passing all checks, return from loop and set isCompleted to isFormValid (which should be true) */
      return this.setState({ isCompleted: isFormValid });
    }
  }

  async handleCalendarSubmit(e) {
    this.setState({
      importLoading: true,
    });
    e.preventDefault();
    await this.props.importCalendar(this.state.calendarURL, null);
    if (!this.state.form.dates.start_date || !this.state.form.dates.end_date) {
      alert("Invalid URL. Please try again!");
    } else {
      this.setState({
        form: {
          ...this.state.form,
          dates: {
            ...this.state.form.dates,
            start_date: this.props.available[0],
            end_date: this.props.available[1],
          },
        },
        importDone: true,
      });
    }
    this.setState({
      importLoading: false,
    });
  }

  handleDayClick(day) {
    let range = {};
    if (DateUtils.isDayBefore(this.state.form.dates.today, day)) {
      range = DateUtils.addDayToRange(day, this.state.form.dateInit.date_range);
      this.setState(
        {
          form: {
            ...this.state.form,
            dateInit: {
              ...this.state.form.dateInit,
              invalidDate: false,
              date_range: range,
            },
          },
        },
        () =>
          this.setState({
            form: {
              ...this.state.form,
              dates: {
                ...this.state.form.dates,
                start_date: range.from,
                end_date: range.to,
              },
            },
          })
      );
    } else {
      this.setState({
        form: {
          ...this.state.form,
          dateInit: {
            ...this.state.form.dateInit,
            invalidDate: true,
          },
        },
      });
    }
  }

  /* Round price to 2 decimal places -> used onBlur */
  handlePriceRound() {
    this.setState({
      form: {
        ...this.state.form,
        price: parseFloat(this.state.form.price).toFixed(2),
      },
    });
  }

  handleImportToggle() {
    this.setState({
      displayImport: !this.state.displayImport,
    });
    // console.log(this.state.displayImport);
  }

  handleResetClick() {
    this.setState({
      form: {
        ...this.state.form,
        dateInit: {
          date_range: {
            from: null,
            to: null,
          },
          invalidDate: false,
          today: new Date(),
        },
        dates: {
          start_date: null,
          end_date: null,
          today: new Date(),
        },
      },
    });
  }

  handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const [
      street,
      city,
      stateZip,
      country,
    ] = results[0].formatted_address.split(", ");
    const [state, zipcode] = stateZip.split(" ");

    this.setState({
      form: {
        ...this.state.form,
        location: {
          address: value,
          coordinates: latLng,
          street: street ? street : "",
          city: city ? city : "",
          state: state ? state : "",
          country: country ? country : "",
          zipcode: zipcode ? zipcode : "",
        },
      },
    });
  };

  onPhotoClick(e) {
    let cur_images = { ...this.state.form.photos.pictures };
    let image_files = [...this.state.form.photos.image_files];
    for (let i = 0; i < e.target.files.length; i++) {
      const currentImage = e.target.files[i];
      if (
        currentImage.type === "image/png" ||
        currentImage.type === "image/jpg" ||
        currentImage.type === "image/jpeg"
      ) {
        const curUrl = URL.createObjectURL(currentImage);
        cur_images[currentImage.name] = curUrl;
        image_files.push(currentImage);

        this.setState(
          {
            form: {
              ...this.state.form,
              photos: {
                ...this.state.form.photos,
                pictures: cur_images,
                image_files: image_files,
              },
            },
          },
          () => {
            this.setState({
              isFieldValid: {
                invalidPhotoType: false,
              },
            });
          }
        );
      } else {
        this.setState({
          isFieldValid: {
            invalidPhotoType: true,
          },
        });
      }
    }
  }

  onSubmit() {
    let newListingData = new FormData();
    for (let i = 0; i < this.state.form.photos.image_files.length; i++) {
      newListingData.append("image", this.state.form.photos.image_files[i]);
    }

    const availableDates = [
      this.state.form.dates.start_date
        .toISOString()
        .substring(
          0,
          this.state.form.dates.start_date.toISOString().indexOf("T")
        ),
      this.state.form.dates.end_date
        .toISOString()
        .substring(
          0,
          this.state.form.dates.end_date.toISOString().indexOf("T")
        ),
    ];

    const newListing = {
      title: this.state.form.title,
      location: this.state.form.location,
      description: this.state.form.description,
      details: this.state.form.details,
      price: parseFloat(this.state.form.price).toFixed(2),
      available: availableDates,
      amenities: this.state.form.amenities,
      calendarURL: this.state.form.calendarURL,
      booked: this.props.booked ? this.props.booked : null,
    };

    newListingData.append(
      "listingData",
      new Blob(
        [
          JSON.stringify({
            newListing,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    this.props.createNewListing(this.state.isDraft, newListingData);
  }

  render() {
    const { from, to } = this.state.form.dateInit.date_range;
    const modifiers = { start: from, end: to };

    return (
      <div className="fullListingBackground">
        <div className="overallListingForm">
          {this.props.loading ? (
            <div className="create-listing-confirmation-container">
              <div>
                <div id="spinner" />
                {this.state.isDraft ? (
                  <div className="spacer_s">
                    Draft is being saved. To edit/submit this listing, go to
                    MyListings.
                  </div>
                ) : (
                  <div className="spacer_s">
                    Your listing is being submitted. Thanks for choosing NomΛd!
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form style={{ width: "100%" }}>
              <>
                {
                  /* User did not hit the next button or hit back button -> Don't need to check if form is completed */
                  !this.state.isReviewingListing || !this.state.isCompleted ? (
                    <>
                      <div>
                        <div className="create-listing-header">
                          <NavLink
                            className="create-listing-back"
                            to="/MyAccount"
                          >
                            <KeyboardBackspaceIcon />
                          </NavLink>
                          <h1 className="startText">Get Started!</h1>
                        </div>
                      </div>

                      <br />

                      <div>
                        <div className="create-listing-content">
                          <div className="questionText">Title</div>
                          <div className="spacer_m"></div>
                          <input
                            type="text"
                            name="title"
                            className="create-listing-title-input"
                            value={this.state.form.title}
                            placeholder="e.g. Beautiful apartment overlooking Central Park"
                            onChange={this.handleChange}
                            required
                          ></input>
                          <div className="spacer_xxs"></div>
                          <div className="characters-left">
                            {this.state.form.charLeft.title} Characters Left
                          </div>
                          <div className="spacer_m"></div>

                          {/* Location */}
                          <div className="LocationForm">
                            <div className="questionText">Location</div>
                            <div className="spacer_xs"></div>
                            <div className="listing-wrapper">
                              <div className="listing-inputs">
                                <PlacesAutocomplete
                                  value={this.state.form.location.address}
                                  onChange={(address) =>
                                    this.setState({
                                      form: {
                                        ...this.state.form,
                                        location: {
                                          ...this.state.form.location,
                                          address: address,
                                        },
                                      },
                                    })
                                  }
                                  onSelect={this.handleSelect}
                                >
                                  {({
                                    getInputProps,
                                    suggestions,
                                    getSuggestionItemProps,
                                    loading,
                                  }) => (
                                    <div>
                                      <div>
                                        {loading ? <div>...loading</div> : null}
                                        <input
                                          className="create-listing-input autofill"
                                          {...getInputProps({
                                            placeholder: "Search for address",
                                          })}
                                        />
                                        <p>
                                          Invalid addresses may cause
                                          autocomplete to fail.
                                        </p>

                                        {suggestions.map((suggestion, idx) => {
                                          const style = {
                                            backgroundColor: suggestion.active
                                              ? "#41b6e6"
                                              : "#fff",
                                          };

                                          return (
                                            <div
                                              {...getSuggestionItemProps(
                                                suggestion,
                                                { style }
                                              )}
                                              key={`suggestion_${idx}`}
                                            >
                                              {suggestion.description}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </PlacesAutocomplete>
                                <div className="create-listing-input-container">
                                  <div className="label-text">Street:</div>
                                  <input
                                    type="text"
                                    name="street"
                                    className="create-listing-input"
                                    value={this.state.form.location.street}
                                    placeholder="5230 Newell Road"
                                    onChange={this.handleChange}
                                    required
                                  />
                                </div>
                                <div className="create-listing-input-container">
                                  <div className="label-text">City:</div>
                                  <input
                                    type="text"
                                    name="city"
                                    className="create-listing-input"
                                    value={this.state.form.location.city}
                                    placeholder="Palo Alto"
                                    onChange={this.handleChange}
                                    required
                                  />
                                </div>

                                <div className="create-listing-input-container">
                                  <div className="label-text">State:</div>
                                  <Select
                                    onChange={(e) =>
                                      this.setState({
                                        ...this.state,
                                        form: {
                                          ...this.state.form,
                                          location: {
                                            ...this.state.form.location,
                                            state: e.value,
                                          },
                                        },
                                      })
                                    }
                                    value={stateOptions.find(
                                      (option) =>
                                        option.value === this.state.state
                                    )}
                                    placeholder="Select State..."
                                    styles={stateStyles}
                                    options={stateOptions}
                                  />
                                </div>

                                <div className="create-listing-input-container">
                                  <div className="label-text">Country:</div>
                                  <input
                                    type="text"
                                    name="country"
                                    className="create-listing-input"
                                    value={this.state.form.location.country}
                                    placeholder="USA"
                                    onChange={this.handleChange}
                                    required
                                  />
                                </div>

                                <div className="create-listing-input-container">
                                  <div className="label-text">Zipcode:</div>
                                  <input
                                    type="text"
                                    name="zipcode"
                                    className="create-listing-input"
                                    value={this.state.form.location.zipcode}
                                    placeholder="90210"
                                    onChange={this.handleChange}
                                    required
                                  />
                                </div>

                                <div className="create-listing-input-container">
                                  <div className="label-text">Apartment:</div>
                                  <input
                                    type="text"
                                    name="aptnum"
                                    className="create-listing-input"
                                    value={
                                      this.state.form.location.aptnum || ""
                                    }
                                    placeholder="aptnum"
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              className="create-listing-clear-address-button"
                              onClick={() =>
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    location: {
                                      address: "",
                                      coordinates: {
                                        lat: null,
                                        lng: null,
                                      },
                                      street: "",
                                      city: "",
                                      state: "",
                                      country: "",
                                      zipcode: "",
                                    },
                                  },
                                })
                              }
                            >
                              <h4>Clear</h4>
                            </button>
                          </div>
                          <div className="spacer_m"></div>

                          {/* Description */}
                          <div className="questionText">Description</div>
                          <div className="spacer_xs"></div>

                          <textarea
                            type="text"
                            name="description"
                            className="descriptionTextInputBox"
                            value={this.state.form.description}
                            placeholder="Be detailed! The more information you include the greater the chance your property gets booked."
                            onChange={this.handleChange}
                            required
                          ></textarea>
                          <div className="characters-left">
                            {this.state.form.charLeft.description} Characters
                            Left
                          </div>
                          <div className="spacer_m" />

                          {/* Details */}
                          <div>
                            <div className="questionText">Details</div>
                            <div className="details-wrapper">
                              <div className="beds">
                                <div className="create-listing-details-label">
                                  Beds:{" "}
                                </div>
                                <input
                                  type="text"
                                  name="beds"
                                  placeholder="e.g. 3"
                                  className="input-box-details"
                                  value={this.state.form.details.beds}
                                  onChange={this.handleChange}
                                  required
                                />
                              </div>

                              <div>
                                <div className="baths">
                                  <div className="create-listing-details-label">
                                    Baths:{" "}
                                  </div>
                                  <input
                                    type="text"
                                    name="baths"
                                    className="input-box-details"
                                    placeholder="e.g. 2"
                                    value={this.state.form.details.baths}
                                    onChange={this.handleChange}
                                    required
                                  />
                                </div>

                                <div className="maxppl">
                                  <div className="create-listing-details-label">
                                    Max people:{" "}
                                  </div>
                                  <input
                                    type="text"
                                    name="maxpeople"
                                    placeholder="e.g. 5"
                                    className="input-box-details"
                                    value={this.state.form.details.maxpeople}
                                    onChange={this.handleChange}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="spacer_s"></div>
                          </div>

                          {/* Price */}
                          <div>
                            <div>
                              <div className="questionText">Price</div>
                              <br />
                              <input
                                type="number"
                                name="price"
                                className="priceInputBox"
                                value={this.state.form.price}
                                placeholder="$ per night"
                                onBlur={this.handlePriceRound}
                                onChange={this.handleChange}
                                min="0.01"
                                max="999.99"
                                required
                              />
                              {this.state.price ? (
                                <div className="price-details">
                                  Note: 1% host fee is collected from every
                                  booking
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="spacer_m" />
                          <div create-listing-amenities-container>
                            <div className="questionText">Amenities</div>
                            <div className="spacer_s"></div>
                            <div className="amenities-list">
                              {options.map((option) => {
                                return (
                                  <div
                                    className="create-listing-amenity-container"
                                    key={option}
                                  >
                                    {!this.state.form
                                      .amenityCheckboxDisabled ? (
                                      <img
                                        src={`${
                                          process.env.PUBLIC_URL
                                        }/images/amenities/${option.replace(
                                          / /g,
                                          ""
                                        )}_.svg`}
                                        alt={option}
                                        className={option}
                                        name={option}
                                        id="create-listing-amenity"
                                        height="50px"
                                        onClick={this.handleChange}
                                        style={{
                                          filter: this.state.form.amenities.includes(
                                            option
                                          )
                                            ? "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1252%) hue-rotate(131deg) brightness(92%) contrast(101%)"
                                            : "brightness(0) saturate(100%)   invert(82%) sepia(92%) saturate(1%) hue-rotate(300deg) brightness(92%) contrast(93%)",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={`${
                                          process.env.PUBLIC_URL
                                        }/images/amenities/${option.replace(
                                          / /g,
                                          ""
                                        )}_.svg`}
                                        alt={option}
                                        className={option}
                                        name={option}
                                        id="create-listing-amenity-disabled"
                                        height="50px"
                                        style={{
                                          filter:
                                            "brightness(0) saturate(100%)   invert(82%) sepia(92%) saturate(1%) hue-rotate(300deg) brightness(92%) contrast(93%)",
                                        }}
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="spacer_xs"></div>
                            {!this.state.form.amenityCheckboxDisabled ? (
                              <div
                                style={{
                                  display: "inline-block",
                                  cursor: "pointer",
                                }}
                                className="No Amenities"
                                onClick={this.handleChange}
                              >
                                <CheckBoxOutlineBlankIcon className="create-listing-no-amenities" />
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "inline-block",
                                  cursor: "pointer",
                                }}
                                className="No Amenities"
                                onClick={this.handleChange}
                              >
                                <CheckBoxIcon className="create-listing-no-amenities active" />
                              </div>
                            )}
                            <div className="create-listing-amenity-text">
                              No Amenities
                            </div>
                            <div className="spacer_l"></div>
                          </div>
                          <div className="spacer_m"></div>

                          {/* Pictures */}
                          <div className="create-listing-photos-container">
                            <div className="questionText">Pictures</div> <br />
                            <div>
                              {this.state.isFieldValid.invalidPhotoType ? (
                                <div className="bad-image">
                                  Must be PNG, JPG, or JPEG format
                                  <div className="spacer_xxs"></div>
                                  <div className="spacer_m" />
                                </div>
                              ) : (
                                ""
                              )}
                              <input
                                className="upload-file"
                                id="upload-file"
                                name="upload-file"
                                type="file"
                                multiple
                                onChange={this.onPhotoClick}
                              />

                              <div className="spacer_m" />
                              <div>{this.currentImagesList()}</div>
                              <span>
                                Tip: Hold down "ctrl" to select multiple
                                pictures
                              </span>
                            </div>
                            <div className="spacer_m"></div>
                          </div>

                          {/* Calendar */}
                          <div className="questionText">Availability</div>
                          {this.state.displayImport ? (
                            <div>
                              <form onSubmit={this.handleCalendarSubmit}>
                                <input
                                  className="create-listing-calendarURL"
                                  style={{
                                    paddingBottom: "0",
                                    marginBottom: "0",
                                    width: "100%",
                                  }}
                                  type="text"
                                  name="Calendar"
                                  placeholder="Calendar URL"
                                  value={this.state.calendarURL}
                                  onChange={this.handleChange}
                                />
                                <br />
                                {this.state.importLoading ? (
                                  <div id="spinner"></div>
                                ) : (
                                  <input
                                    className="btn green"
                                    style={{ width: "auto" }}
                                    type="submit"
                                    value="import"
                                  />
                                )}
                                {this.state.importDone === true ? (
                                  <div style={{ color: "#00b183" }}>
                                    Import successful!
                                  </div>
                                ) : null}
                              </form>
                              <br />
                              <span className="import-info">
                                <NavLink to="/how-to-import-or-export-calendar">
                                  &#9432;
                                </NavLink>{" "}
                                What's this?
                              </span>
                              <br />
                              <p
                                className="import-calendar"
                                style={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                  paddingLeft: "3%",
                                  paddingRight: "1%",
                                }}
                                onClick={this.handleImportToggle}
                              >
                                Select
                              </p>
                              <p className="import-calendar">dates instead</p>
                              <br />
                              <div className="spacer_m"></div>
                            </div>
                          ) : (
                            <div>
                              <div className="spacer_xs"></div>
                              <div>
                                {!from && !to && "Please select the first day."}
                                {from && !to && "Please select the last day."}
                                {from &&
                                  to &&
                                  `Selected from ${from.toLocaleDateString()} to
                                    ${to.toLocaleDateString()}`}{" "}
                                {/*from && to && (

                                )*/}
                                <button
                                  className="link"
                                  type="button"
                                  onClick={this.handleResetClick}
                                >
                                  Reset
                                </button>
                              </div>
                              {this.state.form.dateInit.invalidDate ? (
                                <div style={{ color: "red" }}>
                                  First selection must be after today
                                </div>
                              ) : (
                                ""
                              )}
                              <DatePicker
                                className="Selectable"
                                numberOfMonths={2}
                                selectedDays={[from, { from, to }]}
                                modifiers={modifiers}
                                onDayClick={this.handleDayClick}
                                inputProps={{ required: true }}
                              />

                              <Helmet>
                                <style>{`
            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
              background-color: #f0f8ff !important;
              color: #4a90e2;
            }
            .Selectable .DayPicker-Day {
              border-radius: 0 !important;
            }
            .Selectable .DayPicker-Day--start {
              border-top-left-radius: 50% !important;
              border-bottom-left-radius: 50% !important;
            }
            .Selectable .DayPicker-Day--end {
              border-top-right-radius: 50% !important;
              border-bottom-right-radius: 50% !important;
            }
          `}</style>
                              </Helmet>
                              <br />
                              <p
                                className="import-calendar"
                                style={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                  paddingLeft: "3%",
                                  paddingRight: "1%",
                                }}
                                onClick={this.handleImportToggle}
                              >
                                Import
                              </p>
                              <p className="import-calendar">
                                your calendar instead
                              </p>
                              <br />
                              <div className="spacer_m"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      {
                        /* User hit next and form is incomplete */
                        this.state.attemptSubmit && !this.state.isCompleted ? (
                          <div>
                            <span style={{ color: "red" }}>
                              You are missing some parts. Please fill them in to
                              continue
                            </span>
                          </div>
                        ) : null
                      }

                      <br />
                      <input
                        type="button"
                        className="create-listing-next-button"
                        value="Next"
                        onClick={() =>
                          this.setState({ attemptSubmit: true }, () => {
                            if (this.state.isCompleted)
                              this.setState({ isReviewingListing: true });
                          })
                        }
                      />
                    </>
                  ) : (
                    <>
                      {
                        /* User hit next (if else from above) and form is complete */
                        this.state.isCompleted &&
                        this.state.isReviewingListing ? (
                          <div>
                            <h1 className="confirm-listing-header">
                              Review Your Listing
                            </h1>
                            <div className="spacer_s"></div>
                            <div className="confirm-container">
                              <h2 className="confirm-listing-subtitle">
                                Title
                              </h2>
                              <p className="confirm-listing-text">
                                {this.state.form.title}
                              </p>

                              <h2 className="confirm-listing-subtitle">
                                Address
                              </h2>
                              <p className="confirm-listing-text">
                                <div className="confirm-listing-text-container">
                                  <span>Street: </span>
                                  {this.state.form.location.street}
                                </div>
                                <div className="confirm-listing-text-container">
                                  <span>City: </span>
                                  {this.state.form.location.city}
                                </div>
                                <div className="confirm-listing-text-container">
                                  <span>State: </span>
                                  {this.state.form.location.state}
                                </div>
                                <div className="confirm-listing-text-container">
                                  <span>Country: </span>
                                  {this.state.form.location.country}
                                </div>
                                <div className="confirm-listing-text-container">
                                  <span>Zipcode: </span>
                                  {this.state.form.location.zipcode}
                                </div>
                              </p>

                              <h2 className="confirm-listing-subtitle">
                                Description
                              </h2>
                              <p className="confirm-listing-text">
                                {this.state.form.description}
                              </p>

                              <h2 className="confirm-listing-subtitle">
                                Details
                              </h2>
                              <p className="confirm-listing-text">
                                <div className="confirm-listing-text-container">
                                  <span>Beds:</span>{" "}
                                  {this.state.form.details.beds}{" "}
                                </div>
                                <div className="confirm-listing-text-container">
                                  <span>Baths:</span>{" "}
                                  {this.state.form.details.baths}{" "}
                                </div>
                                <div className="confirm-listing-text-container">
                                  <span>Max people:</span>{" "}
                                  {this.state.form.details.maxpeople}{" "}
                                </div>
                              </p>

                              {this.state.form.amenities.length > 0 && (
                                <>
                                  <h2 className="confirm-listing-subtitle">
                                    Amenities
                                  </h2>
                                  <p className="confirm-listing-text">
                                    {this.state.form.amenities.map(
                                      (amenity) => {
                                        return (
                                          <div className="confirm-listing-text-container">
                                            {amenity}
                                          </div>
                                        );
                                      }
                                    )}
                                  </p>
                                </>
                              )}

                              <h2 className="confirm-listing-subtitle">
                                Price
                              </h2>
                              <p className="confirm-listing-text">
                                ${parseFloat(this.state.form.price).toFixed(2)}{" "}
                                / night
                              </p>

                              <h2 className="confirm-listing-subtitle">
                                Dates
                              </h2>
                              <p className="confirm-listing-text dates">
                                <span>Start date: </span>
                                {this.state.form.dates.start_date.toLocaleDateString()}{" "}
                                <br />
                                <span>End date: </span>
                                {this.state.form.dates.end_date.toLocaleDateString()}{" "}
                                <br />
                              </p>
                            </div>

                            <input
                              type="button"
                              className="confirm-listing-button"
                              value="Back"
                              onClick={() =>
                                this.setState({ isReviewingListing: false })
                              }
                            />
                            <input
                              type="button"
                              className="confirm-listing-button"
                              onClick={this.onSubmit}
                              value="Submit"
                            />
                            <input
                              type="button"
                              className="confirm-listing-button"
                              onClick={() => {
                                this.setState({ isDraft: true }, () =>
                                  this.onSubmit()
                                );
                              }}
                              value="Save Draft"
                            />
                          </div>
                        ) : null
                      }
                    </>
                  )
                }
              </>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let stateToReturn = { ...state };
  if (state.Login.userInfo)
    stateToReturn["userSession"] = state.Login.userInfo.session;
  if (state.Loading.loading) stateToReturn["loading"] = state.Loading.loading;
  if (state.Calendar.available)
    stateToReturn["available"] = state.Calendar.available;
  if (state.Calendar.calendarURL)
    stateToReturn["calendarURL"] = state.Calendar.calendarURL;
  if (state.Calendar.booked) stateToReturn["booked"] = state.Calendar.booked;
  return stateToReturn;
};
const mapDispatchToProps = (dispatch) => {
  return {
    createNewListing: (...args) => dispatch(createNewListing(...args)),
    importCalendar: (calendarURL, listingId) =>
      dispatch(importCalendar(calendarURL, listingId)),
    setLoadingFalse: () => dispatch(setLoadingFalse()),
    setLoadingTrue: () => dispatch(setLoadingTrue()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateListing)
);
