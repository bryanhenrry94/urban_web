import React, { useState } from "react";

const NotificationsForm: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      emailNotifications,
      smsNotifications,
      pushNotifications,
    });
    alert("Your notification preferences have been saved!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Notifications */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="emailNotifications"
          className="text-gray-700 font-medium"
        >
          Notificaciones por correo electrónico
        </label>
        <input
          type="checkbox"
          id="emailNotifications"
          checked={emailNotifications}
          onChange={(e) => setEmailNotifications(e.target.checked)}
          className="w-5 h-5 text-green-600 rounded focus:ring focus:ring-green-300 focus:outline-none"
        />
      </div>

      {/* SMS Notifications */}
      <div className="flex items-center justify-between">
        <label htmlFor="smsNotifications" className="text-gray-700 font-medium">
          Notificaciones por SMS
        </label>
        <input
          type="checkbox"
          id="smsNotifications"
          checked={smsNotifications}
          onChange={(e) => setSmsNotifications(e.target.checked)}
          className="w-5 h-5 text-green-600 rounded focus:ring focus:ring-green-300 focus:outline-none"
        />
      </div>

      {/* Push Notifications */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="pushNotifications"
          className="text-gray-700 font-medium"
        >
          Notificaciones Push
        </label>
        <input
          type="checkbox"
          id="pushNotifications"
          checked={pushNotifications}
          onChange={(e) => setPushNotifications(e.target.checked)}
          className="w-5 h-5 text-green-600 rounded focus:ring focus:ring-green-300 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
      >
        Guardar
      </button>
    </form>
  );
};

export default NotificationsForm;
