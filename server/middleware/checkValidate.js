const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

// Midleware kiểm tra dữ liệu đầu vào
const validateData = (req, res, next) => {
  // Lấy content từ phần người dùng gửi lên
  const { content, duedate, task_status, task_men } = req.body;
  //   const newTask = [content, duedate, task_status, task_men];
  //   console.log(newTask);
  if (
    checkIsEmpty(content) ||
    checkIsEmpty(duedate) ||
    checkIsEmpty(task_status) ||
    checkIsEmpty(task_men)
  ) {
    return res.status(404).json({
      message: "Nội dung không được phép để trống",
    });
  }

  next();
};

module.exports = validateData;
