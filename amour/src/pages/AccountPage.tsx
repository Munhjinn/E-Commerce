import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { RootState } from "../features/store";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  HomeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import OrangeWrapper from "../components/OrangeWrapper";

const AccountPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [address, setAddress] = useState("123 Main Street, Ulaanbaatar");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // 🧩 Хэрэглэгч гарах үед Login руу шилжүүлэх
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
  }, [auth.isLoggedIn, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
        <button
          onClick={() => dispatch(logout())}
          className="text-sm font-medium text-red-500 underline hover:text-red-600"
        >
          Logout
        </button>
      </div>

      <OrangeWrapper>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-10">
          {/* Profile Info */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label className="block text-gray-600 mb-2">Name</label>
                <div className="flex items-center border rounded-lg px-4 py-2">
                  <UserIcon className="h-6 w-6 text-yellow-500 mr-3" />
                  <div className="flex-1 flex items-center justify-between">
                    {isEditingName ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setIsEditingName(false)}
                        autoFocus
                        className="w-full focus:outline-none text-gray-800"
                      />
                    ) : (
                      <span className="text-gray-800">{name}</span>
                    )}
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="ml-3 text-yellow-500 hover:text-yellow-600"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-600 mb-2">Email</label>
                <div className="flex items-center border rounded-lg px-4 py-2">
                  <EnvelopeIcon className="h-6 w-6 text-yellow-500 mr-3" />
                  <div className="flex-1 flex items-center justify-between">
                    {isEditingEmail ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setIsEditingEmail(false)}
                        autoFocus
                        className="w-full focus:outline-none text-gray-800"
                      />
                    ) : (
                      <span className="text-gray-800">{email}</span>
                    )}
                    <button
                      onClick={() => setIsEditingEmail(true)}
                      className="ml-3 text-yellow-500 hover:text-yellow-600"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-2">Address</label>
                <div className="flex items-center border rounded-lg px-4 py-2">
                  <HomeIcon className="h-6 w-6 text-yellow-500 mr-3" />
                  <div className="flex-1 flex items-center justify-between">
                    {isEditingAddress ? (
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={() => setIsEditingAddress(false)}
                        autoFocus
                        className="w-full focus:outline-none text-gray-800"
                      />
                    ) : (
                      <span className="text-gray-800">{address}</span>
                    )}
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="ml-3 text-yellow-500 hover:text-yellow-600"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Order History */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Order History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-md">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Order Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ordered Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Delivered Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      2025-10-13
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      2025-10-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      $99.99
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </OrangeWrapper>
    </div>
  );
};

export default AccountPage;
