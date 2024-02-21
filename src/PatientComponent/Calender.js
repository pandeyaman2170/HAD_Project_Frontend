import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Modal from 'react-modal';
import './Calendar.css'
import axios from 'axios';
import { gapi } from "gapi-script"
// import { useToasts } from 'react-toast-notifications';

Modal.setAppElement('#root');

const Calendar = () => {

  // const patient = JSON.parse(localStorage.getItem("patientDetails"))
  let patient
  // const patientId = patient.patientId
  const [events, setEvents] = useState([])
  // const { addToast } = useToasts()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [disableButton, setDisableButton] = useState(false)

  const API_KEY = "AIzaSyCsw7BqvE8imVBayl1_8bxa7 - Tr0CAPjQk";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const CLIENT_ID =
    "403030062936-eq0anbg0f2r4ak5hj3je0qtein5kfh5q.apps.googleusercontent.com";
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const handleButton = (startDate) => {
    const ISOStartDate = new Date(startDate).toISOString()
    console.log("follow",ISOStartDate)
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          console.log("initialized client");

          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              console.log("authenticated");

              const event = {
                summary: "Follow-up TeleConsultation",
                start: {
                  dateTime: ISOStartDate,
                  timeZone: "Asia/Kolkata",
                },
                end: {
                  dateTime: ISOStartDate,
                  timeZone: "Asia/Kolkata",
                },
              };

              const request = gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
              });

              request.execute((event) => {
                console.log(`Event created: ${event.htmlLink}`);
                setDisableButton(true);
              });
            });
        });
    });

  }

  const fetchFollowUp = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getFollowUp/${patient?.patientId}`)
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          title: `${event.departmentName}`,
          start: event.followUpDate,
          description: event.observation,
          id: Math.random().toString(36).substring(7),
        }));
        setEvents(formattedEvents)
        // console.log("events",events)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    patient = JSON.parse(localStorage.getItem("patientDetails"))
    fetchFollowUp()
  }, [])

  return (
    <div className='container mx-auto font-serif' style={{ height: "100%", width: "100%", marginTop: "0" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'title',
          right: 'prevYear,prev,next,nextYear'
        }}
        events={events}
        // eventBackgroundColor='#172554'
        // eventDisplay='background'
        aspectRatio={1}
        contentHeight={'auto'}
        weekNumberCalculation={'auto'}
        buttonIcons={{
          prevYear: 'chevrons-left',
          nextYear: 'chevrons-right'
        }}
        themeSystem={'standard'}
        showNonCurrentDates={false}
        eventDidMount={(info) => {
          const popover = document.querySelector(`[aria-describedby='${info.event.id}']`);
          if (popover) {
            popover.classList.add("popoverStyle");
            popover.style.zIndex = 1000;
          }
        }}
        eventContent={(eventInfo) => {
          return (
            <div
              className="inline-flex justify-center w-full text-sm font-medium text-blue-950 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-0"
              onClick={() => handleEventClick(eventInfo)}
            >
              {eventInfo.event.title}
            </div>
          );
        }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        shouldCloseOnOverlayClick={true}
        className="bg-white border-2 border-blue-200 p-4 rounded-md shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed z-10 inset-0 bg-blue-50 bg-opacity-80"
      >
        {selectedEvent && (
          <div className='flex flex-col justify-center items-center space-y-2'>
            <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
            <p>{selectedEvent.extendedProps.description}</p>
            <p>{new Date(selectedEvent.start).toLocaleDateString()}</p>
            {disableButton ? (<button type='submit' className='bg-zinc-400 rounded-lg px-2 py-2' disabled >Added to google Calender</button>) : (<button type='submit' className='bg-blue-400 rounded-lg px-2 py-2' onClick={() => handleButton(selectedEvent.start)}>Add to google Calender</button>)}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Calendar;
