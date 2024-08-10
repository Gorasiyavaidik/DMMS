import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo/logo.svg';
import SidebarLinkGroup from './SidebarLinkGroup.jsx';



const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        {/* <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink> */}

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <NavLink
                to="/"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                  pathname.includes('dashboard')) &&
                  'bg-graydark dark:bg-meta-4'
                  }`}
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                    fill=""
                  />
                  <path
                    d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                    fill=""
                  />
                  <path
                    d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                    fill=""
                  />
                  <path
                    d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                    fill=""
                  />
                </svg>
                Dashboard
              </NavLink>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Inventory --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/inventory' || pathname.includes('inventory')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/inventory' ||
                          pathname.includes('inventory')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                       
                        <svg fill="#fafafa" height="18px" width="18px" version="1.1" id="Layer_1" 
                        
                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 428.733 428.733" xmlSpace="preserve" stroke="#fafafa"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M300.288,79.316H132.5L46.838,139.64l169.554,185.426l0.015-0.015l0.005-0.005l0.021-0.026l169.513-185.385 L300.288,79.316z M216.397,139.22h-80.865l72.602,166.815L56.991,140.741l1.643-1.157l76.897-0.363h-0.021L165.99,86.06h50.406 V139.22z M224.737,305.948l-8.32,9.103V139.22h80.865L258.586,86.06h39.567l76.006,53.524l-76.851-0.363L224.737,305.948z"></path> <path d="M384.415,222.252h-55.721l-28.344,30.996h40.643v90.982l-4.306-4.71l-37.161-85.371l-22.82,24.955l64.276,70.293 l0.01,0.01l0.005,0.01l87.736-95.949L384.415,222.252z M341.002,253.248v-27.51h26.081l15.775,27.51h-0.01l39.787,0.189 l0.85,0.599l-78.208,85.53l37.571-86.318H341.002z"></path> <path d="M129.603,253.248l-37.55,86.272l-4.306,4.71v-90.982h41.846l-11.121-15.278L104.1,222.251H44.324L0,253.468l87.736,95.949 l0.005-0.01l0.01-0.01l66.304-72.509l-21.601-23.624L129.603,253.248z M45.891,253.248l37.565,86.318l-78.203-85.53l0.85-0.599 L45.891,253.248h-0.01l15.775-27.51h26.081c0,0,0,27.51,0,27.51H45.891z"></path> </g> </g> </g></svg>
                        Inventory
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/inventory/inventory"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Inventory
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/inventory/adddiamond"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Add Diamonds
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/inventory/selldiamond"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sell Diamonds
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Inventory --> */}
              
                {/* <!-- financial report  */}
                <NavLink
                to="/financialreport"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/financialreport' ||
                  pathname.includes('financialreport')) &&
                  'bg-graydark dark:bg-meta-4'
                  }`}
              >
                <svg fill="#ffffff" height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.2 490.2" xmlSpace="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M368.4,245.1c0,12.9-10.5,23.4-23.4,23.4s-23.4-10.5-23.4-23.4s10.5-23.4,23.4-23.4S368.4,232.2,368.4,245.1z M76.1,245.1 c0,12.9,10.5,23.4,23.4,23.4s23.4-10.5,23.4-23.4s-10.5-23.4-23.4-23.4S76.1,232.2,76.1,245.1z M38.5,382.7h268v-32.9H78.1 c0.4-2.3,0.7-4.7,0.7-7.2c0-21.5-17.5-39-39-39c-2.3,0-4.6,0.2-6.8,0.6V185.9c2.2,0.4,4.5,0.6,6.8,0.6c21.5,0,39-17.5,39-39 c0-2.5-0.2-4.8-0.7-7.2h286.1c-0.8,3-1.2,6.2-1.2,9.5c0,21.5,17.5,39,39,39c3.3,0,6.6-0.4,9.6-1.2v79.9h32.9V146 c0-21.2-17.3-38.5-38.5-38.5H38.5C17.3,107.5,0,124.8,0,146v198.2C0,365.4,17.3,382.7,38.5,382.7z M321.6,355.1 c-2.7,0-4.9,2.2-4.9,4.9v17.8c0,2.7,2.2,4.9,4.9,4.9h118c2.7,0,4.9-2.2,4.9-4.9V360c0-2.7-2.2-4.9-4.9-4.9H321.6z M467.4,339.1 v-17.8c0-2.7-2.2-4.9-4.9-4.9h-118c-2.7,0-4.9,2.2-4.9,4.9v17.8c0,2.7,2.2,4.9,4.9,4.9h118C465.2,344,467.4,341.8,467.4,339.1z M485.3,277.7h-118c-2.7,0-4.9,2.2-4.9,4.9v17.8c0,2.7,2.2,4.9,4.9,4.9h118c2.7,0,4.9-2.2,4.9-4.9v-17.8 C490.2,279.9,488,277.7,485.3,277.7z M222.3,160.7c46.6,0,84.4,37.8,84.4,84.4s-37.8,84.4-84.4,84.4s-84.4-37.8-84.4-84.4 S175.6,160.7,222.3,160.7z M229.7,182.4h-9.6c-1.5,0-2.6,1.2-2.6,2.6v11.5c-7.3,1.1-13.3,3.7-17.8,8.1c-5,4.8-7.5,10.9-7.5,18.4 c0,8.2,2.4,14.5,7.1,18.7c4.7,4.2,12.3,8.4,22.6,12.6c4.3,1.8,7.2,3.7,8.9,5.6c1.7,1.9,2.5,4.6,2.5,8.1c0,3-0.8,5.4-2.4,7.3 c-1.6,1.8-4,2.8-7.2,2.8c-3.8,0-6.9-1.2-9.2-3.6c-1.9-2-3.1-5-3.4-9c-0.1-1.6-1.5-2.8-3.1-2.7l-15.8,0.3c-1.7,0-3.1,1.5-3.1,3.2 c0.4,8.4,3.1,14.8,8.1,19.4c5.4,4.9,12.2,7.9,20.3,8.8v10.8c0,1.5,1.2,2.6,2.6,2.6h9.6c1.5,0,2.6-1.2,2.6-2.6v-11.2 c6.5-1.2,11.8-3.8,15.9-7.7c4.8-4.7,7.2-10.8,7.2-18.5c0-8-2.4-14.2-7.2-18.6c-4.8-4.3-12.3-8.7-22.5-13c-4.4-1.9-7.4-3.8-9-5.7 s-2.4-4.4-2.4-7.4s0.7-5.4,2.2-7.4c1.5-1.9,3.8-2.9,6.9-2.9c3.1,0,5.5,1.2,7.4,3.5c1.5,1.9,2.4,4.5,2.7,8c0.1,1.6,1.6,2.7,3.1,2.7 l15.8-0.2c1.7,0,3.2-1.5,3.1-3.2c-0.4-6.9-2.6-12.7-6.7-17.4c-4.2-4.9-9.7-8-16.6-9.4V185C232.3,183.5,231.1,182.4,229.7,182.4z"></path> </g> </g> </g></svg>
                
                {/* <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 39.66 39.66" width="18px" height="18px" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="_x31__143_"> <g> <path d="M4.619,15.479c0.888,3.39,3.752,6.513,7.382,6.513c3.684,0,6.594-3.109,7.504-6.49c0.346-0.039,0.632-0.303,0.663-0.663 l0.115-1.336c0.029-0.348-0.189-0.646-0.506-0.756c-0.006-0.08-0.008-0.161-0.017-0.24c-0.068-3.062-0.6-5.534-3.01-6.556 c-2.544-1.078-4.786-1.093-6.432-0.453C10.21,5.541,9.931,5.912,9.822,5.979C9.713,6.046,9.136,5.856,8.917,5.907 c-3.61,0.516-4.801,3.917-4.538,6.569C4.371,12.55,4.366,12.625,4.36,12.7c-0.349,0.087-0.599,0.404-0.567,0.774l0.114,1.336 C3.94,15.188,4.25,15.462,4.619,15.479z M5.388,12.833c1.581-0.579,4.622-1.79,4.952-2.426c1.383,1.437,6.267,2.244,8.411,2.513 c0.009,0.139,0.021,0.274,0.021,0.414c0,3.525-2.958,7.623-6.771,7.623c-3.799,0-6.638-4.024-6.638-7.623 C5.362,13.165,5.375,13,5.388,12.833z"></path> <path d="M17.818,20.777c-0.19-0.029-0.376,0.014-0.498,0.063l-3.041,4.113l-2.307-1.84l-0.014,0.012v0.013l-0.003-0.003 l-2.307,1.84l-3.041-4.113c-0.121-0.05-0.308-0.093-0.498-0.064C0.364,21.608,0,34.584,0,34.584l11.969,0.008v-0.021 l11.958-0.008C23.928,34.563,23.562,21.587,17.818,20.777z"></path> <path d="M23.997,15.302c0.72,2.75,3.044,5.281,5.987,5.281c2.988,0,5.349-2.521,6.087-5.264c0.28-0.032,0.513-0.245,0.538-0.537 l0.093-1.083c0.024-0.283-0.154-0.525-0.411-0.614c-0.004-0.063-0.007-0.13-0.014-0.193c-0.055-2.483-0.486-4.49-2.44-5.318 c-2.063-0.874-3.882-0.887-5.217-0.368c-0.087,0.035-0.313,0.336-0.401,0.392c-0.09,0.055-0.557-0.101-0.734-0.059 c-2.928,0.418-3.895,3.177-3.682,5.328c-0.007,0.061-0.01,0.121-0.015,0.182c-0.283,0.071-0.485,0.328-0.459,0.627l0.092,1.083 C23.446,15.065,23.698,15.288,23.997,15.302z M24.62,13.155c1.282-0.47,3.75-1.452,4.017-1.968 c1.123,1.164,5.084,1.818,6.822,2.039c0.008,0.11,0.018,0.222,0.018,0.335c0,2.858-2.398,6.183-5.492,6.183 c-3.082,0-5.385-3.264-5.385-6.183C24.6,13.425,24.609,13.29,24.62,13.155z"></path> <path d="M34.703,19.6c-0.154-0.024-0.305,0.011-0.402,0.05l-2.468,3.337l-1.871-1.492l-0.011,0.009v0.011l-0.003-0.002 l-1.871,1.492l-2.468-3.337c-0.098-0.04-0.25-0.073-0.402-0.05c-1.521,0.214-2.574,1.482-3.307,3.089 c0.433,0.669,1.043,1.736,1.56,3.14c0.515,1.395,0.856,3.295,1.078,4.958l5.422,0.003v-0.018l9.7-0.006 C39.659,30.781,39.363,20.254,34.703,19.6z"></path> </g> </g> </g> </g></svg> */}
                Financial Report
              </NavLink>
                {/* <!-- financial report  */}



              {/* <!-- Menu Item Individuals --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/Individuals' || pathname.includes('Individuals')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/Individuals' ||
                          pathname.includes('Individuals')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                       
                          <svg fill="#f9f5f5" width="18px" height="18px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg>
                          
                        Individuals
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>


                        
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="individuals/addIndividual"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Add Individuals
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/individuals/Buyer"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Buyer
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/individuals/Seller"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Seller
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/individuals/Broker"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Broker
                            </NavLink>
                          </li>

                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Staff/workshop --> */}

              <NavLink
                to="/staff"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/staff' ||
                  pathname.includes('staff')) &&
                  'bg-graydark dark:bg-meta-4'
                  }`}
              >
                
                <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 39.66 39.66" width="18px" height="18px" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="_x31__143_"> <g> <path d="M4.619,15.479c0.888,3.39,3.752,6.513,7.382,6.513c3.684,0,6.594-3.109,7.504-6.49c0.346-0.039,0.632-0.303,0.663-0.663 l0.115-1.336c0.029-0.348-0.189-0.646-0.506-0.756c-0.006-0.08-0.008-0.161-0.017-0.24c-0.068-3.062-0.6-5.534-3.01-6.556 c-2.544-1.078-4.786-1.093-6.432-0.453C10.21,5.541,9.931,5.912,9.822,5.979C9.713,6.046,9.136,5.856,8.917,5.907 c-3.61,0.516-4.801,3.917-4.538,6.569C4.371,12.55,4.366,12.625,4.36,12.7c-0.349,0.087-0.599,0.404-0.567,0.774l0.114,1.336 C3.94,15.188,4.25,15.462,4.619,15.479z M5.388,12.833c1.581-0.579,4.622-1.79,4.952-2.426c1.383,1.437,6.267,2.244,8.411,2.513 c0.009,0.139,0.021,0.274,0.021,0.414c0,3.525-2.958,7.623-6.771,7.623c-3.799,0-6.638-4.024-6.638-7.623 C5.362,13.165,5.375,13,5.388,12.833z"></path> <path d="M17.818,20.777c-0.19-0.029-0.376,0.014-0.498,0.063l-3.041,4.113l-2.307-1.84l-0.014,0.012v0.013l-0.003-0.003 l-2.307,1.84l-3.041-4.113c-0.121-0.05-0.308-0.093-0.498-0.064C0.364,21.608,0,34.584,0,34.584l11.969,0.008v-0.021 l11.958-0.008C23.928,34.563,23.562,21.587,17.818,20.777z"></path> <path d="M23.997,15.302c0.72,2.75,3.044,5.281,5.987,5.281c2.988,0,5.349-2.521,6.087-5.264c0.28-0.032,0.513-0.245,0.538-0.537 l0.093-1.083c0.024-0.283-0.154-0.525-0.411-0.614c-0.004-0.063-0.007-0.13-0.014-0.193c-0.055-2.483-0.486-4.49-2.44-5.318 c-2.063-0.874-3.882-0.887-5.217-0.368c-0.087,0.035-0.313,0.336-0.401,0.392c-0.09,0.055-0.557-0.101-0.734-0.059 c-2.928,0.418-3.895,3.177-3.682,5.328c-0.007,0.061-0.01,0.121-0.015,0.182c-0.283,0.071-0.485,0.328-0.459,0.627l0.092,1.083 C23.446,15.065,23.698,15.288,23.997,15.302z M24.62,13.155c1.282-0.47,3.75-1.452,4.017-1.968 c1.123,1.164,5.084,1.818,6.822,2.039c0.008,0.11,0.018,0.222,0.018,0.335c0,2.858-2.398,6.183-5.492,6.183 c-3.082,0-5.385-3.264-5.385-6.183C24.6,13.425,24.609,13.29,24.62,13.155z"></path> <path d="M34.703,19.6c-0.154-0.024-0.305,0.011-0.402,0.05l-2.468,3.337l-1.871-1.492l-0.011,0.009v0.011l-0.003-0.002 l-1.871,1.492l-2.468-3.337c-0.098-0.04-0.25-0.073-0.402-0.05c-1.521,0.214-2.574,1.482-3.307,3.089 c0.433,0.669,1.043,1.736,1.56,3.14c0.515,1.395,0.856,3.295,1.078,4.958l5.422,0.003v-0.018l9.7-0.006 C39.659,30.781,39.363,20.254,34.703,19.6z"></path> </g> </g> </g> </g></svg>
                staff
              </NavLink>
              <NavLink
                to="/workshop"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/workshop' ||
                  pathname.includes('workshop')) &&
                  'bg-graydark dark:bg-meta-4'
                  }`}
              >
                {/* <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                    fill=""
                  />
                  <path
                    d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                    fill=""
                  />
                  <path
                    d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                    fill=""
                  />
                  <path
                    d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                    fill=""
                  />
                </svg> */}
                <svg fill="#fffafa" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 253" enableBackground="new 0 0 256 253" xmlSpace="preserve" width="18px" height="18px"stroke="#fffafa"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2,69c0,13.678,9.625,25.302,22,29.576V233H2v18h252v-18h-22V98.554c12.89-3.945,21.699-15.396,22-29.554v-8H2V69z M65.29,68.346c0,6.477,6.755,31.47,31.727,31.47c21.689,0,31.202-19.615,31.202-31.47c0,11.052,7.41,31.447,31.464,31.447 c21.733,0,31.363-20.999,31.363-31.447c0,14.425,9.726,26.416,22.954,30.154V233H42V98.594C55.402,94.966,65.29,82.895,65.29,68.346 z M254,54H2l32-32V2h189v20h-0.168L254,54z M167.877,202.446c0.13,1.168,0,2.551-0.303,3.849l-11.027-10.162l-9.946,10.854 l11.157,10.119c-1.297,0.432-2.551,0.735-3.849,0.735c-3.849,0.13-7.135-1.038-9.946-3.589c-2.811-2.681-4.324-5.795-4.454-9.643 c0-1.341,0.13-2.854,0.432-4.151l-2.681-2.551l-16.043-14.66L94.06,213.17c-1.643,2.205-4.195,3.719-7.135,3.719 c-4.757,0-8.605-3.849-8.605-8.605c0-2.551,0.995-4.887,2.941-6.53l28.195-29.233L92.417,156.91 c-1.341,0.605-2.854,0.908-4.151,0.908c-3.849,0.13-7.135-1.038-9.946-3.589s-4.324-5.665-4.454-9.514 c-0.13-1.168,0-2.551,0.303-3.849l11.157,10.119l9.86-10.811l-11.157-10.119c1.168-0.432,2.551-0.735,3.849-0.735 c3.849-0.13,7.135,1.038,9.946,3.589c2.811,2.508,4.324,5.795,4.454,9.643c0.13,1.297,0,2.551-0.303,3.849l17.557,16.087 l12.843-13.881l-19.2-16.908l17.427-19.849l49.341,43.417l-17.427,19.849l-19.719-17.384l-12.411,14.66l19.287,17.643 c1.297-0.432,2.551-0.735,3.849-0.735c3.849-0.13,7.135,1.038,9.946,3.589C166.277,195.397,167.79,198.511,167.877,202.446z"></path> </g></svg>
                workshop
              </NavLink>

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Calendar
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Forms --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.43425 7.5093H2.278C2.44675 7.5093 2.55925 7.3968 2.58737 7.31243L2.98112 6.32805H5.90612L6.27175 7.31243C6.328 7.48118 6.46862 7.5093 6.58112 7.5093H7.453C7.76237 7.48118 7.87487 7.25618 7.76237 7.03118L5.428 1.4343C5.37175 1.26555 5.3155 1.23743 5.14675 1.23743H3.88112C3.76862 1.23743 3.59987 1.29368 3.57175 1.4343L1.153 7.08743C1.0405 7.2843 1.20925 7.5093 1.43425 7.5093ZM4.47175 2.98118L5.3155 5.17493H3.59987L4.47175 2.98118Z"
                            fill=""
                          />
                          <path
                            d="M10.1249 2.5031H16.8749C17.2124 2.5031 17.5218 2.22185 17.5218 1.85623C17.5218 1.4906 17.2405 1.20935 16.8749 1.20935H10.1249C9.7874 1.20935 9.47803 1.4906 9.47803 1.85623C9.47803 2.22185 9.75928 2.5031 10.1249 2.5031Z"
                            fill=""
                          />
                          <path
                            d="M16.8749 6.21558H10.1249C9.7874 6.21558 9.47803 6.49683 9.47803 6.86245C9.47803 7.22808 9.75928 7.50933 10.1249 7.50933H16.8749C17.2124 7.50933 17.5218 7.22808 17.5218 6.86245C17.5218 6.49683 17.2124 6.21558 16.8749 6.21558Z"
                            fill=""
                          />
                          <path
                            d="M16.875 11.1656H1.77187C1.43438 11.1656 1.125 11.4469 1.125 11.8125C1.125 12.1781 1.40625 12.4594 1.77187 12.4594H16.875C17.2125 12.4594 17.5219 12.1781 17.5219 11.8125C17.5219 11.4469 17.2125 11.1656 16.875 11.1656Z"
                            fill=""
                          />
                          <path
                            d="M16.875 16.1156H1.77187C1.43438 16.1156 1.125 16.3969 1.125 16.7625C1.125 17.1281 1.40625 17.4094 1.77187 17.4094H16.875C17.2125 17.4094 17.5219 17.1281 17.5219 16.7625C17.5219 16.3969 17.2125 16.1156 16.875 16.1156Z"
                            fill="white"
                          />
                        </svg>
                        Forms
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/forms/form-elements"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Form Elements
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Form Layout
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Tables --> */}
              {/* <li>
                <NavLink
                  to="/tables"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9756)">
                      <path
                        d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9756">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Tables
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Tables --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3> */}

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              {/* <li>
                <NavLink
                  to="/chart"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9801)">
                      <path
                        d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                        fill=""
                      />
                      <path
                        d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9801">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Chart
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Ui Elements --> */}
              {/* <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/ui' || pathname.includes('ui')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9807)">
                            <path
                              d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V7.53335C0.506348 8.4896 1.29385 9.2771 2.2501 9.2771H15.7501C16.7063 9.2771 17.4938 8.4896 17.4938 7.53335V2.3021C17.4938 1.34585 16.7063 0.55835 15.7501 0.55835ZM16.2563 7.53335C16.2563 7.8146 16.0313 8.0396 15.7501 8.0396H2.2501C1.96885 8.0396 1.74385 7.8146 1.74385 7.53335V2.3021C1.74385 2.02085 1.96885 1.79585 2.2501 1.79585H15.7501C16.0313 1.79585 16.2563 2.02085 16.2563 2.3021V7.53335Z"
                              fill=""
                            />
                            <path
                              d="M6.13135 10.9646H2.2501C1.29385 10.9646 0.506348 11.7521 0.506348 12.7083V15.8021C0.506348 16.7583 1.29385 17.5458 2.2501 17.5458H6.13135C7.0876 17.5458 7.8751 16.7583 7.8751 15.8021V12.7083C7.90322 11.7521 7.11572 10.9646 6.13135 10.9646ZM6.6376 15.8021C6.6376 16.0833 6.4126 16.3083 6.13135 16.3083H2.2501C1.96885 16.3083 1.74385 16.0833 1.74385 15.8021V12.7083C1.74385 12.4271 1.96885 12.2021 2.2501 12.2021H6.13135C6.4126 12.2021 6.6376 12.4271 6.6376 12.7083V15.8021Z"
                              fill=""
                            />
                            <path
                              d="M15.75 10.9646H11.8688C10.9125 10.9646 10.125 11.7521 10.125 12.7083V15.8021C10.125 16.7583 10.9125 17.5458 11.8688 17.5458H15.75C16.7063 17.5458 17.4938 16.7583 17.4938 15.8021V12.7083C17.4938 11.7521 16.7063 10.9646 15.75 10.9646ZM16.2562 15.8021C16.2562 16.0833 16.0312 16.3083 15.75 16.3083H11.8688C11.5875 16.3083 11.3625 16.0833 11.3625 15.8021V12.7083C11.3625 12.4271 11.5875 12.2021 11.8688 12.2021H15.75C16.0312 12.2021 16.2562 12.4271 16.2562 12.7083V15.8021Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9807">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        UI Elements
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/ui/alerts"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Alerts
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/ui/buttons"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Buttons
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Ui Elements --> */}

              {/* <!-- Menu Item Auth Pages --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/auth' || pathname.includes('auth')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9814)">
                            <path
                              d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                              fill=""
                            />
                            <path
                              d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9814">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Authentication
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink> */}
              {/* <!-- Dropdown Menu Start --> */}
              {/* <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/auth/signin"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sign In
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/auth/signup"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sign Up
                            </NavLink>
                          </li>
                        </ul>
                      </div> */}
              {/* <!-- Dropdown Menu End --> */}
              {/* </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
