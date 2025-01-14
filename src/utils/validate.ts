
function isBlank(value: string) {
  return value.trim() === '';
}

type UserInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: UserInformation) {
  return validateUser(values);
}

function validateSignup(values: UserInformation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지않습니다.';
  }

  return signupErrors;
}

function validateAddPost(values: {title: string}) {
  const error = {
    title: '',
    description: ''
  }
  if (values.title.trim() === '') {
    error.title = '제목은 1~30자 이내로 입력해주세요'
  }
  
  return error;
}

function validateDogName(values: {dogName: string}) {
  const errors = {
    dogName: '',
  }
  if (isBlank(values.dogName)) {
    errors.dogName = '닉네임을 입력해주세요.';
  }
  return errors;
}

function validateReward(values: { appliedReward: number; userTotalReward: number }) {
  const errors: Record<"appliedReward" | "userTotalReward", string> = {
    appliedReward: "",
    userTotalReward: "",
  };

  if (isNaN(values.appliedReward)) {
    errors.appliedReward = "적립금은 숫자로 입력해야 합니다.";
  }

  if (values.appliedReward > values.userTotalReward) {
    errors.appliedReward = "적립금은 보유한 금액보다 많을 수 없습니다.";
  }

  return errors;
}


export {validateLogin, validateSignup, validateAddPost, validateDogName, validateReward};
