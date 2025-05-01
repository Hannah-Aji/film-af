import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const SignUpA = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    homeCountry: '',
    homeState: '',
    homeCity: '',
    gender: '',
    dob: null,
    email: '',
    password: '',
    headshot: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountryChange = (isoCode) => {
    const country = countries.find(c => c.isoCode === isoCode);
    setForm({ ...form, homeCountry: country.name, homeState: '', homeCity: '' });
    setStates(State.getStatesOfCountry(isoCode));
    setCities([]);
  };

  const handleStateChange = (isoCode) => {
    const state = states.find(s => s.isoCode === isoCode);
    setForm({ ...form, homeState: state.name, homeCity: '' });
    setCities(City.getCitiesOfState(countries.find(c => c.name === form.homeCountry).isoCode, isoCode));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'headshot') {
      const file = files[0];
      setForm({ ...form, headshot: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('signupDataA', JSON.stringify(form));
    navigate('/signup-b');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f2c] text-white px-4 pt-[80px] pb-[40px]">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-lg space-y-5">
        <h2 className="text-2xl font-bold text-center mb-4">Create Your Account</h2>

        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-1/2 p-2 rounded bg-white/20 text-white placeholder-white/60"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-1/2 p-2 rounded bg-white/20 text-white placeholder-white/60"
          />
        </div>

        <select
          value={form.homeCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white"
        >
          <option value="">Select Home Country</option>
          {countries.map(c => (
            <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
          ))}
        </select>

        <select
          disabled={!states.length}
          value={form.homeState}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white"
        >
          <option value="">Select Home State</option>
          {states.map(s => (
            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
          ))}
        </select>

        <select
          disabled={!cities.length}
          value={form.homeCity}
          onChange={(e) => setForm({ ...form, homeCity: e.target.value })}
          className="w-full p-2 rounded bg-white/20 text-white"
        >
          <option value="">Select Home City</option>
          {cities.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>

        <Select
          options={genderOptions}
          placeholder="Select Sex"
          onChange={(option) => setForm({ ...form, gender: option.value })}
          className="text-black"
        />

        <DatePicker
          selected={form.dob}
          onChange={(date) => setForm({ ...form, dob: date })}
          placeholderText="Date of Birth"
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-300 hover:underline"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div>
          <label className="block text-sm mb-1">Upload Headshot</label>
          <input
            type="file"
            name="headshot"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm"
          />
          {preview && <img src={preview} alt="Preview" className="mt-3 rounded w-24 h-24 object-cover" />}
        </div>

        <button
          type="submit"
          className="w-full bg-[#5c3ee8] hover:bg-[#472bcf] text-white py-2 rounded font-medium mt-4"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default SignUpA;
