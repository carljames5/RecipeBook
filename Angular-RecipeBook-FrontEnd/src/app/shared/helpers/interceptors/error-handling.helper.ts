const exceptionCodeMessages: { [exceptionCode: number]: string } = {
  [1]: 'Logged in user not found in the system!',
  [2]: 'There is no such user in the system!',
  [3]: 'Operation failed! Signed in user is unauthorized',
  [4]: 'Operation failed! Signed in user identifier is invalid!',
  [5]: 'User is locked out in the system!!',
  [6]: 'User is not allowed in the system!',
  [7]: 'Username/ password is incorrect!',
  [8]: 'This recipe not found in the system!',
  [9]: 'This upgradeable recipe is not found in this system!',
  [10]: 'This deletable recipe is not found in this system!',
  [11]: 'This recipe name is already exist in the system!',
};

export function localizeException(exceptionCode: number): string {
  const exceptionMessage = exceptionCodeMessages[exceptionCode];

  console.log(exceptionMessage);

  if (exceptionMessage) {
    return exceptionMessage;
  }

  return getBadRequestMessage();
}

export function getBadRequestMessage(): string {
  return 'Unknow error!';
}

export function getInternalServerErrorMessage(): string {
  return 'Internal server error!';
}
