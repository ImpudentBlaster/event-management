import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './EventCreator.css';

function EventCreator() {
  const [eventData, setEventData] = useState({
    title: '', description: '', date: '', time: '', location: '', invited: []
  });
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState([]);
  const [list, setList] = useState([]);
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let creatorEmail = sessionStorage.getItem('creatorEmail')
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/showUser');
        let data = response.data.filter(item => item.email !== creatorEmail)
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    handleSearch();
  }, [email]);


  //function for the invited participants
  function handleSearch() {
    if (!email.trim()) {
      setSearchError('Please enter an email to search');
      setList([]);
      return;
    }

    setSearchError('');
    const filteredList = userData.filter(user => user.email.startsWith(email));
    setList(filteredList);

    if (filteredList.length === 0) {
      setSearchError('No results found');
    }
  }
  //function for invited participants


  function handleSelection(selectedEmail) {
    setEventData(prev => ({
      ...prev,
      invited: prev.invited.includes(selectedEmail)
        ? prev.invited.filter(email => email !== selectedEmail)
        : [...prev.invited, selectedEmail]
    }));
  }

  async function handleSubmission() {
    const empty = Object.values(eventData).some(val => val === '' || (val.length === 0));
    if (empty) {
      alert('All input fields are required');
      return;
    }

    try {
      let creatorEmail = sessionStorage.getItem('creatorEmail')
      let creatorId = sessionStorage.getItem('creatorId')

      await axios.post('http://localhost:5000/createEvent', {
        title: eventData.title,
        description: eventData.description,
        time: eventData.time,
        date: eventData.date,
        location: eventData.location,
        invited: eventData.invited,
        created_by: creatorEmail,
        admin_id: creatorId
      });
      setList([]);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='event-creator-main'>
      <div className='event-creator-heading'>
        <h2>Create New Event</h2>
      </div>

      <div className='event-creator-inputs-main'>
        <div className='event-creator-inputs'>
          <p>Title</p>
          <input
            value={eventData.title}
            type='text'
            placeholder='Enter Title'
            onChange={(event) => {
              setEventData({ ...eventData, title: event.target.value.trim() });
            }}
          />
        </div>
        <div className='event-creator-inputs'>
          <p>Description</p>
          <input
            value={eventData.description}
            type='text'
            placeholder='Enter Description'
            onChange={(event) => {
              setEventData({ ...eventData, description: event.target.value.trim() });
            }}
          />
        </div>
        <div className='event-creator-inputs'>
          <p>Date</p>
          <input
            value={eventData.date}
            type='date'
            onChange={(event) => {
              setEventData({ ...eventData, date: event.target.value.trim() });
            }}
          />
        </div>
        <div className='event-creator-inputs'>
          <p>Time</p>
          <input
            value={eventData.time}
            type='time'
            onChange={(event) => {
              setEventData({ ...eventData, time: event.target.value.trim() });
            }}
          />
        </div>
        <div className='event-creator-inputs'>
          <p>Location</p>
          <input
            value={eventData.location}
            type='text'
            placeholder='Enter location'
            onChange={(event) => {
              setEventData({ ...eventData, location: event.target.value.trim() });
            }}
          />
        </div>
      </div>

      <div className='event-creator-invite'>
        <p>Invite Participants</p>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='Enter email to search'
        />
        {searchError && <p className='error'>{searchError}</p>}
        <div className='event-creator-invite-list'>
          {list.map((user, index) => (
            <div
              key={index}
              onClick={() => handleSelection(user.email)}
              className="event-creator-invite-item"
            >
              {eventData.invited.includes(user.email) ? '☑️' : '🔲'} {user.email}
            </div>
          ))}
        </div>
      </div>

      <div className='event-creator-button'>
        <button onClick={handleSubmission}>Create Event</button>
      </div>
    </div>
  );
}

export default EventCreator;


