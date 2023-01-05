import "./newRoom.scss";

import { useState } from "react";
import axios from 'axios';

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import useFetch from "../../hooks/useFetch";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { roomInputs } from '../../formSource';

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch('/hotels');

  console.log(data);

  const handleInputChange = (e) => {
	setInfo(prev => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleSave = async (e) => {
	e.preventDefault();
	const roomNumbers = rooms.split(',').map(((room) => ({number: room.trim()})));
	try {
		await axios.post(`/rooms/${hotelId}`, {
			...info,
			roomNumbers
		});
	} catch (error) {
		console.error(error);
	}
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder}
				  	onChange={handleInputChange} />
                </div>
              ))}
				<div className="formInput">
					<label>Rooms</label>
					<textarea placeholder="Separate room numbers by comma" 
						onChange={(e) => setRooms(e.target.value)}></textarea>
				</div>
			  <div className="formInput">
				<label>Choose Hotel</label>
				<select id="hotelId" onChange={e => setHotelId(e.target.value)}>
					{loading ? 'loading...' : data && data.map((hotel) => {
					return <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
					})}
				</select>
			  </div>
              <button onClick={handleSave}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
