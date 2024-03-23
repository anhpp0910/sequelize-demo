const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("task_management", "root", "09102000", {
  host: "localhost",
  dialect: "mysql",
});

// tạo model
const Task = sequelize.define("Task", {
  name: {
    type: DataTypes.STRING, // VARCHAR(255)
    allowNull: false, // NOT NULL
  },
  status: {
    type: DataTypes.STRING,
  },
});

const createTask = async (name, status) => {
  // c1
  //   const newTask = Task.build({ name: name, status: status });
  //   await newTask.save();
  //c2
  const newTask = await Task.create({ name, status });
};

// createTask("Làm Capstone 3", "CLOSE");

const getAllTask = async () => {
  const taskList = await Task.findAll();
  console.log(JSON.stringify(taskList, null, 2));
};
// getAllTask();

const getTaskById = async (id) => {
  const task = await Task.findOne({
    where: {
      id: id,
    },
  });
  console.log("Task: ", JSON.stringify(task, null, 2));
};
// getTaskById(3);

const updateTaskById = async (data, id) => {
  await Task.update(data, {
    where: {
      id,
    },
  });
};

// updateTaskById(3, { name: "Làm Capstone 4", status: "WAITING" });

const deleteTaskById = async (id) => {
  await Task.destroy({
    where: {
      id,
    },
  });
};

// deleteTaskById(2);

// đồng bộ model và table
const syncModel = async () => {
  await Task.sync({ force: true }); // xoá bảng cũ đi và tạo mới
  //   Task.sync({ alter: true }); // sửa bảng cũ thành bảng mới
  console.log("Sync Modal Task successfully");
};

// syncModel();

const checkConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection OK");
  } catch (error) {
    console.log("Conection NG");
    console.log(error);
  }
};

checkConnect();
