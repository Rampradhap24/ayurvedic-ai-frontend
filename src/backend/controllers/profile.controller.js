export const getMyProfile = async (req, res) => {
  res.json({
    age: req.user.age || "",
    height: req.user.height || "",
    weight: req.user.weight || "",
    gender: req.user.gender || "",
    workType: req.user.workType || "",
  });
};

export const updateMyProfile = async (req, res) => {
  const { age, height, weight, gender, workType } = req.body;

  req.user.age = age;
  req.user.height = height;
  req.user.weight = weight;
  req.user.gender = gender;
  req.user.workType = workType;

  await req.user.save();
  res.json(req.user);
};