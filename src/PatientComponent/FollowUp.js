import React, { useState } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Popover } from '@headlessui/react'
import "../index.css"

const FollowUp = () => {
  const [events, setEvents] = useState([
    {
      title: "Event 1",
      start: new Date(2023, 3, 26),
      end: new Date(2023, 3, 26),
    },
    {
      title: "Event 2",
      start: new Date(2023, 4, 25),
      end: new Date(2023, 4, 25),
    },
  ]);
  return (
    <div className='bg-white'>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"auto"}
        events={events}
        eventColor={'red'}
        eventBackgroundColor='red'
        eventBorderColor='black'
        eventDisplay='auto'
        eventDidMount={(info) => {
          const popover = document.querySelector(`[aria-describedby='${info.event.id}']`);
          if (popover) {
            popover.classList.add("popoverStyle");
          }
        }}
        eventContent={(eventInfo) => {
          return (
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {eventInfo.event.title}
                  </Popover.Button>
                  <Popover.Panel className="absolute z-20 w-64 p-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <p>Please subscribe <strong>Tailwind CSS Popover</strong>.</p>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          );
        }}
      />
    </div>
  );
};

export default FollowUp;
