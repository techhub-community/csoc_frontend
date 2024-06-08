import React from "react";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { baseUrl } from "../data/consts";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleContact() {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(`${baseUrl}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          name,
          email,
          subject
        })
      });

      setSubmitting(false);
      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      alert(data.message);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="contact" className="bg-gray-100 p-6 pb-[60px]">
      <h1 className="text-4xl font-bold py-10" style={{ textAlign: "center" }}>
        Contact Us
      </h1>
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        <div className="min-w-72 bg-white shadow-lg rounded-lg p-6 flex-1 max-w-md md:max-w-xl">
          <div className="mb-4 flex">
            <FaMapMarkedAlt className="shrink-0 w-8 h-8 text-gray-700 mr-2" />
            <div>
              <h3 className="text-xl font-bold">Location</h3>
              <p>
                Sir M. Visvesvaraya Institute of Technology, Krishnadevaraya
                Nagar, Hunasamaranahalli, (Via) Yelahanka, Bangalore Rural
                Karnataka India 562157
              </p>
            </div>
          </div>
          <div className="mb-4 flex">
            <FaEnvelope className="shrink-0 w-8 h-8 text-gray-700 mr-2" />
            <div>
              <h3 className="text-xl font-bold">Email</h3>
              <p>codeshackcommunity@gmail.com</p>
            </div>
          </div>
          <div className="flex-grow">
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31081.44029965311!2d77.610017!3d13.151041!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae192ddf1ae00d%3A0xa150c6dea93315c!2sSir%20M.%20Visvesvaraya%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1717261298043!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="min-w-72 bg-white shadow-lg rounded-lg p-6 flex-1 max-w-md md:max-w-xl">
          <h3 className="text-xl font-bold mb-4">Reach Us</h3>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject of Concern
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-grow">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Leave Your Message
              </label>
              <textarea
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={submitting}
                onClick={handleContact}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
