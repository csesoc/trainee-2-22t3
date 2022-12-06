const sampleData = {
  users: [
    {
      username: "name",
      password: "encrypted=password",
      email: "email@email.com",
      profileImg: "../public/img_name",
      token: "trhdrtdyrthd",
      tasks: ["tasks._id"],
      courses: ["courses._id"],
    },
  ],
  tasks: [
    {
      _id: "5471230548920175fgdfas",
      taskType: "lecture",
      duration: "7200", // In seconds
      completed: "false",
      name: "COMP2521 Lecture Monday",
      course: "course._id",
      week: 1,
      term: 1,
      year: 2021,
    },
    {
      _id: "5471230548920175ffas",
      taskType: "lecture",
      duration: "7200", // In seconds
      completed: "false",
      name: "COMP2521 Lecture Tuesday",
      course: "course._id",
      week: 1,
      term: 1,
      year: 2021,
    },
    {
      _id: "54712305892017gdfas",
      taskType: "tutorial",
      duration: "7200", // In seconds
      completed: "false",
      name: "COMP2521 Tutorial Monday",
      course: "course._id",
      week: 1,
      term: 1,
      year: 2021,
    },
  ],
  courses: [
    {
      _id: "ewru092ujfds",
      courseName: "COMP1511",
      taskTemplates: [
        {
          taskType: "lecture",
          name: "COMP1511 Lecture Monday",
          duration: "3600", // Duration in seconds
          weeks: [1, 2, 3, 4, 5, 7, 8, 9, 10],
          term: 3,
          year: 2020,
        },
      ],
    },
  ],
};

export default sampleData;
