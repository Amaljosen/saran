import React, { useState } from "react";
import axios from "axios";
import { MdEditDocument } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

const AddSessions = () => {
  const [formData, setFormData] = useState({
    session_image: null,
    session_name: "",
    session_mode: "",
    price: "",
    description: "",
    date: "2024-12-14 & 2024-12-15 (Saturday & Sunday)",
    time: "1:00 PM - 4:00 PM",
    session_platform: "Zoom",
    session_kit: "",
    language: "Tamil",
    kit_info: "",
    learn1: "",
    learn2: "",
    learn3: "",
    other_benefits_1: "",
    other_benefits_2: "",
    other_benefits_3: "",
  });

  const [groupName,setGroupName]=useState('')
  const [whatsappLink,setWhatsappLink]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "session_image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  formData.session_mode;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading popup
    setIsSubmitted(false);

    try {
      const sessionFormData = new FormData();
      sessionFormData.append("session_image", formData.session_image);
      sessionFormData.append("session_name", formData.session_name);
      sessionFormData.append("session_mode", formData.session_mode);
      sessionFormData.append("price", formData.price);
      sessionFormData.append("description", formData.description);
      sessionFormData.append("date", formData.date);
      sessionFormData.append("time", formData.time);
      sessionFormData.append("session_platform", formData.session_platform);
      sessionFormData.append("session_kit", formData.session_kit);

      const sessionResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/v1/session`,
        sessionFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const sessionDescriptionData = {
        session_id: sessionResponse.data.data.session_id,
        language: formData.language,
        kit_info: formData.kit_info,
        learn1: formData.learn1,
        learn2: formData.learn2,
        learn3: formData.learn3,
        other_benefits_1: formData.other_benefits_1,
        other_benefits_2: formData.other_benefits_2,
        other_benefits_3: formData.other_benefits_3,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/v1/session-description`,
        sessionDescriptionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const courseData = {
        session_id: sessionResponse.data.data.session_id,
        course_name:groupName,
        group_link:whatsappLink,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/v1/create-course`,
        courseData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setFormData({
        session_image: null,
        session_name: "",
        session_mode: "",
        price: "",
        description: "",
        date: "2024-12-14 & 2024-12-15 (Saturday & Sunday)",
        time: "1:00 PM - 4:00 PM",
        session_platform: "Zoom",
        session_kit: "",
        language: "Tamil",
        kit_info: "",
        learn1: "",
        learn2: "",
        learn3: "",
        other_benefits_1: "",
        other_benefits_2: "",
        other_benefits_3: "",
      });
      setGroupName("")
      setWhatsappLink("")

      setIsLoading(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error while submitting:", error);
      alert("Failed to submit session data. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-4 mb-10 text-black">
      {isLoading && (
        <div className="fixed inset-0 p-6 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl flex flex-col items-center justify-center max-w-md w-full">
            <div>
              <lord-icon
                id="success-icon"
                src="https://cdn.lordicon.com/mwikjdwh.json"
                trigger="loop" // Set to loop to repeat the animation
                style={{ width: "80px", height: "80px" }}
                colors="primary:#8C4CFF"
              ></lord-icon>
            </div>
            <p className="text-center md:text-base text-sm text-gray-600 mt-2">
              Adding Sessions Please wait for Sometimes....
            </p>
            <div className="  mt-3 w-full"></div>
          </div>
        </div>
      )}

      {isSubmitted && (
        <div className="fixed inset-0 p-8 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 flex flex-col items-center justify-center rounded max-w-md w-full">
            <h2 className="text-center md:text-base text-sm font-semibold text-gray-700">
              Your Sessions was Added successfully!
            </h2>
            <div>
              <lord-icon
                id="success-icon"
                src="https://cdn.lordicon.com/oqdmuxru.json"
                trigger="in" // Set to loop to repeat the animation
                style={{ width: "80px", height: "80px" }}
                colors="primary:#16c72e"
              ></lord-icon>
            </div>
            <p className="text-center md:text-base text-xs text-gray-600 mt-2">
              Explore Home Page for More sessions
            </p>
            <div className="mt-3 w-full">
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-red-500 md:hover:scale-105 transition-all duration-300 text-white py-2 px-4 rounded w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff]">
          <div className="flex space-x-2 text-[#000000] text-sm md:text-base font-semibold p-2 items-center">
            <h1>Add New Sessions</h1>
            <MdEditDocument className="text-xl" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Session Image</label>
          <input
            type="file"
            name="session_image"
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="session_name"
            placeholder="Session Name"
            value={formData.session_name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="time"
            placeholder="Time"
            value={formData.time}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <select
          name="session_mode"
          value={formData.session_mode}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        >
          <option value="" disabled>
            Select Session Mode
          </option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <input
          type="text"
          name="session_platform"
          placeholder="Session Platform"
          value={formData.session_platform}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <select
          name="session_kit"
          value={formData.session_kit}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        >
          <option value="" disabled>
            Select Session Kit
          </option>
          <option value="Provided">Provided</option>
          <option value="Not Provided">Not Provided</option>
        </select>

        <input
          type="text"
          name="language"
          placeholder="Language"
          value={formData.language}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        <textarea
          name="kit_info"
          placeholder="Kit Information"
          value={formData.kit_info}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />

        {[1, 2, 3].map((num) => (
          <input
            key={num}
            type="text"
            name={`learn${num}`}
            placeholder={`What will you learn? (Point ${num})`}
            value={formData[`learn${num}`]}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        ))}

        {[1, 2, 3].map((num) => (
          <input
            key={num}
            type="text"
            name={`other_benefits_${num}`}
            placeholder={`Other Benefits (Point ${num})`}
            value={formData[`other_benefits_${num}`]}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        ))}

        <div className="bg-[#e9e9e9] w-full border-l-4 border-[#8c4cff]">
          <div className="flex space-x-2 text-[#000000] text-sm md:text-lg font-semibold p-2 items-center">
            <IoLogoWhatsapp className="text-xl"/>
            <h1>Whatsapp Link</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="group_name"
            placeholder="Course Name"
            value={groupName}
            onChange={(e)=>setGroupName(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="whatsapp_link"
            placeholder="Whatsapp Link"
            value={whatsappLink}
            onChange={(e)=>setWhatsappLink(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="">
          <button
            type="submit"
            className="px-4 py-2 rounded w-48  border bg-[#8c4cff] text-white md:hover:scale-105 transition-all duration-300 text-white'"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSessions;
