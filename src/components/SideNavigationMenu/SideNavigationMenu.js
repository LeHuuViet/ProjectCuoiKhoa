import React from "react";
import "./SideNavigationMenu.scss";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"

function SideNavigationMenu() {
  return (
    <div className="sideNavigationMenu">
      <Accordion defaultIndex={[0]} allowMultiple>
        {/* <AccordionItem>
          <h2>
            <AccordionButton className="sidebar-button">
              <Box flex="1" textAlign="left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M447 56.25C443.5 42 430.7 31.1 416 31.1H96c-14.69 0-27.47 10-31.03 24.25L3.715 304.9C1.247 314.9 0 325.2 0 335.5v96.47c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-96.47c0-10.32-1.247-20.6-3.715-30.61L447 56.25zM352 352H160L128 288H72.97L121 96h270l48.03 192H384L352 352z" />
                </svg>
                Orders
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul className="sidebar-items">
              <li>
                <a href="">
                  Orders list
                </a>
              </li>
              <li>
                <a href="">
                  Abandoned carts
                </a>
              </li>
              <li>
                <a href="">
                  Accounting
                </a>
              </li>
              <li>
                <a href="">
                  Payment transactions
                </a>
              </li>
              <li>
                <a href="">
                  Vendor statistics
                </a>
              </li>
              <li>
                <a href="">
                  Vendor transactions
                </a>
              </li>
              <li>
                <a href="">
                  Returns
                </a>
              </li>
              <li>
                <a href="">
                  Messages
                </a>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem> */}
        <AccordionItem>
          <h2>
            <AccordionButton className="sidebar-button">
              <Box flex="1" textAlign="left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L418.7 226.7C443.7 251.7 443.7 292.3 418.7 317.3L285.3 450.7C260.3 475.7 219.7 475.7 194.7 450.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5V80C0 53.49 21.49 32 48 32L48 32zM112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176z" />
                </svg>
                Catalog{" "}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul className="sidebar-items">
              <li>
                <Link to="/pages/products">
                  Products
                </Link>
              </li>
              {/* <li>
                <a href="">
                  Reviews
                </a>
              </li>
              <li>
                <a href="">
                  Product tabs
                </a>
              </li>
              <li>
                <a href="">
                  Brand
                </a>
              </li>
              <li>
                <a href="">
                  Import
                </a>
              </li>
              <li>
                <a href="">
                  Exports
                </a>
              </li>
              <li>
                <a href="">
                  Watched products
                </a>
              </li> */}
            </ul>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton className="sidebar-button">
              <Box flex="1" textAlign="left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z" />
                </svg>
                User{" "}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul className="sidebar-items">
              <li>
                <Link to="/pages/users">
                  User lists
                </Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
        {/* <AccordionItem>
          <h2>
            <AccordionButton className="sidebar-button">
              <Box flex="1" textAlign="left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z" />
                </svg>
                Sales channels
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul className="sidebar-items">
              <li>
                <a href="" className="dropdown_item-1">
                  Google product feed
                </a>
              </li>
              <li>
                <a href="" className="dropdown_item-2">
                  Facebook Ads & Instagram Ads
                </a>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
}

export default SideNavigationMenu;
