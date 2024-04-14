import React from "react";

const MatchedJobs = () => {
  const topics = [
    {
      title: "Google",
      message:
        "Your profile has been matched with Software Engi 1 start end end time",
    },
    {
      title: "Facebook",
      message:
        "Your profile has been matched with Software Engi 1 start end end time",
    },
    {
      title: "Amazon",
      message:
        "Your profile has been matched with Software Engi 1 start end end time",
    },
    // ... other topics
  ];

  return (
    <div className="max-w-[90%] mx-auto bg-white shadow rounded">
      {topics.map((topic, index) => (
        <TopicItem key={index} {...topic} />
      ))}
    </div>
  );
};

export default MatchedJobs;

const TopicItem = ({ title, message }) => {
  return (
    <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
