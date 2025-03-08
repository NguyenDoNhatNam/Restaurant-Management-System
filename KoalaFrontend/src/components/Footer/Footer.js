import React from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MdOutlinePhoneInTalk className="w-5 h-5 mr-2" />
                <span>098 - 224 - 3038</span>
              </li>
              <li className="flex items-center">
                <MdMailOutline className="w-5 h-5 mr-2" />
                <div>koalarestaurant@gmail.com</div>
              </li>
              <li>A35 Bach Dang, Tan Binh, HCM City, Viet Nam</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Opening Times</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaRegClock className="w-5 h-5 mr-2" />
                <span>Monday - Sunday: 7am - 10pm</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Thank You</h2>
            <p className="mb-4">
              We appreciate your business and look forward to serving you. Thank
              you for choosing us!
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span>Le Huu Tuong</span>
              </li>
              <li className="flex items-center">
                <span>Nguyen Quoc Thang</span>
              </li>
              <li className="flex items-center">
                <span>Nguyen Do Nhat Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>
            &copy; {new Date().getFullYear()} Koala Restaurant. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
