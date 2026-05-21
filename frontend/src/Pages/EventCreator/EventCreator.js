import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './EventCreator.css';
import { Mentions } from 'antd';


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
    if (!localStorage.getItem('creatorEmail'))
      navigate('/')
  }, [])

  useEffect(() => {
    let creatorEmail = localStorage.getItem('creatorEmail')
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


  // const onInputChange = (value) => {
  //   console.log('Change:', value);
  // };
  // const onSelect = (option) => {
  //   console.log('select', option);
  // };

  //function for the invited participants
  function handleSearch() {
    if (!email.trim()) {
      setSearchError('Please enter an email to search');
      setList([]);
      return;
    }

    setSearchError('');
    const filteredList = userData.filter(user => user.email.startsWith(email.trim()));
    setList(filteredList);
console.log(list)
    if (filteredList.length === 0) {
      setSearchError('No results found');
    }
  }
  //function for invited participants


  function handleSelection(selectedEmail) {
    console.log(selectedEmail)
    setEventData(prev => ({
      ...prev,
      invited: prev.invited.includes(selectedEmail)
        ? prev.invited.filter(email => email !== selectedEmail)
        : [...prev.invited, selectedEmail]
    }));
    console.log(eventData)
  }

  async function handleSubmission() {
    console.log(new Date().toLocaleDateString())
    console.log(eventData)
    let temp = {
      title: eventData.title.trim(),
      description: eventData.description.trim(),
      time: eventData.time.trim(),
      date: eventData.date.trim(),
      location: eventData.location.trim(),
      invited: eventData.invited
    }
    setEventData(temp)
    const empty = Object.values(eventData).some(val => val === '' || (val.length === 0));
    if (empty) {
      alert('All input fields are required');
      return;
    }

    try {
      let creatorEmail = localStorage.getItem('creatorEmail')
      let creatorId = localStorage.getItem('creatorId')

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
      navigate('/Homepage');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='event-creator-main flex flex-col gap-6'>
      <div className='event-creator-heading mt-2'>
        <h2 className='text-2xl font-bold'>Create New Event</h2>
      </div>

      <div className='w-full sm:w-5/12 md:w-6/12 lg:w-5/12 flex flex-col gap-6 '>
        <div className='event-creator-inputs flex gap-4 items-center justify-between'>
          <p className='font-semibold'>Title</p>
          <input

            value={eventData.title}
            type='text'

            onChange={(event) => {
              setEventData({ ...eventData, title: event.target.value });
            }}
          />
        </div>
        <div className='event-creator-inputs flex gap-4 items-center justify-between'>
          <p className='font-semibold'>Description</p>
          <input
            value={eventData.description}
            type='text'

            onChange={(event) => {
              setEventData({ ...eventData, description: event.target.value });
            }}
          />
        </div>
        <div className='event-creator-inputs flex gap-4 items-center justify-between'>
          <p className='font-semibold'>Date</p>
          <input
            value={eventData.date}
            type='date'
            min={new Date().toISOString().split('T')[0]}
            onChange={(event) => {
              setEventData({ ...eventData, date: event.target.value });
            }}
          />
        </div>
        <div className='event-creator-inputs flex gap-4 items-center justify-between'>
          <p className='font-semibold'>Time</p>
          <input
            value={eventData.time}
            type='time'
            onChange={(event) => {
              setEventData({ ...eventData, time: event.target.value });
            }}
          />
        </div>
        <div className='event-creator-inputs flex gap-4 items-center justify-between'>
          <p className='font-semibold'>Location</p>
          <input
            value={eventData.location}
            type='text'

            onChange={(event) => {
              setEventData({ ...eventData, location: event.target.value });
            }}
          />
        </div>
      </div>


{/* <p>Invited</p> */}
      {/* <Mentions
    style={{
      width: '100%',
    }}
    defaultValue={email}
    onChange={(e) => console.log(e)}
    onInputChange={onInputChange}
    onSelect={onSelect}
    // options={[
    //   {
    //     value: 'afc163',
    //     label: 'afc163',
    //   },
    //   {
    //     value: 'zombieJ',
    //     label: 'zombieJ',
    //   },
    //   {
    //     value: "sagar1@gmail.com",
    //     label: 'sagar1@gmail.com',
    //   },
    // ]}
    options={list.map(user => (
      {
      value: user.email,
      label: user.email
    }))}
  /> */}

      <div className='event-creator-inputs invite-participants-main w-full sm:w-5/12 md:w-6/12 lg:w-5/12 flex flex-col gap-4 '>
        <div className='invite-participants flex justify-between items-center'>


          <p className='font-semibold'>Invite Participants</p>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {searchError && <p className='error'>{searchError}</p>}
        <div className={`${list.length === 0 ? "hidden" : "text-right event-creator-invite-list w-max border border-3 border-black"}`}>
          {list.map((user, index) => (
            <div
              key={index}
              onClick={() => handleSelection(user.email)}
              className="event-creator-invite-item text-right m-0 cursor-pointer"
            >
              {eventData.invited.includes(user.email) ? '☑️' : '🔲'} {user.email}
            </div>
          ))}
        </div>
        <button className='border border-3 border-black w-fit px-4 py-2 hover:text-white hover:bg-black' onClick={() => handleSubmission()}>Create Event</button>
      </div>

    </div>
  );
}

export default EventCreator;


