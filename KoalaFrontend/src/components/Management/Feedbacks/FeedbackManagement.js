import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import submission from "../../../utils/submission";

const FeedbackManagement = () => {
  const { tokens } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await submission("feedback/", "get", null, {
          Authorization: `Bearer ${tokens?.access}`,
        });
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, [tokens]);

  const handleDeleteFeedback = async (id) => {
    try {
      await submission(`feedback/${id}/`, "delete", null, {
        Authorization: `Bearer ${tokens?.access}`,
      });
      setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Feedback Management</h1>
      {feedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Feedback
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {fb.feedback}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteFeedback(fb.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;
