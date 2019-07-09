import React, { Component } from "react";
import CityCreatorCard from "./CityCreatorCard";
import { getCities } from "../../store/actions/cityActions";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addCity } from "../../store/actions/cityActions";
import { setError } from "../../store/actions/errorActions";
import ErrorMessage from "../common/ErrorMessage";
import PropTypes from "prop-types";
class CityCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      image: "",
      city: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setCity = this.setCity.bind(this);
  }
  componentDidMount() {
    this.props.getCities();
  }
  onSubmit(e) {
    e.preventDefault();

    const newCity = {
      name: this.state.name,
      country: this.state.country,
      image: this.state.image
    };

    //Add City via addCity action
    this.props.addCity(newCity);

    //Clear form
    this.setState({
      name: "",
      country: "",
      image: ""
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setCity(property) {
    this.setState({ city: property });
  }

  render() {
    let cityList;
    console.log(this.state);
    const { cities } = this.props.cities;
    cityList = cities.map((city, _id) => {
      return <CityCreatorCard key={_id} city={city} setCity={this.setCity} />;
    });
    return (
      <div>
        <h1>City Creator</h1>
        <ErrorMessage />
        <form
          id="city-creator"
          onSubmit={this.onSubmit}
          style={{ marginBottom: "1rem" }}
        >
          <TextField
            required
            id="outlined-name"
            type="text"
            name="name"
            label="Name"
            variant="outlined"
            style={{ marginBottom: 8 }}
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            value={this.state.name}
            onChange={this.onChange}
          />
          <TextField
            required
            id="outlined-name"
            type="text"
            name="country"
            label="Country"
            variant="outlined"
            style={{ marginBottom: 8 }}
            helperText="Enter 2-letter Country Code"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            value={this.state.country}
            onChange={this.onChange}
          />
          <TextField
            required
            id="outlined-name"
            type="text"
            name="image"
            label="Image"
            variant="outlined"
            helperText="Enter a valid url"
            fullWidth
            style={{ marginBottom: 8 }}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            value={this.state.image}
            onChange={this.onChange}
          />

          <Button
            form="city-creator"
            fullWidth
            variant="contained"
            size="small"
            type="submit"
          >
            <SaveIcon />
            Save
          </Button>
        </form>
        <div>{cityList}</div>
      </div>
    );
  }
}

CityCreator.propTypes = {
  addCity: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  getCities: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities,
  city: state.cities.city
});

export default connect(
  mapStateToProps,
  { addCity, getCities, setError }
)(CityCreator);
